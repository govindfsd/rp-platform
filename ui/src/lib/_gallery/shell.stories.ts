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
import { adminNav } from '../presets/admin-nav';

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
      navItems: adminNav,
      active: 'merchant-list',
      crumbs: [
        { label: 'Home', href: '#' },
        { label: 'Merchants', href: '#' },
        { label: 'Merchant list' },
      ],
      tabs: [
        { id: 'all', label: 'All 1,248' },
        { id: 'active', label: 'Active 1,180' },
        { id: 'pending', label: 'Pending 36' },
        { id: 'suspended', label: 'Suspended 12' },
        { id: 'rejected', label: 'Rejected 20' },
      ],
    },
    template: `
      <div style="height:640px;display:flex;flex-direction:column;font-family:var(--rp-font-family-sans)">
        <rp-topbar
          variant="brand"
          logoText="RinggitPay"
          userName="Govind K"
          userEmail="govind@ascertain.com.my"
        />
        <div style="flex:1;display:flex;overflow:hidden">
          <rp-sidebar [items]="navItems" [(active)]="active" />
          <div style="flex:1;display:flex;flex-direction:column;background:var(--rp-surface-muted);min-width:0;overflow:auto">
            <div style="padding:20px 24px">
              <rp-breadcrumb [items]="crumbs" />
              <div style="height:12px"></div>
              <rp-page-header heading="Merchants" subheading="1,248 merchants · 36 pending approval">
                <rp-button variant="secondary" size="sm">Export</rp-button>
                <rp-button size="sm">+ New merchant</rp-button>
              </rp-page-header>
              <div style="height:16px"></div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
                <rp-stat-card label="Total merchants" value="1,248" icon="store" />
                <rp-stat-card label="Active" value="1,180" trend="up" delta="+24 this month" icon="check-circle" />
                <rp-stat-card label="Pending KYC" value="36" icon="shield" />
                <rp-stat-card label="Suspended" value="12" trend="down" delta="-3 this month" icon="alert-triangle" />
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
      navItems: adminNav,
      active: 'merchants',
      drawerOpen: false,
      tabs: [
        { id: 'all', label: 'All 1,248' },
        { id: 'active', label: 'Active 1,180' },
        { id: 'pending', label: 'Pending 36' },
        { id: 'suspended', label: 'Suspended 12' },
      ],
    },
    template: `
      <div style="position:relative;width:390px;height:760px;overflow:hidden;
                  border:1px solid var(--rp-border);border-radius:22px;
                  display:flex;flex-direction:column;font-family:var(--rp-font-family-sans)">
        <rp-topbar
          variant="brand"
          logoText="RinggitPay"
          [compact]="true"
          userName="Govind K"
          userEmail="govind@ascertain.com.my"
        />
        <div style="flex:1;overflow:auto;min-height:0;background:var(--rp-surface-muted);padding:16px">
          <div style="font-size:18px;font-weight:600;color:var(--rp-text);margin-bottom:2px">Merchants</div>
          <div style="font-size:13px;color:var(--rp-text-muted);margin-bottom:16px">1,248 merchants · 36 pending</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
            <rp-stat-card label="Active" value="1,180" trend="up" icon="check-circle" />
            <rp-stat-card label="Pending KYC" value="36" icon="shield" />
          </div>
          <rp-tabs [tabs]="tabs" active="all" />
        </div>
        <rp-bottom-nav [items]="navItems" [(active)]="active" (moreClick)="drawerOpen = true" />
        <rp-nav-drawer [items]="navItems" [(open)]="drawerOpen" [(active)]="active" logoText="RinggitPay" />
      </div>
    `,
  }),
};
