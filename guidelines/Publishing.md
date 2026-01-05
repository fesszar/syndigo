# Publishing @syndigo/design-system

This guide covers publishing the Syndigo Design System as an npm package for use with Figma Make and other React applications.

---

## Package Overview

| Field | Value |
|-------|-------|
| Name | `@syndigo/design-system` |
| Type | ESM (ES Modules) |
| Framework | React 18+ |
| Exports | Components, Tokens, Types, CSS |

---

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] All components are exported from `src/index.ts`
- [ ] Types are generated (`npm run build`)
- [ ] `tokens.css` is bundled correctly
- [ ] Version is bumped in `package.json`
- [ ] Changelog is updated (if applicable)

---

## Build

```bash
# Install dependencies
npm install

# Build the library (ESM + types)
npm run build
```

**Output:**
```
dist/
├── index.js          # ESM bundle
├── index.d.ts        # TypeScript declarations
├── style.css         # Bundled component styles
└── tokens.css        # Design tokens CSS
```

---

## Publishing to npm (Public)

### First-time Setup

```bash
# Login to npm
npm login

# For scoped packages, ensure public access
npm config set access public
```

### Publish

```bash
# Dry run to see what will be published
npm pack --dry-run

# Publish to npm
npm publish --access public
```

### Version Bumping

```bash
# Patch release (0.1.0 -> 0.1.1)
npm version patch

# Minor release (0.1.0 -> 0.2.0)
npm version minor

# Major release (0.1.0 -> 1.0.0)
npm version major
```

---

## Publishing to Private Registry

### GitHub Packages

1. Create `.npmrc` in project root:

```
@syndigo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Ensure `package.json` has:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

3. Publish:

```bash
npm publish
```

### Verdaccio / Private npm

1. Create `.npmrc`:

```
@syndigo:registry=https://your-registry.example.com/
//your-registry.example.com/:_authToken=${NPM_TOKEN}
```

2. Publish:

```bash
npm publish --registry https://your-registry.example.com/
```

---

## Installation for Consumers

### From npm (Public)

```bash
npm install @syndigo/design-system
```

### From GitHub Packages

```bash
# Configure .npmrc first
echo "@syndigo:registry=https://npm.pkg.github.com" >> .npmrc

npm install @syndigo/design-system
```

### From Local (Development)

```bash
# In the design-system directory
npm link

# In your consuming project
npm link @syndigo/design-system
```

---

## Figma Make Installation

### Step 1: Install the Package

In your Figma Make project:

```bash
npm install @syndigo/design-system
```

### Step 2: Import Components

```tsx
// Components are auto-imported with CSS
import { Button, Text, Card } from '@syndigo/design-system';

function MyComponent() {
  return (
    <Card>
      <Text variant="heading16Semibold">Hello</Text>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### Step 3: (Optional) Import Tokens CSS Separately

If CSS isn't loading automatically:

```tsx
// At your app entry point
import '@syndigo/design-system/tokens.css';
```

### Step 4: Use Design Tokens

```tsx
import { tokens } from '@syndigo/design-system';

// Access token values
const primaryColor = tokens.colors.textPrimary;
const spacing = tokens.spacing[16];
```

---

## What's Included in the Package

### Exports

| Export | Description |
|--------|-------------|
| Components | All React components (Button, Text, Modal, etc.) |
| Tokens | Design token object (`tokens.colors`, `tokens.spacing`, etc.) |
| Types | TypeScript types for all components and tokens |
| CSS | Design tokens as CSS custom properties |

### Files

| Path | Description |
|------|-------------|
| `dist/index.js` | ESM bundle with all components |
| `dist/index.d.ts` | TypeScript declarations |
| `dist/tokens.css` | CSS custom properties |
| `guidelines/` | Documentation and usage guides |

---

## Troubleshooting

### CSS Not Loading

If styles aren't applied, ensure CSS is imported:

```tsx
// Option 1: Import main entry (includes CSS)
import '@syndigo/design-system';

// Option 2: Import tokens.css directly
import '@syndigo/design-system/tokens.css';
```

### TypeScript Errors

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```

### Peer Dependency Warnings

This package requires React 18+. Install peer dependencies:

```bash
npm install react@^18 react-dom@^18
```

---

## CI/CD Publishing

### GitHub Actions Example

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Support

- **Guidelines:** See `guidelines/` folder
- **Component Docs:** See `guidelines/components/`
- **Design Tokens:** See `guidelines/design-tokens/`
