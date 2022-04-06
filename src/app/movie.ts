export interface DBConfig {
  secure_base_url?: string,
  poster_sizes?: string[],
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  poster_path?: string | null,
  adult?: boolean
  overview?: string
  release_date?: string,
  genre_ids: Genre['id'][],
  id?: number,
  original_title?: string
  original_language?: string
  title?: string
  popularity?: number
  vote_average?: number,
}
