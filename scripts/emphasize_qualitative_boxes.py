#!/usr/bin/env python3
"""Thicken the red/green 3D box annotations without altering scene geometry."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageFilter


def color_masks(image: Image.Image) -> tuple[Image.Image, Image.Image]:
    red = Image.new("L", image.size)
    green = Image.new("L", image.size)
    red_pixels = red.load()
    green_pixels = green.load()

    for y in range(image.height):
        for x in range(image.width):
            r, g, b, _ = image.getpixel((x, y))
            if r > 170 and r - g > 60 and r - b > 50 and g < 160:
                red_pixels[x, y] = 255
            if g > 140 and g - r > 35 and g - b > 20 and r < 170:
                green_pixels[x, y] = 255

    return red, green


def emphasize(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    red_mask, green_mask = color_masks(image)

    # Five pixels at source resolution remains legible after the website's
    # card-scale downsampling while preserving the original box geometry.
    red_mask = red_mask.filter(ImageFilter.MaxFilter(5))
    green_mask = green_mask.filter(ImageFilter.MaxFilter(5))

    image.paste((226, 52, 47, 255), mask=red_mask)
    image.paste((25, 174, 58, 255), mask=green_mask)
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path, help="Directory containing image1.png ... image10.png")
    parser.add_argument("destination", type=Path, help="Website output directory")
    args = parser.parse_args()

    for index in range(1, 11):
        emphasize(args.source / f"image{index}.png", args.destination / f"image{index}.png")


if __name__ == "__main__":
    main()
