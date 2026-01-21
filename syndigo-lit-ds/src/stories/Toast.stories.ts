import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-toast.js';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'critical'],
    },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    message: 'This is a toast message',
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  args: { variant: 'info', message: 'This is an informational message' },
  render: (args) => html`
    <syn-toast variant=${args.variant} message=${args.message} ?dismissible=${args.dismissible}></syn-toast>
  `,
};

export const Success: Story = {
  args: { variant: 'success', message: 'Operation completed successfully!' },
  render: (args) => html`
    <syn-toast variant=${args.variant} message=${args.message}></syn-toast>
  `,
};

export const Warning: Story = {
  args: { variant: 'warning', message: 'Please review your changes before continuing' },
  render: (args) => html`
    <syn-toast variant=${args.variant} message=${args.message}></syn-toast>
  `,
};

export const Critical: Story = {
  args: { variant: 'critical', message: 'An error occurred. Please try again.' },
  render: (args) => html`
    <syn-toast variant=${args.variant} message=${args.message}></syn-toast>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <syn-toast variant="info" message="Info: This is an informational message"></syn-toast>
      <syn-toast variant="success" message="Success: Your changes have been saved"></syn-toast>
      <syn-toast variant="warning" message="Warning: This action cannot be undone"></syn-toast>
      <syn-toast variant="critical" message="Error: Failed to save changes"></syn-toast>
    </div>
  `,
};
