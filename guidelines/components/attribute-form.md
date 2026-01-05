# AttributeForm Components

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk` (node-id: 22478-4457)

---

## Overview

The AttributeForm system is a **composed pattern** for displaying and editing product attributes. It consists of three components that work together:

| Component | Figma Name | Purpose |
|-----------|------------|---------|
| `AttributeForm` | Attribute form | Layout container |
| `AttributeGroupHeader` | attribute group header | Section header with error badge |
| `AttributeRow` | attribute | Individual attribute with label + input |

---

## Components

### AttributeGroupHeader

Section header for attribute groups.

```tsx
interface AttributeGroupHeaderProps {
  label: string;
  showTooltip?: boolean;      // default: true
  tooltipContent?: ReactNode;
  errorCount?: number;        // 0 = hidden
  className?: string;
  style?: CSSProperties;
}
```

### AttributeRow

Individual attribute row with 8-column grid layout.

```tsx
interface AttributeRowProps {
  label: string;
  inputType?: 'textField' | 'textArea' | 'tags' | 'table' | 'emptyState';
  multiLanguage?: boolean;    // default: false
  showTooltip?: boolean;      // default: true
  errorMessage?: string;
  showAiIcon?: boolean;       // default: true
  showHistoryIcon?: boolean;  // default: true
  children: ReactNode;        // The actual input component
  className?: string;
  style?: CSSProperties;
}
```

### AttributeForm

Layout container for groups and rows.

```tsx
interface AttributeFormProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
```

---

## Variants (from Figma)

### AttributeRow inputType

| Type | Description |
|------|-------------|
| `textField` | Single-line text input |
| `textArea` | Multi-line text input |
| `tags` | Tag/chip input |
| `table` | Table input |
| `emptyState` | Empty placeholder |

### AttributeRow multiLanguage

| Value | Description |
|-------|-------------|
| `false` | Single language input |
| `true` | Multiple language inputs with labels |

---

## Usage Examples

### Example 1: Basic Attribute Form

```tsx
import { 
  AttributeForm, 
  AttributeGroupHeader, 
  AttributeRow,
  TextField 
} from '@syndigo/design-system';

function ProductAttributesForm() {
  return (
    <AttributeForm>
      <AttributeGroupHeader 
        label="Basic Information" 
        errorCount={2}
      />
      <AttributeForm.Attributes>
        <AttributeForm.AttributeWrapper>
          <AttributeRow label="Product Name" errorMessage="Required">
            <TextField 
              placeholder="Enter product name" 
              state="error"
            />
          </AttributeRow>
        </AttributeForm.AttributeWrapper>
        
        <AttributeForm.AttributeWrapper>
          <AttributeRow label="Description" inputType="textArea">
            <TextArea placeholder="Enter description" />
          </AttributeRow>
        </AttributeForm.AttributeWrapper>
      </AttributeForm.Attributes>
      
      <AttributeGroupHeader label="Specifications" />
      <AttributeForm.Attributes>
        <AttributeForm.AttributeWrapper>
          <AttributeRow label="Color">
            <TextField value="Blue" />
          </AttributeRow>
        </AttributeForm.AttributeWrapper>
      </AttributeForm.Attributes>
    </AttributeForm>
  );
}
```

### Example 2: Multi-Language Attribute

```tsx
function MultiLanguageAttribute() {
  return (
    <AttributeRow 
      label="Product Title" 
      multiLanguage
      showAiIcon
      showHistoryIcon
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <Text variant="body12Medium" style={{ color: 'var(--color-text-tertiary)' }}>
            English (US)
          </Text>
          <TextField value="Cotton T-Shirt" />
        </div>
        <div>
          <Text variant="body12Medium" style={{ color: 'var(--color-text-tertiary)' }}>
            English (UK)
          </Text>
          <TextField value="Cotton T-Shirt" />
        </div>
      </div>
    </AttributeRow>
  );
}
```

---

## Layout Structure

```
AttributeForm
├── AttributeGroupHeader (section 1)
│   └── label + tooltip + error badge
├── AttributeForm.Attributes
│   ├── AttributeForm.AttributeWrapper
│   │   └── AttributeRow
│   │       ├── Label (cols 1-2)
│   │       └── Input + Icons + Error (cols 3-8)
│   └── AttributeForm.AttributeWrapper
│       └── AttributeRow
├── AttributeGroupHeader (section 2)
└── AttributeForm.Attributes
    └── ...
```

---

## Styling Tokens

### AttributeGroupHeader

| Property | Token |
|----------|-------|
| Background | `--color-surface-light` |
| Border | `--color-stroke-light` |
| Padding | `--spacing-16` |
| Gap | `--spacing-16`, `--spacing-4` |
| Label | `body14Bold` |
| Badge bg | `--color-system-critical` |

### AttributeRow

| Property | Token |
|----------|-------|
| Background | `--color-surface-white` |
| Grid gap | `--spacing-16` |
| Label | `body14Medium` |
| Error text | `body12Medium`, `--color-system-critical` |
| Icon color | `--color-button-primary` |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use existing input components
<AttributeRow label="Name">
  <TextField placeholder="Enter name" />
</AttributeRow>

// Show error states with message
<AttributeRow label="SKU" errorMessage="SKU is required">
  <TextField state="error" />
</AttributeRow>

// Group related attributes
<AttributeGroupHeader label="Pricing" errorCount={1} />
<AttributeForm.Attributes>
  <AttributeForm.AttributeWrapper>
    <AttributeRow label="Price">
      <TextField type="number" />
    </AttributeRow>
  </AttributeForm.AttributeWrapper>
</AttributeForm.Attributes>

// Use compound components for proper spacing
<AttributeForm.AttributeWrapper>
  <AttributeRow label="Field">...</AttributeRow>
</AttributeForm.AttributeWrapper>
```

### ❌ Don't

```tsx
// Don't re-implement input styling
<AttributeRow label="Name">
  <input style={{ border: '1px solid gray' }} />  {/* Bad */}
</AttributeRow>

// Don't skip the wrapper component
<AttributeRow label="Name">  {/* Missing wrapper! */}
  <TextField />
</AttributeRow>

// Don't invent new input types
<AttributeRow inputType="customDropdown">  {/* Not in DS */}
  <CustomDropdown />
</AttributeRow>

// Don't use raw error styling
<div style={{ color: 'red' }}>Error</div>  {/* Use errorMessage prop */}
```

---

## Figma Mapping

| Figma Component | React Component |
|-----------------|-----------------|
| `attribute group header` | `<AttributeGroupHeader />` |
| `attribute` | `<AttributeRow />` |
| `Attribute form` (frame) | `<AttributeForm />` |
| `wrapper` (frame) | `<AttributeForm.AttributeWrapper />` |
| `attributes` (frame) | `<AttributeForm.Attributes />` |

| Figma Prop | React Prop |
|------------|------------|
| `input type=text field` | `inputType="textField"` |
| `input type=text area` | `inputType="textArea"` |
| `input type=tags` | `inputType="tags"` |
| `input type=table` | `inputType="table"` |
| `input type=empty state` | `inputType="emptyState"` |
| `multi-language?=yes` | `multiLanguage={true}` |
| `badge=true` | `errorCount={n}` where n > 0 |

---

## Accessibility

- Labels are associated with inputs
- Error messages are announced
- Tooltip triggers have appropriate titles
- Icons have title attributes for screen readers
