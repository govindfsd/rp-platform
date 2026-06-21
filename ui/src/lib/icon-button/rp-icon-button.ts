import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export type RpIconButtonVariant = 'ghost' | 'solid' | 'outline';
export type RpIconButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'rp-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <button
      [class]="classes()"
      [disabled]="disabled()"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      type="button"
    >
      <rp-icon [name]="icon()" [size]="iconSize()" />
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-iconbtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: var(--rp-radius-md);
        cursor: pointer;
        color: var(--rp-text-muted);
        background: transparent;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .rp-iconbtn:hover:not(:disabled) {
        background: var(--rp-surface-sunken);
        color: var(--rp-text);
      }
      .rp-iconbtn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .rp-iconbtn--sm {
        width: 32px;
        height: 32px;
      }
      .rp-iconbtn--md {
        width: 40px;
        height: 40px;
      }
      .rp-iconbtn--lg {
        width: 48px;
        height: 48px;
      }
      .rp-iconbtn--solid {
        background: var(--rp-brand);
        color: var(--rp-text-on-brand);
      }
      .rp-iconbtn--solid:hover:not(:disabled) {
        background: var(--rp-brand-hover);
        color: var(--rp-text-on-brand);
      }
      .rp-iconbtn--outline {
        border-color: var(--rp-border-strong);
      }
    `,
  ],
})
export class RpIconButton {
  readonly icon = input.required<string>();
  readonly label = input<string>('');
  readonly variant = input<RpIconButtonVariant>('ghost');
  readonly size = input<RpIconButtonSize>('md');
  readonly disabled = input<boolean>(false);

  protected readonly iconSize = computed(() =>
    this.size() === 'sm' ? 18 : this.size() === 'lg' ? 24 : 20
  );
  protected readonly classes = computed(
    () => `rp-iconbtn rp-iconbtn--${this.variant()} rp-iconbtn--${this.size()}`
  );
}
