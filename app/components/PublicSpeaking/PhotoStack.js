"use client";

import { useState } from "react";

export default function PhotoStack({ event }) {
  const [image, setImage] = useState(null);


  return (
    <div
      className={`relative w-full ${
        image ? "h-[400px]" : "h-20"
      } overflow-hidden`}
    >
      <div className="flex space-x-2 overflow-x-auto">
        {event.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`h-20 w-20 object-cover rounded-lg cursor-pointer`}
            onMouseEnter={() => setImage(image)}
            onMouseLeave={() => setImage(null)}
          />
        ))}
      </div>

      {image && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl transition-all duration-500">
          {image.endsWith(".mpg") ? (
            <video
              src={image}
              alt={`Event photo`}
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <img
              src={image}
              alt={`Event photo`}
              className="w-full h-[400px] object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}
