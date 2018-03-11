import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import Board from './components/Board'
import { configStore } from './store'
import { connect } from './socket'
import registerServiceWorker from './registerServiceWorker';

const store = configStore()
const root = (<Provider store={store}><Board content={[]}/></Provider>)
const rootElement = document.getElementById('root')

ReactDOM.render(root, rootElement);
registerServiceWorker();
connect(store)
window.name = window.name ? window.name : window.name = Math.random().toString(36).substr(2, 9);