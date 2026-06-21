import type { Meta, StoryObj } from '@storybook/angular';
import { RpTag } from './rp-tag';

const meta: Meta<RpTag> = {
  title: 'Components/Tag',
  component: RpTag,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<rp-tag [color]="color">{{ color }}</rp-tag>`,
  }),
};
export default meta;

type Story = StoryObj<RpTag>;

export const Success: Story = { args: { color: 'success' } };

export const Statuses: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <rp-tag color="success">Paid</rp-tag>
        <rp-tag color="warning">Overdue</rp-tag>
        <rp-tag color="danger">Failed</rp-tag>
        <rp-tag color="info">Scheduled</rp-tag>
        <rp-tag color="brand">Recurring</rp-tag>
        <rp-tag color="neutral">Draft</rp-tag>
      </div>`,
  }),
};
