import type { Meta, StoryObj } from '@storybook/angular';
import { RpTabs } from './rp-tabs';

const meta: Meta<RpTabs> = {
  title: 'Components/Tabs',
  component: RpTabs,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<div style="width:420px"><rp-tabs [tabs]="tabs" [active]="active" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<RpTabs>;

export const Default: Story = {
  args: {
    active: 'all',
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'active', label: 'Active' },
      { id: 'overdue', label: 'Overdue' },
      { id: 'closed', label: 'Closed' },
      { id: 'draft', label: 'Draft' },
    ],
  },
};
