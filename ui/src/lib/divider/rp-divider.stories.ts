import type { Meta, StoryObj } from '@storybook/angular';
import { RpDivider } from './rp-divider';

const meta: Meta<RpDivider> = {
  title: 'Components/Divider',
  component: RpDivider,
  tags: ['autodocs'],
  argTypes: { vertical: { control: 'boolean' } },
};
export default meta;

type Story = StoryObj<RpDivider>;

export const Horizontal: Story = {
  render: () => ({
    template: `
      <div style="width:280px;color:var(--rp-text)">
        <p style="margin:0 0 8px">Invoice summary</p>
        <rp-divider />
        <p style="margin:8px 0 0;color:var(--rp-text-muted)">Total due RM 1,200.00</p>
      </div>`,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:12px;height:24px;color:var(--rp-text)">
        <span>Draft</span>
        <rp-divider [vertical]="true" />
        <span>Active</span>
        <rp-divider [vertical]="true" />
        <span>Paid</span>
      </div>`,
  }),
};
