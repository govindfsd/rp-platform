import type { Meta, StoryObj } from '@storybook/angular';
import { RpCard } from './rp-card';

const meta: Meta<RpCard> = {
  title: 'Components/Card',
  component: RpCard,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    flat: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:360px">
        <rp-card [heading]="heading" [subheading]="subheading" [flat]="flat">
          <p style="margin:0;color:var(--rp-text-muted)">
            Fill in the details and configure delivery settings for this invoice.
          </p>
        </rp-card>
      </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpCard>;

export const Default: Story = {
  args: { heading: 'New invoice', subheading: 'One-time · MYR', flat: false },
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <div style="width:360px">
        <rp-card heading="Reminders" subheading="No reminders set yet">
          <button card-actions class="rp-card-action">Add reminder</button>
          <p style="margin:0;color:var(--rp-text-muted)">
            Schedule automatic email or SMS nudges before the due date.
          </p>
        </rp-card>
      </div>`,
  }),
};
