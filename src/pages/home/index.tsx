import { moviedata } from "../Data/data";

const Home = () => {
  return (
    <>
      <div
        className={`flex flex-col justify-center max-w-[777px] mx-auto  items-center min-h-screen`}
      >
        <div className="w-full">
          <div className="place-self-end bg-[#323232d9] px-3 py-1 rounded-2xl ">
            {moviedata.map((search) => {
              return <div>{search.movie}</div>;
            })}
          </div>
          <div className="mb-5 max-h-[600px]  place-self-start overflow-y-auto ">
            {moviedata.map((data) => {
              return (
                <>
                  <div>
                    Movies :
                    <span className="font-semibold"> {data.movie} </span>
                  </div>
                  <div>
                    Response :
                    <span className="font-semibold"> {data.suggtion} </span>
                  </div>
                  <div>
                    Genres :
                    <span className="font-semibold"> {data.genres} </span>
                  </div>
                  <div>
                    Actor : <span className="font-semibold">{data.actor}</span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="relative group">
            <input
              type="search"
              name="search"
              placeholder="Get movies,web-series review"
              className="w-full px-10 py-4 text-lg text-white bg-transparent border border-gray-600 rounded-2xl"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90  px-6 py-3"
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
        </div>
      </div>
    </>
  );
};

export default Home;
