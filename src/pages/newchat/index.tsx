import { SearchIcon, SendIcon } from "../../common/icons";

const NewChat = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
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

export default NewChat;
