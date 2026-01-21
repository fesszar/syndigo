import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-modal.js';
import '../components/syn-button.js';

const meta: Meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    open: { control: 'boolean' },
  },
  args: {
    size: 'md',
    open: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <syn-modal ?open=${args.open} size=${args.size} heading="Modal Title">
      <p>This is the modal content. You can put any content here.</p>
      <div slot="footer">
        <syn-button variant="secondary">Cancel</syn-button>
        <syn-button variant="primary">Confirm</syn-button>
      </div>
    </syn-modal>
  `,
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => html`
    <syn-modal ?open=${args.open} size=${args.size} heading="Confirm Action">
      <p>Are you sure you want to proceed?</p>
      <div slot="footer">
        <syn-button variant="secondary">No</syn-button>
        <syn-button variant="primary">Yes</syn-button>
      </div>
    </syn-modal>
  `,
};

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => html`
    <syn-modal ?open=${args.open} size=${args.size} heading="Large Modal">
      <p>This is a large modal with more content space.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <div slot="footer">
        <syn-button variant="secondary">Cancel</syn-button>
        <syn-button variant="primary">Save Changes</syn-button>
      </div>
    </syn-modal>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <syn-modal open heading="Edit Profile">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <syn-text-field label="Name" value="John Doe"></syn-text-field>
        <syn-text-field label="Email" value="john@example.com"></syn-text-field>
      </div>
      <div slot="footer">
        <syn-button variant="secondary">Cancel</syn-button>
        <syn-button variant="primary">Save</syn-button>
      </div>
    </syn-modal>
  `,
};
