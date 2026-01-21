import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-icon.js';
import { availableIcons } from '../components/syn-icon.js';

const meta: Meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: availableIcons,
      description: 'Icon name',
    },
    size: {
      control: { type: 'number', min: 12, max: 64 },
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
  args: {
    name: 'check',
    size: 24,
    color: '#718094',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <syn-icon
      name=${args.name}
      size=${args.size}
      color=${args.color}
    ></syn-icon>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-icon name="star" size="16"></syn-icon>
      <syn-icon name="star" size="24"></syn-icon>
      <syn-icon name="star" size="32"></syn-icon>
      <syn-icon name="star" size="48"></syn-icon>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-icon name="heart" color="#718094"></syn-icon>
      <syn-icon name="heart" color="#2d75e2"></syn-icon>
      <syn-icon name="heart" color="#0e8662"></syn-icon>
      <syn-icon name="heart" color="#f58319"></syn-icon>
      <syn-icon name="heart" color="#db3a3a"></syn-icon>
    </div>
  `,
};

export const CommonIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 24px;">
      ${['check', 'close', 'plus', 'minus', 'search', 'edit', 'trash', 'download',
         'upload', 'user', 'users', 'settings', 'home', 'mail', 'bell', 'calendar',
         'clock', 'star', 'heart', 'eye', 'lock', 'unlock', 'filter', 'sort',
         'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-down', 'arrow-up', 'arrow-left', 'arrow-right'
      ].map(name => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <syn-icon name=${name} size="24"></syn-icon>
          <span style="font-size: 10px; color: #718094;">${name}</span>
        </div>
      `)}
    </div>
  `,
};

export const AllIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 16px;">
      ${availableIcons.map(name => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px;">
          <syn-icon name=${name} size="24"></syn-icon>
          <span style="font-size: 9px; color: #718094; text-align: center; word-break: break-word;">${name}</span>
        </div>
      `)}
    </div>
  `,
};
