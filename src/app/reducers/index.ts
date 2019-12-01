
import { ActionReducerMap, MetaReducer, Action} from '@ngrx/store';
import { SearchTermActionTypes, SearchTermAction } from '~app/shared/components/search/search.actions';

export interface SearchTermState {
  searchTerm: string;
}

const initialSearchTermState: SearchTermState = {
  searchTerm: ''
};

export interface AppState {
  searchTerm: SearchTermState;
}

export function searchTermReducer(state: SearchTermState = initialSearchTermState, action: SearchTermAction): SearchTermState {
  switch (action.type) {
    case SearchTermActionTypes.SetSearchTerm:
      return {
        searchTerm: action.payload.searchTerm
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  searchTerm: searchTermReducer,
};

export const selectSearchTerm = (state: AppState): string => state.searchTerm.searchTerm;
