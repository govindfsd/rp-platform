import type { Meta, StoryObj } from '@storybook/angular';
import { RpCheckbox } from './rp-checkbox';

const meta: Meta<RpCheckbox> = {
  title: 'Components/Checkbox',
  component: RpCheckbox,
  tags: ['autodocs'],
  render: () => ({
    template: `<rp-checkbox>Allow partial payment</rp-checkbox>`,
  }),
};
export default meta;

type Story = StoryObj<RpCheckbox>;

export const Default: Story = {};

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:10px">
        <rp-checkbox>Email the payer a receipt</rp-checkbox>
        <rp-checkbox>Send an SMS reminder</rp-checkbox>
        <rp-checkbox>Save as a reusable template</rp-checkbox>
      </div>`,
  }),
};
