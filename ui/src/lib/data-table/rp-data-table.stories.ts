import type { Meta, StoryObj } from '@storybook/angular';
import { RpDataTable } from './rp-data-table';
import { RpColumnDef } from './rp-data-table.types';

interface Batch extends Record<string, unknown> {
  id: number;
  batch: string;
  invoices: number;
  total: string;
  progress: string;
  status: string;
}

const columns: RpColumnDef<Batch>[] = [
  { key: 'batch', header: 'Batch', sortable: true },
  { key: 'invoices', header: 'Invoices', sortable: true, align: 'right' },
  { key: 'total', header: 'Total', sortable: true, align: 'right' },
  { key: 'progress', header: 'Progress', align: 'right' },
  { key: 'status', header: 'Status', filter: 'select', filterOptions: [
    { label: 'Active', value: 'Active' },
    { label: 'Overdue', value: 'Overdue' },
    { label: 'Closed', value: 'Closed' },
  ] },
];

const rows: Batch[] = [
  { id: 1, batch: 'Jan 2024', invoices: 12, total: 'RM 18,400.00', progress: '83%', status: 'Active' },
  { id: 2, batch: 'Feb 2024', invoices: 9, total: 'RM 12,600.00', progress: '100%', status: 'Closed' },
  { id: 3, batch: 'Mar 2024', invoices: 14, total: 'RM 31,500.00', progress: '60%', status: 'Overdue' },
  { id: 4, batch: 'Apr 2024', invoices: 13, total: 'RM 31,700.00', progress: '47%', status: 'Active' },
];

const meta: Meta<RpDataTable<Batch>> = {
  title: 'Components/Data table',
  component: RpDataTable,
  tags: ['autodocs'],
  render: (args) => ({
    props: { ...args, columns, rows, rowId: (r: Batch) => r.id },
    template: `<rp-data-table
      [columns]="columns"
      [rows]="rows"
      [rowId]="rowId"
      [selectable]="selectable"
      [columnManager]="columnManager"
      [exportable]="exportable"
      [striped]="striped" />`,
  }),
};
export default meta;

type Story = StoryObj<RpDataTable<Batch>>;

export const Default: Story = { args: { striped: true } };
export const Selectable: Story = { args: { selectable: true, striped: true } };
export const FullToolkit: Story = {
  args: { selectable: true, columnManager: true, exportable: true, striped: true },
};
