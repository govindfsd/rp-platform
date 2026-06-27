import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpInput } from '../input/rp-input';
import { RpFormField } from './rp-form-field';

const meta: Meta<RpFormField> = {
  title: 'Components/FormField',
  component: RpFormField,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [RpInput] })],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px">
      <rp-form-field [label]="label" [hint]="hint" [error]="error" [required]="required">
        <rp-input placeholder="Type here…" />
      </rp-form-field>
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<RpFormField>;

export const WithHint: Story = {
  args: { label: 'Settlement account', hint: 'Funds settle here daily' },
};

export const WithError: Story = {
  args: { label: 'Settlement account', error: 'This field is required', required: true },
};
