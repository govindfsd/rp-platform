import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Key–value description list for detail views (merchant, transaction).
 *   <rp-description-list [columns]="2">
 *     <rp-description-item term="MID">M0000142</rp-description-item>
 *     <rp-description-item term="Status"><rp-badge>Active</rp-badge></rp-description-item>
 *   </rp-description-list>
 */
@Component({
  selector: 'rp-description-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--rp-dl-cols]': 'columns()',
  },
  template: `<dl class="rp-dl"><ng-content /></dl>`,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-dl {
        display: grid;
        grid-template-columns: repeat(var(--rp-dl-cols, 1), minmax(0, 1fr));
        gap: 14px 24px;
        margin: 0;
      }
    `,
  ],
})
export class RpDescriptionList {
  readonly columns = input<number>(2);
}

@Component({
  selector: 'rp-description-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dt class="rp-dl__term">{{ term() }}</dt>
    <dd class="rp-dl__desc"><ng-content /></dd>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .rp-dl__term {
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-xs);
        color: var(--rp-text-muted);
        margin: 0 0 3px;
      }
      .rp-dl__desc {
        font-family: var(--rp-font-family-sans);
        font-size: var(--rp-font-size-base);
        color: var(--rp-text);
        margin: 0;
        word-break: break-word;
      }
    `,
  ],
})
export class RpDescriptionItem {
  readonly term = input<string>('');
}
