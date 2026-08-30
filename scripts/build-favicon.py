"""
Regenerates the browser favicon from the VIA wordmark.

    python3 scripts/build-favicon.py

Run this again after any change to --accent or --bg in src/styles/tokens.css.
A favicon is a flat binary asset, so it is the one place on the site where
brand colours cannot be read from CSS at render time — this script reads them
out of tokens.css at *build* time instead, which keeps the palette a
one-file edit the way CLAUDE.md requires.

The wordmark itself is lifted straight out of public/vialogo.svg, which is a
PNG embedded inside an SVG and cropped by a pattern transform. Rather than
re-implement that transform, this trims to the artwork's own alpha bounding
box, which gets the same result and survives the logo being re-exported.

Writes public/favicon.svg and public/favicon.ico.
"""

import base64
import io
import re
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
LOGO = REPO / 'public' / 'vialogo.svg'
TOKENS = REPO / 'src' / 'styles' / 'tokens.css'

# How much of the square the wordmark is allowed to fill. A tab icon needs a
# margin or the letterforms run into the browser's own chrome.
INSET = 0.12
ICO_SIZES = [(16, 16), (32, 32), (48, 48), (64, 64)]


def token(name: str) -> str:
    """Reads one custom property out of tokens.css."""
    text = TOKENS.read_text()
    match = re.search(rf'^\s*{re.escape(name)}:\s*(#[0-9a-fA-F]{{3,8}})', text, re.M)
    if not match:
        raise SystemExit(f'{name} not found as a hex value in {TOKENS}')
    return match.group(1)


def rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip('#')
    if len(value) == 3:
        value = ''.join(c * 2 for c in value)
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def wordmark() -> Image.Image:
    """The logo artwork, trimmed to its own ink."""
    svg = LOGO.read_text()
    match = re.search(r'xlink:href="data:image/png;base64,([A-Za-z0-9+/=]+)"', svg)
    if not match:
        raise SystemExit(f'No embedded PNG found in {LOGO}')

    art = Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert('RGBA')
    box = art.getchannel('A').getbbox()
    if not box:
        raise SystemExit('The logo artwork has no opaque pixels to crop to.')
    return art.crop(box)


def build() -> Image.Image:
    accent = rgb(token('--accent'))
    background = rgb(token('--bg'))

    art = wordmark()

    # The artwork is used elsewhere as a CSS mask, so only its alpha channel
    # carries the shape — the colour underneath is whatever the exporter left
    # behind. Repaint it in the accent and keep the alpha.
    ink = Image.new('RGBA', art.size, accent + (255,))
    ink.putalpha(art.getchannel('A'))

    # Square canvas, wordmark fitted to the width it can have inside the inset.
    side = 512
    room = int(side * (1 - INSET * 2))
    scale = min(room / art.width, room / art.height)
    fitted = ink.resize((max(1, round(art.width * scale)), max(1, round(art.height * scale))), Image.LANCZOS)

    canvas = Image.new('RGBA', (side, side), background + (255,))
    canvas.alpha_composite(fitted, ((side - fitted.width) // 2, (side - fitted.height) // 2))
    return canvas


def main() -> None:
    icon = build()

    icon.save(REPO / 'public' / 'favicon.ico', sizes=ICO_SIZES)

    buffer = io.BytesIO()
    icon.save(buffer, format='PNG', optimize=True)
    payload = base64.b64encode(buffer.getvalue()).decode('ascii')
    (REPO / 'public' / 'favicon.svg').write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
        'viewBox="0 0 512 512" width="512" height="512">'
        f'<image width="512" height="512" xlink:href="data:image/png;base64,{payload}"/>'
        '</svg>\n'
    )

    print(f'favicon.ico and favicon.svg written from {LOGO.name}')


if __name__ == '__main__':
    main()
