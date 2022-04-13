import { Injectable } from '@angular/core';

import localStorage from 'src/helpers/local-storage';

import { Tag } from 'src/models/favorite';
import { Movie } from 'src/models/movie';

export interface FavoriteMovie {
  id: Movie['id'],
  title: Movie['title'],
  tags: Tag[],
}

interface FavoriteMovieStorage {
  [propName: string]: FavoriteMovie | null,
}

export const storageName = `_favorite_movies`

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  getData(): FavoriteMovieStorage {
    const rawData = localStorage.get(storageName);
    if (!rawData) return {};

    try {
      return JSON.parse(rawData);
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  setData(data: FavoriteMovieStorage): void {
    localStorage.set(storageName, JSON.stringify(data));
  }

  addTag(id: FavoriteMovie['id'], title: FavoriteMovie['title'], tag: Tag): Tag[] {
    const data = this.getData();
    const movie = data[id!] || { id, title, tags: [] };
    const updatedTags = [...new Set([...movie.tags, tag])];
    this.setData({ ...data, [id!]: { ...movie, tags: updatedTags }});

    return updatedTags;
  }

  getTags(id: Movie['id']): Tag[] {
    const data = this.getData()[id!];
    return data?.tags || [];
  }

  removeTag(id: Movie['id'], tag: Tag): Tag[] {
    const data = this.getData();
    const movie = data[id!];

    if (!movie) return [];

    const updatedTags = movie.tags.filter(prevTag => prevTag !== tag);

    if (updatedTags.length === 0) {
      const rest = Object.fromEntries(Object.entries(data).filter(entry => String(id) !== entry[0]));
      this.setData(rest);
      return updatedTags;
    }

    this.setData({ ...data, [id!]: { ...movie, tags: updatedTags }});
    return updatedTags;
  }
}
