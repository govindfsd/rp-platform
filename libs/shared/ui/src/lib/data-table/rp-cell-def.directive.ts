import { Directive, TemplateRef, inject, input } from '@angular/core';

/**
 * Registers a custom cell template for a column, keyed by the column `key`.
 * Context: `$implicit` = row, `value` = formatted cell value, `col` = column def.
 *
 *   <rp-data-table [columns]="cols" [rows]="rows">
 *     <ng-template rpCell="status" let-row let-value="value">
 *       <rp-badge [variant]="...">{{ value }}</rp-badge>
 *     </ng-template>
 *   </rp-data-table>
 */
@Directive({ selector: '[rpCell]' })
export class RpCellDef {
  /** Column key this template renders. */
  readonly rpCell = input.required<string>();
  readonly template = inject(TemplateRef);
}
