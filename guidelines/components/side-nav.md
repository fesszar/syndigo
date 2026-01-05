# SideNav

A collapsible side navigation component with menu items, action buttons, sections, and badges.

**Figma Source:** [Side Nav](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=17970-6726)

---

## Overview

SideNav is a **collapsible navigation sidebar** with support for menu items, quick action buttons, section dividers, badges, and branding footer.

**Use cases:**
- Main application navigation
- Dashboard sidebar
- Admin panel navigation

---

## Props

### SideNav Props

```typescript
interface SideNavProps {
  /** Current state */
  state?: 'expanded' | 'collapsed';
  /** Toggle handler */
  onToggle?: () => void;
  /** Logo for expanded state */
  logo?: ReactNode;
  /** Logo icon for collapsed state */
  logoIcon?: ReactNode;
  /** Action buttons (Quick Actions, Open Pages) */
  actionButtons?: SideNavActionButton[];
  /** Menu sections */
  sections?: SideNavSection[];
  /** Footer content */
  footer?: ReactNode;
}
```

### SideNavMenuItem

```typescript
interface SideNavMenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  disabled?: boolean;
}
```

### SideNavSection

```typescript
interface SideNavSection {
  id: string;
  items: SideNavMenuItem[];
}
```

### SideNavActionButton

```typescript
interface SideNavActionButton {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  onClick?: () => void;
}
```

---

## Visual Specifications

### Container States

| State | Width | Content |
|-------|-------|---------|
| expanded | 206px | Icons + labels + logo |
| collapsed | 68px | Icons only + logo icon |

### Dimensions
- **Expanded width:** 206px
- **Collapsed width:** 68px
- **Padding:** 16px
- **Shadow:** 0px 14px 18px rgba(77, 92, 110, 0.15)

### MenuItem States

| State | Background | Icon/Text Color |
|-------|------------|-----------------|
| default | white | #91a0b3 (grey) |
| active | black | white |
| hover | implied | darker grey |

### MenuItem Dimensions
- **Height:** 30px
- **Padding:** 4px 8px
- **Border radius:** 4px
- **Icon size:** 20×20px
- **Gap (expanded):** 8px

### Action Button Dimensions
- **Height:** 34px
- **Padding:** 8px 10px (expanded), 8px (collapsed)
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Shadow:** 0px 1px 3px rgba(0, 0, 0, 0.1)

### Badge
- **Background:** #4d5c6e
- **Border radius:** 999px
- **Font:** Inter Semi Bold, 11px
- **Padding:** 2px 5px
- **Position:** Top right of button

### Typography
- **Menu label:** Inter Medium, 13px, line-height 16px
- **Footer label:** Inter Medium, 11px

---

## Usage Examples

### Basic Usage

```tsx
import { SideNav } from '@syndigo/components';

<SideNav
  state="expanded"
  onToggle={() => setCollapsed(!collapsed)}
  logo={<img src="/logo.png" alt="Logo" />}
  logoIcon={<img src="/logo-icon.png" alt="Logo" />}
  sections={[
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, active: true },
        { id: 'products', label: 'Products', icon: <ProductsIcon /> },
        { id: 'assets', label: 'Digital Assets', icon: <AssetsIcon /> },
      ],
    },
  ]}
/>
```

### With Action Buttons

```tsx
<SideNav
  state={navState}
  onToggle={toggleNav}
  actionButtons={[
    { id: 'quick', label: 'Quick Actions', icon: <FlashIcon /> },
    { id: 'pages', label: 'Open Pages', icon: <FolderIcon />, badge: 19 },
  ]}
  sections={sections}
/>
```

### With Multiple Sections

```tsx
<SideNav
  state={navState}
  sections={[
    {
      id: 'main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, active: true },
        { id: 'products', label: 'Products', icon: <ProductsIcon /> },
      ],
    },
    {
      id: 'settings',
      items: [
        { id: 'help', label: 'Help', icon: <HelpIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
      ],
    },
  ]}
/>
```

### Collapsed State

```tsx
<SideNav
  state="collapsed"
  onToggle={() => setNavState('expanded')}
  logoIcon={<SyndigoIcon />}
  sections={sections}
/>
```

---

## Selection/Active States

### Active State Styling (Exactly Matches DS)

| Property | Active | Default |
|----------|--------|---------|
| Background | black | white |
| Icon color | white | #91a0b3 |
| Text color | white | #4d5c6e |
| Border radius | 4px | 4px |

### Implementation

```tsx
const itemStyle = {
  backgroundColor: item.active ? 'black' : 'white',
  color: item.active ? 'white' : '#4d5c6e',
};

const iconStyle = {
  color: item.active ? 'white' : '#91a0b3',
};
```

---

## Accessibility

- `role="navigation"` on container
- `aria-label` on hamburger toggle
- Keyboard navigation support
- Disabled state handling

---

## Do's and Don'ts

### Do's
- ✅ Use for main app navigation
- ✅ Mark current page as active
- ✅ Group related items in sections
- ✅ Use badges for notifications

### Don'ts
- ❌ Don't use for secondary navigation
- ❌ Don't nest menus (use separate panel)
- ❌ Don't mix navigation with actions
- ❌ Don't use without toggle functionality

---

## Related Components

- [MenuItem](./menu-item.md) - Individual menu item
- [Badge](./badge.md) - Notification badge
- [Divider](./divider.md) - Section divider
