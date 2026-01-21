import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-table.js';

const meta: Meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-table>
      <syn-table-header>
        <syn-table-header-cell>Name</syn-table-header-cell>
        <syn-table-header-cell>Email</syn-table-header-cell>
        <syn-table-header-cell>Role</syn-table-header-cell>
        <syn-table-header-cell>Status</syn-table-header-cell>
      </syn-table-header>
      <syn-table-row>
        <syn-table-cell>John Doe</syn-table-cell>
        <syn-table-cell>john@example.com</syn-table-cell>
        <syn-table-cell>Admin</syn-table-cell>
        <syn-table-cell>Active</syn-table-cell>
      </syn-table-row>
      <syn-table-row>
        <syn-table-cell>Jane Smith</syn-table-cell>
        <syn-table-cell>jane@example.com</syn-table-cell>
        <syn-table-cell>Editor</syn-table-cell>
        <syn-table-cell>Active</syn-table-cell>
      </syn-table-row>
      <syn-table-row>
        <syn-table-cell>Bob Johnson</syn-table-cell>
        <syn-table-cell>bob@example.com</syn-table-cell>
        <syn-table-cell>Viewer</syn-table-cell>
        <syn-table-cell>Inactive</syn-table-cell>
      </syn-table-row>
    </syn-table>
  `,
};

export const Sortable: Story = {
  render: () => html`
    <syn-table>
      <syn-table-header>
        <syn-table-header-cell sortable sort-direction="asc">Name</syn-table-header-cell>
        <syn-table-header-cell sortable>Date</syn-table-header-cell>
        <syn-table-header-cell sortable>Amount</syn-table-header-cell>
      </syn-table-header>
      <syn-table-row>
        <syn-table-cell>Alice</syn-table-cell>
        <syn-table-cell>2024-01-15</syn-table-cell>
        <syn-table-cell>$150.00</syn-table-cell>
      </syn-table-row>
      <syn-table-row>
        <syn-table-cell>Bob</syn-table-cell>
        <syn-table-cell>2024-01-20</syn-table-cell>
        <syn-table-cell>$250.00</syn-table-cell>
      </syn-table-row>
    </syn-table>
  `,
};

export const Selectable: Story = {
  render: () => html`
    <syn-table>
      <syn-table-header>
        <syn-table-header-cell>
          <syn-checkbox></syn-checkbox>
        </syn-table-header-cell>
        <syn-table-header-cell>Product</syn-table-header-cell>
        <syn-table-header-cell>SKU</syn-table-header-cell>
        <syn-table-header-cell>Price</syn-table-header-cell>
      </syn-table-header>
      <syn-table-row>
        <syn-table-cell><syn-checkbox></syn-checkbox></syn-table-cell>
        <syn-table-cell>Widget A</syn-table-cell>
        <syn-table-cell>WGT-001</syn-table-cell>
        <syn-table-cell>$29.99</syn-table-cell>
      </syn-table-row>
      <syn-table-row>
        <syn-table-cell><syn-checkbox checked></syn-checkbox></syn-table-cell>
        <syn-table-cell>Widget B</syn-table-cell>
        <syn-table-cell>WGT-002</syn-table-cell>
        <syn-table-cell>$39.99</syn-table-cell>
      </syn-table-row>
    </syn-table>
  `,
};
