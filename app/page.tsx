'use client';

import * as React from 'react';
import { Inter } from '@next/font/google';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import relativeTime from 'dayjs/plugin/relativeTime';
import './globals.css';
import './page.module.css';
import type { TodoItem } from '@/types';
import Grid from '@mui/material/Grid';
import { Timeline } from '@mui/lab';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { Stack } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Chip, IconButton, MenuItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { CodeBlock, dracula } from 'react-code-blocks';
import { CreateForm } from '../components/form/TodoForm';
import { SUBSTANCES, USERS } from '@/constants';

dayjs.extend(relativeTime);

const inter = Inter({ subsets: ['latin'] });



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

export type CreateItemFn = (item: Omit<TodoItem, 'id'>) => Promise<TodoItem[]>;

const createTodo = async (item: TodoItem): Promise<TodoItem[]> => {
  await fetch(`/api/todo`, {
    method: 'POST',
    body: JSON.stringify({
      id: dayjs().format('YYYYMMDDHHmmssSSS'),
      time: item?.time || new Date(),
      text: item?.text,
      users: item?.users,
      substance: item?.substance
    } as TodoItem),
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

export default function Home() {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [latestTodo, setLatestTodo] = React.useState<TodoItem | null>(null);



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

  // return (
  //   <Dashboard />
  // );
  return (
    <Grid container height='calc(100vh - 30px)' width='calc(100vw - 30px)'>
      <Stack direction='column' justifyContent='start'>
        <h1 className='title'>Med Tracker</h1>

        <CreateForm
          substances={SUBSTANCES}
          users={USERS}
          createItem={createTodo}
        />


        <Typography variant='h6' component='h1' gutterBottom>
          Last Dose: {dayjs(latestTodo?.time).fromNow()}
        </Typography>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2
            }
          }}
        >
          {todos?.length !== 0 ? todos.map((todo) => (
            <TimelineItem key={todo.id} itemID={todo.id}>
              <TimelineOppositeContent color='text.secondary' flex={0}>
                {todo.time.toLocaleTimeString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Stack direction='row' spacing={1}>
                      <Typography>{todo.text}</Typography>
                      {todo.user1 ? <Chip size='small' label='User 1' /> : null}
                      {todo.user2 ? <Chip size='small' label='User 2' /> : null}
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                      <Stack direction='column' spacing={2}>
                        <Typography>
                          {todo.text}
                        </Typography>
                      </Stack>
                      <Stack direction='row'>
                        <IconButton aria-label='edit' color='primary'>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label='delete' disabled color='primary'>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </TimelineContent>
            </TimelineItem>
          )) : null}
        </Timeline>

        <p className='repo-link'>
          <a target='_blank' rel='noreferrer' href='https://github.com/matjahs/med-tracker'>
            View source on GitHub
          </a>
        </p>
      </Stack>
    </Grid>
  );
}
