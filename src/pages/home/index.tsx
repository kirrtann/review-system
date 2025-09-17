import { moviedata } from "../Data/data";

const Home = () => {
  return (
    <>
      <div
        className={`flex flex-col justify-center max-w-[777px] mx-auto  items-center min-h-screen`}
      >
        <div className="mb-10 max-h-[500px] place-self-end overflow-y-auto ">
          {moviedata.map((data) => {
            return (
              <>
                <div>Name:{data.movie}</div>
                <div>Response:{data.suggtion}</div>
                <div>content:{data.content}</div>
              </>
            );
          })}
        </div>

        <div className="w-full">
          <div className="relative group">
            <input
              type="search"
              placeholder="Movies,Web-series,Book"
              className="w-full pl-10 pr-20 py-5 text-lg  text-white bg-transparent border border-gray-600 rounded-2xl"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90  px-6 py-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
