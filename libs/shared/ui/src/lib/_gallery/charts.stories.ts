import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpChart } from '../chart/rp-chart';
import { RpQrCode } from '../qr-code/rp-qr-code';
import { RpCard } from '../card/rp-card';

const meta: Meta = {
  title: 'Gallery/Charts & QR',
  parameters: { layout: 'padded' },
  decorators: [moduleMetadata({ imports: [RpChart, RpQrCode, RpCard] })],
};
export default meta;

type Story = StoryObj;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const Dashboard: Story = {
  render: () => ({
    props: {
      months,
      collected: [{ name: 'Collected', data: [42000, 51000, 48000, 61000, 58000, 67000] }],
      split: [
        { name: 'Collected', data: [42, 51, 48, 61, 58, 67] },
        { name: 'Outstanding', data: [12, 9, 14, 8, 11, 7] },
      ],
      channels: [
        { name: 'FPX', value: 540 },
        { name: 'Card', value: 310 },
        { name: 'DuitNow', value: 240 },
        { name: 'e-Wallet', value: 130 },
      ],
    },
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:980px">
        <rp-card heading="Collections (area)">
          <rp-chart type="area" [categories]="months" [series]="collected" height="260px" />
        </rp-card>
        <rp-card heading="Collected vs outstanding (stacked)">
          <rp-chart type="stacked" [categories]="months" [series]="split" height="260px" />
        </rp-card>
        <rp-card heading="Channel mix (donut)">
          <rp-chart type="donut" [slices]="channels" height="260px" />
        </rp-card>
        <rp-card heading="Monthly volume (bar)">
          <rp-chart type="bar" [categories]="months" [series]="collected" [showLegend]="false" height="260px" />
        </rp-card>
      </div>
    `,
  }),
};

export const QrCode: Story = {
  name: 'QR code (DuitNow / payment link)',
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:flex-start">
        <rp-card heading="Payment link">
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <rp-qr-code value="https://pay.ringgitpay.my/inv/INV-2024001" [size]="180" />
            <span style="font-family:var(--rp-font-family-sans);font-size:13px;color:var(--rp-text-muted)">INV-2024001 · RM 1,200</span>
          </div>
        </rp-card>
        <rp-card heading="High error-correction (H)">
          <rp-qr-code value="00020101021126..." [size]="180" level="H" />
        </rp-card>
      </div>
    `,
  }),
};
