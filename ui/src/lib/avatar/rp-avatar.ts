import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type RpAvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'rp-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="rp-avatar" [class]="'rp-avatar--' + size()">
      @if (src()) {
        <img [src]="src()" [alt]="name()" />
      } @else {
        <span class="rp-avatar__initials">{{ initials() }}</span>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .rp-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        background: var(--rp-color-brand-50);
        color: var(--rp-color-brand-700);
        font-family: var(--rp-font-family-sans);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .rp-avatar--sm {
        width: 28px;
        height: 28px;
        font-size: var(--rp-font-size-xs);
      }
      .rp-avatar--md {
        width: 36px;
        height: 36px;
        font-size: var(--rp-font-size-sm);
      }
      .rp-avatar--lg {
        width: 48px;
        height: 48px;
        font-size: var(--rp-font-size-lg);
      }
    `,
  ],
})
export class RpAvatar {
  readonly name = input<string>('');
  readonly src = input<string>('');
  readonly size = input<RpAvatarSize>('md');

  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('')
  );
}
