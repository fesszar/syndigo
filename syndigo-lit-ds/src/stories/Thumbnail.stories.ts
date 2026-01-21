import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-thumbnail.js';

const meta: Meta = {
  title: 'Display/Thumbnail',
  component: 'syn-thumbnail',
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xsmall', 'small', 'default', 'large'] },
    radius: { control: 'select', options: ['full', 'half'] },
  },
};

export default meta;
type Story = StoryObj;

export const WithImage: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-thumbnail size="xsmall" src="https://picsum.photos/100"></syn-thumbnail>
      <syn-thumbnail size="small" src="https://picsum.photos/100"></syn-thumbnail>
      <syn-thumbnail size="default" src="https://picsum.photos/100"></syn-thumbnail>
      <syn-thumbnail size="large" src="https://picsum.photos/100"></syn-thumbnail>
    </div>
  `,
};

export const Placeholder: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <syn-thumbnail size="xsmall"></syn-thumbnail>
      <syn-thumbnail size="small"></syn-thumbnail>
      <syn-thumbnail size="default"></syn-thumbnail>
      <syn-thumbnail size="large"></syn-thumbnail>
    </div>
  `,
};
