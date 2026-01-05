# Component Reuse Audit Report

**Date:** 2026-01-05  
**Status:** Completed

---

## Executive Summary

This audit analyzes the Syndigo Design System codebase for composition patterns, identifies duplication, and proposes refactors to improve maintainability while preserving DS parity.

---

## Component Classification

### Primitives
| Component | Status | Notes |
|-----------|--------|-------|
| `Text` | ✅ Good | Token-based typography |
| Icons (`CloseIcon`, `CheckIcon`, etc.) | ⚠️ Duplicated | Multiple implementations across components |

### Atoms
| Component | Uses Text? | Uses Icons? | Notes |
|-----------|------------|-------------|-------|
| `Button` | ❌ Inline | ❌ Inline | Should use Text for label |
| `Tag` | ✅ Yes | ✅ CloseIcon | Good composition |
| `CountIndicator` | ❌ Inline | N/A | Should use Text |
| `StatusIndicator` | ❌ Inline | N/A | Should use Text |
| `MenuItem` | ❌ Inline | ✅ Props | Should use Text |
| `Radio` | ❌ Inline | N/A | Should use Text |
| `Switcher` | ❌ Inline | N/A | Should use Text |
| `Toggle` | ❌ Inline | N/A | Should use Text |
| `Thumbnail` | N/A | N/A | Image only |

### Molecules
| Component | Composition | Notes |
|-----------|-------------|-------|
| `TextField` | ✅ InputField | Good - composes with InputField |
| `SelectBox` | ⚠️ Partial | Has internal SelectBoxRow |
| `SelectMenu` | ⚠️ Partial | Has internal SelectMenuItem |
| `ButtonGroup` | ✅ Button | Good |
| `Tooltip` | ✅ Text | Good |
| `Toast` | ✅ Text + Button + Icons | Excellent composition |
| `Pill` | ❌ Inline | Should use Text |
| `TogglePills` | ❌ Inline | Should use Text |
| `InlineError` | ❌ Inline | Should use Text |

### Organisms
| Component | Panel Shell? | Uses MenuItem? | Uses Text? | Notes |
|-----------|--------------|----------------|------------|-------|
| `PageHeader` | N/A | N/A | ❌ Inline | Should use Text |
| `SideNav` | ✅ Custom | ❌ Custom SideNavMenuItem | ❌ Inline | Duplicates MenuItem pattern |
| `FilterPanel` | ✅ Custom | N/A | ❌ Inline | Should use Text |
| `RightPanel` | ✅ Custom | N/A | ❌ Inline | Panel shell pattern |
| `ProductPanel` | ✅ Custom | N/A | ❌ Inline | Panel shell pattern |
| `PDPSidePanel` | ✅ Custom | N/A | ❌ Inline | Panel shell pattern |
| `Dialog` | ✅ Overlay | N/A | ❌ Inline | Has internal buttons |
| `Modal` | ✅ Overlay | N/A | ❌ Inline | Has internal buttons |
| `Table` | N/A | N/A | ❌ Inline | Should use Text |
| `Upload` | N/A | N/A | ✅ Text | Good |
| `TopNavigation` | N/A | N/A | ✅ Text + Avatar | Good |

---

## Duplication Analysis

### 1. Typography (CRITICAL - Highest Priority)

**Issue:** 25+ components use inline font properties instead of `<Text>` component.

**Duplicated Pattern:**
```tsx
// Found in: MenuItem, SideNav, SelectMenu, RightPanel, ProductPanel, Modal, Dialog, etc.
const labelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: '16px',
  color: 'var(--color-text-secondary, #4d5c6e)',
};
```

**Components Affected:**
- `MenuItem` - labelStyle, badgeStyle, shortcutStyle
- `SideNav` - labelStyle, footerLabelStyle, actionLabelStyle
- `SelectMenu` - labelStyle
- `RightPanel` - titleStyle, headerActionStyle
- `ProductPanel` - titleStyle, tagTextStyle, idStyle, metaLabelStyle, metaValueStyle
- `Modal` - titleTextStyle
- `Dialog` - titleStyle, contentTextStyle, tooltipCategoryStyle, errorTextStyle
- `InlineError` - textStyle
- `CountIndicator` - baseStyle (font props)
- `Pill` - inline styles
- `PageHeader` - inline styles

**Canonical Implementation:** `Text` component with `variant` prop

**Refactor Steps:**
1. Replace inline font styles with `<Text variant="...">` 
2. Map existing font sizes to Text variants:
   - 11px → `supporting11Medium`
   - 12px → `body12Medium`
   - 13px → `body13Medium` or `body13Semibold`
   - 16px → `heading16Semibold`

---

### 2. CloseIcon Duplication (HIGH Priority)

