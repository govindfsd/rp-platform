import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { RpButton } from '../button/rp-button';
import { RpToastService } from '../toast/rp-toast.service';
import { RpDialogService } from '../dialog/rp-dialog.service';

@Component({
  selector: 'rp-feedback-demo',
  standalone: true,
  imports: [RpButton],
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:10px;font-family:var(--rp-font-family-sans)">
      <rp-button variant="primary" (click)="toast.success('Merchant approved')">Success toast</rp-button>
      <rp-button variant="danger" (click)="toast.error('Could not void transaction')">Error toast</rp-button>
      <rp-button variant="secondary" (click)="toast.info('Settlement file generating…')">Info toast</rp-button>
      <rp-button variant="secondary"
        (click)="toast.warning('Mandate expires in 3 days', { action: { label: 'Renew', run: notify } })">
        Warning + action
      </rp-button>
      <rp-button (click)="askDelete()">Confirm dialog</rp-button>
    </div>
    @if (lastResult) {
      <p style="margin-top:14px;color:var(--rp-text-muted);font-family:var(--rp-font-family-sans)">
        Last confirm result: {{ lastResult }}
      </p>
    }
  `,
})
class FeedbackDemo {
  protected readonly toast = inject(RpToastService);
  private readonly dialog = inject(RpDialogService);
  protected lastResult = '';

  protected readonly notify = () => this.toast.success('Renewal started');

  protected async askDelete(): Promise<void> {
    const ok = await this.dialog.confirm({
      title: 'Void this transaction?',
      message: 'This cannot be undone. The payer will be notified.',
      confirmText: 'Void transaction',
      danger: true,
    });
    this.lastResult = ok ? 'confirmed' : 'cancelled';
  }
}

const meta: Meta = {
  title: 'Gallery/Feedback',
  parameters: { layout: 'centered' },
  decorators: [moduleMetadata({ imports: [FeedbackDemo] })],
};
export default meta;

type Story = StoryObj;

export const ToastsAndDialog: Story = {
  render: () => ({ template: `<rp-feedback-demo />` }),
};
