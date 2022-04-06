import { Component, Input } from '@angular/core';

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

  formatGenres(genres: Genre['id'][]) {
    return genres.map(genreId => this.genres.find(({ id }) => id === genreId)?.name).filter(Boolean).join(', ');
  }
}
