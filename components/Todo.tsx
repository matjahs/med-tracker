"use client";

import type { TodoItem } from '@/global';
import * as React from 'react';

export interface TodoProps {
  todo: TodoItem;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: TodoItem) => void;
}

const Todo = ({ todo, deleteTodo, updateTodo }: TodoProps) => {
  return (
    <div className={`todo ${todo.status ? 'completed' : ''}`}>
      <button
        className="checkbox"
        onClick={() => updateTodo({...todo, status: !Boolean(todo.status)})}
      >
        {todo.status ? '✓' : ''}
      </button>

      <span className="text">{todo.text}</span>

      <input type="hidden" name="id" value={todo.id} />
      <button className="delete" onClick={() => deleteTodo(todo.id)}>
        x
      </button>
    </div>
  );
}

export default Todo;
