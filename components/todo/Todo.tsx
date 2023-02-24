import * as React from 'react';
import type { TodoItem } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export interface TodoProps {
  todo: TodoItem;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: TodoItem) => void;
}

const Todo = ({ todo, deleteTodo }: TodoProps) => {
  const [, setTodoId] = React.useState(todo.id);
  const [timeStr, setTimeStr] = React.useState('');
  const [dateStr, setDateStr] = React.useState('');
  const [users, setUsers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setTodoId(todo.id);
  }, [todo.id]);

  React.useEffect(() => {
    setTimeStr(formatTime(todo.time));
    setDateStr(formatDate(todo.time));
  }, [todo.time]);

  return (
    <Paper>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Stack direction='column'>
          {todo.user1 && <Chip size='small' label='User 1' />}
          {todo.user2 && <Chip size='small' label='User 2' />}
          <Typography>
            {todo.text}
          </Typography>
        </Stack>
        <Stack direction='column'>
          <IconButton aria-label='edit' color='primary'>
            <EditIcon />
          </IconButton>
          <IconButton aria-label='delete' disabled color='primary'>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

const StyledTodo = styled(Todo)`
  display: flex;
  margin-right: auto;
  margin-left: 0;
  flex: 1;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-md);

  .top {
    display: flex;
    align-items: center;
  }

  .delete {
    opacity: 0.3;
  }
`;

export default StyledTodo;
