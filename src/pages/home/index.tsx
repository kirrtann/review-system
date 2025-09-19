import { moviedata } from "../Data/data";

interface IResponse {
  movie: string;
  suggtion: string;
  genres: string;
  actor: string;
}

const MovieCard: React.FC<IResponse> = ({ movie, suggtion, genres, actor }) => (
  <article className=" p-3 bg-[#1f1f1f] shadow">
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
  const movies: IResponse[] = moviedata;
  const hasMovies = movies.length > 0;

  return (
    <div
      className={`flex h-screen  ${
        hasMovies ? "flex-col" : "items-center justify-center"
      }`}
    >
      {hasMovies && (
        <section className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-2 text-right">
            <div className="inline-block bg-[#323232d9] px-5 py-1 rounded-2xl">
              K.G.F
            </div>
          </div>

          <div className="mb-10">
            {movies.map((data) => (
              <MovieCard key={data.movie} {...data} />
            ))}
          </div>
        </section>
      )}

      <section className="w-full max-w-2xl px-4 py-3">
        <div className="relative flex items-center">
          <input
            type="text"
            name="search"
            placeholder="Movies, web-series review"
            className="w-full px-10 py-3 text-lg text-white bg-transparent border border-gray-600 rounded-2xl"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90"
          >
            <svg
              className="w-6 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
