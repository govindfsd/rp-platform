/**
 * New-merchant onboarding wizard steps — taken from the legacy admin
 * `add-merchant` Material Stepper (the authoritative step list) and backed by
 * the gateway/admin DB tables noted per step. Shared by the wizard screen +
 * its Storybook mockup.
 */
export interface MerchantWizardStep {
  id: string;
  label: string;
  icon: string;
  /** What the step captures. */
  description: string;
  /** Primary backing table(s) in the gateway/admin DB. */
  table: string;
}

export const merchantWizardSteps: MerchantWizardStep[] = [
  { id: 'profile', label: 'Merchant profile', icon: 'store', description: 'Company, ID, contact & address', table: 'Merchant' },
  { id: 'application', label: 'Application & channels', icon: 'globe', description: 'Enable FPX / card / DuitNow; keys', table: 'MerchantApplicationProfile' },
  { id: 'settlement', label: 'Settlement (BSP)', icon: 'wallet', description: 'Bank settlement arrangement', table: 'MerchentSettlementSetup' },
  { id: 'subscription', label: 'Subscription & pricing', icon: 'tag', description: 'Fees, plans & waivers', table: 'MerchantSubscription' },
  { id: 'emandate', label: 'eMandate settings', icon: 'mandate', description: 'Direct debit / DDA config', table: 'MandateApplication' },
  { id: 'invoice', label: 'Invoice settings', icon: 'invoice', description: 'Numbering & defaults', table: 'ApplicationProperty' },
  { id: 'page', label: 'Page settings', icon: 'layers', description: 'Payment page branding', table: 'MerchantApplicationProfile' },
  { id: 'notifications', label: 'Notifications', icon: 'bell', description: 'Email / SMS / WhatsApp', table: 'MerchantNotificationSubscription' },
  { id: 'users', label: 'Users', icon: 'users', description: 'Merchant login profiles', table: 'MerchantLoginProfile' },
];
