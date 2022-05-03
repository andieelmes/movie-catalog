import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import locationParams from 'src/helpers/location-params';

import { environment } from 'src/environments/environment';
import { DBConfig, Genre, Movie, MovieInDetail } from 'src/models/movie';

const DETAIL_POSTER_SIZE = 'w780';
const CATALOG_POSTER_SIZE = 'w342';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiBase = environment.apiBase;

  private apiKey = environment.apiKey;

  _getUrl = (url: string, params?: {}) => {
    const paramString = locationParams.combine({ api_key: this.apiKey, ...params })

    return `${this.apiBase}${url}${paramString}`;
  };

  private imageConfig: {
    basePath?: string,
    detailSize?: string,
    catalogSize?: string,
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
        detailSize: poster_sizes?.includes(DETAIL_POSTER_SIZE) ? DETAIL_POSTER_SIZE : poster_sizes?.[0],
        catalogSize: poster_sizes?.includes(CATALOG_POSTER_SIZE) ? CATALOG_POSTER_SIZE : poster_sizes?.[0],
      };
    });
  }

  getPosterUrl(path: string, size?: string): string {
    if (!this.imageConfig.basePath || !size) return '';

    return `${this.imageConfig.basePath}${size}${path}`;
  }

  getConfig(): Observable<DBConfig> {
    return this.http.get<{images: DBConfig}>(this._getUrl('/configuration'))
      .pipe(
        map(result => result.images),
        catchError(this.handleError<DBConfig>('get configuration', {}))
      );
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<{genres: Genre[]}>(this._getUrl('/genre/movie/list'))
      .pipe(
        map(result => result.genres),
        catchError(this.handleError<Genre[]>('get genres', []))
      );
  }

  getInitialMovies(): Observable<Movie[]> {
    return this.http.get<{results: Movie[]}>(this._getUrl('/discover/movie'))
      .pipe(
        map(result => (
          result.results.map(({ poster_path, ...rest}) => ({
            ...rest,
            poster_path: poster_path ? this.getPosterUrl(poster_path, this.imageConfig.catalogSize) : ''
          }))
        )),
        catchError(this.handleError<Movie[]>('get initial movies', []))
      );
  }

  searchMovies(query?: string): Observable<Movie[]> {
    return this.http.get<{results: Movie[]}>(this._getUrl('/search/movie', { query }))
      .pipe(
        map(result => (
          result.results.map(({ poster_path, ...rest}) => ({
            ...rest,
            poster_path: poster_path ? this.getPosterUrl(poster_path, this.imageConfig.catalogSize) : ''
          }))
        )),
        catchError(this.handleError<Movie[]>('search movies', []))
      );
  }

  getMovie(id: number): Observable<MovieInDetail> {
    return this.http.get<MovieInDetail>(this._getUrl(`/movie/${id}`))
      .pipe(
        map(({ poster_path, ...rest }) => ({
          ...rest,
          poster_path: poster_path ? this.getPosterUrl(poster_path, this.imageConfig.detailSize) : ''
        })),
        catchError(this.handleError<MovieInDetail>('get movie', undefined))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} error`);

      return of(result as T);
    };
  }
}
