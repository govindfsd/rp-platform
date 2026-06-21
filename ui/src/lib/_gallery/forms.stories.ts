import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpCheckbox } from '../checkbox/rp-checkbox';
import { RpSwitch } from '../switch/rp-switch';
import { RpTextarea } from '../textarea/rp-textarea';

const meta: Meta = {
  title: 'Gallery/Forms',
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [RpCheckbox, RpSwitch, RpTextarea] })],
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:340px;font-family:var(--rp-font-family-sans);color:var(--rp-text)">
        <rp-checkbox>Email me about settlement reports</rp-checkbox>
        <rp-checkbox>SMS alerts for failed payments</rp-checkbox>
        <div style="display:flex;align-items:center;gap:10px">
          <rp-switch /><span>Enable auto-settlement</span>
        </div>
        <rp-textarea placeholder="Internal notes for this merchant…" [rows]="3" />
      </div>
    `,
  }),
};
