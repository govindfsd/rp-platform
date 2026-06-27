import type { Meta, StoryObj } from '@storybook/angular';
import { RpAvatar } from './rp-avatar';

const meta: Meta<RpAvatar> = {
  title: 'Components/Avatar',
  component: RpAvatar,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    src: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  render: (args) => ({
    props: args,
    template: `<rp-avatar [name]="name" [src]="src" [size]="size" />`,
  }),
};
export default meta;

type Story = StoryObj<RpAvatar>;

export const Initials: Story = { args: { name: 'Govind Kumar', size: 'md' } };

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <rp-avatar name="Govind Kumar" size="sm" />
        <rp-avatar name="Govind Kumar" size="md" />
        <rp-avatar name="Govind Kumar" size="lg" />
      </div>`,
  }),
};
