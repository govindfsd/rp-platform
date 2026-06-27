import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpCard } from '../card/rp-card';
import { RpStatCard } from '../stat-card/rp-stat-card';
import { RpEmptyState } from '../empty-state/rp-empty-state';
import { RpProgress } from '../progress/rp-progress';
import { RpAlert } from '../alert/rp-alert';

const meta: Meta = {
  title: 'Gallery/Data display',
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({ imports: [RpCard, RpStatCard, RpEmptyState, RpProgress, RpAlert] }),
  ],
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:18px;width:600px;font-family:var(--rp-font-family-sans);color:var(--rp-text)">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <rp-stat-card label="Collected today" value="RM 248,910" delta="+12.4%" trend="up" icon="bank" />
          <rp-stat-card label="Active mandates" value="12,486" delta="+3.1%" trend="up" icon="mandate" />
          <rp-stat-card label="Failed payments" value="142" delta="-8.0%" trend="down" icon="alert-circle" />
        </div>
        <rp-card heading="Today's settlement batch" subheading="Updated 5 minutes ago">
          <div style="display:flex;flex-direction:column;gap:8px">
            <rp-progress [value]="72" />
            <span style="font-size:13px;color:var(--rp-text-muted)">72% of today's batch settled</span>
          </div>
        </rp-card>
        <rp-alert variant="success" heading="Payout completed">RM 1.2M settled to 38 merchants.</rp-alert>
        <rp-alert variant="warning" heading="3 mandates expiring" [dismissible]="true">Renew before 30 Jun 2026.</rp-alert>
        <rp-alert variant="danger" heading="Gateway timeout">FPX is responding slowly — retries queued.</rp-alert>
        <rp-card [flat]="true">
          <rp-empty-state icon="invoice" heading="No invoices yet"
            description="Create your first invoice to start collecting payments." />
        </rp-card>
      </div>
    `,
  }),
};
