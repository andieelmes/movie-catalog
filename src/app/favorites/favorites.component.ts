import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FavoriteService, FavoriteMovie } from 'src/services/favorite.service';
import { Tag } from 'src/models/favorite';
import nonNullable from 'src/helpers/non-nullable';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  data: FavoriteMovie[] = [];

  tags: Tag[] = [];
  tagsSelect = new FormControl();

  movies: FavoriteMovie[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getData();
    this.getTags();
    this.handleTagSelect();
  }

  getData(): void {
    this.data = Object.values(this.favoriteService.getData()).filter(nonNullable);
  }

  getTags(): void {
    const tags = [...new Set(this.data.map(movie => movie.tags).flat())];
    this.tags = tags;
  }

  handleTagSelect() {
    this.tagsSelect.valueChanges.subscribe(selectedTags => {
      this.movies = this.data.filter(({ tags }) => selectedTags.some((tag: Tag) => tags.includes(tag)));
    });
  }
}
