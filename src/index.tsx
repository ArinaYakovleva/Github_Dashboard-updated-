import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import {AppContainer} from './components/App';
 import {Provider} from 'react-redux';
 import {store} from './store';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));