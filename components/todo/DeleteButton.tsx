import * as React from 'react';
import styled from '@emotion/styled';

export interface DeleteButtonProps {
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UnstyledDeleteButton = ({ handleOnClick }: DeleteButtonProps) => {
  return (
    <button className='delete' onClick={handleOnClick}>
      x
    </button>
  );
};

const StyledDeleteButton = styled(UnstyledDeleteButton)`
  opacity: 0.3;
  flex: 0;
`;

export const DeleteButton = StyledDeleteButton;
