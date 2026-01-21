import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-top-navigation.js';
import '../components/syn-logo.js';

const meta: Meta = {
  title: 'Navigation/TopNavigation',
  component: 'syn-top-navigation',
  tags: ['autodocs'],
  argTypes: {
    environmentStatus: { control: 'select', options: ['success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-top-navigation
      environment="Production"
      environment-status="success"
      search-placeholder="Search products..."
      message-count="3"
      alert-count="5"
      avatar-initials="JD"
    >
      <syn-logo slot="logo" type="wordmark" color="blue"></syn-logo>
    </syn-top-navigation>
  `,
};

export const WithWarning: Story = {
  render: () => html`
    <syn-top-navigation
      environment="Staging"
      environment-status="warning"
      search-placeholder="Search..."
      message-count="0"
      alert-count="2"
      avatar-initials="AB"
    >
      <syn-logo slot="logo" type="wordmark" color="blue"></syn-logo>
    </syn-top-navigation>
  `,
};
