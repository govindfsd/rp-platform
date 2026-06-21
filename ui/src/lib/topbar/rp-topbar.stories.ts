import type { Meta, StoryObj } from '@storybook/angular';
import { RpTopbar } from './rp-topbar';

const meta: Meta<RpTopbar> = {
  title: 'Components/Topbar',
  component: RpTopbar,
  tags: ['autodocs'],
  decorators: [],
};
export default meta;

type Story = StoryObj<RpTopbar>;

export const BrandBlue: Story = {
  name: 'Brand blue (default)',
  render: () => ({
    props: {
      userName: 'Govind K',
      userEmail: 'govind@ascertain.com.my',
    },
    template: `
      <rp-topbar
        variant="brand"
        logoText="RinggitPay"
        [userName]="userName"
        [userEmail]="userEmail"
      />
    `,
  }),
};

export const White: Story = {
  name: 'White variant',
  render: () => ({
    props: {
      userName: 'Govind K',
      userEmail: 'govind@ascertain.com.my',
    },
    template: `
      <rp-topbar
        variant="white"
        logoText="RinggitPay"
        [userName]="userName"
        [userEmail]="userEmail"
      />
    `,
  }),
};

export const LogoOnly: Story = {
  name: 'Logo only (no user)',
  render: () => ({
    template: `<rp-topbar variant="brand" logoText="RinggitPay" />`,
  }),
};
