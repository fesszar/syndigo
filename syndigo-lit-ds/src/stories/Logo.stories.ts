import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-logo.js';

const meta: Meta = {
  title: 'Brand/Logo',
  component: 'syn-logo',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['full', 'wordmark', 'icon'] },
    color: { control: 'select', options: ['blue', 'white', 'black', 'fullColor'] },
    brand: { control: 'select', options: ['syndigo', 'whiteLabel'] },
  },
};

export default meta;
type Story = StoryObj;

export const FullLogo: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <syn-logo type="full" color="blue"></syn-logo>
      <syn-logo type="full" color="fullColor"></syn-logo>
    </div>
  `,
};

export const Wordmark: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <syn-logo type="wordmark" color="blue"></syn-logo>
      <syn-logo type="wordmark" color="black"></syn-logo>
    </div>
  `,
};

export const Icon: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <syn-logo type="icon" color="blue"></syn-logo>
      <syn-logo type="icon" color="fullColor"></syn-logo>
    </div>
  `,
};

export const OnDarkBackground: Story = {
  render: () => html`
    <div style="background: #1a1a1a; padding: 24px; display: flex; gap: 24px; align-items: center;">
      <syn-logo type="full" color="white"></syn-logo>
      <syn-logo type="wordmark" color="white"></syn-logo>
      <syn-logo type="icon" color="white"></syn-logo>
    </div>
  `,
};
