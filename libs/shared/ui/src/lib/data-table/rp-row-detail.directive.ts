import { Directive, TemplateRef, inject } from '@angular/core';

/**
 * Marks the expandable detail-row template for a data table.
 * Context: `$implicit` = row.
 *
 *   <rp-data-table [expandable]="true" ...>
 *     <ng-template rpRowDetail let-row>…details for {{ row.ref }}…</ng-template>
 *   </rp-data-table>
 */
@Directive({ selector: '[rpRowDetail]' })
export class RpRowDetailDef {
  readonly template = inject(TemplateRef);
}
