import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem } from '../components/timeline/TimelineItem';

const meta: Meta<typeof TimelineItem> = {
  title: 'Timeline/Item',
  component: TimelineItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
};
export default meta;

type Story = StoryObj<typeof TimelineItem>;

export const Foo: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.'
  }
};

