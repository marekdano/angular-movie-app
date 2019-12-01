import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { AppState, selectSearchTerm } from '~app/reducers';
import { SetSearchTerm } from './search.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
// import { SearchTermService } from '~app/store/search-term.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchTermStateSubscription: Subscription;

  @Output() searchTerm = new EventEmitter<string>()

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      term: ['', Validators.required]
    })

    let searchTermValue = null;

    this.searchTermStateSubscription = this.store
      .pipe(
        select(selectSearchTerm),
        map(value => searchTermValue = value)
      )
      .subscribe()

    if (searchTermValue) {
      this.searchForm.patchValue({term: searchTermValue})
      this.searchTerm.emit(this.searchForm.value.term)
    }
  }

  ngOnDestroy() {
    this.searchTermStateSubscription.unsubscribe();
  }

  onSubmit() {
    const termValue = this.searchForm.value.term as string
    if (termValue) {
      this.store.dispatch(new SetSearchTerm({searchTerm: termValue}));
      this.searchTerm.emit(this.searchForm.value.term)
    }
  }
}
