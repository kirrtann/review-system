import type { JSX } from "react";

export type MediaItem = {
  id: string;
  type: "movie" | "Tv Show" | "book";
  title: string;
  imdb?: string;
  public?: string;
  suggestion?: string;
  genres?: string;
  director?: string;
  writer?: string;
  actor?: string;
  language?: string;
  year?: number;
  poster?: string;
  cover_image?: string;
  quote?: string;
  price?: string;
  trailer?: string;
  author?: string;
};

export type buttonConfig = {
  label: string;
  icon: JSX.Element;
  color: string;
};
