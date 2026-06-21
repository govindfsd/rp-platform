import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpSidebar } from './rp-sidebar';
import type { RpNavItem } from './rp-sidebar';

const adminNav: RpNavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  {
    id: 'invoicing',
    label: 'Invoicing',
    icon: 'invoice',
    children: [
      { id: 'new-invoice', label: 'New invoice', icon: 'plus' },
      { id: 'invoice-batch', label: 'Invoice batch', icon: 'layers' },
      { id: 'invoice-list', label: 'Invoice list', icon: 'list' },
    ],
  },
  { id: 'payments', label: 'Payments', icon: 'bank' },
  { id: 'direct-debit', label: 'Direct debit', icon: 'mandate' },
  { id: 'reports', label: 'Reports', icon: 'chart' },
  { id: 'contacts', label: 'Contacts', icon: 'users' },
  { id: 'account', label: 'Account', icon: 'settings' },
];

const meta: Meta = {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
  decorators: [moduleMetadata({ imports: [RpSidebar] })],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    props: { items: adminNav, active: 'overview' },
    template: `
      <div style="height:600px;display:flex;background:var(--rp-surface-muted)">
        <rp-sidebar [items]="items" [(active)]="active" />
        <div style="flex:1;padding:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text-muted)">
          Active: {{ active }}
        </div>
      </div>
    `,
  }),
};

export const WithFlyout: Story = {
  name: 'With sub-nav flyout (Invoicing active)',
  render: () => ({
    props: { items: adminNav, active: 'invoice-batch' },
    template: `
      <div style="height:600px;display:flex;background:var(--rp-surface-muted)">
        <rp-sidebar [items]="items" [(active)]="active" />
        <div style="flex:1;padding:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text-muted)">
          Active: {{ active }} — click Invoicing to see the flyout sub-nav
        </div>
      </div>
    `,
  }),
};
