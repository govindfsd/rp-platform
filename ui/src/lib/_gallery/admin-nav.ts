import type { RpNavItem } from '../sidebar/rp-sidebar';

/**
 * Admin portal navigation tree (shared by the Admin shell + Sidebar stories).
 * Leaf `appRoute` values are the route paths AND the screen-permission keys
 * (mirrors the legacy `Screen.AppRoute` RBAC) — pass the user's granted routes
 * to `filterNavByScreens` to hide screens they can't access.
 * Items labelled "live" are real-time / operational views.
 */
export const adminNav: RpNavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: 'dashboard',
    children: [
      { id: 'dash-overview', label: 'Overview', icon: 'dashboard', appRoute: 'dashboards/overview' },
      { id: 'dash-live-ops', label: 'Live operations', icon: 'activity', appRoute: 'dashboards/live-ops' },
      { id: 'dash-payments', label: 'Payments', icon: 'bank', appRoute: 'dashboards/payments' },
      { id: 'dash-settlements', label: 'Settlements', icon: 'wallet', appRoute: 'dashboards/settlements' },
      { id: 'dash-merchants', label: 'Merchants', icon: 'store', appRoute: 'dashboards/merchants' },
    ],
  },
  {
    id: 'merchants',
    label: 'Merchants',
    icon: 'store',
    children: [
      { id: 'merchant-new', label: 'New merchant', icon: 'plus', appRoute: 'merchants/new' },
      { id: 'merchant-list', label: 'Merchant list', icon: 'list', appRoute: 'merchants/list' },
      { id: 'merchant-onboarding', label: 'Onboarding queue', icon: 'activity', appRoute: 'merchants/onboarding' },
      { id: 'merchant-kyc', label: 'KYC / approvals', icon: 'shield', appRoute: 'merchants/kyc' },
      { id: 'merchant-documents', label: 'Documents', icon: 'invoice', appRoute: 'merchants/documents' },
      { id: 'merchant-risk', label: 'Suspended / risk', icon: 'alert-triangle', appRoute: 'merchants/risk' },
    ],
  },
  {
    id: 'gateways',
    label: 'Gateways',
    icon: 'globe',
    children: [
      { id: 'gateway-providers', label: 'Providers', icon: 'globe', appRoute: 'gateways/providers' },
      { id: 'gateway-channels', label: 'Channels', icon: 'layers', appRoute: 'gateways/channels' },
      { id: 'gateway-pricing', label: 'Provider pricing', icon: 'tag', appRoute: 'gateways/pricing' },
      { id: 'gateway-routing', label: 'Routing rules', icon: 'mandate', appRoute: 'gateways/routing' },
      { id: 'gateway-health', label: 'Provider health', icon: 'activity', appRoute: 'gateways/health' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: 'tag',
    children: [
      { id: 'pricing-plans', label: 'Pricing plans', icon: 'list', appRoute: 'pricing/plans' },
      { id: 'pricing-subscriptions', label: 'Subscriptions', icon: 'report', appRoute: 'pricing/subscriptions' },
      { id: 'pricing-discounts', label: 'Discounts', icon: 'tag', appRoute: 'pricing/discounts' },
      { id: 'pricing-offers', label: 'Offers', icon: 'tag', appRoute: 'pricing/offers' },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'bank',
    children: [
      { id: 'payments-transactions', label: 'Transactions', icon: 'list', appRoute: 'payments/transactions' },
      { id: 'payments-live', label: 'Live monitor', icon: 'activity', appRoute: 'payments/live' },
      { id: 'payments-billing', label: 'Billing / commission', icon: 'report', appRoute: 'payments/billing' },
      { id: 'payments-refunds', label: 'Refunds', icon: 'refresh', appRoute: 'payments/refunds' },
      { id: 'payments-disputes', label: 'Disputes / chargebacks', icon: 'alert-triangle', appRoute: 'payments/disputes' },
    ],
  },
  {
    id: 'mandates',
    label: 'Mandates',
    icon: 'mandate',
    children: [
      { id: 'mandate-list', label: 'Mandates', icon: 'mandate', appRoute: 'mandates/list' },
      { id: 'mandate-runs', label: 'Collection runs', icon: 'activity', appRoute: 'mandates/runs' },
      { id: 'mandate-consents', label: 'DuitNow consents', icon: 'check-circle', appRoute: 'mandates/consents' },
      { id: 'mandate-failures', label: 'Failures / retries', icon: 'alert-circle', appRoute: 'mandates/failures' },
    ],
  },
  {
    id: 'settlements',
    label: 'Settlements',
    icon: 'wallet',
    children: [
      { id: 'settlement-list', label: 'Settlements', icon: 'wallet', appRoute: 'settlements/list' },
      { id: 'settlement-batches', label: 'Settlement batches', icon: 'layers', appRoute: 'settlements/batches' },
      { id: 'settlement-payouts', label: 'Payouts', icon: 'bank', appRoute: 'settlements/payouts' },
      { id: 'settlement-recon', label: 'Reconciliation', icon: 'refresh', appRoute: 'settlements/reconciliation' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: 'activity',
    children: [
      { id: 'monitor-feed', label: 'Live transaction feed', icon: 'activity', appRoute: 'monitoring/feed' },
      { id: 'monitor-webhooks', label: 'Webhooks & events', icon: 'zap', appRoute: 'monitoring/webhooks' },
      { id: 'monitor-alerts', label: 'Alerts & incidents', icon: 'bell', appRoute: 'monitoring/alerts' },
      { id: 'monitor-queues', label: 'Queues / DLQ', icon: 'layers', appRoute: 'monitoring/queues' },
      { id: 'monitor-health', label: 'System health', icon: 'check-circle', appRoute: 'monitoring/health' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'report',
    children: [
      { id: 'report-transactions', label: 'Transactions', icon: 'list', appRoute: 'reports/transactions' },
      { id: 'report-settlements', label: 'Settlements', icon: 'wallet', appRoute: 'reports/settlements' },
      { id: 'report-merchants', label: 'Merchants', icon: 'store', appRoute: 'reports/merchants' },
      { id: 'report-revenue', label: 'Revenue / fees', icon: 'chart', appRoute: 'reports/revenue' },
      { id: 'report-scheduled', label: 'Scheduled reports', icon: 'calendar', appRoute: 'reports/scheduled' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'chart',
    children: [
      { id: 'analytics-payments', label: 'Payment analytics', icon: 'chart', appRoute: 'analytics/payments' },
      { id: 'analytics-success', label: 'Success / decline rates', icon: 'activity', appRoute: 'analytics/success' },
      { id: 'analytics-merchants', label: 'Merchant analytics', icon: 'store', appRoute: 'analytics/merchants' },
      { id: 'analytics-volume', label: 'Volume trends', icon: 'chart', appRoute: 'analytics/volume' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
    children: [
      { id: 'users-list', label: 'Users', icon: 'users', appRoute: 'users/list' },
      { id: 'users-roles', label: 'Roles & permissions', icon: 'shield', appRoute: 'users/roles' },
      { id: 'users-screens', label: 'Screens', icon: 'layers', appRoute: 'users/screens' },
      { id: 'users-audit', label: 'Activity / audit log', icon: 'eye', appRoute: 'users/audit' },
    ],
  },
  {
    id: 'reference',
    label: 'Reference data',
    icon: 'list',
    children: [
      { id: 'ref-banks', label: 'Banks', icon: 'bank', appRoute: 'reference/banks' },
      { id: 'ref-industries', label: 'Industries', icon: 'store', appRoute: 'reference/industries' },
      { id: 'ref-holidays', label: 'Holidays', icon: 'calendar', appRoute: 'reference/holidays' },
      { id: 'ref-status', label: 'Status codes', icon: 'check-circle', appRoute: 'reference/status-codes' },
      { id: 'ref-partners', label: 'Partners', icon: 'users', appRoute: 'reference/partners' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    children: [
      { id: 'settings-org', label: 'Organization', icon: 'settings', appRoute: 'settings/organization' },
      { id: 'settings-api', label: 'API keys & webhooks', icon: 'zap', appRoute: 'settings/api-keys' },
      { id: 'settings-notifications', label: 'Notifications', icon: 'bell', appRoute: 'settings/notifications' },
      { id: 'settings-system', label: 'System config', icon: 'settings', appRoute: 'settings/system' },
    ],
  },
];
