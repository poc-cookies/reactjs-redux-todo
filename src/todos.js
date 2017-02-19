import {combineReducers, createStore} from 'redux';
import React, {Component} from 'react';

const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state;

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

/**
 const combineReducers = (reducersMap = {}) => {
  const keys = Object.keys(reducersMap);
  return (state = {}, action) => {
    return keys.reduce((acc, key) => {
      acc[key] = reducersMap[key](state[key], action);
      return acc;
    }, {});
  };
};
 */

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

/**
 const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
 */

const store = createStore(todoApp);

let nextTodoId = 0;

class TodoApp extends Component {
  render () {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }}/>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: this.input.value
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}
                onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: todo.id
                  });
                }}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none'
                }}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export {
  todos,
  todoApp,
  TodoApp,
  store // Just to have tests passed (Can't render component on not-existing element). Will be deleted right after refactoring of component.
};
