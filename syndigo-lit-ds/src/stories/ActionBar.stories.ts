import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-action-bar.js';
import '../components/syn-button.js';

const meta: Meta = {
  title: 'Layout/ActionBar',
  component: 'syn-action-bar',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-action-bar>
      <span slot="left">3 items selected</span>
      <syn-button slot="right" variant="secondary" size="small">Cancel</syn-button>
      <syn-button slot="right" variant="primary" size="small">Apply</syn-button>
    </syn-action-bar>
  `,
};

export const Compact: Story = {
  render: () => html`
    <syn-action-bar variant="compact">
      <span slot="left">Edit Mode</span>
      <syn-button slot="right" variant="primary" size="small">Save</syn-button>
    </syn-action-bar>
  `,
};
