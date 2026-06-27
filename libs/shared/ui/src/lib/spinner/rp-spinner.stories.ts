import type { Meta, StoryObj } from '@storybook/angular';
import { RpSpinner } from './rp-spinner';

const meta: Meta<RpSpinner> = {
  title: 'Components/Spinner',
  component: RpSpinner,
  tags: ['autodocs'],
  argTypes: { size: { control: { type: 'number', min: 12, max: 48, step: 2 } } },
  render: (args) => ({
    props: args,
    template: `<span style="color: var(--rp-brand)"><rp-spinner [size]="size" /></span>`,
  }),
};
export default meta;

type Story = StoryObj<RpSpinner>;

export const Default: Story = { args: { size: 20 } };
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center;color:var(--rp-brand)">
        <rp-spinner [size]="16" />
        <rp-spinner [size]="24" />
        <rp-spinner [size]="32" />
      </div>`,
  }),
};
