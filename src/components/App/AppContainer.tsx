import * as React from "react";
import { connect } from 'react-redux';
import {App} from './App'
import { reposFetchData } from '../../actions'
import {AppComponentProps} from './App.interface'

 class AppContainerClass extends React.Component<AppComponentProps>{
    async componentDidMount(){
        await this.props.reposFetchData('https://api.github.com/search/repositories?q=stars:%3E=10000&sort=stars&order=desc');
  
    }

    async componentDidUpdate(){
        await this.props.reposFetchData('https://api.github.com/search/repositories?q=stars:%3E=10000&sort=stars&order=desc');
    }

    render(){
        const { repos, searchText } = this.props
        return(
            <App repos={repos} searchText={searchText} />
        )
      }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        reposFetchData: async (url: string) => await dispatch(reposFetchData(url)),
    }
}

const mapStateToProps = (state: any) =>{  
    return {
        repos: state.reposFetchReducer.entries,
    };
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainerClass)