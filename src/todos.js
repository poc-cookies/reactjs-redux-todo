import {combineReducers} from 'redux';
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

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) return <span>{children}</span>;

  return (
    <a href=""
       onClick={e => {
         e.preventDefault();
         onClick();
       }}>
      {children}
    </a>
  );
};

class FilterLink extends Component {

  componentDidMount () {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const props = this.props;
    const {store} = this.context;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: props.filter
        })}>
        {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object
};

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />)}
  </ul>
);

let nextTodoId = 0;

const AddTodo = (props, {store}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }}/>
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        });
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo.contextTypes = {
  store: React.PropTypes.object
};

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {' '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {' '}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

class VisibleTodoList extends Component {

  componentDidMount () {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render () {
    const {store} = this.context;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })}
      />
    );
  }
}
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
};

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export {
  todos,
  todoApp,
  TodoApp
};
