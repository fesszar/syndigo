# TopNavigation

A top navigation bar component for application headers.

**Figma Source:** [Top Navigation](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22507-30172)

---

## Overview

TopNavigation provides a **consistent header bar** with logo, environment indicator, search, notifications, and user avatar. It follows a standard layout pattern for application navigation.

**Use cases:**
- Application header
- Dashboard navigation
- Admin panel header

---

## Component Composition

**TopNavigation composes:**
- `Avatar` component - User profile image
- `Text` component - Environment badge text
- Custom icons (Search, Bell, Message, Chevron)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | - | Logo element |
| `environment` | `string` | - | Environment badge text (e.g., "Sandbox") |
| `environmentStatus` | `'success' \| 'warning' \| 'error'` | `'success'` | Environment status color |
| `searchPlaceholder` | `string` | `'Search'` | Search input placeholder |
| `searchValue` | `string` | `''` | Search input value |
| `onSearchChange` | `(value: string) => void` | - | Search change handler |
| `messageCount` | `number` | - | Message notification count |
| `alertCount` | `number` | - | Alert notification count |
| `avatarSrc` | `string` | - | Avatar image source |
| `avatarAlt` | `string` | `'User avatar'` | Avatar alt text |
| `avatarInitials` | `string` | - | Avatar initials fallback |
| `onAvatarClick` | `() => void` | - | Avatar click handler |
| `onMessageClick` | `() => void` | - | Message icon click handler |
| `onAlertClick` | `() => void` | - | Alert icon click handler |
| `className` | `string` | - | Additional class name |
| `style` | `CSSProperties` | - | Additional styles |

---

## Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] [Env Badge]          [Search]     [Icons] [Avatar ▼]    │
└────────────────────────────────────────────────────────────────┘
```

### Left Section
- Logo (ReactNode slot)
- Environment badge with status dot

### Right Section
- Search input
- Notification icons (messages, alerts)
- User avatar with dropdown chevron

---

## Visual Specifications

### Container
- **Height:** 58px
- **Padding:** 0 14px
- **Background:** white
- **Border:** 1px bottom stroke/light

### Environment Badge
- **Background:** white
- **Border:** 1px stroke/light
- **Border radius:** 30px (pill)
- **Status dot:** 10px circle (green/orange/red)

### Search Input
- **Height:** 34px
- **Border radius:** 4px
- **Shadow:** 0px 1px 3px rgba(0,0,0,0.1)

### Notification Badge
- **Size:** 17px
- **Background:** system/critical (#db3a3a)
- **Border:** 2px white
- **Border radius:** 60px

---

## Usage Examples

### Basic Usage

```tsx
import { TopNavigation } from '@syndigo/components';

<TopNavigation
  logo={<img src="/logo.png" alt="Company" height={25} />}
  environment="Sandbox"
  environmentStatus="success"
  avatarSrc="/user.jpg"
  avatarAlt="John Doe"
  onAvatarClick={() => openUserMenu()}
/>
```

### With Notifications

```tsx
<TopNavigation
  logo={<img src="/logo.png" alt="Company" height={25} />}
  environment="Production"
  environmentStatus="warning"
  messageCount={5}
  alertCount={3}
  onMessageClick={() => openMessages()}
  onAlertClick={() => openNotifications()}
  avatarSrc="/user.jpg"
  onAvatarClick={() => openUserMenu()}
/>
```

### With Controlled Search

```tsx
const [search, setSearch] = useState('');

<TopNavigation
  logo={<Logo />}
  environment="Sandbox"
  searchValue={search}
  onSearchChange={setSearch}
  searchPlaceholder="Search products..."
  avatarSrc="/user.jpg"
/>
```

---

## Environment Status Colors

| Status | Color | Use Case |
|--------|-------|----------|
| `success` | Green (#0e8662) | Sandbox, Dev |
| `warning` | Orange (#f58319) | Staging |
| `error` | Red (#db3a3a) | Production |

---

## Accessibility

- `<nav>` element for semantic navigation
- `aria-label` on icon buttons
- Keyboard accessible (tab navigation)
- Focus visible states

---

## Do's and Don'ts

### Do's
- ✅ Always include a logo
- ✅ Show environment badge in non-production
- ✅ Display notification counts when relevant
- ✅ Provide avatar click handler for user menu

### Don'ts
- ❌ Don't add custom elements outside defined slots
- ❌ Don't override the fixed height
- ❌ Don't remove the bottom border

---

## Related Components

- [Avatar](./avatar.md) - User profile image
- [SideNavigation](./side-navigation.md) - Vertical navigation
- [Breadcrumb](./breadcrumb.md) - Page hierarchy
