import type { Meta, StoryObj } from '@storybook/angular';
import { RpChip } from './rp-chip';

const meta: Meta<RpChip> = {
  title: 'Components/Chip',
  component: RpChip,
  tags: ['autodocs'],
  argTypes: { removable: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<rp-chip [removable]="removable">Jan 2024</rp-chip>`,
  }),
};
export default meta;

type Story = StoryObj<RpChip>;

export const Default: Story = { args: { removable: false } };
export const Removable: Story = { args: { removable: true } };

export const Group: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <rp-chip>All</rp-chip>
        <rp-chip [removable]="true">Active</rp-chip>
        <rp-chip [removable]="true">Overdue</rp-chip>
        <rp-chip [removable]="true">Draft</rp-chip>
      </div>`,
  }),
};
