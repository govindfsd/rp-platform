import type { Meta, StoryObj } from '@storybook/angular';
import { RpTopbar } from './rp-topbar';

const meta: Meta<RpTopbar> = {
  title: 'Components/Topbar',
  component: RpTopbar,
  tags: ['autodocs'],
  argTypes: { heading: { control: 'text' } },
  render: (args) => ({
    props: args,
    template: `
      <div style="width:640px;border:1px solid var(--rp-border);border-radius:var(--rp-radius-lg);overflow:hidden">
        <rp-topbar [heading]="heading">
          <span style="color:var(--rp-text-muted)">govind&#64;ascertain.com.my</span>
        </rp-topbar>
      </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpTopbar>;

export const Default: Story = { args: { heading: 'Invoicing' } };
