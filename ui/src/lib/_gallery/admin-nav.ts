import type { RpNavItem } from '../sidebar/rp-sidebar';

/**
 * Admin portal navigation tree (shared by the Admin shell + Sidebar stories).
 * Items marked "live" in their label are real-time / operational views.
 */
export const adminNav: RpNavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: 'dashboard',
    children: [
      { id: 'dash-overview', label: 'Overview', icon: 'dashboard' },
      { id: 'dash-live-ops', label: 'Live operations', icon: 'activity' },
      { id: 'dash-payments', label: 'Payments', icon: 'bank' },
      { id: 'dash-settlements', label: 'Settlements', icon: 'wallet' },
      { id: 'dash-merchants', label: 'Merchants', icon: 'store' },
    ],
  },
  {
    id: 'merchants',
    label: 'Merchants',
    icon: 'store',
    children: [
      { id: 'merchant-new', label: 'New merchant', icon: 'plus' },
      { id: 'merchant-list', label: 'Merchant list', icon: 'list' },
      { id: 'merchant-onboarding', label: 'Onboarding queue', icon: 'activity' },
      { id: 'merchant-kyc', label: 'KYC / approvals', icon: 'shield' },
      { id: 'merchant-documents', label: 'Documents', icon: 'invoice' },
      { id: 'merchant-risk', label: 'Suspended / risk', icon: 'alert-triangle' },
    ],
  },
  {
    id: 'gateways',
    label: 'Gateways',
    icon: 'globe',
    children: [
      { id: 'gateway-providers', label: 'Providers', icon: 'globe' },
      { id: 'gateway-channels', label: 'Channels', icon: 'layers' },
      { id: 'gateway-pricing', label: 'Provider pricing', icon: 'tag' },
      { id: 'gateway-routing', label: 'Routing rules', icon: 'mandate' },
      { id: 'gateway-health', label: 'Provider health', icon: 'activity' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: 'tag',
    children: [
      { id: 'pricing-plans', label: 'Pricing plans', icon: 'list' },
      { id: 'pricing-discounts', label: 'Discounts', icon: 'tag' },
      { id: 'pricing-offers', label: 'Offers', icon: 'tag' },
      { id: 'pricing-fees', label: 'Fee schedules', icon: 'report' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'bank',
    children: [
      { id: 'payments-transactions', label: 'Transactions', icon: 'list' },
      { id: 'payments-live', label: 'Live monitor', icon: 'activity' },
      { id: 'payments-authorizations', label: 'Authorizations', icon: 'check-circle' },
      { id: 'payments-refunds', label: 'Refunds', icon: 'refresh' },
      { id: 'payments-disputes', label: 'Disputes / chargebacks', icon: 'alert-triangle' },
      { id: 'payments-links', label: 'Payment links', icon: 'link' },
    ],
  },
  {
    id: 'mandates',
    label: 'Mandates',
    icon: 'mandate',
    children: [
      { id: 'mandate-list', label: 'Mandates', icon: 'mandate' },
      { id: 'mandate-runs', label: 'Collection runs', icon: 'activity' },
      { id: 'mandate-failures', label: 'Failures / retries', icon: 'alert-circle' },
    ],
  },
  {
    id: 'settlements',
    label: 'Settlements',
    icon: 'wallet',
    children: [
      { id: 'settlement-list', label: 'Settlements', icon: 'wallet' },
      { id: 'settlement-batches', label: 'Settlement batches', icon: 'layers' },
      { id: 'settlement-payouts', label: 'Payouts', icon: 'bank' },
      { id: 'settlement-recon', label: 'Reconciliation', icon: 'refresh' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: 'activity',
    children: [
      { id: 'monitor-feed', label: 'Live transaction feed', icon: 'activity' },
      { id: 'monitor-webhooks', label: 'Webhooks & events', icon: 'zap' },
      { id: 'monitor-alerts', label: 'Alerts & incidents', icon: 'bell' },
      { id: 'monitor-queues', label: 'Queues / DLQ', icon: 'layers' },
      { id: 'monitor-health', label: 'System health', icon: 'check-circle' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'report',
    children: [
      { id: 'report-transactions', label: 'Transactions', icon: 'list' },
      { id: 'report-settlements', label: 'Settlements', icon: 'wallet' },
      { id: 'report-merchants', label: 'Merchants', icon: 'store' },
      { id: 'report-revenue', label: 'Revenue / fees', icon: 'chart' },
      { id: 'report-scheduled', label: 'Scheduled reports', icon: 'calendar' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'chart',
    children: [
      { id: 'analytics-payments', label: 'Payment analytics', icon: 'chart' },
      { id: 'analytics-success', label: 'Success / decline rates', icon: 'activity' },
      { id: 'analytics-merchants', label: 'Merchant analytics', icon: 'store' },
      { id: 'analytics-volume', label: 'Volume trends', icon: 'chart' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
    children: [
      { id: 'users-list', label: 'Users', icon: 'users' },
      { id: 'users-roles', label: 'Roles & permissions', icon: 'shield' },
      { id: 'users-audit', label: 'Activity / audit log', icon: 'eye' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    children: [
      { id: 'settings-org', label: 'Organization', icon: 'settings' },
      { id: 'settings-api', label: 'API keys & webhooks', icon: 'zap' },
      { id: 'settings-notifications', label: 'Notifications', icon: 'bell' },
      { id: 'settings-system', label: 'System config', icon: 'settings' },
    ],
  },
];
