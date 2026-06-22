import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

/**
 * Copy-to-clipboard button. Shows a check + "Copied" briefly after success.
 * For API keys, MIDs, transaction references.
 */
@Component({
  selector: 'rp-copy-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <button
      type="button"
      class="rp-copy"
      [class.rp-copy--done]="copied()"
      [attr.aria-label]="copied() ? 'Copied' : 'Copy'"
      (click)="copy()"
    >
      <rp-icon [name]="copied() ? 'check' : 'copy'" [size]="size()" />
      @if (label()) {
        <span>{{ copied() ? copiedLabel() : label() }}</span>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-copy {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 8px;
        border: 0;
        border-radius: var(--rp-radius-sm);
        background: transparent;
        color: var(--rp-text-muted);
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
        cursor: pointer;
        transition: background-color 0.12s ease, color 0.12s ease;
      }
      .rp-copy:hover {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-copy--done {
        color: var(--rp-success-text);
      }
    `,
  ],
})
export class RpCopyButton {
  readonly value = input<string>('');
  readonly label = input<string>('');
  readonly copiedLabel = input<string>('Copied');
  readonly size = input<number>(16);

  protected readonly copied = signal(false);
  protected readonly hasLabel = computed(() => !!this.label());

  protected async copy(): Promise<void> {
    const text = this.value();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-secure contexts
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1500);
  }
}
