# Typography Tokens

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk`, node `22399:214`

---

## Overview

Typography tokens define all text styling in the design system. All text must use the `<Text>` component with a predefined variant.

## Font Family

| Token | Value |
|-------|-------|
| `fontFamilies.sans` | `Inter, sans-serif` |

## Font Weights

| Token | CSS Variable | Value |
|-------|--------------|-------|
| `fontWeights.bold` | `--weight-font-weight-bold` | 700 |
| `fontWeights.semibold` | `--weight-font-weight-semibold` | 600 |
| `fontWeights.medium` | `--weight-font-weight-medium` | 500 |

## Font Sizes

| Token | CSS Variable | Value |
|-------|--------------|-------|
| lg | `--size-font-size-lg` | 20px |
| md | `--size-font-size-md` | 16px |
| sm | `--size-font-size-sm` | 14px |
| xs | `--size-font-size-xs` | 13px |
| 2xs | `--size-font-size-2xs` | 12px |
| 3xs | `--size-font-size-3xs` | 11px |
| 4xs | `--size-font-size-4xs` | 10px |
| 5xs | `--size-font-size-5xs` | 9px |

## Line Heights

| Token | CSS Variable | Value |
|-------|--------------|-------|
| lg | `--line-height-font-line-height-lg` | 20px |
| md | `--line-height-font-line-height-md` | 20px |
| sm | `--line-height-font-line-height-sm` | 18px |
| xs | `--line-height-font-line-height-xs` | 16px |
| 2xs | `--line-height-font-line-height-2xs` | 14px |
| 3xs | `--line-height-font-line-height-3xs` | 12px |

## Letter Spacing

| Token | CSS Variable | Value |
|-------|--------------|-------|
| `letterSpacing.normal` | `--spacing-font-letter-spacing-normal` | 0px |
| `letterSpacing.dense` | `--spacing-font-letter-spacing-dense` | -0.2px |

---

## Text Style Variants

### Heading (16px)

| Variant | Figma Name | Size | Weight | Line Height |
|---------|------------|------|--------|-------------|
| `heading16Bold` | 16-bold | 16px | 700 | 20px |
| `heading16Semibold` | 16-semibold | 16px | 600 | 20px |
| `heading16Medium` | 16-medium | 16px | 500 | 20px |

### Body (14px, 13px, 12px)

| Variant | Figma Name | Size | Weight | Line Height |
|---------|------------|------|--------|-------------|
| `body14Bold` | 14-bold | 14px | 700 | 18px |
| `body14Semibold` | 14-semibold | 14px | 600 | 18px |
| `body14Medium` | 14-medium | 14px | 500 | 18px |
| `body13Semibold` | 13-semibold | 13px | 600 | 16px |
| `body13Medium` | 13-medium | 13px | 500 | 16px |
| `body12Semibold` | 12-semibold | 12px | 600 | 14px |
| `body12Medium` | 12-medium | 12px | 500 | 14px |

### Supporting (11px, 10px, 9px)

| Variant | Figma Name | Size | Weight | Line Height | Transform |
|---------|------------|------|--------|-------------|-----------|
| `supporting11Semibold` | 11-semibold | 11px | 600 | 14px | - |
| `supporting11Medium` | 11-medium | 11px | 500 | 14px | - |
| `supporting11SemiboldCaps` | 11-semibold-caps | 11px | 600 | 14px | **UPPERCASE** |
| `supporting10SemiboldCaps` | 10-semibold-caps | 10px | 600 | 12px | none |
| `supporting9Medium` | 9-medium | 9px | 500 | 12px | - |

---

## ⚠️ Edge Cases

### `supporting11SemiboldCaps` — MUST be uppercase

- **Figma node:** `22399:277`
- This style applies `text-transform: uppercase`
- Use for: labels, badges, status indicators that require emphasis

### `supporting10SemiboldCaps` — MUST NOT be uppercase

- **Figma node:** `22399:281`
- Despite the name containing "caps", this style does **NOT** apply uppercase
- The naming is historical; the actual Figma style has no text transform
- Use for: compact labels where case should be preserved

### `body13Semibold` — Baseline reference

- **Figma node:** `22399:251`
- Standard body text style at 13px
- Use as reference for typical content text

---

## Usage

```tsx
import { Text } from '@syndigo/design-system';

// Heading
<Text variant="heading16Bold">Page Title</Text>

// Body
<Text variant="body14Medium">Regular content text</Text>

// Supporting with uppercase
<Text variant="supporting11SemiboldCaps">STATUS LABEL</Text>

// Supporting without uppercase (despite name)
<Text variant="supporting10SemiboldCaps">Compact Label</Text>
```
