import {combineReducers} from 'redux';
import {reposFetchReducer, contributorsFetchReducer, languagesFetchReducer} from './repos';

export const rootReducer = combineReducers({
    reposFetchReducer,
    contributorsFetchReducer,
    languagesFetchReducer
});
