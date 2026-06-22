import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RpButton } from '../button/rp-button';
import { RP_DIALOG_DATA, RpDialogRef } from './rp-dialog-ref';

export interface RpConfirmData {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

/** Built-in confirm dialog used by RpDialogService.confirm(). */
@Component({
  selector: 'rp-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpButton],
  template: `
    <div class="rp-dialog">
      <h2 class="rp-dialog__title">{{ data.title }}</h2>
      @if (data.message) {
        <p class="rp-dialog__msg">{{ data.message }}</p>
      }
      <div class="rp-dialog__actions">
        <rp-button variant="secondary" (click)="ref.close(false)">
          {{ data.cancelText ?? 'Cancel' }}
        </rp-button>
        <rp-button
          [variant]="data.danger ? 'danger' : 'primary'"
          (click)="ref.close(true)"
        >
          {{ data.confirmText ?? 'Confirm' }}
        </rp-button>
      </div>
    </div>
  `,
  styles: [
    `
      .rp-dialog {
        width: 100%;
        background: var(--rp-surface);
        border-radius: var(--rp-radius-lg);
        box-shadow: 0 20px 48px rgba(0, 0, 0, 0.24);
        padding: 22px;
        font-family: var(--rp-font-family-sans);
      }
      .rp-dialog__title {
        margin: 0;
        font-size: var(--rp-font-size-lg);
        font-weight: var(--rp-font-weight-medium);
        color: var(--rp-text);
      }
      .rp-dialog__msg {
        margin: 8px 0 0;
        font-size: var(--rp-font-size-base);
        color: var(--rp-text-muted);
        line-height: 1.5;
      }
      .rp-dialog__actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 22px;
      }
    `,
  ],
})
export class RpConfirmDialog {
  protected readonly ref = inject<RpDialogRef<boolean>>(RpDialogRef);
  protected readonly data = inject<RpConfirmData>(RP_DIALOG_DATA);
}
