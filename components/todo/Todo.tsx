import * as React from 'react';
import styled from '@emotion/styled';
import type { TodoItem } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';
import { TodoContent } from './Content';
import { DeleteButton } from './DeleteButton';

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

  React.useEffect(() => {
    setUsers([...todo.users] || []);
  }, [todo.users]);

  return (
    <div className='todo'>

      <TodoContent
        timeStr={timeStr}
        dateStr={dateStr}
        users={users}
        todo={todo}
      />
      <DeleteButton handleOnClick={() => deleteTodo(todo.id)} />
    </div>
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

const Line = styled.div`
  border-left: 1px solid black;
  width: 1px;
  flex: 0;
  position: relative;
  margin-right: 30px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 10px;
`;

const LineWithDot = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '30px', justifyContent: 'center', alignItems: 'center' }}>
      <Dot />
      <Line />
    </div>
  );
};

const TodoWrapper = (props: TodoProps) => {
  return (
    <div style={{ display: 'flex', justifyItems: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '30px', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>{formatTime(props.todo.time)}</span>
        <span style={{
          display: 'table-cell',
          verticalAlign: 'middle',
          fontStyle: 'normal',
          fontSize: '12px',
          color: 'var(--gray-500)'
        }}>{formatDate(props.todo.time)}</span>
      </div>
      <LineWithDot />
      <StyledTodo {...props} />
    </div>
  );
};

const StyledTodoWrapper = styled(TodoWrapper)`
  .line {
    width: 10px;
    background-color: red;
  }
`;

export default StyledTodoWrapper;
