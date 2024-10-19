"use client";

import { useState } from "react";

export default function PhotoStack({ event }) {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div
      className={`relative w-full ${
        hoveredImage ? "h-[400px]" : "h-20"
      } overflow-hidden`}
    >
      <div className="flex space-x-2 overflow-x-auto">
        {event.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`h-20 w-20 object-cover rounded-lg cursor-pointer`}
            onMouseEnter={() => setHoveredImage(image)}
            onMouseLeave={() => setHoveredImage(null)}
          />
        ))}
      </div>

      {hoveredImage && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-500">
          {hoveredImage.endsWith(".mpg") ? (
            <video
              src={hoveredImage}
              alt={`Event photo`}
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <img
              src={hoveredImage}
              alt={`Event photo`}
              className="w-full h-[400px] object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
