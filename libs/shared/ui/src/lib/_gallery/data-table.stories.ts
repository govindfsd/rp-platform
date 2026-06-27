import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpDataTable } from '../data-table/rp-data-table';
import { RpCellDef } from '../data-table/rp-cell-def.directive';
import { RpRowDetailDef } from '../data-table/rp-row-detail.directive';
import { RpColumnDef } from '../data-table/rp-data-table.types';
import { RpBadge } from '../badge/rp-badge';
import { RpButton } from '../button/rp-button';

interface Txn extends Record<string, unknown> {
  ref: string;
  merchant: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}

const columns: RpColumnDef<Txn>[] = [
  { key: 'ref', header: 'Reference', sortable: true },
  { key: 'merchant', header: 'Merchant', sortable: true, filter: 'text' },
  {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    align: 'right',
    cell: (r) => 'RM ' + r.amount.toLocaleString('en-MY', { minimumFractionDigits: 2 }),
  },
  {
    key: 'method',
    header: 'Method',
    filter: 'select',
    hideOnMobile: true,
    filterOptions: [
      { label: 'FPX', value: 'FPX' },
      { label: 'Card', value: 'Card' },
      { label: 'Wallet', value: 'Wallet' },
    ],
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filter: 'select',
    filterOptions: [
      { label: 'Paid', value: 'Paid' },
      { label: 'Pending', value: 'Pending' },
      { label: 'Failed', value: 'Failed' },
    ],
  },
  { key: 'date', header: 'Date', sortable: true, hideOnMobile: true },
  { key: 'actions', header: '', align: 'right' },
];

const methods = ['FPX', 'Card', 'Wallet'];
const statuses = ['Paid', 'Pending', 'Failed'];
const merchants = ['Acme Sdn Bhd', 'Kopi Co', 'Mega Mart', 'Zen Studios', 'Bluewave'];
const rows: Txn[] = Array.from({ length: 47 }, (_, i) => ({
  ref: 'TXN-' + (10240 + i),
  merchant: merchants[i % merchants.length],
  amount: Math.round((50 + Math.random() * 9950) * 100) / 100,
  method: methods[i % methods.length],
  status: statuses[i % statuses.length],
  date: '2026-06-' + String((i % 28) + 1).padStart(2, '0'),
}));

const bigRows: Txn[] = Array.from({ length: 10000 }, (_, i) => ({
  ref: 'TXN-' + (100000 + i),
  merchant: merchants[i % merchants.length],
  amount: Math.round((50 + ((i * 37) % 9950)) * 100) / 100,
  method: methods[i % methods.length],
  status: statuses[i % statuses.length],
  date: '2026-06-' + String((i % 28) + 1).padStart(2, '0'),
}));

const badgeVariant = (s: string) =>
  s === 'Paid' ? 'success' : s === 'Pending' ? 'warning' : 'danger';

const meta: Meta<RpDataTable> = {
  title: 'Gallery/Data table',
  component: RpDataTable,
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [RpDataTable, RpCellDef, RpRowDetailDef, RpBadge, RpButton],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const Transactions: Story = {
  render: () => ({
    props: { columns, rows, badgeVariant },
    template: `
      <div style="max-width:980px">
        <rp-data-table [columns]="columns" [rows]="rows" [striped]="true"
          [selectable]="true" [expandable]="true"
          [columnManager]="true" [resizable]="true" [exportable]="true"
          exportFilename="transactions"
          [stickyHeader]="true" maxHeight="440px">
          <div rp-bulk-actions style="display:flex;gap:8px">
            <rp-button variant="secondary" size="sm">Export</rp-button>
            <rp-button variant="danger" size="sm">Void</rp-button>
          </div>
          <ng-template rpCell="status" let-value="value">
            <rp-badge [variant]="badgeVariant(value)">{{ value }}</rp-badge>
          </ng-template>
          <ng-template rpCell="actions" let-row>
            <rp-button variant="ghost" size="sm">View</rp-button>
          </ng-template>
          <ng-template rpRowDetail let-row>
            <div style="display:flex;gap:32px;font-size:13px;color:var(--rp-text)">
              <div><div style="color:var(--rp-text-muted)">Reference</div>{{ row.ref }}</div>
              <div><div style="color:var(--rp-text-muted)">Merchant</div>{{ row.merchant }}</div>
              <div><div style="color:var(--rp-text-muted)">Method</div>{{ row.method }}</div>
              <div><div style="color:var(--rp-text-muted)">Date</div>{{ row.date }}</div>
            </div>
          </ng-template>
        </rp-data-table>
      </div>
    `,
  }),
};

export const Compact: Story = {
  render: () => ({
    props: { columns, rows, badgeVariant },
    template: `
      <div style="max-width:980px">
        <rp-data-table [columns]="columns" [rows]="rows" density="compact" [striped]="true">
          <ng-template rpCell="status" let-value="value">
            <rp-badge [variant]="badgeVariant(value)">{{ value }}</rp-badge>
          </ng-template>
          <ng-template rpCell="actions" let-row>
            <rp-button variant="ghost" size="sm">View</rp-button>
          </ng-template>
        </rp-data-table>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    props: { columns, rows: [] },
    template: `<div style="max-width:980px"><rp-data-table [columns]="columns" [rows]="rows" [loading]="true" /></div>`,
  }),
};

export const Empty: Story = {
  render: () => ({
    props: { columns, rows: [] },
    template: `<div style="max-width:980px"><rp-data-table [columns]="columns" [rows]="rows" /></div>`,
  }),
};

export const VirtualScroll: Story = {
  name: 'Virtual scroll (10k rows)',
  render: () => ({
    props: { columns, rows: bigRows, badgeVariant },
    template: `
      <div style="max-width:980px">
        <rp-data-table [columns]="columns" [rows]="rows" [virtualScroll]="true"
          viewportHeight="460px" [selectable]="true" [striped]="true">
          <ng-template rpCell="status" let-value="value">
            <rp-badge [variant]="badgeVariant(value)">{{ value }}</rp-badge>
          </ng-template>
          <ng-template rpCell="actions" let-row>
            <rp-button variant="ghost" size="sm">View</rp-button>
          </ng-template>
        </rp-data-table>
      </div>
    `,
  }),
};
