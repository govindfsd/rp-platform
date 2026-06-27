import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RpIcon } from '../icon/rp-icon';

export interface RpBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'rp-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RpIcon],
  template: `
    <nav class="rp-breadcrumb" aria-label="Breadcrumb">
      @for (item of items(); track $index; let last = $last) {
        <span class="rp-breadcrumb__item" [class.rp-breadcrumb__item--current]="last">
          @if (item.href && !last) {
            <a [href]="item.href">{{ item.label }}</a>
          } @else {
            <span>{{ item.label }}</span>
          }
        </span>
        @if (!last) {
          <span class="rp-breadcrumb__sep"><rp-icon name="chevron-right" [size]="14" /></span>
        }
      }
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-breadcrumb {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-sm);
      }
      .rp-breadcrumb__item a {
        color: var(--rp-text-muted);
        text-decoration: none;
      }
      .rp-breadcrumb__item a:hover {
        color: var(--rp-brand);
      }
      .rp-breadcrumb__item--current {
        color: var(--rp-text);
        font-weight: var(--rp-font-weight-medium);
      }
      .rp-breadcrumb__sep {
        display: inline-flex;
        color: var(--rp-text-subtle);
      }
    `,
  ],
})
export class RpBreadcrumb {
  readonly items = input<RpBreadcrumbItem[]>([]);
}
