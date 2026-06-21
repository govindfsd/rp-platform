import type { Meta, StoryObj } from '@storybook/angular';
import { RpTextarea } from './rp-textarea';

const meta: Meta<RpTextarea> = {
  title: 'Components/Textarea',
  component: RpTextarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 10 } },
    invalid: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px"><rp-textarea [placeholder]="placeholder" [rows]="rows" [invalid]="invalid" /></div>`,
  }),
};
export default meta;

type Story = StoryObj<RpTextarea>;

export const Default: Story = {
  args: { placeholder: 'Optional note printed on the invoice…', rows: 4, invalid: false },
};
export const Invalid: Story = {
  args: { placeholder: 'Bill note', rows: 4, invalid: true },
};
