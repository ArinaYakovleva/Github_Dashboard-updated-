export const FETCH_REPOSITORIES = 'FETCH_REPOSITORIES'
export const FETCH_CONTRIBUTORS = 'FETCH_CONTRIBUTORS'
export const FETCH_LANGUAGES = 'FETCH_LANGUAGES'

type FetchRepositories = {
    type: typeof FETCH_REPOSITORIES,
    payload: any
}

type FetchContributors = {
    type: typeof FETCH_CONTRIBUTORS,
    payload: any
}

type FetchLanguages = {
    type: typeof FETCH_LANGUAGES,
    payload: any
}


export const reposFetchData = (url: string) => {
    return (dispatch: any) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                
                return response;
            })
            .then(response => {
                return response.json(); 
            })
            .then(repos => {
                dispatch(fetchReposAction(repos));
            })
            .catch(err => console.log("ERROR",err));     
    }
};

export const contributorsFetchData = (url: string) => {
    return (dispatch: any) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                
                return response;
            })
            .then(response => {
                return response.json(); 
            })
            .then(contributors => {
                dispatch(fetchContributorsAction(contributors));
            })
            .catch(err => console.log("ERROR",err));     
    }
};

export const languagesFetchData = (url: string) => {
    return (dispatch: any) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                
                return response;
            })
            .then(response => {
                return response.json(); 
            })
            .then(languages => {
                dispatch(fetchLanguagesData(languages));
            })
            .catch(err => console.log("ERROR",err));     
    }
}

export const fetchReposAction = (repos: any): FetchRepositories => {
    return {
        type: FETCH_REPOSITORIES,
        payload: repos
    }
}
export const fetchContributorsAction = (contributors: any): FetchContributors => {
    return {
        type: FETCH_CONTRIBUTORS,
        payload: contributors
    }
}

export const fetchLanguagesData = (languages: any): FetchLanguages => {
    return {
        type: FETCH_LANGUAGES,
        payload: languages
    }
}