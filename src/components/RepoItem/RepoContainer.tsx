import * as React from "react";
import { connect } from 'react-redux';
import {RepoItem} from './RepoItem'
import { contributorsFetchData, languagesFetchData } from '../../actions'

interface Props{
    contributorsFetchData: (url: string) => void,
    languagesFetchData: (url: string) => void,
    contributors: any
    repos:any
    url: string
    name: string
    languages: any
}

interface State{
    languagesUrl: string
}

class RepoItemContainerClass extends React.Component<Props, State>{
     constructor(props: Props){
         super(props)
         this.state = {
             languagesUrl : this.props.name && this.props.repos && this.props.repos.items ? this.props.repos.items.find((item: any )=> item.owner.login === this.props.name).languages_url : null
         }
     }
    async componentDidMount(){
        await this.props.contributorsFetchData(this.props.url);
        if(this.state.languagesUrl){
            await this.props.languagesFetchData(this.state.languagesUrl)
        }    
    }

    async componentDidUpdate(){
        await this.props.contributorsFetchData(this.props.url);
        if(this.state.languagesUrl){
            await this.props.languagesFetchData(this.state.languagesUrl)
        }    
    }

    render(){
        const { contributors, repos, name, languages } = this.props
        return(
            <RepoItem contributors={contributors} languages={languages}
                    repos={repos} name={name}/>
        )
      }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        contributorsFetchData: async (url: string) => await dispatch(contributorsFetchData(url)),
        languagesFetchData: async (url: string) => await dispatch(languagesFetchData(url)),
    }
}

const mapStateToProps = (state: any) =>{  
    return {
        contributors:  state && state.contributorsFetchReducer ? state.contributorsFetchReducer.entries : null,
        languages:   state && state.languagesFetchReducer ? state.languagesFetchReducer.entries : null,
    };
}

export const RepoItemContainer = connect(mapStateToProps, mapDispatchToProps)(RepoItemContainerClass)