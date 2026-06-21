import type { Meta, StoryObj } from '@storybook/angular';
import { RP_ICONS, RpIcon } from './rp-icon';

const names = Object.keys(RP_ICONS);

const meta: Meta<RpIcon> = {
  title: 'Components/Icon',
  component: RpIcon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: names },
    size: { control: { type: 'number', min: 12, max: 64, step: 2 } },
    strokeWidth: { control: { type: 'number', min: 1, max: 3, step: 0.5 } },
  },
  render: (args) => ({
    props: args,
    template: `<span style="color: var(--rp-brand)"><rp-icon [name]="name" [size]="size" [strokeWidth]="strokeWidth" /></span>`,
  }),
};
export default meta;

type Story = StoryObj<RpIcon>;

export const Default: Story = { args: { name: 'invoice', size: 24, strokeWidth: 2 } };

export const Registry: Story = {
  render: () => ({
    props: { names },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:18px;color:var(--rp-text)">
        @for (n of names; track n) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:72px">
            <rp-icon [name]="n" [size]="24" />
            <span style="font-size:11px;color:var(--rp-text-muted)">{{ n }}</span>
          </div>
        }
      </div>`,
  }),
};
