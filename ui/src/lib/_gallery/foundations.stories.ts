import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpIcon } from '../icon/rp-icon';
import { RpIconButton } from '../icon-button/rp-icon-button';
import { RpSpinner } from '../spinner/rp-spinner';
import { RpSkeleton } from '../skeleton/rp-skeleton';
import { RpAvatar } from '../avatar/rp-avatar';
import { RpChip } from '../chip/rp-chip';
import { RpTag } from '../tag/rp-tag';
import { RpDivider } from '../divider/rp-divider';

const meta: Meta = {
  title: 'Gallery/Foundations',
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [RpIcon, RpIconButton, RpSpinner, RpSkeleton, RpAvatar, RpChip, RpTag, RpDivider],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;font-family:var(--rp-font-family-sans);color:var(--rp-text)">
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
          <rp-icon name="dashboard" /><rp-icon name="invoice" /><rp-icon name="bank" />
          <rp-icon name="settings" /><rp-icon name="users" /><rp-icon name="shield" />
          <rp-icon name="chart" /><rp-icon name="bell" /><rp-icon name="search" />
          <rp-icon name="mandate" /><rp-icon name="link" /><rp-icon name="logout" />
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <rp-icon-button icon="bell" label="Alerts" />
          <rp-icon-button icon="settings" label="Settings" variant="outline" />
          <rp-icon-button icon="plus" label="Add" variant="solid" />
          <rp-spinner />
        </div>
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
          <rp-avatar name="Govind K" />
          <rp-avatar name="Acme Sdn Bhd" size="lg" />
          <rp-chip>Filter: Paid</rp-chip>
          <rp-chip [removable]="true">Removable</rp-chip>
          <rp-tag color="brand">NEW</rp-tag>
          <rp-tag color="success">Active</rp-tag>
          <rp-tag color="warning">Pending</rp-tag>
          <rp-tag color="danger">Overdue</rp-tag>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;width:300px">
          <rp-skeleton width="60%" />
          <rp-skeleton />
          <rp-skeleton width="80%" />
        </div>
        <rp-divider />
      </div>
    `,
  }),
};
