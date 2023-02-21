import styled from '@emotion/styled';
//
// export const StyledTime = styled.span`
//   font-weight: 600;
//   flex-grow: 1;
//   margin-left: 0;
//   margin-right: auto;
// `;

interface TimeProps {
  time: string;
  date?: string;
}

const TimeSpan = styled.span`
  font-weight: 600;
  flex-grow: 1;
  margin-left: 0;
  margin-right: auto;
`;

const DateSpan = styled.span`
  font-style: italic;
  margin-left: 0.5rem;
  color: var(--gray-500);
  margin-right: 0.5rem;
`;

// TimeBase shows the time in bold and the date in italic font.
export const Time = (props: TimeProps) => {
  const { time, date } = props;

  return (
    <div>
      <TimeSpan>{time}</TimeSpan>
      <DateSpan>{date}</DateSpan>
    </div>
  );
};
