import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-side-nav.js';
import '../components/syn-logo.js';

const meta: Meta = {
  title: 'Navigation/SideNav',
  component: 'syn-side-nav',
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['expanded', 'collapsed'] },
  },
};

export default meta;
type Story = StoryObj;

export const Expanded: Story = {
  render: () => html`
    <div style="height: 500px;">
      <syn-side-nav state="expanded">
        <syn-logo slot="logo" type="wordmark" color="blue"></syn-logo>
        <syn-side-nav-item label="Dashboard" active></syn-side-nav-item>
        <syn-side-nav-item label="Products"></syn-side-nav-item>
        <syn-side-nav-item label="Assets"></syn-side-nav-item>
        <syn-side-nav-item label="Settings"></syn-side-nav-item>
        <syn-logo slot="logo-icon" type="icon" color="blue"></syn-logo>
      </syn-side-nav>
    </div>
  `,
};

export const Collapsed: Story = {
  render: () => html`
    <div style="height: 500px;">
      <syn-side-nav state="collapsed">
        <syn-logo slot="logo" type="wordmark" color="blue"></syn-logo>
        <syn-side-nav-item label="Dashboard" active></syn-side-nav-item>
        <syn-side-nav-item label="Products"></syn-side-nav-item>
        <syn-logo slot="logo-icon" type="icon" color="blue"></syn-logo>
      </syn-side-nav>
    </div>
  `,
};
