import type { Preview } from '@storybook/web-components';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#f5f7fa' },
        { name: 'dark', value: '#1d3261' },
      ],
    },
  },
};

export default preview;
