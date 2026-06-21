import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpFormField } from '../form-field/rp-form-field';
import { RpInput } from './rp-input';

type InputArgs = RpInput & {
  label: string;
  hint: string;
  error: string;
  required: boolean;
};

const meta: Meta<InputArgs> = {
  title: 'Components/Input',
  component: RpInput,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [RpFormField] })],
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px">
      <rp-form-field [label]="label" [hint]="hint" [error]="error" [required]="required">
        <rp-input [type]="type" [placeholder]="placeholder" [invalid]="invalid" />
      </rp-form-field>
    </div>`,
  }),
};
export default meta;

type Story = StoryObj<InputArgs>;

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'name@company.com', type: 'email' },
};

export const Required: Story = {
  args: {
    label: 'Merchant name',
    placeholder: 'Acme Sdn Bhd',
    required: true,
    hint: 'As registered with SSM',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email address',
    placeholder: 'name@company.com',
    invalid: true,
    error: 'Enter a valid email address',
  },
};
