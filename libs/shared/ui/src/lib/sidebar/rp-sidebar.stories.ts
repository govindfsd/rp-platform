import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpSidebar } from './rp-sidebar';
import { filterNavByScreens } from './nav-permissions';
import { adminNav } from '../presets/admin-nav';

// A limited "merchant operations" role — only these screens are granted.
const merchantOpsNav = filterNavByScreens(adminNav, [
  'merchants/list',
  'merchants/onboarding',
  'payments/transactions',
  'payments/live',
  'settlements/list',
  'mandates/list',
]);

const meta: Meta = {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
  decorators: [moduleMetadata({ imports: [RpSidebar] })],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    props: { items: adminNav, active: 'dash-overview' },
    template: `
      <div style="height:680px;display:flex;background:var(--rp-surface-muted)">
        <rp-sidebar [items]="items" [(active)]="active" />
        <div style="flex:1;padding:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text-muted)">
          Active: {{ active }}
        </div>
      </div>
    `,
  }),
};

export const WithFlyout: Story = {
  name: 'With sub-nav flyout (Merchants active)',
  render: () => ({
    props: { items: adminNav, active: 'merchant-list' },
    template: `
      <div style="height:680px;display:flex;background:var(--rp-surface-muted)">
        <rp-sidebar [items]="items" [(active)]="active" />
        <div style="flex:1;padding:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text-muted)">
          Active: {{ active }} — click Merchants to see the flyout sub-nav
        </div>
      </div>
    `,
  }),
};

export const RestrictedRole: Story = {
  name: 'Permission-filtered (merchant-ops role)',
  render: () => ({
    props: { items: merchantOpsNav, active: 'merchant-list' },
    template: `
      <div style="height:680px;display:flex;background:var(--rp-surface-muted)">
        <rp-sidebar [items]="items" [(active)]="active" />
        <div style="flex:1;padding:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text-muted)">
          Only screens granted to this role appear (filterNavByScreens) —
          Merchants, Payments, Settlements, Mandates.
        </div>
      </div>
    `,
  }),
};
