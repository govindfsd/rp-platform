import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpSidebar } from './rp-sidebar';
import { adminNav } from '../_gallery/admin-nav';

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
