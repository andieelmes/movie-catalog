import { TestBed } from '@angular/core/testing';

import { FavoriteService, FavoriteMovie, storageName } from './favorite.service';

const favoriteMovie: FavoriteMovie = {
  id: 1,
  title: 'Favorite movie',
  tags: ['favorite'],
}

describe('FavoriteService', () => {
  let service: FavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteService);
    localStorage.clear();
  });

  it('should get empty data on init', () => {
    expect(service.getData()).toEqual({});
  });

  it('should add tags of new movie to local storage', () => {
    service.addTag(favoriteMovie.id, favoriteMovie.title, favoriteMovie.tags[0]);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }))
  });

  it('should keep tags of movies unique', () => {
    service.addTag(favoriteMovie.id, favoriteMovie.title, favoriteMovie.tags[0]);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }))

    service.addTag(favoriteMovie.id, favoriteMovie.title, favoriteMovie.tags[0]);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }))
  });

  it('should return tags of a movie', () => {
    service.addTag(favoriteMovie.id, favoriteMovie.title, favoriteMovie.tags[0]);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }))

    const tags = service.getTags(favoriteMovie.id);
    expect(tags).toEqual(favoriteMovie.tags)
  });

  it('should remove tags of a movie', () => {
    service.addTag(favoriteMovie.id, favoriteMovie.title, favoriteMovie.tags[0]);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }))

    service.addTag(favoriteMovie.id, favoriteMovie.title, 'new');
    expect(localStorage.getItem(storageName))
      .toEqual(JSON.stringify({ [String(favoriteMovie.id)]: { ...favoriteMovie, tags: [favoriteMovie.tags[0], 'new']} }))

    const withRemovedNewTag = service.removeTag(favoriteMovie.id, 'new');
    expect(withRemovedNewTag).toEqual(favoriteMovie.tags);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({ [String(favoriteMovie.id)]: favoriteMovie }));

    const withRemovedAllTags = service.removeTag(favoriteMovie.id, favoriteMovie.tags[0]);
    expect(withRemovedAllTags.length).toEqual(0);
    expect(localStorage.getItem(storageName)).toEqual(JSON.stringify({}));
  });
});
