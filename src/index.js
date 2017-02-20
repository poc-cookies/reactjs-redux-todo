import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {TodoApp, store} from './todos';

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
