import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';

import { mockGenres, mockInitialMovies, mockMovie } from 'src/mocks/movie';

const imagesRawConfig = {
  secure_base_url: "https://example.com/",
  poster_sizes: ["w342", "w780"],
}

describe('MovieService', () => {
  let service: MovieService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should request and save image configuration', () => {
    const req = httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/configuration'),
    });

    req.flush({ images: imagesRawConfig});

    service.setImageConfig();
    expect(service.getPosterUrl('/test.png', 'w342')).toEqual('https://example.com/w342/test.png');
  });

  it('should call getGenres and return genres', () => {
    service.getGenres().subscribe(genres => {
      expect(genres).toEqual(mockGenres);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/genre/movie/list'),
    });

    req.flush({ genres: mockGenres });
  });

  it('should call getInitialMovies and return formatted movies', () => {
    const formattedMovies = mockInitialMovies.map(movie => ({...movie, poster_path: service.getPosterUrl(movie.poster_path, 'w342')}));

    service.getInitialMovies().subscribe(movies => {
      expect(movies).toEqual(formattedMovies);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/discover/movie'),
    });

    req.flush({ results: mockInitialMovies });
  });

  it('should call searchMovies and return formatted movies', () => {
    const query = 'starwars';
    const formattedMovies = mockInitialMovies.map(movie => ({...movie, poster_path: service.getPosterUrl(movie.poster_path, 'w342')}));

    service.searchMovies(query).subscribe(movies => {
      expect(movies).toEqual(formattedMovies);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/search/movie', { query }),
    });

    req.flush({ results: mockInitialMovies });
  });

  it('should call getMovie and return formatted movie details', () => {
    const id = 1;
    const formattedMovie = {...mockMovie, poster_path: service.getPosterUrl(mockMovie.poster_path, 'w780')};

    service.getMovie(id).subscribe(movie => {
      expect(movie).toEqual(formattedMovie);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: service._getUrl(`/movie/${id}`),
    });

    req.flush(mockMovie);
  });

  it('should handle errors', () => {
    const error = { status: 500, statusText: 'Internal Server Error' };

    let genresResult: any;
    service.getGenres().subscribe((response) => {
      genresResult = response;
    });

    httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/genre/movie/list'),
    }).flush(null, error);

    expect(genresResult).toEqual([]);

    let initialMoviesResult: any;
    service.getInitialMovies().subscribe((response) => {
      initialMoviesResult = response;
    });
    httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/discover/movie'),
    }).flush(null, error);
    expect(initialMoviesResult).toEqual([]);

    let searchMoviesResult: any
    service.searchMovies('query').subscribe((response) => {
      searchMoviesResult = response;
    });
    httpController.expectOne({
      method: 'GET',
      url: service._getUrl('/search/movie', { query: 'query' }),
    }).flush(null, error);
    expect(searchMoviesResult).toEqual([]);

    let getMovieResult: any;
    service.getMovie(1).subscribe((response) => {
      getMovieResult = response;
    });
    httpController.expectOne({
      method: 'GET',
      url: service._getUrl(`/movie/${1}`),
    }).flush(null, error);
    expect(getMovieResult).toEqual(undefined);
  });
});
