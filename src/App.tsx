import React, { memo, useEffect, useCallback, useReducer} from 'react';

import type {TodoItem} from './context';
import {AppDispatch, reducer} from './context';
import Item from './Item';

type Props = {
  todos?: TodoItem[];
};

const App: React.FC<Props> = (props) => {
  const [{ todos, filter, doneCount }, dispatch] = useReducer(reducer, { todos: props.todos, filter: 'all', doneCount: 0 });

  useEffect(() => {
    if (todos && todos.length === 0 && filter !== 'all') {
      dispatch({
        type: 'SET_FILTER',
        payload: 'all'
      })
    }
  });

  const handleAddClick = useCallback(() => {
    const title = prompt('What to do?');
    if (!title) {
      return;
    };
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: Date.now().toString(),
        title
      }
    });
  }, []);

  const handleFilterClick = useCallback(() => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter === 'all' ? 'undone' : 'all'
    })
  }, [filter]);

  return (
    <AppDispatch.Provider value={dispatch}>
      <div>
        <p>{`${doneCount} / ${todos ? todos.length : 0}`}</p>
        <ul>
          {todos
            ?.filter((todo: TodoItem) => (filter === 'undone' ? !todo.isDone : true))
            ?.map((todo: TodoItem) => {
              return <div key={`${todo.id}`}>
                {
                  <Item todo={todo} />
                }
              </div>
            })
          }
        </ul>
        <button onClick={handleAddClick}>{'Add'}</button>
        <button onClick={handleFilterClick}>
          {`Show ${filter === 'all' ? 'undone' : 'all'} todos`}
        </button>
        <ExpensiveTree />
      </div>
    </AppDispatch.Provider>
  );
};

const ExpensiveTree = memo(() => {
  let now = performance.now();

  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 1000ms
  }

  return null;
});

export default App;
