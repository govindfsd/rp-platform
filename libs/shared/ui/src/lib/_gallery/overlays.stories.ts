import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpButton } from '../button/rp-button';
import { RpIcon } from '../icon/rp-icon';
import { RpIconButton } from '../icon-button/rp-icon-button';
import { RpTooltip } from '../tooltip/rp-tooltip.directive';
import { RpMenu, RpMenuItem, RpMenuDivider } from '../menu/rp-menu';
import { RpMenuTrigger } from '../menu/rp-menu-trigger.directive';
import { RpPopover, RpPopoverTrigger } from '../popover/rp-popover';
import { RpCopyButton } from '../copy-button/rp-copy-button';
import {
  RpDescriptionList,
  RpDescriptionItem,
} from '../description-list/rp-description-list';
import { RpDrawer } from '../drawer/rp-drawer';
import { RpBadge } from '../badge/rp-badge';
import { RpInput } from '../input/rp-input';
import { RpFormField } from '../form-field/rp-form-field';

const meta: Meta = {
  title: 'Gallery/Overlays',
  parameters: { layout: 'centered' },
  decorators: [
    moduleMetadata({
      imports: [
        RpButton,
        RpIcon,
        RpIconButton,
        RpTooltip,
        RpMenu,
        RpMenuItem,
        RpMenuDivider,
        RpMenuTrigger,
        RpPopover,
        RpPopoverTrigger,
        RpCopyButton,
        RpDescriptionList,
        RpDescriptionItem,
        RpDrawer,
        RpBadge,
        RpInput,
        RpFormField,
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const Tooltip: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <rp-button rpTooltip="Saves without sending" rpTooltipPosition="top">Save draft</rp-button>
        <rp-icon-button icon="trash" label="Delete" rpTooltip="Delete merchant" rpTooltipPosition="right" />
      </div>
    `,
  }),
};

export const Menu: Story = {
  render: () => ({
    template: `
      <button rp-button-host [rpMenuTrigger]="menu"
        style="display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border:1px solid var(--rp-border-strong);border-radius:8px;background:var(--rp-surface);cursor:pointer;font-family:var(--rp-font-family-sans)">
        Actions <rp-icon name="chevron-down" [size]="16" />
      </button>
      <rp-menu #menu>
        <button rp-menu-item><rp-icon rp-menu-icon name="eye" [size]="16" /> View details</button>
        <button rp-menu-item><rp-icon rp-menu-icon name="edit" [size]="16" /> Edit</button>
        <div rp-menu-divider></div>
        <button rp-menu-item danger><rp-icon rp-menu-icon name="trash" [size]="16" /> Delete</button>
      </rp-menu>
    `,
  }),
};

export const Popover: Story = {
  render: () => ({
    template: `
      <rp-button [rpPopoverTrigger]="filters" variant="secondary">Filter</rp-button>
      <rp-popover #filters>
        <div style="font-weight:500;margin-bottom:10px">Filter merchants</div>
        <rp-form-field label="Name"><rp-input placeholder="Search…" /></rp-form-field>
        <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end">
          <rp-button size="sm" variant="ghost" (click)="filters.closed.emit()">Clear</rp-button>
          <rp-button size="sm" (click)="filters.closed.emit()">Apply</rp-button>
        </div>
      </rp-popover>
    `,
  }),
};

export const CopyButton: Story = {
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:8px;font-family:var(--rp-font-family-sans)">
        <code style="background:var(--rp-surface-sunken);padding:4px 8px;border-radius:6px">rp_live_8x1K…92ab</code>
        <rp-copy-button value="rp_live_8x1K92ab" />
        <rp-copy-button value="M0000142" label="Copy MID" />
      </div>
    `,
  }),
};

export const DescriptionList: Story = {
  render: () => ({
    template: `
      <div style="width:480px">
        <rp-description-list [columns]="2">
          <rp-description-item term="MID">M0000142</rp-description-item>
          <rp-description-item term="Status"><rp-badge variant="success">Active</rp-badge></rp-description-item>
          <rp-description-item term="Registration">201901000123</rp-description-item>
          <rp-description-item term="Industry">Retail</rp-description-item>
          <rp-description-item term="Email">finance@acme.my</rp-description-item>
          <rp-description-item term="Phone">+60 12-345 6789</rp-description-item>
        </rp-description-list>
      </div>
    `,
  }),
};

export const Drawer: Story = {
  render: () => ({
    props: { open: false },
    template: `
      <rp-button (click)="open = true">Edit merchant</rp-button>
      <rp-drawer [(open)]="open" title="Edit merchant" side="right">
        <rp-form-field label="Merchant name"><rp-input /></rp-form-field>
        <div style="height:12px"></div>
        <rp-form-field label="Email"><rp-input type="email" /></rp-form-field>
        <div rp-drawer-footer>
          <rp-button variant="secondary" (click)="open = false">Cancel</rp-button>
          <rp-button (click)="open = false">Save</rp-button>
        </div>
      </rp-drawer>
    `,
  }),
};
