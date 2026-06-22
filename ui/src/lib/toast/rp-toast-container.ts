import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';
import { RpToastService, RpToastType } from './rp-toast.service';

const ICON: Record<RpToastType, string> = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'info-circle',
  warning: 'alert-triangle',
};

/** Renders the live toast stack. Attached once into a global overlay. */
@Component({
  selector: 'rp-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <div class="rp-toasts">
      @for (t of service.toasts(); track t.id) {
        <div class="rp-toast" [class]="'rp-toast--' + t.type" role="status">
          <rp-icon class="rp-toast__icon" [name]="icon(t.type)" [size]="18" />
          <span class="rp-toast__msg">{{ t.message }}</span>
          @if (t.action) {
            <button
              type="button"
              class="rp-toast__action"
              (click)="t.action!.run(); service.dismiss(t.id)"
            >
              {{ t.action.label }}
            </button>
          }
          <button
            type="button"
            class="rp-toast__close"
            aria-label="Dismiss"
            (click)="service.dismiss(t.id)"
          >
            <rp-icon name="x" [size]="15" />
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .rp-toasts {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 360px;
        max-width: calc(100vw - 32px);
      }
      .rp-toast {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 12px 12px 14px;
        background: var(--rp-surface);
        border: 1px solid var(--rp-border);
        border-left: 3px solid var(--rp-border-strong);
        border-radius: var(--rp-radius-md);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
        font-family: var(--rp-font-family-sans);
        animation: rp-toast-in 0.18s ease;
      }
      @keyframes rp-toast-in {
        from {
          opacity: 0;
          transform: translateX(12px);
        }
      }
      .rp-toast--success {
        border-left-color: var(--rp-success);
      }
      .rp-toast--success .rp-toast__icon {
        color: var(--rp-success);
      }
      .rp-toast--error {
        border-left-color: var(--rp-danger);
      }
      .rp-toast--error .rp-toast__icon {
        color: var(--rp-danger);
      }
      .rp-toast--warning {
        border-left-color: var(--rp-warning);
      }
      .rp-toast--warning .rp-toast__icon {
        color: var(--rp-warning);
      }
      .rp-toast--info {
        border-left-color: var(--rp-info);
      }
      .rp-toast--info .rp-toast__icon {
        color: var(--rp-info);
      }
      .rp-toast__msg {
        flex: 1;
        min-width: 0;
        font-size: var(--rp-font-size-sm);
        color: var(--rp-text);
      }
      .rp-toast__action {
        border: 0;
        background: transparent;
        color: var(--rp-brand);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
        font-weight: var(--rp-font-weight-medium);
        cursor: pointer;
        padding: 4px 6px;
        flex-shrink: 0;
      }
      .rp-toast__close {
        display: inline-flex;
        border: 0;
        background: transparent;
        color: var(--rp-text-subtle);
        cursor: pointer;
        padding: 2px;
        flex-shrink: 0;
      }
      .rp-toast__close:hover {
        color: var(--rp-text);
      }
    `,
  ],
})
export class RpToastContainer {
  protected readonly service = inject(RpToastService);
  protected icon(type: RpToastType): string {
    return ICON[type];
  }
}
