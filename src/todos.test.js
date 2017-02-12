import deepFreeze from 'deep-freeze';
import {todos, todoApp} from './todos';

it('adds todo', () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
});

it('toggles todo', () => {
  const stateBefore = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go shopping',
    completed: false
  }];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [{
    id: 0,
    text: 'Learn Redux',
    completed: false
  }, {
    id: 1,
    text: 'Go shopping',
    completed: true
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
});

it('visibility filter change', () => {
  const stateBefore = {
    todos: [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }, {
      id: 1,
      text: 'Go shopping',
      completed: true
    }],
    visibilityFilter: 'SHOW_ALL'
  };
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  };
  const stateAfter = {
    todos: [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }, {
      id: 1,
      text: 'Go shopping',
      completed: true
    }],
    visibilityFilter: 'SHOW_COMPLETED'
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todoApp(stateBefore, action)
  ).toEqual(stateAfter);
});
