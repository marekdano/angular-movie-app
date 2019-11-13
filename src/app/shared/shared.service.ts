import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { MovieApiResponse, Movie } from './shared.interface'

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
  })
};

const API_KEY = '4a3b711b';
const DEFAULT_PLACEHOLDER_IMAGE = '/assets/placeholder-image.png';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = `https://www.omdbapi.com?apikey=${API_KEY}`;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) { 
    this.handleError = httpErrorHandler.createHandleError('SharedService');
  }

  getMoviesByQuery(query: string): Observable<Movie[]> {
    return this.http
      .get(`${this.baseUrl}&s=${query}`, httpOptions)
      .pipe(
        map(response => response['Search'] as MovieApiResponse[]),
        map((items: MovieApiResponse[]) => (
          items.map(item => (
            {
              id: item.imdbID,
              title: item.Title,
              year: item.Year,
              type: item.Type,
              poster: item.Poster !== 'N/A' ? item.Poster : DEFAULT_PLACEHOLDER_IMAGE,
            }
          )) as Movie[]
        )),
        catchError(this.handleError('getMovies', null))
      );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http
      .get(`${this.baseUrl}&i=${id}`, httpOptions)
      .pipe(
        map((item: MovieApiResponse) => (
          {
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            type: item.Type,
            poster: item.Poster !== 'N/A' ? item.Poster : DEFAULT_PLACEHOLDER_IMAGE,
            rated: item.Rated,
            released: item.Released, 
            runtime: item.Runtime,
            director: item.Director,
            writer: item.Writer,
            actors: item.Actors,
            plot: item.Plot,
            language: item.Language,
            country: item.Country,
            awards: item.Awards,
            ratings: item.Ratings.map(rating => ({ source: rating.Source, value: rating.Value })),
            imdbRating: item.imdbRating,
            imdbVotes: item.imdbVotes,
            boxOffice: item.BoxOffice,
            production: item.Production,
            website: item.Website,
          } as Movie
        )),
        catchError(this.handleError('getMovies', null))
      );
  }
}
