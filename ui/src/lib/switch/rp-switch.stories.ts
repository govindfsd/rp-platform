import type { Meta, StoryObj } from '@storybook/angular';
import { RpSwitch } from './rp-switch';

const meta: Meta<RpSwitch> = {
  title: 'Components/Switch',
  component: RpSwitch,
  tags: ['autodocs'],
  render: () => ({ template: `<rp-switch />` }),
};
export default meta;

type Story = StoryObj<RpSwitch>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => ({
    template: `
      <label style="display:inline-flex;align-items:center;gap:10px;color:var(--rp-text);font-family:var(--rp-font-family-sans)">
        <rp-switch />
        Enable recurring schedule
      </label>`,
  }),
};
