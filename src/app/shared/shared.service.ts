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

@Injectable()
export class SharedService {
  baseUrl = 'https://www.omdbapi.com?apikey=4a3b711b';
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
              poster: item.Poster, 
            }
          )) as Movie[]
        )),
        catchError(this.handleError('getMovies', null))
      );
  }
}
