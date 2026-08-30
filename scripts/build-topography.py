"""
Draws the topographic contour pattern used behind plain sections.

    python3 scripts/build-topography.py

Writes public/topography.svg — a seamlessly tiling contour field.

Why generated rather than traced: the client's reference for this pattern is a
watermarked Adobe Stock comp (id 544117944), which cannot ship. Drawing it
gives VIA a pattern it actually owns, in the site's own line weight, and it
tiles — a fixed image would either repeat visibly or have to be enormous.

How it works. A smooth height field is built from a handful of sine waves
whose frequencies are whole numbers, which is what makes the field exactly
periodic and therefore what makes the tile seamless. Marching squares then
traces the contour lines at evenly spaced heights, the same way a real
topographic map is drawn. Amplitudes favour low horizontal frequencies, so
the contours run mostly across the tile and close into islands here and there,
which is the character of the reference.

The paths carry no colour. The pattern is applied as a CSS mask over a
token-coloured surface — the same technique Nav.astro uses for the wordmark —
so its colour still comes from tokens.css and nowhere else.
"""

import math
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / 'public' / 'topography.svg'

WIDTH, HEIGHT = 1200, 600
COLS, ROWS = 240, 120          # sampling grid; higher is smoother and heavier
LEVELS = 11                    # contour lines across the field's full range
STROKE = 1.6
EPSILON = 0.7                   # path simplification tolerance, in output px
SEED = 7

# (x-frequency, y-frequency, amplitude). Whole numbers only — that is what
# makes the field periodic and the tile seamless. Amplitude falls away as the
# frequencies rise, which is what keeps the result reading as terrain rather
# than as interference.
WAVES = [
    (0, 1, 1.00),
    (1, 1, 0.55),
    (1, 2, 0.42),
    (2, 1, 0.30),
    (1, 3, 0.26),
    (2, 3, 0.18),
    (3, 2, 0.13),
    (2, 5, 0.09),
    (4, 3, 0.07),
]


def phases():
    """Deterministic phase offsets, so the pattern is the same every build."""
    state = SEED
    for _ in WAVES:
        state = (state * 1103515245 + 12345) % (2 ** 31)
        yield (state / (2 ** 31)) * 2 * math.pi


def field():
    offsets = list(phases())
    grid = []
    for row in range(ROWS + 1):
        y = row / ROWS
        line = []
        for col in range(COLS + 1):
            x = col / COLS
            total = 0.0
            for (nx, ny, amp), phase in zip(WAVES, offsets):
                total += amp * math.sin(2 * math.pi * (nx * x + ny * y) + phase)
            line.append(total)
        grid.append(line)
    return grid


def interpolate(p1, v1, p2, v2, level):
    """Where along an edge the contour crosses."""
    if abs(v2 - v1) < 1e-12:
        return p1
    t = (level - v1) / (v2 - v1)
    return (p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t)


def segments_at(grid, level):
    """Marching squares: one line segment per crossed cell."""
    out = []
    for row in range(ROWS):
        for col in range(COLS):
            # Corners, clockwise from top-left.
            pts = [
                ((col, row), grid[row][col]),
                ((col + 1, row), grid[row][col + 1]),
                ((col + 1, row + 1), grid[row + 1][col + 1]),
                ((col, row + 1), grid[row + 1][col]),
            ]
            index = sum(1 << i for i, (_, v) in enumerate(pts) if v > level)
            if index in (0, 15):
                continue

            # Midpoints of the four edges, where crossed.
            edges = {}
            for i in range(4):
                (pa, va), (pb, vb) = pts[i], pts[(i + 1) % 4]
                if (va > level) != (vb > level):
                    edges[i] = interpolate(pa, va, pb, vb, level)

            crossed = sorted(edges)
            if len(crossed) == 2:
                out.append((edges[crossed[0]], edges[crossed[1]]))
            elif len(crossed) == 4:
                # Saddle: join the pairs that keep the lines from crossing.
                out.append((edges[0], edges[1]))
                out.append((edges[2], edges[3]))
    return out


def chain(segments):
    """Joins segments end to end into as few polylines as possible."""
    def key(point):
        return (round(point[0], 4), round(point[1], 4))

    remaining = {}
    for a, b in segments:
        remaining.setdefault(key(a), []).append((a, b))
        remaining.setdefault(key(b), []).append((b, a))

    used = set()
    paths = []

    for a, b in segments:
        marker = (key(a), key(b))
        if marker in used:
            continue
        used.add(marker)
        used.add((key(b), key(a)))

        path = [a, b]
        # Walk forward from the end, then backward from the start.
        for direction in (0, 1):
            while True:
                tip = path[-1]
                nxt = None
                for start, end in remaining.get(key(tip), []):
                    if (key(start), key(end)) in used:
                        continue
                    nxt = (start, end)
                    break
                if not nxt:
                    break
                used.add((key(nxt[0]), key(nxt[1])))
                used.add((key(nxt[1]), key(nxt[0])))
                path.append(nxt[1])
            if direction == 0:
                path.reverse()
        paths.append(path)

    return paths


def simplify(points, epsilon):
    """
    Ramer–Douglas–Peucker. Marching squares puts a vertex on every grid cell
    it crosses, and most of those sit on a straight run — dropping them cuts
    the file by more than half with no visible change to the curve.
    """
    if len(points) < 3:
        return points

    ax, ay = points[0]
    bx, by = points[-1]
    dx, dy = bx - ax, by - ay
    span = math.hypot(dx, dy)

    worst, index = 0.0, 0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        if span < 1e-9:
            distance = math.hypot(px - ax, py - ay)
        else:
            distance = abs(dy * px - dx * py + bx * ay - by * ax) / span
        if distance > worst:
            worst, index = distance, i

    if worst <= epsilon:
        return [points[0], points[-1]]
    return simplify(points[: index + 1], epsilon)[:-1] + simplify(points[index:], epsilon)


def to_path_data(points):
    sx, sy = WIDTH / COLS, HEIGHT / ROWS
    scaled = [(x * sx, y * sy) for x, y in points]
    scaled = simplify(scaled, EPSILON)
    parts = [f'M{scaled[0][0]:.0f} {scaled[0][1]:.0f}']
    for x, y in scaled[1:]:
        parts.append(f'L{x:.0f} {y:.0f}')
    return ''.join(parts)


def main():
    grid = field()
    flat = [v for row in grid for v in row]
    low, high = min(flat), max(flat)

    paths = []
    for i in range(1, LEVELS + 1):
        level = low + (high - low) * i / (LEVELS + 1)
        for points in chain(segments_at(grid, level)):
            if len(points) < 4:
                continue  # drop specks; they read as noise, not contour
            paths.append(to_path_data(points))

    body = ''.join(f'<path d="{d}"/>' for d in paths)
    OUT.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" '
        f'width="{WIDTH}" height="{HEIGHT}">'
        f'<g fill="none" stroke="#000" stroke-width="{STROKE}" '
        f'stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>\n'
    )
    print(f'{OUT.relative_to(REPO)} — {len(paths)} contour paths, {OUT.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
