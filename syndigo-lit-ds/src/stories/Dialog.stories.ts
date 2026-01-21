import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-dialog.js';
import '../components/syn-button.js';

const meta: Meta = {
  title: 'Feedback/Dialog',
  component: 'syn-dialog',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'warning', 'error', 'success'] },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => html`
    <syn-dialog open type="info" title="Information">
      <p>This is an informational dialog message.</p>
      <syn-button slot="footer" variant="primary">OK</syn-button>
    </syn-dialog>
  `,
};

export const Warning: Story = {
  render: () => html`
    <syn-dialog open type="warning" title="Warning">
      <p>Are you sure you want to proceed?</p>
      <syn-button slot="footer" variant="secondary">Cancel</syn-button>
      <syn-button slot="footer" variant="primary">Continue</syn-button>
    </syn-dialog>
  `,
};

export const Error: Story = {
  render: () => html`
    <syn-dialog open type="error" title="Error">
      <p>An error occurred while processing your request.</p>
      <syn-button slot="footer" variant="primary">Dismiss</syn-button>
    </syn-dialog>
  `,
};
