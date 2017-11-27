import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import Application from './components/Application/Application.jsx';
import createStore from './create-store.jsx'
import registerServiceWorker from './registerServiceWorker';

const store = createStore()

ReactDOM.render(
	<Application store={store} />, 
	document.getElementById('root')
);

registerServiceWorker();
