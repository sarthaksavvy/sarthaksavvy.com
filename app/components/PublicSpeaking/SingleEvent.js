"use client";

import { Calendar, ExternalLink, MapPin, Users } from "lucide-react";
import PhotoStack from "./PhotoStack";

export default function SingleEvent({ event }) {
  return (
    <div key={event.id} className="relative pl-12">
      {/* Year Marker */}
      <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[#D1F366]" />
        <span className="text-sm text-[#D1F366] mt-2">{event.year}</span>
      </div>

      {/* Event Card */}
      <div className="bg-[#1A1A1A] rounded-2xl transition-all duration-300">
        <div className="p-6">
          {/* Title Section */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-[#D1F366] font-medium mb-2">
                {event.conference}
              </p>
            </div>
          </div>
          {/* Event Details */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Users size={16} />
              {event.audience}
            </span>
          </div>
          {/* Photo Stack */}
          <PhotoStack event={event} />

          <div className="mt-6">
            <p className="text-gray-300">{event.description}</p>

            <div className="flex flex-wrap gap-4">
              {event.slides && (
                <a
                  href={event.slides}
                  className="flex items-center gap-2 text-[#D1F366] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  View Slides
                </a>
              )}
              {event.recording && (
                <a
                  href={event.recording}
                  className="flex items-center gap-2 text-[#D1F366] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Watch Recording
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
