import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpSidebar } from '../sidebar/rp-sidebar';
import { RpTopbar } from '../topbar/rp-topbar';
import { RpPageHeader } from '../page-header/rp-page-header';
import { RpBreadcrumb } from '../breadcrumb/rp-breadcrumb';
import { RpTabs } from '../tabs/rp-tabs';
import { RpIconButton } from '../icon-button/rp-icon-button';
import { RpAvatar } from '../avatar/rp-avatar';
import { RpButton } from '../button/rp-button';

const meta: Meta = {
  title: 'Gallery/Admin shell',
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({
      imports: [RpSidebar, RpTopbar, RpPageHeader, RpBreadcrumb, RpTabs, RpIconButton, RpAvatar, RpButton],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const AdminShell: Story = {
  render: () => ({
    props: {
      navItems: [
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'onboarding', label: 'Onboarding', icon: 'users' },
        { id: 'config', label: 'Configuration', icon: 'settings' },
        { id: 'rbac', label: 'RBAC', icon: 'shield' },
        { id: 'audit', label: 'Audit', icon: 'chart' },
      ],
      crumbs: [
        { label: 'Home', href: '#' },
        { label: 'Merchants', href: '#' },
        { label: 'Onboarding' },
      ],
      tabs: [
        { id: 'pending', label: 'Pending' },
        { id: 'approved', label: 'Approved' },
        { id: 'rejected', label: 'Rejected' },
      ],
    },
    template: `
      <div style="height:600px;display:flex;font-family:var(--rp-font-family-sans)">
        <rp-sidebar brand="RinggitPay" [items]="navItems" active="dashboard" />
        <div style="flex:1;display:flex;flex-direction:column;background:var(--rp-surface-muted);min-width:0">
          <rp-topbar heading="Dashboard">
            <rp-icon-button icon="search" label="Search" />
            <rp-icon-button icon="bell" label="Alerts" />
            <rp-avatar name="Govind K" size="sm" />
          </rp-topbar>
          <div style="padding:20px;overflow:auto">
            <rp-breadcrumb [items]="crumbs" />
            <div style="height:12px"></div>
            <rp-page-header heading="Merchant onboarding" subheading="Review and approve new merchants">
              <rp-button variant="secondary" size="sm">Export</rp-button>
              <rp-button size="sm">New merchant</rp-button>
            </rp-page-header>
            <rp-tabs [tabs]="tabs" active="pending" />
          </div>
        </div>
      </div>
    `,
  }),
};
