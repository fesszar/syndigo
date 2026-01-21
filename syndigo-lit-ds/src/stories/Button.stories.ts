import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-button.js';

const meta: Meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'critical'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: (args) => html`
    <syn-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    >
      Button Label
    </syn-button>
  `,
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => html`
    <syn-button variant=${args.variant} size=${args.size}>
      Secondary Button
    </syn-button>
  `,
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
  render: (args) => html`
    <syn-button variant=${args.variant} size=${args.size}>
      Tertiary Button
    </syn-button>
  `,
};

export const Critical: Story = {
  args: { variant: 'critical' },
  render: (args) => html`
    <syn-button variant=${args.variant} size=${args.size}>
      Delete Item
    </syn-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-button size="sm">Small</syn-button>
      <syn-button size="md">Medium</syn-button>
      <syn-button size="lg">Large</syn-button>
    </div>
  `,
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => html`
    <syn-button variant="primary" ?loading=${args.loading}>
      Saving...
    </syn-button>
  `,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => html`
    <syn-button variant="primary" ?disabled=${args.disabled}>
      Disabled Button
    </syn-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <syn-button variant="primary">Primary</syn-button>
      <syn-button variant="secondary">Secondary</syn-button>
      <syn-button variant="tertiary">Tertiary</syn-button>
      <syn-button variant="critical">Critical</syn-button>
    </div>
  `,
};
