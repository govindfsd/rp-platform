import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { RpFormField } from '../form-field/rp-form-field';
import { RpInput } from '../input/rp-input';
import { RpSelect } from '../select/rp-select';
import { RpPhoneInput } from '../phone-input/rp-phone-input';
import { RpSegmentedControl } from '../segmented/rp-segmented-control';
import { RpButton } from '../button/rp-button';
import { RpIcon } from '../icon/rp-icon';
import { merchantWizardSteps } from './merchant-wizard';

const meta: Meta = {
  title: 'Gallery/Merchant wizard',
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        RpFormField,
        RpInput,
        RpSelect,
        RpPhoneInput,
        RpSegmentedControl,
        RpButton,
        RpIcon,
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const NewMerchant: Story = {
  name: 'New merchant — step 1 (profile)',
  render: () => ({
    props: {
      steps: merchantWizardSteps,
      current: 0,
      merchantType: 'company',
      typeSegs: [
        { label: 'Company', value: 'company', icon: 'store' },
        { label: 'Individual', value: 'individual', icon: 'users' },
      ],
      idTypes: [
        { label: 'SSM (Company)', value: 'ssm' },
        { label: 'NRIC', value: 'nric' },
        { label: 'Passport', value: 'passport' },
      ],
      states: [
        { label: 'Selangor', value: 'sgr' },
        { label: 'Kuala Lumpur', value: 'kul' },
        { label: 'Penang', value: 'png' },
        { label: 'Johor', value: 'jhr' },
      ],
    },
    template: `
      <div style="display:flex;height:680px;background:var(--rp-surface-muted);font-family:var(--rp-font-family-sans)">
        <aside style="width:284px;background:var(--rp-surface);border-right:1px solid var(--rp-border);padding:20px 16px;overflow:auto;flex-shrink:0">
          <div style="font-size:16px;font-weight:600;color:var(--rp-text)">New merchant</div>
          <div style="font-size:12px;color:var(--rp-text-muted);margin-bottom:16px">Step {{ current + 1 }} of {{ steps.length }}</div>
          @for (s of steps; track s.id; let i = $index) {
            <div style="display:flex;gap:12px;padding:7px 0">
              <div
                [style.background]="i <= current ? 'var(--rp-brand)' : 'var(--rp-surface-sunken)'"
                [style.color]="i <= current ? '#fff' : 'var(--rp-text-muted)'"
                style="width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:600"
              >
                @if (i < current) { <rp-icon name="check" [size]="15" /> } @else { {{ i + 1 }} }
              </div>
              <div style="min-width:0">
                <div [style.color]="i === current ? 'var(--rp-text)' : 'var(--rp-text-muted)'" style="font-size:13px;font-weight:500">{{ s.label }}</div>
                <div style="font-size:11px;color:var(--rp-text-subtle)">{{ s.description }}</div>
              </div>
            </div>
          }
        </aside>

        <section style="flex:1;display:flex;flex-direction:column;min-width:0">
          <div style="flex:1;overflow:auto;padding:24px 28px">
            <div style="font-size:18px;font-weight:600;color:var(--rp-text)">Merchant profile</div>
            <div style="font-size:13px;color:var(--rp-text-muted);margin-bottom:20px">Company, identification and contact details.</div>

            <div style="max-width:680px;display:flex;flex-direction:column;gap:16px">
              <rp-form-field label="Merchant type" [required]="true">
                <rp-segmented-control [segments]="typeSegs" [(ngModel)]="merchantType" />
              </rp-form-field>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <rp-form-field label="Registered name" [required]="true">
                  <rp-input placeholder="e.g. Acme Sdn Bhd" />
                </rp-form-field>
                <rp-form-field label="ID type" [required]="true">
                  <rp-select [options]="idTypes" placeholder="Select ID type" />
                </rp-form-field>
                <rp-form-field label="Registration / ID no." [required]="true">
                  <rp-input placeholder="e.g. 201901000123" />
                </rp-form-field>
                <rp-form-field label="Contact person" [required]="true">
                  <rp-input placeholder="Full name" />
                </rp-form-field>
                <rp-form-field label="Email" [required]="true">
                  <rp-input type="email" placeholder="merchant@email.com" />
                </rp-form-field>
                <rp-form-field label="Phone" [required]="true">
                  <rp-phone-input />
                </rp-form-field>
                <rp-form-field label="Address" style="grid-column:1 / -1">
                  <rp-input placeholder="Street address" />
                </rp-form-field>
                <rp-form-field label="State">
                  <rp-select [options]="states" placeholder="Select state" />
                </rp-form-field>
                <rp-form-field label="Industry">
                  <rp-input placeholder="e.g. Retail" />
                </rp-form-field>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:12px;padding:14px 28px;border-top:1px solid var(--rp-border);background:var(--rp-surface)">
            <rp-button variant="ghost" [disabled]="true">Back</rp-button>
            <span style="margin-left:auto"></span>
            <rp-button variant="secondary">Save draft</rp-button>
            <rp-button>Next: Application &amp; channels</rp-button>
          </div>
        </section>
      </div>
    `,
  }),
};
