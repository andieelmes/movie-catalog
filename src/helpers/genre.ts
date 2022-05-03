import { Genre } from 'src/models/movie';

export function formatGenres(genreIds: Genre['id'][], genres: Genre[]) {
  return genreIds.map(genreId => genres.find(({ id }) => id === genreId)?.name).filter(Boolean).join(', ');
}
