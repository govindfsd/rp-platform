import type { Meta, StoryObj } from '@storybook/angular';
import { RpAlert } from './rp-alert';

const meta: Meta<RpAlert> = {
  title: 'Components/Alert',
  component: RpAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    heading: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:420px">
        <rp-alert [variant]="variant" [heading]="heading" [dismissible]="dismissible">
          This invoice batch is overdue. Send reminders to the remaining payers.
        </rp-alert>
      </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpAlert>;

export const Info: Story = { args: { variant: 'info', heading: 'Heads up', dismissible: true } };

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:420px">
        <rp-alert variant="info" heading="Scheduled">Payment will be collected on the due date.</rp-alert>
        <rp-alert variant="success" heading="Paid">RM 1,200.00 received from the payer.</rp-alert>
        <rp-alert variant="warning" heading="Overdue">3 invoices are past their due date.</rp-alert>
        <rp-alert variant="danger" heading="Failed" [dismissible]="true">The direct debit was rejected by the bank.</rp-alert>
      </div>`,
  }),
};
