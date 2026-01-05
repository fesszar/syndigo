# Text Component

The `<Text>` component is the only way to render text in the design system. It ensures consistent typography across all applications.

---

## When to Use

- **Always** use `<Text>` for any visible text content
- Never use raw `<p>`, `<span>`, `<h1>`, etc. with custom styles
- Never apply typography CSS directly to elements

## API

```tsx
interface TextProps {
  as?: ElementType;      // HTML element to render (default: 'span')
  variant: TextStyleVariant;  // Required typography variant
  className?: string;    // Additional CSS classes (for layout only)
  style?: CSSProperties; // Additional inline styles (for layout only)
  children?: ReactNode;
}
```

## Choosing a Variant

| Use Case | Recommended Variants |
|----------|---------------------|
| Page titles, section headers | `heading16Bold`, `heading16Semibold` |
| Subheadings | `heading16Medium` |
| Primary body text | `body14Medium`, `body14Semibold` |
| Secondary content | `body13Medium`, `body13Semibold` |
| Compact text, table cells | `body12Medium`, `body12Semibold` |
| Labels, captions | `supporting11Medium`, `supporting11Semibold` |
| Uppercase badges/status | `supporting11SemiboldCaps` |
| Compact labels | `supporting10SemiboldCaps` |
| Fine print, footnotes | `supporting9Medium` |

---

## Examples

### Example 1: Page Header

```tsx
import { Text } from '@syndigo/design-system';

function PageHeader({ title, subtitle }) {
  return (
    <header>
      <Text as="h1" variant="heading16Bold">
        {title}
      </Text>
      <Text as="p" variant="body14Medium">
        {subtitle}
      </Text>
    </header>
  );
}
```

### Example 2: Status Badge

```tsx
import { Text } from '@syndigo/design-system';

function StatusBadge({ status }) {
  return (
    <div className="badge">
      <Text variant="supporting11SemiboldCaps">
        {status}
      </Text>
    </div>
  );
}

// Renders: "ACTIVE" (uppercase applied automatically)
<StatusBadge status="active" />
```

### Example 3: Data Table Cell

```tsx
import { Text } from '@syndigo/design-system';

function TableCell({ label, value }) {
  return (
    <td>
      <Text as="div" variant="supporting11Medium">
        {label}
      </Text>
      <Text as="div" variant="body13Semibold">
        {value}
      </Text>
    </td>
  );
}
```

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use Text for all typography
<Text variant="body14Medium">Content here</Text>

// Use 'as' prop for semantic HTML
<Text as="h2" variant="heading16Bold">Section Title</Text>

// Combine with layout classes
<Text variant="body14Medium" className="mt-4">
  Spaced content
</Text>
```

### ❌ Don't

```tsx
// Don't use raw elements with inline styles
<p style={{ fontSize: '14px', fontWeight: 500 }}>Bad</p>

// Don't hardcode typography values
<span className="text-[14px] font-medium">Bad</span>

// Don't create custom text components
const MyText = styled.span`font-size: 14px;`
```

---

## Notes

- The `style` and `className` props should only be used for **layout** (margin, padding, positioning), never for typography overrides
- Text color should come from semantic color tokens, not hardcoded values
- When the design requires a style not in the variant list, request it be added to the design system