**Issue:** CloseIcon implemented inline in 4+ components.

**Duplicated Locations:**
- `RightPanel` - lines 7-19
- `Modal` - lines 16-28
- `Dialog` - lines 203-215

**Canonical Implementation:** `CloseIcon` exported from `Icons/`

**Refactor Steps:**
1. Import `CloseIcon` from `../Icons` in affected components
2. Remove inline CloseIcon implementations

---

### 3. Menu Row Pattern Duplication (MEDIUM Priority)

**Issue:** SideNavMenuItem and SelectMenuItem duplicate the MenuItem pattern.

**Duplicated Pattern:**
```tsx
// SideNavMenuItem: container + icon + label with hover/active states
// SelectMenuItem: container + icon + label + checkbox with hover/selected states
// MenuItem: container + icon + label + badge + shortcut with states
```

**Analysis:**
- `SideNavMenuItem` - Similar to MenuItem but with different active styling
- `SelectMenuItem` - Similar to MenuItem but with checkbox support
- `MenuItem` - Full-featured menu item

**Recommendation:** 
- Keep separate implementations (DS shows distinct designs)
- Document in guidelines that these are intentionally separate per DS

---

### 4. Overlay/Backdrop Pattern (MEDIUM Priority)

**Issue:** Modal and Dialog share identical overlay styling.

**Duplicated Pattern:**
```tsx
// Found in both Modal.tsx and Dialog.tsx
const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};
```

**Refactor Options:**
1. Create internal `_Overlay` helper (not exported)
2. Or accept as intentional duplication (different components per DS)

**Recommendation:** Create internal helper since pattern is identical.

---

### 5. Button Styles in Overlays (LOW Priority)

**Issue:** Modal and Dialog implement button styles inline.

**Duplicated Pattern:**
```tsx
// Modal.tsx and Dialog.tsx both have:
const buttonBaseStyle = {...};
const primaryButtonStyle = {...};
const secondaryButtonStyle = {...};
```

**Recommendation:** 
- Use `Button` component in footer
- Keeps DS button variants consistent

---

### 6. Panel Shell Pattern (LOW Priority)

**Issue:** RightPanel, ProductPanel, PDPSidePanel have similar shell structures.

**Analysis:**
- Different enough in layout that merging would be forced
- DS shows these as distinct components
- Keep separate per DS

---

## Refactor Priority

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 1 | Typography normalization | High | Medium |
| 2 | CloseIcon consolidation | Medium | Low |
| 3 | Internal overlay helper | Medium | Low |
| 4 | Button reuse in overlays | Low | Medium |

---

## Components with Good Composition ✅

These components correctly use primitives/atoms:

1. **Toast** - Uses `Text`, `Button`, Icons
2. **Tag** - Uses `Text`, `CloseIcon`
3. **TextField** - Uses `InputField`
4. **Upload** - Uses `Text`
5. **TopNavigation** - Uses `Text`, `Avatar`
6. **Tooltip** - Uses `Text`

---

## TODO/MISSING.md Items

None identified - all required primitives exist in DS.

---

## Action Items

### Completed (This Audit)
- [x] Create this audit report
- [x] Refactor MenuItem to use Text component
- [x] Refactor InlineError to use Text component
- [x] Refactor CountIndicator to use Text component
- [x] Consolidate CloseIcon usage in RightPanel
- [x] Consolidate CloseIcon usage in Modal
- [x] Modal now uses Button component for footer actions
- [x] Add composition rules to Guidelines.md

### Future (Separate PRs)
- Refactor SideNav/SelectMenu to use Text
- Refactor Dialog to use shared components
- Refactor ProductPanel to use Text
- Consider CountIndicator usage in SideNav badges
- Review panel shell patterns

---

## Verification Checklist

- [x] MenuItem using Text for typography
- [x] InlineError using Text for typography
- [x] CountIndicator using Text for typography
- [x] RightPanel using shared CloseIcon and Text
- [x] Modal using shared CloseIcon, Text, and Button
- [x] Guidelines updated with composition rules
- [ ] Remaining components to be refactored in future PRs

## Changes Made

### Files Modified

| File | Changes |
|------|---------|  
| `MenuItem/MenuItem.tsx` | Now uses `Text` for labels, badges, shortcuts |
| `InlineError/InlineError.tsx` | Now uses `Text` for messages |
| `CountIndicator/CountIndicator.tsx` | Now uses `Text` for count display |
| `RightPanel/RightPanel.tsx` | Now uses shared `CloseIcon` and `Text` |
| `Modal/Modal.tsx` | Now uses shared `CloseIcon`, `Text`, and `Button` |
| `guidelines/Guidelines.md` | Added Composition Rules section |
