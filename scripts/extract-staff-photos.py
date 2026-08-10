"""
Pulls the staff headshots out of the introductions PDF the client sent.

    python3 scripts/extract-staff-photos.py

Run once. The output lands in imagery/staff/ and is committed, so this never
needs running again — it exists so the next person can see where those files
came from rather than finding fourteen mystery JPEGs in the repo.

The PDF itself is gitignored: it carries phone numbers and email addresses
for real people, and none of that belongs in version control. Only the photos
come out, and only the biography goes into scripts/staff.mjs.

How the mapping works: every page is one person's form, so a page belongs to
whoever is named in its text. A few people run across two or three pages, and
the photo is not always on the page carrying the name in the Name cell, so
each person collects the images from all of their pages and keeps the largest.
The VIA logo sits at the top of nearly every page; it is discarded by shape,
being much wider than it is tall, which no headshot here is.
"""

import os
import sys

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF is not installed. Run: python3 -m pip install pymupdf")

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(REPO, "content", "VIA Staff Introductions-compressed.pdf")
OUT = os.path.join(REPO, "imagery", "staff")

# Name as it appears in the PDF -> the slug the author document uses.
STAFF = {
    "Nhan Phan": "nhan-phan",
    "Sid Mehrotra": "sid-mehrotra",
    "Eli Zainea": "eli-zainea",
    "Khue Pham": "khue-pham",
    "Avery Simon": "avery-simon",
    "Monika Tran": "monika-tran",
    "Justin Liu": "justin-liu",
    "Zoë Curtis": "zoe-curtis",
    "Annie Wion": "annie-wion",
    "Jordan Lubis": "jordan-lubis",
    "Syrah Anand": "syrah-anand",
    "Grace Kim": "grace-kim",
    "Bella Villarin": "bella-villarin",
    "Hawley Dick": "hawley-dick",
}

# The logo is a wide lockup and appears on nearly every page at 80x36.
# Everything else embedded in this PDF is somebody's photo.
MAX_ASPECT = 1.8
MIN_PIXELS = 4_000

# Below this, a photo will visibly soften in the About grid, which draws each
# one at roughly 320px. The script still writes them — they are what the
# client sent — but it says which ones need an original.
USABLE_EDGE = 120


def main():
    if not os.path.exists(PDF):
        sys.exit(f"Missing {PDF}. The client's PDFs live in content/, which is gitignored.")

    os.makedirs(OUT, exist_ok=True)
    doc = fitz.open(PDF)

    # slug -> (pixel area, image bytes, extension, width, height)
    best = {}

    for page in doc:
        text = page.get_text()
        named = [slug for name, slug in STAFF.items() if name in text]
        if not named:
            continue

        for xref, *_ in page.get_images(full=True):
            image = doc.extract_image(xref)
            width, height = image["width"], image["height"]
            if width * height < MIN_PIXELS:
                continue
            if width / height > MAX_ASPECT:
                continue

            for slug in named:
                current = best.get(slug)
                if current is None or width * height > current[0]:
                    best[slug] = (width * height, image["image"], image["ext"], width, height)

    soft = []
    for slug, (_, data, ext, width, height) in sorted(best.items()):
        path = os.path.join(OUT, f"{slug}.{ext}")
        with open(path, "wb") as handle:
            handle.write(data)
        print(f"  {os.path.relpath(path, REPO):<34} {width}x{height}")
        if min(width, height) < USABLE_EDGE:
            soft.append(f"{slug} ({width}x{height})")

    missing = sorted(set(STAFF.values()) - set(best))
    print(f"\n{len(best)} headshots written to imagery/staff/")
    if missing:
        print(f"\nNo photo in the PDF for: {', '.join(missing)}")
        print("Those people get the initials fallback on the About page.")
    if soft:
        print(f"\nToo small to hold up at grid size: {', '.join(soft)}")
        print("Ask the client for the originals; the PDF compressed these past use.")


if __name__ == "__main__":
    main()
