import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  CanvasRenderer,
]);

export type RpChartType = 'line' | 'area' | 'bar' | 'stacked' | 'donut' | 'pie';

export interface RpChartSeries {
  name: string;
  data: number[];
}

/** Pie/donut single-series datum. */
export interface RpChartSlice {
  name: string;
  value: number;
}

/**
 * Charts for dashboards & reports, wrapping Apache ECharts and themed to the
 * @ringgit-pay/design tokens (so it tracks light/dark). Pass `categories` + `series`
 * for cartesian charts, or `slices` for pie/donut. Use `option` to override
 * with a raw ECharts option for anything bespoke.
 */
@Component({
  selector: 'rp-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #host class="rp-chart" [style.height]="height()"></div>`,
  styles: [
    `
      :host { display: block; }
      .rp-chart { width: 100%; }
    `,
  ],
})
export class RpChart {
  private readonly hostEl = viewChild.required<ElementRef<HTMLElement>>('host');

  readonly type = input<RpChartType>('line');
  readonly categories = input<string[]>([]);
  readonly series = input<RpChartSeries[]>([]);
  readonly slices = input<RpChartSlice[]>([]);
  readonly height = input<string>('300px');
  readonly showLegend = input<boolean>(true);
  /** Raw ECharts option override — bypasses the presets when set. */
  readonly option = input<EChartsOption | null>(null);

  private chart: ReturnType<typeof echarts.init> | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.chart = echarts.init(this.hostEl().nativeElement);
      this.render();
      this.resizeObserver = new ResizeObserver(() => this.chart?.resize());
      this.resizeObserver.observe(this.hostEl().nativeElement);
    });

    // Re-render whenever inputs change (no-op until the chart exists).
    effect(() => {
      this.type();
      this.categories();
      this.series();
      this.slices();
      this.option();
      this.showLegend();
      this.render();
    });

    inject(DestroyRef).onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.chart?.dispose();
    });
  }

  private render(): void {
    if (!this.chart) return;
    this.chart.setOption(this.option() ?? this.buildOption(), true);
  }

  private cssVar(name: string): string {
    return getComputedStyle(this.hostEl().nativeElement)
      .getPropertyValue(name)
      .trim();
  }

  private palette(): string[] {
    return [
      this.cssVar('--rp-color-brand-600') || '#2563EB',
      this.cssVar('--rp-color-success-500') || '#10B981',
      this.cssVar('--rp-color-warning-500') || '#F59E0B',
      this.cssVar('--rp-color-info-500') || '#3B82F6',
      this.cssVar('--rp-color-brand-300') || '#93C5FD',
      this.cssVar('--rp-color-danger-500') || '#EF4444',
    ];
  }

  private buildOption(): EChartsOption {
    const textColor = this.cssVar('--rp-text-muted') || '#64748B';
    const lineColor = this.cssVar('--rp-border') || '#E2E8F0';
    const type = this.type();

    const base: EChartsOption = {
      color: this.palette(),
      textStyle: { fontFamily: this.cssVar('--rp-font-family-sans') || 'inherit' },
      tooltip: { trigger: type === 'pie' || type === 'donut' ? 'item' : 'axis' },
      legend: this.showLegend()
        ? { bottom: 0, textStyle: { color: textColor } }
        : undefined,
      grid: { left: 8, right: 12, top: 16, bottom: this.showLegend() ? 36 : 12, containLabel: true },
    };

    if (type === 'pie' || type === 'donut') {
      return {
        ...base,
        series: [
          {
            type: 'pie',
            radius: type === 'donut' ? ['55%', '78%'] : '72%',
            center: ['50%', '46%'],
            label: { color: textColor },
            data: this.slices(),
          },
        ],
      };
    }

    const isArea = type === 'area';
    const isBar = type === 'bar' || type === 'stacked';
    const isStacked = type === 'stacked';

    return {
      ...base,
      xAxis: {
        type: 'category',
        data: this.categories(),
        axisLine: { lineStyle: { color: lineColor } },
        axisLabel: { color: textColor },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: lineColor } },
        axisLabel: { color: textColor },
      },
      series: this.series().map((s) => ({
        name: s.name,
        type: isBar ? 'bar' : 'line',
        stack: isStacked ? 'total' : undefined,
        smooth: !isBar,
        areaStyle: isArea ? { opacity: 0.12 } : undefined,
        showSymbol: false,
        barMaxWidth: 28,
        data: s.data,
      })),
    };
  }
}
