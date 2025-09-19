import { SearchIcon, SendIcon } from "../../common/icons";
import { moviedata } from "../Data/data";

type Movie = {
  movie: string;
  suggtion: string;
  genres: string;
  actor: string;
};

const MovieCard: React.FC<Movie> = ({ movie, suggtion, genres, actor }) => (
  <article>
    <p>
      <span className="font-semibold">Movie:</span> {movie}
    </p>
    <p>
      <span className="font-semibold">Response:</span> {suggtion}
    </p>
    <p>
      <span className="font-semibold">Genres:</span> {genres}
    </p>
    <p>
      <span className="font-semibold">Actor:</span> {actor}
    </p>
  </article>
);

const Home: React.FC = () => {
  const movies: Movie[] = moviedata;
  const hasMovies = movies.length > 0;

  return (
    <div
      className={`flex h-screen ${
        hasMovies ? "flex-col" : "items-center justify-center"
      }`}
    >
      {hasMovies && (
        <main className="flex-1 overflow-y-auto sm:px-4 mx-1 py-6 space-y-6">
          <header className="text-right">
            <span className="inline-block bg-[#323232d9] px-5 py-1 rounded-2xl">
              K.G.F
            </span>
          </header>
          <section className="rounded-2xl px-5 py-3 bg-[#1f1f1f] space-y-6">
            {movies.map((data) => (
              <MovieCard key={data.movie} {...data} />
            ))}
          </section>
        </main>
      )}

      <footer className="w-full max-w-2xl px-4 py-3">
        <div className="relative flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Movies, web-series review"
            className="w-full px-10 py-3 text-lg text-white bg-transparent border border-gray-600 rounded-2xl"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90"
          >
            <SendIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
