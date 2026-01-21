# Syndigo Lit Design System

A Lit Elements component library for building Syndigo applications. Designed to work alongside Shoelace components for the PXM platform.

## Installation

```bash
npm install @syndigo/lit-ds lit
```

## Usage

```typescript
// Import components
import '@syndigo/lit-ds';

// Or import specific components
import { SynButton, SynTextField } from '@syndigo/lit-ds';
```

```html
<!-- Import tokens CSS -->
<link rel="stylesheet" href="@syndigo/lit-ds/tokens.css">

<!-- Use components -->
<syn-button variant="primary">Click me</syn-button>
<syn-text-field label="Name" placeholder="Enter name..."></syn-text-field>
```

## Components

### Foundation
- `<syn-text>` - Typography component
- `<syn-icon>` - Icon component with 60+ icons
- `<syn-divider>` - Visual separator

### Form Elements
- `<syn-button>` - Button with variants (primary, secondary, tertiary, critical)
- `<syn-text-field>` - Text input with label, validation
- `<syn-text-area>` - Multi-line text input
- `<syn-toggle>` - Toggle switch
- `<syn-input-field>` - Input wrapper with label/error
- `<syn-inline-error>` - Validation message
- `<syn-search-field>` - Search input with icon
- `<syn-select-field>` - Dropdown selection
- `<syn-checkbox>` - Checkbox with indeterminate state
- `<syn-radio>` / `<syn-radio-group>` - Radio button selection

### Display
- `<syn-pill>` - Selectable chip
- `<syn-tag>` - Label/category tag
- `<syn-badge>` - Counts and labels
- `<syn-avatar>` - User profile images
- `<syn-status-indicator>` - Status badge with dot
- `<syn-data-well>` - Label-value display
- `<syn-tooltip>` - Tooltip on hover
- `<syn-progress-bar>` - Linear and circular progress
- `<syn-stepper>` - Multi-step progress indicator
- `<syn-empty-state>` - Empty state placeholder

### Feedback
- `<syn-toast>` - Notification message
- `<syn-modal>` - Dialog/modal

### Navigation
- `<syn-tab>` / `<syn-tab-group>` - Tab navigation
- `<syn-menu-item>` - Menu items

### Data
- `<syn-table>` - Table container
- `<syn-table-header>` - Table header row
- `<syn-table-header-cell>` - Sortable header cell
- `<syn-table-row>` - Table data row
- `<syn-table-cell>` - Table data cell

## Storybook

Run Storybook for interactive documentation:

```bash
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
```

## Design Tokens

All components use CSS custom properties for theming:

```css
:root {
  --color-button-primary: #2d75e2;
  --color-text-primary: #1d3261;
  --color-surface-light: #f7f9fb;
  /* ... */
}
```

Override these variables to customize the theme.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Migration from React

This library mirrors the React Syndigo Design System components. Key differences:

| React | Lit |
|-------|-----|
| `<Button>` | `<syn-button>` |
| `<TextField>` | `<syn-text-field>` |
| `<StatusIndicator>` | `<syn-status-indicator>` |
| `variant="primary"` | `variant="primary"` (same) |
| `onClick={handler}` | `@click=${handler}` |
| `children` | `<slot>` |

## License

MIT
