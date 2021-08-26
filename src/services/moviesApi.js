import { http } from "./baseHttp";

export const fachNowPlaying = (page = 1) => {
  return http.get("/movie/now_playing", { params: { page } });
};
