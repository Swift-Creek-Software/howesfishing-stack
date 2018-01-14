import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import {fetchDataWithUser} from './actions/UserActions'
import multiClientMiddleware from './axiosClients'
import errorHandler from './middleware/errorHandler'
import reducers from './reducers'

import App from './component/App';
import './index.css';



const middlewares = [multiClientMiddleware(), thunk, errorHandler]

const getComposeEnhancers = () => {
	if (window.navigator.userAgent.includes('Chrome')) {
		return 	compose(
			applyMiddleware(...middlewares),
			// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	}
	return 	compose(applyMiddleware(...middlewares))
};


const store = createStore(
	reducers,
	getComposeEnhancers()
)

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

if(user) {
	store.dispatch(fetchDataWithUser(user))
}

injectTapEventPlugin();
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
  document.getElementById('root')
);
