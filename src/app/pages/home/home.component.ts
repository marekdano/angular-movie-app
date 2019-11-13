import { Component, OnInit } from '@angular/core';

import { SharedService } from '~app/shared/shared.service';
import { Movie } from '~app/shared/shared.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  moviesObservable: Observable<Movie[]>;
  
  constructor(
    private sharedService: SharedService, 
  ) { }

  ngOnInit() { }

  onSubmittedSearchForm(query: string) {
    this.moviesObservable = this.sharedService.getMoviesByQuery(query);
  }
}
