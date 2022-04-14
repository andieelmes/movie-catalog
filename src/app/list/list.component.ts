import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { MovieService } from 'src/services/movie.service';
import { Genre, Movie } from 'src/models/movie';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns: string[] = ['poster', 'name', 'releaseDate', 'genres', 'overview'];
  displayedColumns: string[] = this.columns;

  genres: Genre[] = [];
  selectedGenreIds: Genre['id'][] = [];

  @ViewChild('moviesContainer') moviesContainer?: ElementRef<HTMLDivElement>;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  paginatedMovies: Movie[] = [];

  pageSize: number = 10;
  pageIndex: number = 0;
  defaultPageSizeOptions: number[] = [5, 10, 25, 50];
  pageSizeOptions = this.defaultPageSizeOptions;

  isCatalogLoading: boolean = true;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getGenres();
    this.getInitialMovies();
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(genres => this.genres = genres);
  }

  getInitialMovies(): void {
    this.movieService.getInitialMovies().subscribe(movies => {
      this.movies = movies;
      this.isCatalogLoading = false;
      this.filteredMovies = this.filterBySelectedGenres(this.movies);
      this.initPagination();
    });
  }

  search(query: string): void {
    this.scrollToTop();

    if (!query?.length) {
      this.getInitialMovies();
      return;
    }

    this.movieService.searchMovies(query).subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = this.filterBySelectedGenres(this.movies);
      this.initPagination();
    });
  }

  selectGenres(genres: Genre['id'][]): void {
    this.scrollToTop();

    this.selectedGenreIds = genres;
    this.filteredMovies = this.filterBySelectedGenres(this.movies);
    this.initPagination();
  }

  filterBySelectedGenres(movies: Movie[]): Movie[] {
    return this.selectedGenreIds?.length
      ? movies.filter(( { genre_ids }) => genre_ids?.some(id => this.selectedGenreIds.includes(id)))
      : movies;
  }

  selectColumns(columns: string[]): void {
    this.displayedColumns = columns;
  }

  setPaginatedMovies() {
    this.paginatedMovies = this.filteredMovies.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1))
  }

  initPagination() {
    this.pageIndex = 0;
    this.setPaginatedMovies()
    this.pageSizeOptions = this.defaultPageSizeOptions.filter(length => length <= this.filteredMovies.length);
  }

  handlePagination({ pageSize, pageIndex }: PageEvent) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.setPaginatedMovies();
    this.scrollToTop();
  }

  scrollToTop(): void {
    if (this.moviesContainer) this.moviesContainer.nativeElement.scroll({ top: 0, behavior: 'smooth' });
  }
}
