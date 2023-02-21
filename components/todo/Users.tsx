import * as React from 'react';
import styled from '@emotion/styled';
import { User } from './User';

export interface UsersProps {
  users: string[];
}

const BaseUsers = (props: UsersProps) => {
  const [users, setUsers] = React.useState<string[]>([]);

  React.useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  if(!users?.length || users.length === 0) {
    return null;
  }

  return (
    <UserContainer>
      {users.map((user) => <User key={user}>{user}</User>)}
    </UserContainer>
  );
};

const UserContainer = styled.div`
  flex-grow: 1;
  margin: auto;
`;

const StyledBaseUsers = styled(BaseUsers)`  
  color: var(--gray-600);
  font-style: italic;
  margin: auto;
  flex-grow: 1;
  
  .user-container {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto
  }
`;

export const Users = StyledBaseUsers;
