# Tab

A panel-style tab component with optional badge count and menu icon.

**Figma Source:** [Tab](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22499-29217)

---

## Overview

Tab is a **panel-style tab** with support for badge counts and contextual menu actions. It's distinct from TabHeader which is a navigation header component.

**Use cases:**
- Panel tabs with counts
- Content tabs with actions
- Tabs with contextual menus

---

## Props

```typescript
interface TabComponentProps {
  /** Tab label */
  label: string;
  /** Active state */
  isActive?: boolean;
  /** Badge count */
  badge?: number;
  /** Show menu icon (ellipses) */
  showMenu?: boolean;
  /** Menu click handler */
  onMenuClick?: () => void;
  /** Tab click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}
```

---

## Tab States (3 total)

| State | Text Color | Font Weight | Border |
|-------|------------|-------------|--------|
| `default` | Grey (#4d5c6e) | Medium (500) | None |
| `hover` | Black | Semi Bold (600) | None |
| `active` | Blue (#2d75e2) | Semi Bold (600) | 2px blue bottom |

---

## Visual Specifications

### Container
- **Padding:** 16px vertical, 8px horizontal
- **Gap:** 8px
- **Border radius (top):** 4px
- **Active border:** 2px bottom #2d75e2

### Label
- **Font:** Inter
- **Size:** 12px
- **Line height:** 14px
- **Weight (default):** 500
- **Weight (hover/active):** 600

### Badge
- **Background:** #4d5c6e
- **Border radius:** 4px
- **Padding:** 2px 3px
- **Font:** Inter Medium, 13px
- **Color:** white

### Menu Icon
- **Size:** 16×16px
- **Color:** #718094

---

## Usage Examples

### Basic Tab

```tsx
import { Tab } from '@syndigo/components';

<Tab
  label="Products"
  isActive={activeTab === 'products'}
  onClick={() => setActiveTab('products')}
/>
```

### Tab with Badge

```tsx
<Tab
  label="Messages"
  badge={12}
  isActive={activeTab === 'messages'}
  onClick={() => setActiveTab('messages')}
/>
```

### Tab with Menu

```tsx
<Tab
  label="Settings"
  showMenu
  onMenuClick={() => openTabMenu()}
  onClick={() => setActiveTab('settings')}
/>
```

### Tab with Badge and Menu

```tsx
<Tab
  label="Notifications"
  badge={5}
  showMenu
  isActive
  onMenuClick={() => openMenu()}
/>
```

### Tab Group

```tsx
const tabs = [
  { id: 'all', label: 'All', badge: 42 },
  { id: 'active', label: 'Active', badge: 12 },
  { id: 'archived', label: 'Archived', badge: 30 },
];

<div style={{ display: 'flex' }}>
  {tabs.map((tab) => (
    <Tab
      key={tab.id}
      label={tab.label}
      badge={tab.badge}
      isActive={activeTab === tab.id}
      showMenu
      onClick={() => setActiveTab(tab.id)}
      onMenuClick={() => openMenu(tab.id)}
    />
  ))}
</div>
```

---

## Relationship with TabHeader

| Component | Use Case |
|-----------|----------|
| **Tab** | Panel-style tabs with badge/menu |
| **TabHeader** | Navigation header with tabs |

Use **Tab** when you need:
- Badge counts
- Contextual menu per tab
- Panel-style layout

Use **TabHeader** when you need:
- Simple navigation tabs
- Trailing layout icon
- Size variants (default/small)

---

## Accessibility

- `role="tab"` on component
- `aria-selected` for active state
- Keyboard navigation support
- Menu accessible via keyboard

---

## Do's and Don'ts

### Do's
- ✅ Use for panel-style tabs
- ✅ Show meaningful badge counts
- ✅ Provide menu actions when relevant
- ✅ Mark active tab clearly

### Don'ts
- ❌ Don't use for main navigation
- ❌ Don't show badge=0 (hide instead)
- ❌ Don't overload with too many actions
- ❌ Don't mix with TabHeader in same context

---

## Related Components

- [TabHeader](./tab-header.md) - Navigation tab header
- [Switcher](./switcher.md) - Segmented control
