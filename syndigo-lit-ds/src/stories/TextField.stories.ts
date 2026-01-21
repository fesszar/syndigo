import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-text-field.js';

const meta: Meta = {
  title: 'Components/TextField',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled', 'error'],
    },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    value: '',
    state: 'default',
    helperText: '',
    errorText: '',
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <syn-text-field
      label=${args.label}
      placeholder=${args.placeholder}
      value=${args.value}
      state=${args.state}
      helper-text=${args.helperText}
      error-text=${args.errorText}
      ?required=${args.required}
    ></syn-text-field>
  `,
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    helperText: 'We will never share your email.',
  },
  render: (args) => html`
    <syn-text-field
      label=${args.label}
      placeholder=${args.placeholder}
      helper-text=${args.helperText}
    ></syn-text-field>
  `,
};

export const WithError: Story = {
  args: {
    label: 'Username',
    value: 'ab',
    state: 'error',
    errorText: 'Username must be at least 3 characters',
  },
  render: (args) => html`
    <syn-text-field
      label=${args.label}
      value=${args.value}
      state=${args.state}
      error-text=${args.errorText}
    ></syn-text-field>
  `,
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
    required: true,
  },
  render: (args) => html`
    <syn-text-field
      label=${args.label}
      placeholder=${args.placeholder}
      ?required=${args.required}
    ></syn-text-field>
  `,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    state: 'disabled',
  },
  render: (args) => html`
    <syn-text-field
      label=${args.label}
      value=${args.value}
      state=${args.state}
    ></syn-text-field>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <syn-text-field label="Default" placeholder="Default state"></syn-text-field>
      <syn-text-field label="With Value" value="Some text"></syn-text-field>
      <syn-text-field label="Error" state="error" error-text="This field has an error"></syn-text-field>
      <syn-text-field label="Disabled" state="disabled" value="Disabled"></syn-text-field>
    </div>
  `,
};
