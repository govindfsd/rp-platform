import type { Meta, StoryObj } from '@storybook/angular';
import { RpBreadcrumb } from './rp-breadcrumb';

const meta: Meta<RpBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: RpBreadcrumb,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<rp-breadcrumb [items]="items" />`,
  }),
};
export default meta;

type Story = StoryObj<RpBreadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Invoicing', href: '#' },
      { label: 'Batches', href: '#' },
      { label: 'Jan 2024' },
    ],
  },
};
