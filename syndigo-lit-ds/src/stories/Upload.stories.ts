import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-upload.js';

const meta: Meta = {
  title: 'Form/Upload',
  component: 'syn-upload',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-upload
      title="Click or Drag & Drop"
      helper-text="SVG, PNG, JPG or GIF (max. 800x400px and 5GB)"
    ></syn-upload>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <syn-upload
      title="Click or Drag & Drop"
      helper-text="Upload is currently disabled"
      disabled
    ></syn-upload>
  `,
};
