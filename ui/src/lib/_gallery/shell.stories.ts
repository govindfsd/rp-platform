import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpSidebar } from '../sidebar/rp-sidebar';
import { RpTopbar } from '../topbar/rp-topbar';
import { RpBottomNav } from '../bottom-nav/rp-bottom-nav';
import { RpNavDrawer } from '../nav-drawer/rp-nav-drawer';
import { RpPageHeader } from '../page-header/rp-page-header';
import { RpBreadcrumb } from '../breadcrumb/rp-breadcrumb';
import { RpTabs } from '../tabs/rp-tabs';
import { RpButton } from '../button/rp-button';
import { RpStatCard } from '../stat-card/rp-stat-card';
import type { RpNavItem } from '../sidebar/rp-sidebar';

const navItems: RpNavItem[] = [
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
  title: 'Gallery/Admin shell',
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({
      imports: [
        RpSidebar,
        RpTopbar,
        RpBottomNav,
        RpNavDrawer,
        RpPageHeader,
        RpBreadcrumb,
        RpTabs,
        RpButton,
        RpStatCard,
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const Desktop: Story = {
  name: 'Desktop — Corporate Blue',
  render: () => ({
    props: {
      navItems,
      active: 'invoice-batch',
      crumbs: [
        { label: 'Home', href: '#' },
        { label: 'Invoicing', href: '#' },
        { label: 'Invoice batches' },
      ],
      tabs: [
        { id: 'all', label: 'All 5' },
        { id: 'active', label: 'Active 2' },
        { id: 'overdue', label: 'Overdue 1' },
        { id: 'closed', label: 'Closed 1' },
        { id: 'draft', label: 'Draft 1' },
      ],
    },
    template: `
      <div style="height:640px;display:flex;flex-direction:column;font-family:var(--rp-font-family-sans)">
        <!-- Blue topbar -->
        <rp-topbar
          variant="brand"
          logoText="RinggitPay"
          userName="Govind K"
          userEmail="govind@ascertain.com.my"
        />
        <!-- Body: sidebar + content -->
        <div style="flex:1;display:flex;overflow:hidden">
          <rp-sidebar [items]="navItems" [(active)]="active" />
          <div style="flex:1;display:flex;flex-direction:column;background:var(--rp-surface-muted);min-width:0;overflow:auto">
            <div style="padding:20px 24px">
              <rp-breadcrumb [items]="crumbs" />
              <div style="height:12px"></div>
              <rp-page-header heading="Invoice batches" subheading="48 invoices across 5 batches">
                <rp-button variant="secondary" size="sm">Filter</rp-button>
                <rp-button size="sm">+ New batch</rp-button>
              </rp-page-header>
              <div style="height:16px"></div>
              <!-- Stat cards -->
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
                <rp-stat-card label="Total invoices" value="48" />
                <rp-stat-card label="Total amount" value="RM 94,200" />
                <rp-stat-card label="Collected" value="RM 61,450" trend="up" delta="+12% vs last month" />
                <rp-stat-card label="Outstanding" value="RM 32,750" trend="down" delta="-8% vs last month" />
              </div>
              <rp-tabs [tabs]="tabs" active="all" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Mobile: Story = {
  name: 'Mobile — bottom nav + left drawer',
  parameters: { layout: 'centered' },
  render: () => ({
    props: {
      navItems,
      active: 'invoicing',
      drawerOpen: false,
      tabs: [
        { id: 'all', label: 'All 5' },
        { id: 'active', label: 'Active 2' },
        { id: 'overdue', label: 'Overdue 1' },
        { id: 'closed', label: 'Closed 1' },
      ],
    },
    template: `
      <div style="position:relative;width:390px;height:760px;overflow:hidden;
                  border:1px solid var(--rp-border);border-radius:22px;
                  display:flex;flex-direction:column;font-family:var(--rp-font-family-sans)">
        <rp-topbar
          variant="brand"
          logoText="RinggitPay"
          userName="Govind K"
          userEmail="govind@ascertain.com.my"
        />
        <div style="flex:1;overflow:auto;min-height:0;background:var(--rp-surface-muted);padding:16px">
          <div style="font-size:18px;font-weight:600;color:var(--rp-text);margin-bottom:2px">Invoice batches</div>
          <div style="font-size:13px;color:var(--rp-text-muted);margin-bottom:16px">48 invoices across 5 batches</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
            <rp-stat-card label="Total amount" value="RM 94,200" />
            <rp-stat-card label="Outstanding" value="RM 32,750" trend="down" />
          </div>
          <rp-tabs [tabs]="tabs" active="all" />
        </div>
        <rp-bottom-nav [items]="navItems" [(active)]="active" (moreClick)="drawerOpen = true" />
        <rp-nav-drawer [items]="navItems" [(open)]="drawerOpen" [(active)]="active" logoText="RinggitPay" />
      </div>
    `,
  }),
};
