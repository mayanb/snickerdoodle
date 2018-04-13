import React from 'react';
import ReactDOM from 'react-dom';
import './styles/oldstyles/styles.css';
import Application from './components/Application/Application.jsx';
import createStore from './create-store.jsx'
import registerServiceWorker from './registerServiceWorker';
import "babel-polyfill";
import './styles/override_vars.css'

const store = createStore()

ReactDOM.render(
	<Application store={store} />, 
	document.getElementById('root')
);

registerServiceWorker();
