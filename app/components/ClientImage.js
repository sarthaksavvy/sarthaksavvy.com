"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ClientImage({
  src,
  alt,
  className,
  fill = false,
  sizes,
  fallbackText,
  width,
  height,
  ...props
}) {
  const [imageError, setImageError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setImageError(false);
  }, [src]);

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center h-full w-full bg-gray-800 ${className}`}
      >
        <p className="text-gray-400 text-center p-4">
          {fallbackText || alt || "Image not available"}
        </p>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={true}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        className={`object-contain ${className}`}
        onError={() => setImageError(true)}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      className={`object-contain ${className}`}
      onError={() => setImageError(true)}
      {...props}
    />
  );
}
