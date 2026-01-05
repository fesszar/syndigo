# MenuItem

A menu item component for navigation menus, dropdowns, and context menus.

**Figma Source:** [Menu Item](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22492-20300)

---

## Overview

The MenuItem component supports icons, badges, keyboard shortcuts, and multiple interaction states. Can be used in collapsed (icon-only) mode.

---

## Props

```typescript
interface MenuItemProps {
  /** Menu item label */
  label: string;
  /** Visual state: 'default' | 'hover' | 'active' | 'disabled' */
  state?: MenuItemState;
  /** Whether item is selected/active */
  selected?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Leading icon (left side) */
  leadingIcon?: ReactNode;
  /** Trailing icon (right side) */
  trailingIcon?: ReactNode;
  /** Badge count/text */
  badge?: string | number;
  /** Keyboard shortcut text */
  shortcut?: string;
  /** Collapsed mode (icon only) */
  collapsed?: boolean;
  /** Click handler */
  onClick?: () => void;
}
```

---

## Visual Specifications

### Container
- **Height:** 32px (min)
- **Padding:** 4px 8px
- **Border radius:** 4px
- **Gap:** 16px (between left/right)

### Typography
- **Font:** Inter Medium
- **Size:** 13px
- **Line height:** 16px

### State Styling

| State | Background | Text Color |
|-------|------------|------------|
| default | white | #4d5c6e |
| hover | #dee5ef | #4d5c6e |
| active | black | white |
| disabled | white (50% opacity) | #91a0b3 |

### Icon
- **Size:** 20×20px
- **Color:** #91a0b3 (default), white (active)

### Badge
- **Background:** #4d5c6e (default), white (active)
- **Text:** white (default), black (active)
- **Padding:** 2px 3px
- **Border radius:** 4px

---

## Usage Examples

### Basic MenuItem

```tsx
import { MenuItem } from '@syndigo/components';

<MenuItem label="Dashboard" />
```

### With Icon

```tsx
<MenuItem 
  label="Home" 
  leadingIcon={<HomeIcon />} 
/>
```

### With Badge

```tsx
<MenuItem 
  label="Notifications" 
  badge={8} 
/>
```

### With Shortcut

```tsx
<MenuItem 
  label="Save" 
  shortcut="⌘S" 
/>
```

### Active/Selected State

```tsx
<MenuItem 
  label="Dashboard" 
  selected 
/>
```

### Disabled State

```tsx
<MenuItem 
  label="Delete" 
  disabled 
/>
```

### Collapsed (Icon Only)

```tsx
<MenuItem 
  label="Home" 
  leadingIcon={<HomeIcon />} 
  collapsed 
/>
```

### Full Example

```tsx
<MenuItem
  label="Asset Information"
  leadingIcon={<FileIcon />}
  trailingIcon={<ChevronRightIcon />}
  badge={3}
  onClick={() => navigateTo('/assets')}
/>
```

---

## Accessibility

- Uses `role="menuitem"`
- Keyboard accessible (Enter/Space to activate)
- `aria-disabled` for disabled state
- `tabIndex` managed based on disabled state

---

## Do's and Don'ts

### Do's
- ✅ Use leading icons consistently in a menu
- ✅ Use badges for counts sparingly
- ✅ Provide keyboard shortcuts for common actions
- ✅ Use active state for current selection

### Don'ts
- ❌ Don't mix icon and non-icon items inconsistently
- ❌ Don't use long labels that truncate
- ❌ Don't disable without clear reason

---

## Related Components

- [Menu](./menu.md) - Container for MenuItems
- [ContextMenu](./context-menu.md) - Right-click menus
- [Dropdown](./dropdown.md) - Dropdown menus
