# PXM Integration Guide

This guide explains how to integrate the Syndigo Lit Design System into your PXM (Product Experience Management) application.

## Overview

The Syndigo Lit Design System provides web components built with Lit that can be used in any JavaScript framework or vanilla HTML. These components maintain visual consistency with the existing React design system while offering framework-agnostic flexibility.

## Installation

### NPM Installation

```bash
npm install @syndigo/lit-ds lit
```

### Package Structure

```
@syndigo/lit-ds/
├── dist/
│   ├── index.js          # Main entry - all components
│   ├── tokens.css        # Design tokens
│   └── components/       # Individual components
│       ├── syn-button.js
│       ├── syn-text-field.js
│       └── ...
```

## Integration Methods

### Method 1: Global Import (Recommended for Full Adoption)

Import all components at your application entry point:

```javascript
// main.js or app.js
import '@syndigo/lit-ds';
import '@syndigo/lit-ds/tokens.css';
```

### Method 2: Individual Component Import (Recommended for Gradual Migration)

Import only the components you need:

```javascript
import '@syndigo/lit-ds/components/syn-button.js';
import '@syndigo/lit-ds/components/syn-text-field.js';
import '@syndigo/lit-ds/tokens.css';
```

### Method 3: CDN (For Quick Prototyping)

```html
<link rel="stylesheet" href="https://unpkg.com/@syndigo/lit-ds/dist/tokens.css">
<script type="module" src="https://unpkg.com/@syndigo/lit-ds/dist/index.js"></script>
```

## Using with React

Web components work seamlessly with React. Here's how to use them:

### Basic Usage

```jsx
import '@syndigo/lit-ds/components/syn-button.js';

function MyComponent() {
  return (
    <syn-button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </syn-button>
  );
}
```

### Handling Events

Web components dispatch custom events. In React, use `ref` for complex event handling:

```jsx
import { useRef, useEffect } from 'react';
import '@syndigo/lit-ds/components/syn-text-field.js';

function SearchComponent() {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleInput = (e) => {
      console.log('Input value:', e.detail.value);
    };

    inputRef.current?.addEventListener('syn-input', handleInput);
    return () => inputRef.current?.removeEventListener('syn-input', handleInput);
  }, []);

  return <syn-text-field ref={inputRef} label="Search" placeholder="Search..." />;
}
```

### TypeScript Support

Add type declarations for web components:

```typescript
// types/syndigo-lit-ds.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'syn-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'tertiary' | 'critical';
        size?: 'sm' | 'md' | 'lg';
        disabled?: boolean;
        loading?: boolean;
      },
      HTMLElement
    >;
    'syn-text-field': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        label?: string;
        placeholder?: string;
        value?: string;
        state?: 'default' | 'hover' | 'active' | 'disabled' | 'error';
        'helper-text'?: string;
        'error-text'?: string;
        required?: boolean;
      },
      HTMLElement
    >;
    // Add more components as needed
  }
}
```

## Using with Angular

### Module Setup

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@syndigo/lit-ds';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

### Template Usage

```html
<syn-button variant="primary" (click)="handleClick()">
  Save Changes
</syn-button>

<syn-text-field
  [label]="'Email'"
  [placeholder]="'Enter email'"
  (syn-input)="onInput($event)"
></syn-text-field>
```

## Using with Vue

### Global Registration

```javascript
// main.js
import '@syndigo/lit-ds';
import '@syndigo/lit-ds/tokens.css';

// Vue 3
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('syn-');
```

### Component Usage

```vue
<template>
  <syn-button variant="primary" @click="handleClick">
    Submit
  </syn-button>
  
  <syn-text-field
    :label="'Username'"
    :value="username"
    @syn-input="onInput"
  ></syn-text-field>
</template>
```

## Component Migration Mapping

| React Component | Lit Component | Notes |
|----------------|---------------|-------|
| `<Button>` | `<syn-button>` | Same variants and props |
| `<TextField>` | `<syn-text-field>` | Use kebab-case for props |
| `<TextArea>` | `<syn-text-area>` | Same API |
| `<Checkbox>` | `<syn-checkbox>` | Events: `syn-change` |
| `<Radio>` | `<syn-radio>` | Use with `<syn-radio-group>` |
| `<Toggle>` | `<syn-toggle>` | Events: `syn-change` |
| `<Avatar>` | `<syn-avatar>` | Same API |
| `<Modal>` | `<syn-modal>` | Use slots for content |
| `<Toast>` | `<syn-toast>` | Same variants |
| `<Table>` | `<syn-table>` | Composed with sub-components |
| `<Tooltip>` | `<syn-tooltip>` | Wrap target element |
| `<SearchField>` | `<syn-search-field>` | Same API |
| `<SelectField>` | `<syn-select-field>` | Pass options as prop |

## Event Naming Convention

Lit components dispatch custom events with the `syn-` prefix:

| Event | Description |
|-------|-------------|
| `syn-input` | Input value changed |
| `syn-change` | Selection/toggle changed |
| `syn-click` | Element clicked |
| `syn-close` | Modal/toast dismissed |
| `syn-submit` | Form submitted |
| `syn-sort` | Table column sorted |

## Slot Usage

Many components use slots for flexible content:

```html
<!-- Modal with slots -->
<syn-modal open heading="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  
  <div slot="footer">
    <syn-button variant="secondary">Cancel</syn-button>
    <syn-button variant="primary">Confirm</syn-button>
  </div>
</syn-modal>

<!-- Menu item with slots -->
<syn-menu-item>
  <syn-icon slot="prefix" name="user"></syn-icon>
  Profile Settings
  <syn-badge slot="suffix">New</syn-badge>
</syn-menu-item>
```

## Theming and Customization

### Override Design Tokens

```css
:root {
  /* Override primary color */
  --color-button-primary: #your-brand-color;
  
  /* Override font family */
  --font-family: 'Your Font', sans-serif;
}
```

### Component-Level Styling

Use CSS custom properties or `::part()` selectors:

```css
syn-button::part(base) {
  border-radius: 8px;
}

syn-text-field {
  --input-background: #f5f5f5;
}
```

## Performance Considerations

1. **Tree Shaking**: Import individual components to reduce bundle size
2. **Lazy Loading**: Dynamically import components for code splitting
3. **SSR**: Web components hydrate on the client; use placeholder content for SSR

```javascript
// Lazy loading example
const loadModal = async () => {
  await import('@syndigo/lit-ds/components/syn-modal.js');
};
```

## Testing

### Jest/Vitest Setup

```javascript
// jest.config.js or vitest.config.js
export default {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(@syndigo/lit-ds|lit)/)',
  ],
};
```

### Testing Components

```javascript
import '@syndigo/lit-ds/components/syn-button.js';

test('button renders correctly', async () => {
  document.body.innerHTML = '<syn-button variant="primary">Test</syn-button>';
  
  const button = document.querySelector('syn-button');
  await button.updateComplete;
  
  expect(button.variant).toBe('primary');
});
```

## Troubleshooting

### Components Not Rendering

1. Ensure components are imported before use
2. Check browser console for errors
3. Verify `tokens.css` is loaded

### Events Not Firing

1. Use correct event names (`syn-*` prefix)
2. In React, use refs for event listeners
3. Check event.detail for payload

### Styles Not Applied

1. Ensure `tokens.css` is imported
2. Check CSS custom property names
3. Verify shadow DOM styling approach

## Support

- **Documentation**: Run `npm run storybook` for interactive docs
- **Issues**: Report bugs on GitHub
- **Migration Help**: Contact the design systems team

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for version history and migration notes.
