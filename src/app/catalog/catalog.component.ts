import { Component, Input } from '@angular/core';

import { formatGenres } from 'src/helpers/genre';

import { Movie, Genre } from '../movie';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  @Input() movies: Movie[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() genres: Genre[] = [];

  formatGenres(genreIds: Genre['id'][]) {
    return formatGenres(genreIds, this.genres)
  }
}
