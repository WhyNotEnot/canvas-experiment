import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store';

const initialFirst = () => {
	let storedData = localStorage.getItem('canvasAppFirst');
	if(storedData) {
		return JSON.parse(storedData)
	} else {
		return [[15, 25, 35, 34, 54, 62,110,70,92,32,74], [77, 24, 88, 45, 54, 45,100,120,122,32,77]];
	}
} 
const initialSecond = () => {
	let storedData = localStorage.getItem('canvasAppSecond');
	if(storedData) {
		return JSON.parse(storedData)
	} else {
		return [[84, 37, 34, 21, 96, 55,20,70,12,32,85]];
	}
} 

const initialState = {
	firstCanvas: initialFirst,
	secondCanvas: initialSecond,
}

ReactDOM.render(
 <Provider store={configureStore(initialState)}>
  <App />
 </Provider>,
 document.getElementById('root')
);