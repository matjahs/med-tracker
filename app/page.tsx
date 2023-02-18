"use client";

import * as React from 'react';
import { Inter } from '@next/font/google';
import Todo from '@/components/Todo';

import './globals.css';
import type { TodoItem } from '@/global';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [text, setText] = React.useState('');
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const incompleteTodos = todos.filter(todo => !todo.status);
  const completeTodos = todos.filter(todo => todo.status);

  const fetchTodos = async () => {
    const res = await fetch(`/api/todo`, { method: 'GET' });
    const data = await res.json();
    setTodos(data);
  }

  const createTodo = async () => {
    await fetch(`/api/todo`, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return fetchTodos();
  }

  const updateTodo = async (todo: TodoItem) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return fetchTodos();
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    return fetchTodos();
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('form submitted');
          createTodo();
        }}
      >
        <input
          type="text"
          name="text"
          autoFocus
          aria-label="Add todo"
          className="input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>

      <div id="incomplete" className="todos">
        {incompleteTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>

      {completeTodos.length > 0 && (
        <div id="complete" className="todos todos-done">
          {completeTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      )}

      <p className="repo-link">
        <a target="_blank" rel="noreferrer" href="https://github.com/matjahs/med-tracker">
          View source on GitHub
        </a>
      </p>
    </main>
  )
}
