import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {TodoApp, todoApp} from './todos';

ReactDOM.render(
  <TodoApp store={createStore(todoApp)}/>,
  document.getElementById('root')
);
