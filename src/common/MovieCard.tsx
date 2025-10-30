import React, { useState, type JSX } from "react";
import { Star, Ticket, ShoppingCart, Play, Film, X } from "lucide-react";
import type { MediaItem } from "../type/type";

interface MovieCardProps {
  item: MediaItem;
  onBook?: (movie: MediaItem) => void;
}
export type ButtonConfig = {
  label: string;
  icon: JSX.Element;
  color: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ item, onBook }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const image = item.poster || item.cover_image;
  const type = item.type?.toLowerCase();

  const getButtonConfig = (type?: string): ButtonConfig => {
    const config: Record<string, ButtonConfig> = {
      movie: {
        label: "Book Ticket",
        icon: <Ticket size={16} />,
        color:
          "from-yellow-600 to-orange-500 hover:from-yellow-500 hover:to-orange-400",
      },
      tv_show: {
        label: "Watch Now",
        icon: <Play size={16} />,
        color:
          "from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400",
      },
      book: {
        label: "Buy Book",
        icon: <ShoppingCart size={16} />,
        color:
          "from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400",
      },
    };

    return config[type || "movie"] || config.movie;
  };
  const button = getButtonConfig(item.type);

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#1e1e1e] to-[#111] w-full border border-gray-800 rounded-2xl overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300">
        <div className="relative">
          {image ? (
            <img
              src={image}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
              No Poster Available
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

          {type && (
            <span
              className={`absolute top-3 left-3 text-xs uppercase font-semibold px-3 py-1 rounded-full text-white ${
                type === "movie"
                  ? "bg-yellow-600/90"
                  : type === "tvshow"
                  ? "bg-purple-600/90"
                  : "bg-green-600/90"
              }`}
            >
              {type}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white truncate mb-1 drop-shadow-sm">
              {item.title}
            </h2>

            {item.imdb && (
              <div className="flex items-center text-yellow-400 text-sm font-medium mb-1">
                <Star size={14} className="mr-1 fill-yellow-400" /> {item.imdb}
              </div>
            )}

            {item.genres && (
              <p className="text-gray-300 text-xs line-clamp-2 mb-2">
                {item.genres}
              </p>
            )}

            {item.actor && (
              <p className="text-gray-400 text-xs mb-3">
                <span className="font-semibold text-gray-300">Stars:</span>{" "}
                {item.actor}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button
              onClick={() => onBook && onBook(item)}
              className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-xl bg-gradient-to-r ${button.color} text-white text-sm font-semibold transition-all duration-300`}
            >
              {button.icon}
              {button.label}
            </button>
            {item?.type === "movie" || item?.type === "tv_show" ? (
              <button
                onClick={() => item.trailer && setShowTrailer(true)}
                disabled={!item.trailer}
                className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${
                  item.trailer
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Film size={16} />
                Watch Trailer
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {showTrailer && item.trailer && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-red-400 z-50"
            >
              <X size={28} />
            </button>
            <iframe
              src={item.trailer.replace("watch?v=", "embed/")}
              title={`${item.title} Trailer`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
