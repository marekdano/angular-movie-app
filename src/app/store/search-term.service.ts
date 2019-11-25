import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SearchTermService {

  constructor() {}

  /**
   * We set the initial state in BehaviorSubject's constructor
   * Nobody outside the Store should have access to the BehaviorSubject because it has the write rights
   * Writing to state should be handled by specialized Store methods
   * Create one BehaviorSubject per store entity, for example if you have TodoGroups
   * create a new BehaviorSubject for it, as well as the observable$, and getters/setters
   */
  private readonly _searchTerm = new BehaviorSubject<string>(null);

  // Expose the observable$ part of the _searchTerm subject (read only stream)
  readonly searchTerm$ = this._searchTerm.asObservable();

  // the getter will return the last value emitted in _searchTerm subject
  get searchTerm(): string | null{
    return this._searchTerm.getValue();
  }


  // assigning a value to this.searchTerm will push it onto the observable
  // and down to all of its subsribers
  set searchTerm(value: string | null) {
    this._searchTerm.next(value);
  }
}
