import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-profile.js';

const meta: Meta = {
  title: 'Display/Profile',
  component: 'syn-profile',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const WithAvatar: Story = {
  render: () => html`
    <syn-profile
      name="John Doe"
      email="john.doe@syndigo.com"
      role="Product Manager"
      avatar-src="https://i.pravatar.cc/150?img=3"
    >
      <syn-profile-menu-item slot="menu" label="View Profile"></syn-profile-menu-item>
      <syn-profile-menu-item slot="menu" label="Settings"></syn-profile-menu-item>
      <syn-profile-menu-item slot="menu" separator></syn-profile-menu-item>
      <syn-profile-menu-item slot="menu" label="Sign Out" destructive></syn-profile-menu-item>
    </syn-profile>
  `,
};

export const WithInitials: Story = {
  render: () => html`
    <syn-profile
      name="Jane Smith"
      email="jane.smith@syndigo.com"
      initials="JS"
    >
      <syn-profile-menu-item slot="menu" label="Account"></syn-profile-menu-item>
      <syn-profile-menu-item slot="menu" label="Logout" destructive></syn-profile-menu-item>
    </syn-profile>
  `,
};
