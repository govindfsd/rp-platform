import type { Meta, StoryObj } from '@storybook/angular';
import { RpButton } from './rp-button';

const meta: Meta<RpButton> = {
  title: 'Components/Button',
  component: RpButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    full: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<rp-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [full]="full">Pay now</rp-button>`,
  }),
};
export default meta;

type Story = StoryObj<RpButton>;

export const Primary: Story = { args: { variant: 'primary', size: 'md' } };
export const Secondary: Story = { args: { variant: 'secondary', size: 'md' } };
export const Ghost: Story = { args: { variant: 'ghost', size: 'md' } };
export const Danger: Story = { args: { variant: 'danger', size: 'md' } };
export const Loading: Story = { args: { variant: 'primary', loading: true } };
