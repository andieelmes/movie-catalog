import { Component, OnInit, Input } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { FavoriteService } from '../favorite.service';
import { Tag } from '../favorite';
import { Movie } from '../movie';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() id: Movie['id'];
  @Input() title: Movie['title'];

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  tags: Tag[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tags = this.favoriteService.getTags(this.id);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags = this.favoriteService.addTag(this.id, this.title, value);
    }

    event.chipInput!.clear();
  }

  remove(tagToRemove: Tag): void {
    this.tags = this.favoriteService.removeTag(this.id, tagToRemove);
  }
}
