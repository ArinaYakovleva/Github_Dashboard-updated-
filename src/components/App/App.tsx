import * as React from "react";
import {Route} from 'react-router-dom'
import styles from './App.module.scss';
import {AppComponentProps} from './App.interface';
import { Header } from '../Header'
import { ReposList } from '../ReposList'
import {RepoItemContainer} from '../RepoItem'
import {Provider} from 'react-redux';
import { store } from '../../store'

interface Props{
    repos: any
}

interface State{
    searchText: string
    currentName: string
    url: string
}

export class App extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            searchText: '',
            currentName: '',
            url: ''
        }
        this.onSetText = this.onSetText.bind(this)
    }
    onSetText =(value:string) => {
        this.setState({
            searchText: value
        })
    }

    onSetCurrentName = (url: string, name: string) => {
        this.setState({
            url,
            currentName: name
        })
    }
    render() {
        const { repos } = this.props
        return (
                <div>
                    <Header onSetText={this.onSetText} showForm={this.state.currentName ? false : true}/>
                    <Route exact path="/" component={() => {
                        return(
                            <ReposList onSetCurrentName={this.onSetCurrentName} repos={repos} searchText={this.state.searchText}/>
                        )
                    }}/>
                    <Route exact path={`/${this.state.currentName}` }component={() => {
                        return(
                            <RepoItemContainer repos={repos} url={this.state.url} name={this.state.currentName}/>
                        )
                    }}/>
                </div>


        );
    }
}

