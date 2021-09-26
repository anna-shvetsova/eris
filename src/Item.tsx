import React, { memo, Fragment, useContext } from 'react';

import type {TodoItem} from './context';
import {AppDispatch} from './context';
  
interface ItemProps {
    todo: TodoItem
};
  
const Item: React.FC<ItemProps> = ({ todo }) => {
    const dispatch = useContext(AppDispatch);
  
    const { id, title, isDone } = todo;
  
    const handleMarkClick = () => {
      dispatch({ type: 'MARK_ITEM', payload: { id, isDone: !isDone } });
    };
  
    const handleDeleteClick = () => {
      dispatch({ type: 'DELETE_ITEM', payload: { id } });
    };
  
    return (
      <Fragment>
        <p>{`${isDone ? '✅ ' : ''}${title}`}</p>
        <button onClick={handleMarkClick}>
          {isDone ? 'Undone' : 'Done'}
        </button>
        <button onClick={handleDeleteClick}>{'Delete'}</button>
      </Fragment>
    )
  };

  export default memo(Item);

  