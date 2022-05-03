export const mockGenres = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 878,
    name: "Science Fiction"
  }
]

const basicMovie = {
  homepage: "http://www.intothespiderverse.movie",
  id: 324857,
  overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
  production_companies: [
    { name: "Columbia Pictures" },
    { name: "Marvel Entertainment" },
    { name: "Lord Miller Productions" },
    { name: "Pascal Pictures" },
    { name: "Sony Pictures Animation" },
    { name: "Avi Arad Productions" }
  ],
  production_countries: [
    { name: "United States of America" }
  ],
  release_date: "2018-12-06",
  runtime: 117,
  tagline: "More than one wears the mask.",
  title: "Spider-Man: Into the Spider-Verse",
  poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
}

export const mockMovie = { ...basicMovie, genres: mockGenres };

const mockInitialMovie = { ...basicMovie, genre_ids: mockGenres.map(genre => genre.id)}

export const mockInitialMovies = [
  {
    ...mockInitialMovie,
    genre_ids: [],
  },
  mockInitialMovie
]

export const mockSearchedMovies = Array(12).fill(null).map((_, index) => ({...mockInitialMovie, id: mockInitialMovie.id + index }))

export const mockDisplayedGenres = 'Action, Adventure, Animation, Science Fiction';

export const mockDisplayedProductionCompanies = 'Columbia Pictures, Marvel Entertainment, Lord Miller Productions, Pascal Pictures, Sony Pictures Animation, Avi Arad Productions';

export const mockDisplayedProductionCountries = 'United States of America';
