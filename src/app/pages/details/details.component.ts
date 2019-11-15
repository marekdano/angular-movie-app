import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Movie } from '~app/shared/shared.interface';
import { SharedService } from '~app/shared/shared.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie$: Observable<Movie>;

  public get urlParamId(): string {
    return this.activeRoute.snapshot.paramMap.get('id');
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.onMovieDetails(this.urlParamId)
  }

  onMovieDetails(id: string) {
    this.movie$ = this.sharedService.getMovieById(id);
  }
}
