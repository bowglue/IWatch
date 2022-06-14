export interface MovieInfo {
  movie_id: number;
  movie_name: string;
  movie_image: string;
  movie_title: string;
  movie_focus: string;
}

export interface TrailerInfo {
  movie_id?: number;
  segment_id?: number;
}
