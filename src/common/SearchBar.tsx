import React from "react";
import { SearchIcon } from "./icons";
import { SendIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-10 py-3 text-white text-lg bg-[#363535] border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </span>
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 rotate-45 text-gray-300 hover:text-white"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default SearchBar;
