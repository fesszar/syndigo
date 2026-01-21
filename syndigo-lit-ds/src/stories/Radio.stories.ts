import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../components/syn-radio.js';

const meta: Meta = {
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <syn-radio-group name="example" value="option1">
      <syn-radio value="option1" label="Option 1"></syn-radio>
      <syn-radio value="option2" label="Option 2"></syn-radio>
      <syn-radio value="option3" label="Option 3"></syn-radio>
    </syn-radio-group>
  `,
};

export const Horizontal: Story = {
  render: () => html`
    <syn-radio-group name="horizontal" value="a" orientation="horizontal">
      <syn-radio value="a" label="Choice A"></syn-radio>
      <syn-radio value="b" label="Choice B"></syn-radio>
      <syn-radio value="c" label="Choice C"></syn-radio>
    </syn-radio-group>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <syn-radio-group name="disabled-example" value="enabled1">
      <syn-radio value="enabled1" label="Enabled option"></syn-radio>
      <syn-radio value="disabled1" label="Disabled option" disabled></syn-radio>
      <syn-radio value="enabled2" label="Another enabled"></syn-radio>
    </syn-radio-group>
  `,
};

export const SingleRadio: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <syn-radio value="1" label="Unchecked radio"></syn-radio>
      <syn-radio value="2" label="Checked radio" checked></syn-radio>
      <syn-radio value="3" label="Disabled radio" disabled></syn-radio>
    </div>
  `,
};
