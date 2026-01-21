import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-complex-status.js';

const meta: Meta = {
  title: 'Display/ComplexStatus',
  component: 'syn-complex-status',
  tags: ['autodocs'],
  argTypes: {
    levels: { control: { type: 'number', min: 1, max: 4 } },
  },
};

export default meta;
type Story = StoryObj;

export const FourItems: Story = {
  render: () => html`
    <syn-complex-status levels="4">
      <syn-status-item slot="item-1" type="success" count="245" label="Completed"></syn-status-item>
      <syn-status-item slot="item-2" type="processing" count="18" label="In Progress"></syn-status-item>
      <syn-status-item slot="item-3" type="partialSuccess" count="7" label="Partial"></syn-status-item>
      <syn-status-item slot="item-4" type="error" count="3" label="Failed"></syn-status-item>
    </syn-complex-status>
  `,
};

export const TwoItems: Story = {
  render: () => html`
    <syn-complex-status levels="2">
      <syn-status-item slot="item-1" type="success" count="150" label="Published"></syn-status-item>
      <syn-status-item slot="item-2" type="processing" count="25" label="Draft"></syn-status-item>
    </syn-complex-status>
  `,
};
