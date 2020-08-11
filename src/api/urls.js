// Gif Apis

import { GIF_API_KEY } from "../constants";

export const apiSearchGif = `/v1/gifs/search?api_key=${GIF_API_KEY}`;
export const apiTrendingGif = `/v1/gifs/trending?api_key=${GIF_API_KEY}`;
