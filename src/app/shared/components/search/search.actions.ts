import { Action } from '@ngrx/store';

export enum SearchTermActionTypes {
  SetSearchTerm = 'Set Search Term'
}

export class SearchTermAction implements Action {
  type: string;
  payload: {
    searchTerm: string
  };
}

export class SetSearchTerm implements Action {
  readonly type = SearchTermActionTypes.SetSearchTerm;

  constructor(readonly payload: {searchTerm: string}) { }
}
