import React, { useState } from "react";
import type { MediaItem } from "../../type/type";
import PageHeader from "../../common/PageHeader";
import SearchBar from "../../common/SearchBar";
import MovieCard from "../../common/MovieCard";
import { moviedata } from "../Data/data";
import ByMoviesTicket from "../../common/ByMoviesTicket";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MediaItem | null>(null);

  const filteredMovies = moviedata.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const hasSearch = query.trim().length > 0;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <PageHeader
          title="Show-Sage"
          subtitle="Search and explore top-rated Movies, Shows & Books"
        />

        <main className="flex-1 overflow-y-auto px-6 pb-16">
          {hasSearch ? (
            filteredMovies.length > 0 ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-gray-200">
                  Results for “{query}”
                </h2>

                <section>
                  {filteredMovies.map((item) => (
                    <MovieCard
                      key={item.id}
                      item={item}
                      onBook={() => setSelectedMovie(item)}
                    />
                  ))}
                </section>
              </>
            ) : (
              <div className="text-center text-gray-500 py-20">
                No results found for “{query}”
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 py-20">
              Start typing to search for a movie, TV show, or book.
            </div>
          )}
        </main>

        <div className="px-6 mb-8">
          <SearchBar
            placeholder="Search movies, shows, books..."
            onSearch={setQuery}
          />
        </div>
      </div>

      {selectedMovie && selectedMovie.type === "movie" && (
        <ByMoviesTicket
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default Home;
