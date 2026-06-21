import type { Meta, StoryObj } from '@storybook/angular';
import { RpIconButton } from './rp-icon-button';

const meta: Meta<RpIconButton> = {
  title: 'Components/Icon button',
  component: RpIconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'select', options: ['settings', 'download', 'edit', 'trash', 'dots', 'bell'] },
    variant: { control: 'select', options: ['ghost', 'solid', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<rp-icon-button [icon]="icon" [label]="label" [variant]="variant" [size]="size" [disabled]="disabled" />`,
  }),
};
export default meta;

type Story = StoryObj<RpIconButton>;

export const Ghost: Story = { args: { icon: 'dots', label: 'More actions', variant: 'ghost', size: 'md' } };
export const Solid: Story = { args: { icon: 'download', label: 'Download', variant: 'solid', size: 'md' } };
export const Outline: Story = { args: { icon: 'edit', label: 'Edit', variant: 'outline', size: 'md' } };

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <rp-icon-button icon="settings" label="Settings" variant="ghost" />
        <rp-icon-button icon="settings" label="Settings" variant="solid" />
        <rp-icon-button icon="settings" label="Settings" variant="outline" />
        <rp-icon-button icon="settings" label="Settings" variant="outline" [disabled]="true" />
      </div>`,
  }),
};
