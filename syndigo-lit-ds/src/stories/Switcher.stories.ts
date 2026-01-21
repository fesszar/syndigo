import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-switcher.js';

const meta: Meta = {
  title: 'Form/Switcher',
  component: 'syn-switcher',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <syn-switcher type="primary" value="option1">
      <syn-switcher-option value="option1" label="Option 1"></syn-switcher-option>
      <syn-switcher-option value="option2" label="Option 2"></syn-switcher-option>
      <syn-switcher-option value="option3" label="Option 3"></syn-switcher-option>
    </syn-switcher>
  `,
};

export const Secondary: Story = {
  render: () => html`
    <syn-switcher type="secondary" value="tab2">
      <syn-switcher-option value="tab1" label="Tab 1"></syn-switcher-option>
      <syn-switcher-option value="tab2" label="Tab 2"></syn-switcher-option>
      <syn-switcher-option value="tab3" label="Tab 3"></syn-switcher-option>
    </syn-switcher>
  `,
};
