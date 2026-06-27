import type { Meta, StoryObj } from '@storybook/angular';
import { RpBadge } from './rp-badge';

type BadgeArgs = RpBadge & { label: string };

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  component: RpBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
    },
    label: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<rp-badge [variant]="variant">{{ label }}</rp-badge>`,
  }),
};
export default meta;

type Story = StoryObj<BadgeArgs>;

export const Paid: Story = { args: { variant: 'success', label: 'Paid' } };
export const Pending: Story = { args: { variant: 'warning', label: 'Pending' } };
export const Failed: Story = { args: { variant: 'danger', label: 'Failed' } };
export const ActiveMandate: Story = {
  args: { variant: 'brand', label: 'Active mandate' },
};
export const Draft: Story = { args: { variant: 'neutral', label: 'Draft' } };
