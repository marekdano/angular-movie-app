import { Component, OnInit } from '@angular/core';

import { SharedService } from '~app/shared/shared.service';
import { Movie, MovieApiResponse, MovieApi } from '~app/shared/shared.interface';
import { DEFAULT_PLACEHOLDER_IMAGE } from '~app/shared/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  movies$: Observable<Movie[]> = null;

  constructor(
    private sharedService: SharedService, 
  ) { }

  ngOnInit() { }

  onSubmittedSearchForm(query: string) {
    this.movies$ = this.sharedService.getMoviesByQuery(query)
      .pipe(
        map((apiResponse: MovieApiResponse) => apiResponse['Response'] === 'True' ? apiResponse['Search'] : []),
        map((items: MovieApi[]) => (
          items.map(item => (
            {
              id: item.imdbID,
              title: item.Title,
              year: item.Year,
              type: item.Type,
              poster: item.Poster !== 'N/A' ? item.Poster : DEFAULT_PLACEHOLDER_IMAGE,
            }
          )) as Movie[]
        ))
      )
  }
}
