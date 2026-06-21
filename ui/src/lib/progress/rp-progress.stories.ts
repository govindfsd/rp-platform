import type { Meta, StoryObj } from '@storybook/angular';
import { RpProgress } from './rp-progress';

const meta: Meta<RpProgress> = {
  title: 'Components/Progress',
  component: RpProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:280px"><rp-progress [value]="value" [indeterminate]="indeterminate" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<RpProgress>;

export const Half: Story = { args: { value: 60, indeterminate: false } };
export const Indeterminate: Story = { args: { indeterminate: true } };

export const Collection: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:14px;width:280px">
        <rp-progress [value]="83" />
        <rp-progress [value]="100" />
        <rp-progress [value]="47" />
      </div>`,
  }),
};
