import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import locationParams from 'src/helpers/location-params';

import { environment } from '../environments/environment';
import { DBConfig, Genre, Movie } from './movie';

const DEFAULT_POSTER_SIZE = 'w500';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiBase = environment.apiBase;

  private apiKey = environment.apiKey;

  private getUrl = (url: string, params?: {}) => {
    const paramString = locationParams.combine({ api_key: this.apiKey, ...params })

    return `${this.apiBase}${url}${paramString}`;
  };

  private imageConfig: {
    basePath?: string,
    size?: string,
  } = {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.setImageConfig();
  }

  setImageConfig(): void {
    this.getConfig().subscribe(({ secure_base_url, poster_sizes }) => {
      this.imageConfig = {
        basePath: secure_base_url,
        size: poster_sizes?.includes(DEFAULT_POSTER_SIZE) ? DEFAULT_POSTER_SIZE : poster_sizes?.[0],
      };
    });
  }

  getPosterUrl(path: string): string {
    if (!this.imageConfig.basePath || !this.imageConfig.size) return '';

    return `${this.imageConfig.basePath}${this.imageConfig.size}${path}`;
  }

  getConfig(): Observable<DBConfig> {
    return this.http.get<{images: DBConfig}>(this.getUrl('/configuration'))
      .pipe(
        map(result => result.images),
        catchError(this.handleError<DBConfig>('get configuration', {}))
      );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<{genres: Genre[]}>(this.getUrl('/genre/movie/list'))
      .pipe(
        map(result => result.genres),
        catchError(this.handleError<Genre[]>('get genres', []))
      );
  }

  getMovies(genres?: Genre['id'][], query?: string): Observable<Movie[]> {
    return this.http.get<{results: Movie[]}>(this.getUrl('/discover/movie', { with_genres: genres, with_keywords: query }))
      .pipe(
        map(result => result.results.map(({ poster_path, ...rest}) => ({...rest, poster_path: poster_path ? this.getPosterUrl(poster_path) : ''}))),
        catchError(this.handleError<Movie[]>('get movies', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} error`);

      return of(result as T);
    };
  }
}
