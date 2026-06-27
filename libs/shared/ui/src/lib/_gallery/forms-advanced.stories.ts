import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpFormField } from '../form-field/rp-form-field';
import { RpOtpInput } from '../otp-input/rp-otp-input';
import { RpPasswordInput } from '../password-input/rp-password-input';
import { RpSearchInput } from '../search-input/rp-search-input';
import { RpFileUpload } from '../file-upload/rp-file-upload';
import { RpCombobox } from '../combobox/rp-combobox';
import { RpDateRangePicker } from '../date-range/rp-date-range-picker';

const meta: Meta = {
  title: 'Gallery/Forms — advanced',
  parameters: { layout: 'centered' },
  decorators: [
    moduleMetadata({
      imports: [
        RpFormField,
        RpOtpInput,
        RpPasswordInput,
        RpSearchInput,
        RpFileUpload,
        RpCombobox,
        RpDateRangePicker,
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj;

const banks = [
  { label: 'Maybank', value: 'MBB' },
  { label: 'CIMB Bank', value: 'CIMB' },
  { label: 'Public Bank', value: 'PBB' },
  { label: 'RHB Bank', value: 'RHB' },
  { label: 'Hong Leong Bank', value: 'HLB' },
  { label: 'Bank Islam', value: 'BIMB' },
];

export const All: Story = {
  render: () => ({
    props: { banks },
    template: `
      <div style="width:440px;display:flex;flex-direction:column;gap:18px">
        <rp-form-field label="One-time code"><rp-otp-input [length]="6" /></rp-form-field>
        <rp-form-field label="Password"><rp-password-input placeholder="Enter password" /></rp-form-field>
        <rp-form-field label="Search"><rp-search-input placeholder="Search merchants…" /></rp-form-field>
        <rp-form-field label="Bank"><rp-combobox [options]="banks" placeholder="Type to search bank…" /></rp-form-field>
        <rp-form-field label="Report period"><rp-date-range-picker /></rp-form-field>
        <rp-form-field label="KYC documents"><rp-file-upload [multiple]="true" accept=".pdf,.png,.jpg" /></rp-form-field>
      </div>
    `,
  }),
};
