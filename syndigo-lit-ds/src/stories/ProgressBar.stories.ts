import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-progress-bar.js';

const meta: Meta = {
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    tone: {
      control: 'select',
      options: ['default', 'success', 'warning', 'critical'],
    },
    showLabel: { control: 'boolean' },
  },
  args: {
    type: 'linear',
    value: 60,
    tone: 'default',
    showLabel: false,
  },
};

export default meta;
type Story = StoryObj;

export const Linear: Story = {
  render: (args) => html`
    <syn-progress-bar
      type=${args.type}
      value=${args.value}
      tone=${args.tone}
      ?show-label=${args.showLabel}
    ></syn-progress-bar>
  `,
};

export const Circular: Story = {
  args: { type: 'circular', value: 75 },
  render: (args) => html`
    <syn-progress-bar
      type=${args.type}
      value=${args.value}
      tone=${args.tone}
      ?show-label=${args.showLabel}
    ></syn-progress-bar>
  `,
};

export const WithLabel: Story = {
  args: { showLabel: true, value: 45 },
  render: (args) => html`
    <syn-progress-bar
      type="linear"
      value=${args.value}
      ?show-label=${args.showLabel}
    ></syn-progress-bar>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <syn-progress-bar type="linear" value="60" tone="default"></syn-progress-bar>
      <syn-progress-bar type="linear" value="80" tone="success"></syn-progress-bar>
      <syn-progress-bar type="linear" value="50" tone="warning"></syn-progress-bar>
      <syn-progress-bar type="linear" value="30" tone="critical"></syn-progress-bar>
    </div>
  `,
};

export const CircularSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <syn-progress-bar type="circular" value="25" size="40"></syn-progress-bar>
      <syn-progress-bar type="circular" value="50" size="60"></syn-progress-bar>
      <syn-progress-bar type="circular" value="75" size="80"></syn-progress-bar>
      <syn-progress-bar type="circular" value="100" size="100" tone="success"></syn-progress-bar>
    </div>
  `,
};
