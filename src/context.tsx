import React from 'react';

type DispatchContext = React.Dispatch<Action>;

type TodoItem = {
    id: string;
    title: string;
    isDone?: boolean;
};

type State = {
    todos?: TodoItem[],
    filter: 'all' | 'undone',
    doneCount: number
};

type Action = {
    type: string,
    payload: any
};

const AppDispatch = React.createContext<DispatchContext>((arg: Action) => null);

const reducer = (state: State, action: Action): State => {

    const addItem = ({ id, title }: TodoItem): State => {
        const { todos } = state;
        return {
            ...state,
            todos: [
                ...todos ? todos : [],
                {
                    id,
                    title
                }
            ]
        };
    };

    const deleteItem = ({ id }: TodoItem): State => {
        const { todos, doneCount } = state;
        if (!todos) return state;
        const index = todos.findIndex(el => el.id === id);
        if (index < 0) return state;
        const { isDone } = todos[index];
        return {
            ...state,
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1)
            ],
            doneCount: isDone ? doneCount - 1 : doneCount
        };
    };

    const markItem = ({ id, isDone }: TodoItem): State => {
        const { todos, doneCount } = state;
        if (!todos) return state;
        const index = todos.findIndex(el => el.id === id);
        if (index < 0) return state;
        const item = todos[index];
        if (isDone === item.isDone) return state;
        return {
            ...state,
            todos: [
                ...todos.slice(0, index),
                {
                    ...item,
                    isDone
                },
                ...todos.slice(index + 1)
            ],
            doneCount: doneCount + (isDone ? 1 : -1)
        };
    };

    const { type, payload } = action;
    switch (type) {
        case 'ADD_ITEM':
            return addItem(payload);
        case 'DELETE_ITEM':
            return deleteItem(payload);
        case 'MARK_ITEM':
            return markItem(payload);
        case 'SET_FILTER':
            return {
                ...state,
                filter: payload
            }
        default:
            return state;
    }
};

export type { TodoItem };
export { AppDispatch, reducer };
