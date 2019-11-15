export interface MovieApiResponse {
  Response: string,
  Error?: string,
  Search?: MovieApi[],
}

export interface MovieApi {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
  Rated: string,
  Released: string, //format "22 Jul 2016"
  Runtime: string, //format "88 min"
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Ratings: {
    Source: string,
    Value: string
  }[],
  imdbRating: string,
  imdbVotes: string,
  BoxOffice: string,
  Production: string,
  Website: string,
}

export interface Movie {
  id: string,
  title: string,
  year: string,
  type: string,
  poster: string,
  rated?: string,
  released?: string, 
  runtime?: string,
  director?: string,
  writer?: string,
  actors?: string,
  plot?: string,
  language?: string,
  country?: string,
  awards?: string,
  ratings?: {
    source: string,
    value: string
  }[],
  imdbRating?: string,
  imdbVotes?: string,
  boxOffice?: string,
  production?: string,
  website?: string,
} 