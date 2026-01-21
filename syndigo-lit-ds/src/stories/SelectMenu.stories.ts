import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/syn-select-menu.js';

const meta: Meta = {
  title: 'Form/SelectMenu',
  component: 'syn-select-menu',
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const SingleSelect: Story = {
  render: () => html`
    <syn-select-menu>
      <syn-select-menu-item label="Option 1" value="1"></syn-select-menu-item>
      <syn-select-menu-item label="Option 2" value="2" selected></syn-select-menu-item>
      <syn-select-menu-item label="Option 3" value="3"></syn-select-menu-item>
    </syn-select-menu>
  `,
};

export const MultiSelect: Story = {
  render: () => html`
    <syn-select-menu multiple>
      <syn-select-menu-item label="Apple" value="apple" show-checkbox></syn-select-menu-item>
      <syn-select-menu-item label="Banana" value="banana" show-checkbox selected></syn-select-menu-item>
      <syn-select-menu-item label="Orange" value="orange" show-checkbox selected></syn-select-menu-item>
      <syn-select-menu-item label="Grape" value="grape" show-checkbox></syn-select-menu-item>
    </syn-select-menu>
  `,
};
