# Profile

A reusable profile dropdown/card component for displaying user information with optional menu actions.

**Figma Source:** [Profile Dropdown](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-24227)

---

## Overview

Profile is a **header card / user summary component** with dropdown menu. It contains **no auth/user logic** - all data is passed via props.

**Use cases:**
- User profile dropdown in navigation
- Account summary cards
- Team member displays
- Any user/entity summary with actions

---

## Props

```typescript
interface ProfileMenuItem {
  /** Menu item label */
  label: string;
  /** Menu item icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Destructive styling (e.g., logout) */
  destructive?: boolean;
  /** Show separator before item */
  showSeparator?: boolean;
}

interface ProfileProps {
  /** Avatar content (image or initials) */
  avatar?: ReactNode;
  /** Display name (required) */
  name: string;
  /** Email address */
  email?: string;
  /** Role or secondary info */
  role?: string;
  /** Menu items */
  menuItems?: ProfileMenuItem[];
  /** Show dropdown menu */
  showMenu?: boolean;
}
```

---

## Visual Specifications

### Header Section
- **Background:** #f7f9fb
- **Padding:** 16px 14px
- **Border:** 1px solid #dee5ef
- **Border radius:** 6px (top corners)

### Avatar
- **Size:** 50×50px
- **Border radius:** 50% (circular)

### Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Name | Inter | 16px | 600 | black |
| Email | Inter | 12px | 500 | #91a0b3 |
| Role | Inter | 12px | 500 | #91a0b3 |
| Menu item | Inter | 12px | 500 | black |
| Destructive | Inter | 12px | 500 | #db3a3a |

### Menu Section
- **Background:** white
- **Padding:** 7px
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px (bottom corners)
- **Shadow:** 0px 14px 18px rgba(77, 92, 110, 0.15)

### Menu Item
- **Height:** 38px
- **Padding:** 0 10px
- **Icon size:** 17×17px

---

## Usage Examples

### Basic Profile

```tsx
import { Profile } from '@syndigo/components';

<Profile
  name="Jessica Balakrishnan"
  email="jessica@acme.com"
  role="System Administrator"
/>
```

### With Custom Avatar

```tsx
<Profile
  avatar={<img src="/avatar.jpg" alt="User" style={{ width: 50, height: 50, borderRadius: '50%' }} />}
  name="Jessica Balakrishnan"
  email="jessica@acme.com"
/>
```

### With Menu Items

```tsx
<Profile
  name="Jessica Balakrishnan"
  email="jessica@acme.com"
  role="System Administrator"
  menuItems={[
    {
      label: 'Switch to Classic UI',
      icon: <SwitchIcon />,
      onClick: () => handleSwitch(),
    },
    {
      label: 'My Profile',
      icon: <UserIcon />,
      onClick: () => handleProfile(),
    },
    {
      label: 'Logout',
      icon: <LogoutIcon />,
      onClick: () => handleLogout(),
      destructive: true,
      showSeparator: true,
    },
  ]}
/>
```

### Header Only (No Menu)

```tsx
<Profile
  name="Team Member"
  email="member@acme.com"
  showMenu={false}
/>
```

---

## Slots

The Profile component provides these content slots:

| Slot | Type | Description |
|------|------|-------------|
| `avatar` | ReactNode | Custom avatar content |
| `menuItems[].icon` | ReactNode | Menu item icon |

---

## No Auth/User Logic

This component does NOT:
- ❌ Fetch user data
- ❌ Handle authentication
- ❌ Manage session state
- ❌ Perform logout operations

All user data and action handlers must be provided by the consuming application:

```tsx
// Good - data and handlers from app
<Profile
  name={user.displayName}
  email={user.email}
  role={user.role}
  menuItems={[
    {
      label: 'Logout',
      onClick: () => authService.logout(),
      destructive: true,
    },
  ]}
/>

// Bad - expecting component to handle auth
<Profile
  userId={userId}  // ❌ Don't pass IDs for fetching
  onLogout  // ❌ Don't expect built-in auth
/>
```

---

## Accessibility

- Menu items are buttons with proper focus states
- Keyboard navigation support
- Color contrast meets WCAG guidelines
- Destructive items clearly indicated

---

## Do's and Don'ts

### Do's
- ✅ Use for user profile displays
- ✅ Pass pre-formatted display data
- ✅ Handle auth in parent component
- ✅ Use destructive flag for logout

### Don'ts
- ❌ Don't bake in auth logic
- ❌ Don't fetch user data internally
- ❌ Don't hardcode menu items
- ❌ Don't use without name prop

---

## Related Components

- [Avatar](./avatar.md) - Standalone avatar display
- [MenuItem](./menu-item.md) - Menu items
- [Dropdown](./dropdown.md) - Generic dropdown menus
