import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RpStepper } from '../stepper/rp-stepper';
import { RpTimeline, RpTimelineItem } from '../timeline/rp-timeline';
import { RpAccordion, RpAccordionPanel } from '../accordion/rp-accordion';
import { RpPagination } from '../pagination/rp-pagination';

const meta: Meta = {
  title: 'Gallery/Layout & data',
  parameters: { layout: 'padded' },
  decorators: [
    moduleMetadata({
      imports: [
        RpStepper,
        RpTimeline,
        RpTimelineItem,
        RpAccordion,
        RpAccordionPanel,
        RpPagination,
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const Stepper: Story = {
  render: () => ({
    props: {
      steps: [
        { label: 'Business', description: 'Company details' },
        { label: 'Documents', description: 'KYC upload' },
        { label: 'Channels', description: 'Payment setup' },
        { label: 'Review' },
      ],
    },
    template: `<div style="max-width:680px"><rp-stepper [steps]="steps" [active]="1" /></div>`,
  }),
};

export const Timeline: Story = {
  render: () => ({
    template: `
      <div style="max-width:420px">
        <rp-timeline>
          <rp-timeline-item title="Invoice created" time="09:01" icon="file">INV-2024001 · RM 1,200</rp-timeline-item>
          <rp-timeline-item title="Sent to payer" time="09:02" icon="mail" variant="info">via Email</rp-timeline-item>
          <rp-timeline-item title="Payment received" time="11:48" icon="check" variant="success">RM 1,200 via FPX</rp-timeline-item>
          <rp-timeline-item title="Settlement pending" time="—" icon="refresh" variant="warning">T+1 settlement</rp-timeline-item>
        </rp-timeline>
      </div>
    `,
  }),
};

export const Accordion: Story = {
  render: () => ({
    template: `
      <div style="max-width:560px">
        <rp-accordion>
          <rp-accordion-panel title="Business details">Registered name, SSM number, industry.</rp-accordion-panel>
          <rp-accordion-panel title="Bank account">Settlement account for payouts.</rp-accordion-panel>
          <rp-accordion-panel title="Payment channels">FPX, Card, DuitNow QR, e-wallets.</rp-accordion-panel>
        </rp-accordion>
      </div>
    `,
  }),
};

export const Pagination: Story = {
  render: () => ({
    props: { page: 3 },
    template: `<rp-pagination [total]="247" [pageSize]="10" [(page)]="page" />`,
  }),
};
