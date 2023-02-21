import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineProps } from '../components/timeline/Timeline';

const meta: Meta<TimelineProps> = {
  title: 'Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<TimelineProps>;

export const Primary: Story = {
  args: {
    items: [
      {
        title: 'Lorem ipsum dolor sit amet',
        position: 'right',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.'
      },
      {
        title: 'Test Title',
        position: 'left',
        content: 'Test content test content'
      }
    ]
  }
};
