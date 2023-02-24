import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { TodoItem } from '../types';

interface OppositeContentTimelineProps {
  items: TodoItem[];
}

export default function OppositeContentTimeline({ items }: OppositeContentTimelineProps) {
  return (
    <Timeline position='alternate'>
      {items?.length !== 0 ? items.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineOppositeContent color='text.secondary'>
            {item.time.toLocaleTimeString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {item.text}
          </TimelineContent>
        </TimelineItem>
      )) : null}
    </Timeline>
  );
}
