import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-avatar.js';

const meta: Meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    name: { control: 'text', description: 'Name for initials' },
    src: { control: 'text', description: 'Image URL' },
  },
  args: {
    size: 'md',
    name: 'John Doe',
    src: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <syn-avatar size=${args.size} name=${args.name} src=${args.src}></syn-avatar>
  `,
};

export const WithInitials: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-avatar name="John Doe"></syn-avatar>
      <syn-avatar name="Alice Smith"></syn-avatar>
      <syn-avatar name="Bob"></syn-avatar>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-avatar size="xs" name="XS"></syn-avatar>
      <syn-avatar size="sm" name="SM"></syn-avatar>
      <syn-avatar size="md" name="MD"></syn-avatar>
      <syn-avatar size="lg" name="LG"></syn-avatar>
      <syn-avatar size="xl" name="XL"></syn-avatar>
    </div>
  `,
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'User',
  },
  render: (args) => html`
    <syn-avatar size="lg" src=${args.src} name=${args.name}></syn-avatar>
  `,
};

export const FallbackToInitials: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    name: 'Jane Doe',
  },
  render: (args) => html`
    <syn-avatar size="lg" src=${args.src} name=${args.name}></syn-avatar>
  `,
};
