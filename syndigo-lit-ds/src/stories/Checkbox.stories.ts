import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-checkbox.js';

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    label: 'Checkbox label',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <syn-checkbox
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      label=${args.label}
    ></syn-checkbox>
  `,
};

export const Checked: Story = {
  args: { checked: true },
  render: (args) => html`
    <syn-checkbox ?checked=${args.checked} label="Checked checkbox"></syn-checkbox>
  `,
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
  render: (args) => html`
    <syn-checkbox ?indeterminate=${args.indeterminate} label="Indeterminate state"></syn-checkbox>
  `,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <syn-checkbox ?disabled=${args.disabled} label="Disabled unchecked"></syn-checkbox>
      <syn-checkbox ?disabled=${args.disabled} checked label="Disabled checked"></syn-checkbox>
    </div>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <syn-checkbox label="Option 1" checked></syn-checkbox>
      <syn-checkbox label="Option 2"></syn-checkbox>
      <syn-checkbox label="Option 3" checked></syn-checkbox>
      <syn-checkbox label="Option 4" disabled></syn-checkbox>
    </div>
  `,
};
