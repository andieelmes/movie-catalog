import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';
import { Genre, Movie } from '../movie';
import { PageEvent } from '@angular/material/paginator';

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
  paginatedMovies: Movie[] = [];

  pageSize: number = 10;
  pageIndex: number = 0;
  defaultPageSizeOptions: number[] = [5, 10, 25, 50];
  pageSizeOptions = this.defaultPageSizeOptions;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getGenres();
    this.getMovies();
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(genres => this.genres = genres);
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.resetPagination();
    });
  }

  search(query: string): void {
    this.movieService.getMovies(this.selectedGenreIds, query).subscribe(movies => {
      this.movies = movies;
      this.resetPagination();
    });
  }

  selectGenres(genres: Genre['id'][]): void {
    this.selectedGenreIds = genres;
    this.movieService.getMovies(this.selectedGenreIds).subscribe(movies => {
      this.movies = movies;
      this.resetPagination();
    });
  }

  selectColumns(columns: string[]): void {
    this.displayedColumns = columns;
  }

  setPaginatedMovies() {
    this.paginatedMovies = this.movies.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1))
  }

  resetPagination() {
    this.pageIndex = 0;
    this.setPaginatedMovies()
    this.pageSizeOptions = this.defaultPageSizeOptions.filter(length => length <= this.movies.length);
  }

  handlePagination({ pageIndex }: PageEvent) {
    this.pageIndex = pageIndex;
    this.setPaginatedMovies();

    if (this.moviesContainer) this.moviesContainer.nativeElement.scroll({ top: 0, behavior: 'smooth' });
  }
}
