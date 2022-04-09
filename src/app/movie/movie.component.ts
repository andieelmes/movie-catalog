import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';

import { Genre, MovieInDetail } from '../movie';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie?: MovieInDetail;

  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(movie =>  this.movie = movie);
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe(genres => this.genres = genres);
  }

  formatGenres(genres: Genre[]) {
    return genres.map(genre => genre.name).join(', ');
  }

  formatListElement(element: string, last: Boolean) {
    return `${element}${last ? '' : ', '}`
  }

  formatDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours ? `${hours} hours` :'' } ${minutes} minutes`
  }
}
