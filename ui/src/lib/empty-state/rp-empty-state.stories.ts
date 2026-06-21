import type { Meta, StoryObj } from '@storybook/angular';
import { RpEmptyState } from './rp-empty-state';

const meta: Meta<RpEmptyState> = {
  title: 'Components/Empty state',
  component: RpEmptyState,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', options: ['invoice', 'search', 'users', 'bank'] },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:380px"><rp-empty-state [icon]="icon" [heading]="heading" [description]="description" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<RpEmptyState>;

export const NoInvoices: Story = {
  args: {
    icon: 'invoice',
    heading: 'No invoices yet',
    description: 'Create your first invoice to start collecting payments.',
  },
};

export const NoResults: Story = {
  args: {
    icon: 'search',
    heading: 'No results',
    description: 'Try adjusting your search or filters.',
  },
};
