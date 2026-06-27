import type { Meta, StoryObj } from '@storybook/angular';
import { RpSkeleton } from './rp-skeleton';

const meta: Meta<RpSkeleton> = {
  title: 'Components/Skeleton',
  component: RpSkeleton,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    radius: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<rp-skeleton [width]="width" [height]="height" [radius]="radius" />`,
  }),
};
export default meta;

type Story = StoryObj<RpSkeleton>;

export const Line: Story = { args: { width: '240px', height: '16px' } };

export const Card: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;width:280px">
        <rp-skeleton width="64px" height="64px" radius="var(--rp-radius-full)" />
        <rp-skeleton width="80%" height="16px" />
        <rp-skeleton width="100%" height="12px" />
        <rp-skeleton width="60%" height="12px" />
      </div>`,
  }),
};
