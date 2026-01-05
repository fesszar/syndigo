# Avatar Component

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk` (node-id: 22478-4616)

---

## Overview

The `<Avatar>` component displays a user representation as initials, an icon, or an image. It supports multiple sizes with automatic fallback from image to initials.

---

## API

```tsx
interface AvatarProps {
  type?: 'initials' | 'icon' | 'image';  // default: 'initials'
  size?: 'sm' | 'md' | 'lg' | 'xl';      // default: 'md'
  src?: string;                           // Image URL (for type="image")
  alt?: string;                           // Alt text for image
  initials?: string;                      // Direct initials (e.g., "JD")
  name?: string;                          // Full name (generates initials)
  onImageError?: () => void;              // Callback when image fails
  className?: string;
  style?: CSSProperties;
}
```

---

## Variants (from Figma)

### Sizes

| Size | Dimensions | Font Size | Icon Size | Radius |
|------|------------|-----------|-----------|--------|
| `sm` | 24×24px | 12px | 14px | `--radius-sm` (4px) |
| `md` | 28×28px | 12px | 16px | `--radius-sm` (4px) |
| `lg` | 32×32px | 16px | 18px | `--radius-sm` (4px) |
| `xl` | 40×40px | 16px | 24px | `--radius-md` (8px) |

### Types

| Type | Description |
|------|-------------|
| `initials` | Shows 2-letter initials (default) |
| `icon` | Shows generic user icon |
| `image` | Shows user photo (with fallback) |

---

## Fallback Behavior

1. **Image → Initials**: If `type="image"` and the image fails to load, automatically falls back to initials
2. **Name → Initials**: If `initials` prop not provided, generates from `name` prop:
   - "John Doe" → "JD"
   - "Alice" → "AL"
   - No name → "FL" (default)

---

## Usage Examples

### Example 1: Basic Initials

```tsx
import { Avatar } from '@syndigo/design-system';

// With direct initials
<Avatar initials="JD" size="lg" />

// With name (auto-generates initials)
<Avatar name="John Doe" size="lg" />

// Different sizes
<Avatar initials="AB" size="sm" />
<Avatar initials="AB" size="md" />
<Avatar initials="AB" size="lg" />
<Avatar initials="AB" size="xl" />
```

### Example 2: Icon Type

```tsx
// Generic user icon (for anonymous/placeholder)
<Avatar type="icon" size="md" />
<Avatar type="icon" size="xl" />
```

### Example 3: Image with Fallback

```tsx
// Image avatar with automatic fallback
<Avatar
  type="image"
  src="https://example.com/user-photo.jpg"
  name="Jane Smith"
  alt="Jane Smith's profile photo"
  onImageError={() => console.log('Image failed to load')}
/>
```

### Example 4: User List

```tsx
function UserList({ users }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {users.map((user) => (
        <Avatar
          key={user.id}
          type="image"
          src={user.avatarUrl}
          name={user.name}
          size="md"
        />
      ))}
    </div>
  );
}
```

---

## Styling Tokens

| Property | Token |
|----------|-------|
| Background | `--color-surface-medium` (#dee5ef) |
| Text color | `--color-text-primary` |
| Icon color | `--color-text-tertiary` (#91a0b3) |
| Border radius (sm/md/lg) | `--radius-sm` (4px) |
| Border radius (xl) | `--radius-md` (8px) |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use name prop for automatic initials
<Avatar name="John Doe" />

// Use image with fallback name
<Avatar type="image" src={user.photo} name={user.name} />

// Use appropriate sizes for context
<Avatar size="sm" />  {/* Inline/compact */}
<Avatar size="xl" />  {/* Profile header */}

// Handle image errors gracefully
<Avatar
  type="image"
  src={url}
  name={name}
  onImageError={() => trackImageError()}
/>
```

### ❌ Don't

```tsx
// Don't use image type without fallback
<Avatar type="image" src={url} />  {/* No name! */}

// Don't use raw colors
<Avatar style={{ backgroundColor: 'blue' }} />

// Don't use non-standard sizes
<Avatar style={{ width: 50, height: 50 }} />  {/* Use size prop */}

// Don't provide more than 2 characters for initials
<Avatar initials="ABC" />  {/* Only first 2 shown */}
```

---

## Figma Mapping

| Figma Property | Component Prop |
|----------------|----------------|
| `Type=Initials` | `type="initials"` |
| `Type=Icon` | `type="icon"` |
| `Size=sm` | `size="sm"` |
| `Size=md` | `size="md"` |
| `Size=lg` | `size="lg"` |
| `Size=xl` | `size="xl"` |
| `initialsContent` | `initials` or derived from `name` |

---

## Accessibility

- Image avatars have `alt` text
- Icon type uses semantic SVG with proper viewBox
- Color contrast meets WCAG AA for initials text
