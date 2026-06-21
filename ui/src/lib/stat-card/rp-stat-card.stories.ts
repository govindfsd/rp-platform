import type { Meta, StoryObj } from '@storybook/angular';
import { RpStatCard } from './rp-stat-card';

const meta: Meta<RpStatCard> = {
  title: 'Components/Stat card',
  component: RpStatCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    delta: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'flat'] },
    icon: { control: 'select', options: ['invoice', 'bank', 'chart', 'users', 'check-circle'] },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:240px"><rp-stat-card [label]="label" [value]="value" [delta]="delta" [trend]="trend" [icon]="icon" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<RpStatCard>;

export const Collected: Story = {
  args: { label: 'Collected', value: 'RM 61,450.00', delta: '+12%', trend: 'up', icon: 'check-circle' },
};

export const Grid: Story = {
  render: () => ({
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:520px">
        <rp-stat-card label="Total invoices" value="48" icon="invoice" />
        <rp-stat-card label="Total amount" value="RM 94,200.00" icon="bank" />
        <rp-stat-card label="Collected" value="RM 61,450.00" delta="+12%" trend="up" icon="check-circle" />
        <rp-stat-card label="Outstanding" value="RM 32,750.00" delta="-4%" trend="down" icon="chart" />
      </div>`,
  }),
};
