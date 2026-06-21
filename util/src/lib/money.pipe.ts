import { Pipe, PipeTransform } from '@angular/core';
import { FormatMoneyOptions, formatMoney } from './money';

/**
 * Format a monetary amount in templates.
 *
 *   {{ invoice.total | rpMoney }}                     → "RM 1,234.50"
 *   {{ amountCents | rpMoney: { minor: true } }}      → from integer cents
 *   {{ usd | rpMoney: { currency: 'USD', locale: 'en-US' } }}
 */
@Pipe({ name: 'rpMoney' })
export class RpMoneyPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    options: FormatMoneyOptions = {}
  ): string {
    return formatMoney(value, options);
  }
}
