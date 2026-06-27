import type { Meta, StoryObj } from '@storybook/angular';
import { RpPageHeader } from './rp-page-header';

const meta: Meta<RpPageHeader> = {
  title: 'Components/Page header',
  component: RpPageHeader,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:560px">
        <rp-page-header [heading]="heading" [subheading]="subheading">
          <button class="rp-pageheader-action">New batch</button>
        </rp-page-header>
      </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpPageHeader>;

export const Default: Story = {
  args: { heading: 'Invoice batches', subheading: '48 invoices across 5 batches' },
};
