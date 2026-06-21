import type { Meta, StoryObj } from '@storybook/angular';
import { RpSidebar } from './rp-sidebar';

const meta: Meta<RpSidebar> = {
  title: 'Components/Sidebar',
  component: RpSidebar,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div style="height:520px;display:flex">
        <rp-sidebar [brand]="brand" [items]="items" />
      </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpSidebar>;

export const Default: Story = {
  args: {
    brand: 'RinggitPay',
    items: [
      { id: 'overview', label: 'Overview', icon: 'dashboard' },
      { id: 'invoicing', label: 'Invoicing', icon: 'invoice' },
      { id: 'payments', label: 'Payments', icon: 'bank' },
      { id: 'mandates', label: 'Direct debit', icon: 'mandate' },
      { id: 'reports', label: 'Reports', icon: 'chart' },
      { id: 'contacts', label: 'Contacts', icon: 'users' },
    ],
  },
};
