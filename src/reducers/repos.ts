import { FETCH_REPOSITORIES, FETCH_CONTRIBUTORS, FETCH_LANGUAGES } from '../actions/actions'

type InitialStateType = {
    entries: any[],
    loading: boolean
}
const initialState:InitialStateType = {
    entries: [],
    loading: false,
};

export const reposFetchReducer = (state = initialState, action: any) => {
    switch(action.type){
        case FETCH_REPOSITORIES:
            return{
                ...state,
                entries: action.payload
            
            }
        default:
            return state
    }
}

export const contributorsFetchReducer = (state = initialState, action: any) => {
    switch(action.type){
        case FETCH_CONTRIBUTORS:
            return{
                ...state,
                entries: action.payload
            
            }
        default:
            return state
    }
}

export const languagesFetchReducer = (state = initialState, action: any) => {
    switch(action.type){
        case FETCH_LANGUAGES:
            return{
                ...state,
                entries: action.payload
            
            }
        default:
            return state
    }
}
