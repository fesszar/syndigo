# Syndigo Lit Design System - Setup Guide

## Quick Start Commands

After cloning the repository, run these commands:

```bash
cd syndigo-lit-ds

# Install dependencies
npm install

# Start Storybook (interactive component documentation)
npm run storybook

# Build the library
npm run build

# Preview built library
npm run preview
```

## Publishing to NPM

### 1. Login to NPM
```bash
npm login
```

### 2. Create Organization Scope (if needed)
If `@syndigo` scope doesn't exist, create it on npmjs.com or use a different scope.

### 3. Publish
```bash
# Build first
npm run build

# Publish (public package)
npm publish --access public
```

### 4. Version Updates
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish --access public
```

## Using in PXM Application

### Install the Package
```bash
npm install @syndigo/lit-ds lit
```

### Import in Your App
```javascript
// Import all components
import '@syndigo/lit-ds';
import '@syndigo/lit-ds/tokens.css';

// Or import individual components
import '@syndigo/lit-ds/components/syn-button.js';
```

### Use in HTML/JSX
```html
<syn-button variant="primary">Click Me</syn-button>
<syn-text-field label="Name" placeholder="Enter name"></syn-text-field>
<syn-avatar initials="JD" size="md"></syn-avatar>
```

## Storybook Deployment

### Deploy to Chromatic (Recommended)
```bash
npx chromatic --project-token=YOUR_TOKEN
```

### Deploy to GitHub Pages
```bash
npm run build-storybook
# Upload storybook-static/ to GitHub Pages
```

### Deploy to Netlify
```bash
npm run build-storybook
# Point Netlify to storybook-static/
```

## Component Count

**48 components** ready to use:
- Foundation: Text, Icon, Divider
- Form: Button, TextField, TextArea, Checkbox, Radio, Toggle, SearchField, SelectField, Switcher, Upload
- Display: Avatar, Badge, Pill, Tag, Thumbnail, StatusIndicator, DataWell, ProgressBar, Stepper, EmptyState, ComplexStatus, OpenPages
- Navigation: Tab, TabGroup, TabHeader, SideNav, TopNavigation, PageHeader, MenuItem
- Feedback: Toast, Modal, Dialog
- Layout: ActionBar, ActionFooter, ButtonGroup, FilterPanel, FilterDropdown, RightPanel, PDPSidePanel, SelectBox, SelectMenu, Profile

## Support

- **Storybook**: `npm run storybook` for interactive docs
- **Integration Guide**: See `docs/PXM-INTEGRATION.md`
- **GitHub**: https://github.com/fesszar/syndigo
