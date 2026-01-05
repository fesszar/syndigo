# TabHeader

A tab navigation header with selectable tabs.

**Figma Source:** [Tab Header](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22499-29032)

---

## Overview

TabHeader is a **horizontal tab navigation** component for switching between content sections. It supports two sizes and an optional trailing icon button.

**Use cases:**
- Content section navigation
- View switching within a page
- Settings/configuration panels

---

## Props

```typescript
interface TabHeaderProps {
  /** Array of tabs */
  tabs: TabItem[];
  /** Currently active tab id */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabId: string) => void;
  /** Tab size */
  size?: 'default' | 'small';
  /** Show trailing icon button */
  showTrailingIcon?: boolean;
  /** Trailing icon click handler */
  onTrailingIconClick?: () => void;
}

interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}
```

---

## Tab Sizes

| Size | Font | Weight | Transform | Line Height |
|------|------|--------|-----------|-------------|
| `default` | 13px | Medium (500) | Normal | 16px |
| `small` | 11px | Semi Bold (600) | Uppercase | 14px |

---

## Tab States

| State | Text Color | Border |
|-------|------------|--------|
| `default` | Grey (#4d5c6e) | None |
| `active` | Blue (#2d75e2) | 2px blue bottom |
| `hover` | Black | None |

---

## Visual Specifications

### Container
- **Background:** white
- **Padding:** 16px horizontal, 16px top, 0 bottom
- **Border (small size):** 1px bottom #dee5ef

### Tab
- **Padding bottom:** 16px
- **Gap between tabs:** 20px
- **Active indicator:** 2px solid #2d75e2 (bottom border)

### Trailing Icon
- **Position:** Absolute, right 16.67px, vertically centered
- **Size:** 20×20px
- **Color:** #718094

---

## Usage Examples

### Basic Usage

```tsx
import { TabHeader } from '@syndigo/components';

const [activeTab, setActiveTab] = useState('tab1');

<TabHeader
  tabs={[
    { id: 'tab1', label: 'Overview' },
    { id: 'tab2', label: 'Details' },
    { id: 'tab3', label: 'Settings' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Small Size (Uppercase)

```tsx
<TabHeader
  tabs={[
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  size="small"
/>
```

### With Trailing Icon

```tsx
<TabHeader
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  showTrailingIcon
  onTrailingIconClick={() => toggleLayout()}
/>
```

### With Disabled Tab

```tsx
<TabHeader
  tabs={[
    { id: 'tab1', label: 'Enabled' },
    { id: 'tab2', label: 'Disabled', disabled: true },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

---

## What's NOT Included (Don't Invent)

The Design System does NOT include:
- ❌ Closable tabs (no close button per tab)
- ❌ Tab icons (label only)
- ❌ Scrollable/overflow tabs
- ❌ Vertical tab orientation
- ❌ Tab badges/counts

Only implement what's present in the DS.

---

## Accessibility

- `role="tablist"` on container
- `role="tab"` on each tab
- `aria-selected` indicates active state
- Keyboard navigation support
- Disabled state handling

---

## Do's and Don'ts

### Do's
- ✅ Use for content section switching
- ✅ Keep tab labels short
- ✅ Mark current tab clearly
- ✅ Use consistent tab count

### Don'ts
- ❌ Don't use for primary navigation
- ❌ Don't mix sizes within one header
- ❌ Don't use more than 5-6 tabs
- ❌ Don't invent features not in DS

---

## Related Components

- [Switcher](./switcher.md) - Segmented control
- [Navigation](./navigation.md) - Main navigation
