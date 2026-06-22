import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

@Component({
  selector: 'rp-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <header
      class="rp-topbar"
      [class.rp-topbar--brand]="variant() === 'brand'"
      [class.rp-topbar--compact]="compact()"
    >
      <div class="rp-topbar__start">
        <ng-content select="[topbar-leading]" />
        @if (logoImage()) {
          <img class="rp-topbar__logo-img" [src]="logoImage()" alt="logo" />
        } @else {
          <span class="rp-topbar__logo-badge">{{ logoInitial() }}</span>
        }
        @if (logoText()) {
          <span class="rp-topbar__logo-text">{{ logoText() }}</span>
        }
      </div>

      <div class="rp-topbar__end">
        <button class="rp-topbar__icon-btn" type="button" aria-label="Change language">
          <rp-icon name="globe" [size]="18" />
        </button>

        @if (userName()) {
          <div class="rp-topbar__user">
            <span class="rp-topbar__avatar">{{ userInitials() }}</span>
            @if (userEmail()) {
              <span class="rp-topbar__user-email">{{ userEmail() }}</span>
            }
            <rp-icon name="chevron-down" [size]="14" />
          </div>
        }

        <ng-content />
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        height: 52px;
        padding: 0 16px;
        background: var(--rp-surface);
        border-bottom: 1px solid var(--rp-border);
        box-sizing: border-box;
      }
      /* Brand (blue) variant */
      .rp-topbar--brand {
        background: var(--rp-brand);
        border-bottom: none;
      }
      .rp-topbar__start {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .rp-topbar__logo-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        border-radius: 7px;
        font-family: var(--rp-font-family-sans);
        font-weight: 600;
        font-size: 13px;
        /* In white variant: brand bg + white text */
        background: var(--rp-brand);
        color: var(--rp-text-on-brand);
      }
      /* In brand variant, badge inverts */
      .rp-topbar--brand .rp-topbar__logo-badge {
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
      }
      .rp-topbar__logo-img {
        height: 28px;
        width: auto;
        flex-shrink: 0;
      }
      .rp-topbar__logo-text {
        font-family: var(--rp-font-family-sans);
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.04em;
        color: var(--rp-text);
        white-space: nowrap;
      }
      .rp-topbar--brand .rp-topbar__logo-text {
        color: #fff;
      }
      .rp-topbar__end {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
      }
      .rp-topbar__icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: var(--rp-text-muted);
        cursor: pointer;
        transition: background-color 0.12s ease;
      }
      .rp-topbar__icon-btn:hover {
        background: var(--rp-surface-sunken);
      }
      .rp-topbar--brand .rp-topbar__icon-btn {
        color: rgba(255, 255, 255, 0.8);
      }
      .rp-topbar--brand .rp-topbar__icon-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .rp-topbar__user {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 10px 4px 4px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.12s ease;
      }
      .rp-topbar__user:hover {
        background: var(--rp-surface-sunken);
      }
      .rp-topbar--brand .rp-topbar__user:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .rp-topbar__avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        border-radius: 50%;
        font-family: var(--rp-font-family-sans);
        font-weight: 600;
        font-size: 11px;
        background: var(--rp-color-brand-700);
        color: #fff;
        border: 1.5px solid rgba(255, 255, 255, 0.25);
      }
      .rp-topbar__user-email {
        font-family: var(--rp-font-family-sans);
        font-size: 13px;
        color: var(--rp-text-muted);
        white-space: nowrap;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rp-topbar--brand .rp-topbar__user-email {
        color: rgba(255, 255, 255, 0.75);
      }
      .rp-topbar--brand .rp-topbar__end {
        color: rgba(255, 255, 255, 0.8);
      }
      /* Compact (mobile): drop the email, tighten spacing so it never overflows. */
      .rp-topbar--compact {
        gap: 8px;
        padding: 0 12px;
      }
      .rp-topbar--compact .rp-topbar__user {
        padding: 4px;
      }
      .rp-topbar--compact .rp-topbar__user-email {
        display: none;
      }
      /* Real narrow viewports adapt automatically too. */
      @media (max-width: 640px) {
        .rp-topbar__user-email {
          display: none;
        }
        .rp-topbar__user {
          padding: 4px;
        }
      }
    `,
  ],
})
export class RpTopbar {
  readonly variant = input<'white' | 'brand'>('brand');
  readonly logoText = input<string>('RinggitPay');
  readonly logoImage = input<string>('');
  readonly userName = input<string>('');
  readonly userEmail = input<string>('');
  /** Compact layout for mobile: hides the user email (kept in the menu). */
  readonly compact = input(false);

  protected readonly logoInitial = computed(() =>
    this.logoText().charAt(0).toUpperCase()
  );

  protected readonly userInitials = computed(() => {
    const name = this.userName().trim();
    if (!name) return '';
    const parts = name.split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  });
}
