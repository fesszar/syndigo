# TabGroup

A group of tabs with underline style, composing the existing Tab component.

**Figma Source:** [TabGroup](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22500-29377)

---

## Overview

TabGroup provides a **container for multiple Tab components** with consistent spacing and a bottom border. It manages tab selection state and delegates rendering to the existing `Tab` component.

**Use cases:**
- Panel navigation
- Content section switching
- Tabbed interfaces

---

## Component Composition

**TabGroup reuses:**
- `Tab` component - Individual tab items with label, badge, menu icon

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabGroupItem[]` | required | Array of tab items |
| `activeTab` | `string` | required | Currently active tab ID |
| `onTabChange` | `(tabId: string) => void` | required | Tab change handler |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional inline styles |
| `ariaLabel` | `string` | - | Accessible label |

### TabGroupItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | required | Tab identifier |
| `label` | `string` | required | Tab label |
| `badge` | `number` | - | Optional badge count |
| `showMenu` | `boolean` | `false` | Show ellipses menu icon |
| `onMenuClick` | `() => void` | - | Menu click handler |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Visual Specifications

### Container
- **Display:** flex, horizontal
- **Gap:** 16px
- **Border bottom:** 1px solid var(--color-stroke-light, #dee5ef)

### Tab Items (from Tab component)
- **Height:** 54px
- **Padding:** 16px 8px
- **Active border:** 2px solid var(--color-system-focus, #2d75e2)
- **Typography:** 12px, medium/semibold based on state

---

## Usage Examples

### Basic TabGroup

```tsx
import { TabGroup } from '@syndigo/components';

const [activeTab, setActiveTab] = useState('attributes');

<TabGroup
  tabs={[
    { id: 'attributes', label: 'Attributes' },
    { id: 'media', label: 'Media' },
    { id: 'history', label: 'History' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### With Badge and Menu

```tsx
<TabGroup
  tabs={[
    { id: 'attributes', label: 'Attributes', showMenu: true },
    { id: 'media', label: 'Media', badge: 12 },
    { id: 'history', label: 'History' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### With Disabled Tab

```tsx
<TabGroup
  tabs={[
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending', disabled: true },
    { id: 'archived', label: 'Archived' },
  ]}
  activeTab="active"
  onTabChange={handleTabChange}
/>
```

---

## Accessibility

- `role="tablist"` on container
- `role="tab"` on each tab (from Tab component)
- `aria-selected` indicates active tab
- `aria-label` for accessible group label
- Disabled tabs have `aria-disabled`

---

## Interactions

| Interaction | Behavior |
|-------------|----------|
| Click tab | Calls `onTabChange` with tab ID |
| Click menu icon | Calls tab's `onMenuClick` (stops propagation) |
| Click disabled tab | No action |
| Hover tab | Text becomes black, font-weight semibold |

---

## Do's and Don'ts

### Do's
- ✅ Use meaningful tab labels
- ✅ Keep tab count manageable (fits container width)
- ✅ Use badge for counts that change
- ✅ Provide `ariaLabel` for accessibility

### Don'ts
- ❌ Don't use too many tabs (consider overflow handling)
- ❌ Don't put complex content in tab labels
- ❌ Don't disable all tabs
- ❌ Don't use TabGroup for primary navigation (use TabHeader)

---

## Related Components

- [Tab](./tab.md) - Individual tab item (composed by TabGroup)
- [TabHeader](./tab-header.md) - Different tab navigation variant
- [Switcher](./switcher.md) - Segmented control alternative
