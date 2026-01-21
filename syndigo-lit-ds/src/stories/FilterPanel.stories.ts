import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-filter-panel.js';

const meta: Meta = {
  title: 'Layout/FilterPanel',
  component: 'syn-filter-panel',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-filter-panel title="Filters" show-search>
      <syn-filter-box label="Category" count="5">
        <syn-filter-item label="Electronics" count="12"></syn-filter-item>
        <syn-filter-item label="Clothing" count="8"></syn-filter-item>
        <syn-filter-item label="Home & Garden" count="15"></syn-filter-item>
      </syn-filter-box>
      <syn-filter-box label="Status" count="3">
        <syn-filter-item label="Active" count="45"></syn-filter-item>
        <syn-filter-item label="Pending" count="12"></syn-filter-item>
        <syn-filter-item label="Archived" count="3"></syn-filter-item>
      </syn-filter-box>
    </syn-filter-panel>
  `,
};

export const Compact: Story = {
  render: () => html`
    <syn-filter-panel variant="compact" title="Quick Filters">
      <syn-filter-box label="Type">
        <syn-filter-item label="Product"></syn-filter-item>
        <syn-filter-item label="Asset"></syn-filter-item>
      </syn-filter-box>
    </syn-filter-panel>
  `,
};
