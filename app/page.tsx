'use client';

import * as React from 'react';
import { Inter } from '@next/font/google';

import './globals.css';
import './page.module.css';
import type { TodoItem } from '@/types';
import { formatTime } from '@/lib/utils';
import { formatDistance } from 'date-fns';
import Todo from '@/components/todo/Todo';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [text, setText] = React.useState('');
  const [time, setTime] = React.useState<string>(formatTime(new Date()));
  const [users, setUsers] = React.useState<Set<string>>(new Set([]));
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [latestTodo, setLatestTodo] = React.useState<TodoItem | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const fetchTodos = async (): Promise<TodoItem[]> => {
    const res = await fetch(`/api/todo`, { method: 'GET' });
    const data = await res.json();

    for(const d of data) {
      d.time = new Date(d.time);
    }

    return data.sort((a: TodoItem, b: TodoItem) => {
      return a.time.getTime() - b.time.getTime();
    }).reverse();
  };

  const createTodo = async () => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);

    await fetch(`/api/todo`, {
      method: 'POST',
      body: JSON.stringify({ time: date, text, users: Array.from(users) }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return fetchTodos();
  };

  const updateTodo = async (todo: TodoItem) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    return fetchTodos();
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const user = e.currentTarget.getAttribute('data-user');

    if(!user) return;

    const newUsers = new Set(users);

    // If the user is checked and not in the set, add them
    if(isChecked && !users.has(user)) {
      newUsers.add(user);
    }
    // If the user is not checked and in the set, remove them
    if(!isChecked && users.has(user)) {
      newUsers.delete(user);
    }

    if(newUsers === users) return;

    setUsers(newUsers);
  };

  React.useEffect(() => {
    const fn = async () => {
      const todos = await fetchTodos();
      if(!todos || todos.length === 0) {
        setTodos([]);
        setLatestTodo(null);
        return;
      }
      setTodos(todos);
      setLatestTodo(todos[0]);
    };
    fn()
      .catch((error) => {
        console.error(error);
        setTodos([]);
        setLatestTodo(null);
      });
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if(!Boolean(isEditing)) {
        console.log('Updating time, isEditing: ', isEditing);
        setTime(formatTime(new Date()));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isEditing]);

  // return (
  //   <Dashboard />
  // );
  return (
    <main className='container'>
      <h1 className='title'>Med Tracker</h1>
      <section>
        <div>
          <p style={{ display: 'inline-block' }}>Most recent:</p>
          {' '}
          <span className='latest-todo' style={{ display: 'inline-block' }}>
            {latestTodo ? formatDistance(latestTodo.time, new Date(), { addSuffix: true }) : 'No todos'}
          </span>
        </div>
      </section>
      <form
        className='todo-form'
        onSubmit={(e) => {
          e.preventDefault();
          createTodo()
            .catch((error) => console.error(error));
        }}
      >
        <input
          id='todo-form-time'
          type='time'
          name='time'
          autoFocus
          aria-label='todo-time'
          className='input todo-form-time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onFocus={() => setIsEditing(true)}
        />
        <input
          id='todo-form-text'
          type='text'
          name='text'
          autoFocus
          aria-label='todo-text'
          className='input todo-form-text'
          placeholder='Optional note'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className='input-users'>

          <label className='input-label'>
            <input
              id='todo-form-user-1'
              type='checkbox'
              name='user-1'
              aria-label='todo-user-1'
              data-user='user-1'
              className='input-checkbox'
              onChange={handleUserChange}
            />
            <span className='input-label-text'>user-1</span>
          </label>

          <label className='input-label'>
            <input
              id='todo-form-user-2'
              type='checkbox'
              name='user-2'
              aria-label='todo-user-2'
              data-user='user-2'
              className='input-checkbox'
              onChange={handleUserChange}
            />
            <span className='input-label-text'>user-2</span>
          </label>
        </div>

      </form>

      <div id='complete' className='todos'>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>

      <p className='repo-link'>
        <a target='_blank' rel='noreferrer' href='https://github.com/matjahs/med-tracker'>
          View source on GitHub
        </a>
      </p>
    </main>
  );
}
