import React from "react";

type PixelSpriteProps = {
  src: string;
  size?: number; // CSS pixels for width/height (scaled)
  title?: string;
  className?: string;
};

export function PixelSprite({ src, size = 96, title, className = "" }: PixelSpriteProps) {
  return (
    <img
      src={src}
      alt={title ?? "sprite"}
      title={title}
      width={size}
      height={size}
      className={`pixelated ${className}`}
      style={{ imageRendering: "pixelated" as any }}
    />
  );
}

