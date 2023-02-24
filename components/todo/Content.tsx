import { TodoItem } from '@/types';
import * as React from 'react';
import styled from '@emotion/styled';
import { Time } from './Time';
import { Text } from './Text';
import { Users } from './Users';

export interface TodoContentProps {
  timeStr: string;
  dateStr: string;
  users: string[];
  todo: TodoItem;
}

export const Content = ({ timeStr, dateStr, users, todo }: TodoContentProps) => {
  return (
    <ContentContainer>
      <TopContainer>
        <Time time={timeStr} date={dateStr} />
        <Users users={users} />
      </TopContainer>
      <Text>{todo.text}</Text>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: auto;
  margin-left: 0.75rem;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledContent = styled(Content)`
  flex: 1;

`;

export const TodoContent = StyledContent;
