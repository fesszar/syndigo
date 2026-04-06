# Syndigo Design System

**Official Name:** Syndigo Design System  
**Package:** @syndigo/design-system  
**Version:** 2.0.0  
**Last Updated:** 2026-04-06  
**Components:** 55 production-ready React components  
**Figma Source:** [Orbit Design System](https://figma.com/file/Hxa07kuxW2VZuVRjKVS6zM)

---

## 🎯 Quick Reference for AI Assistants

**When users say:** "use the Syndigo Design System" or "use @syndigo/design-system"  
**You should:** Import components from `@syndigo/design-system` and follow the rules below.

**Component Location:** All 55 components are in `/src/components/`  
**Import Pattern:** `import { Button, TextField, Table } from '@syndigo/design-system';`

---

## 📦 What's Available

### Complete Component List (55 Components)

#### Form & Input (11 components)
- **Button** - Primary, secondary, critical, text variants with loading/disabled states
- **InputField** - Generic input with validation
- **TextField** - Single-line text input
- **TextArea** - Multi-line text input
- **SelectField** - Dropdown selection
- **Radio** - Radio button groups
- **Toggle** - On/off switch
- **SearchField** - Search input with icon
- **SelectBox** - Multi-select with drag
- **SelectMenu** - Dropdown menu with checkmarks
- **Upload** - File upload with drag & drop

#### Layout & Containers (10 components)
- **Modal** - Overlay dialog (blocks background)
- **Dialog** - Confirmation dialog (yes/no)
- **Tooltip** - Hint on hover
- **PageHeader** - Page title with breadcrumbs/actions
- **SideNav** - Sidebar navigation menu
- **RightPanel** - Right sidebar panel
- **ProductPanel** - Left sidebar with product info
- **PDPSidePanel** - Product detail page side panel
- **ActionBar** - Fixed action bar (top/bottom)
- **ActionFooter** - Footer with actions

#### Navigation (10 components)
- **Table** - Tabular data display with sorting
- **Tab** - Single tab (used in TabGroup)
- **TabGroup** - Tabbed navigation
- **TabHeader** - Tab navigation with counts
- **MenuItem** - Single menu item
- **TopNavigation** - Top navigation bar
- **Stepper** - Multi-step progress indicator
- **FilterDropdown** - Dropdown with filter options
- **FilterPanel** - Side panel with filters
- **OpenPages** - Open page indicator (tabs)

#### Data Display (13 components)
- **Avatar** - User/entity profile picture
- **Pill** - Small tag label
- **Tag** - Removable tag
- **StatusIndicator** - Status with colored dot
- **CountIndicator** - Numeric badge (unread count)
- **Thumbnail** - Small preview image
- **DataWell** - Label-value pair display
- **ComplexStatus** - Multi-part status display
- **ProgressBar** - Progress indicator
- **ProductInfo** - Product header with metadata
- **TogglePills** - Toggle group with pill visual
- **Profile** - User profile dropdown
- **Logo** - Brand logo component

#### Feedback & States (5 components)
- **Toast** - Temporary notification
- **InlineError** - Error message below input
- **EmptyState** - Empty list placeholder
- **BackgroundTasks** - Background task status
- **Spinner** - Loading spinner

#### Actions & Controls (3 components)
- **Button** - (listed above)
- **ButtonGroup** - Group related buttons
- **Switcher** - Toggle between two states

#### Advanced (3 components)
- **AttributeForm** - Product attribute form
- **Selector** - Value selector
- **Text** - Typography component with variants

---

## 🎨 Design Tokens

All components use CSS custom properties that can be overridden:

### Colors
```css
/* Primary Colors */
--color-blue-500: #2d75e2; /* Primary brand */

/* Text Colors */
--color-text-primary: #000000;   /* Headings, primary text */
--color-text-secondary: #4d5c6e; /* Body text, labels */
--color-text-tertiary: #91a0b3;  /* Help text, placeholders */

/* Surface Colors */
--color-surface-white: #ffffff;   /* Cards, modals */
--color-surface-light: #f7f9fb;   /* Page background */
--color-surface-medium: #dee5ef;  /* Dividers, borders */

/* System Colors */
--color-system-critical: #db3a3a; /* Errors, delete actions */
--color-system-warning: #f58319;  /* Warnings */
--color-system-success: #0e8662;  /* Success messages */
--color-system-info: #2d75e2;     /* Info messages */
```

### Spacing
```css
--spacing-4: 4px;   /* Tight gaps */
--spacing-8: 8px;   /* Small gaps between elements */
--spacing-12: 12px; /* Medium gaps */
--spacing-16: 16px; /* Component padding, section gaps */
--spacing-24: 24px; /* Large section gaps */
--spacing-32: 32px; /* Extra large gaps */
```

### Typography
Use the `<Text>` component instead of inline styles:
```tsx
<Text variant="heading24Semibold">Page Title</Text>
<Text variant="heading20Semibold">Section Header</Text>
<Text variant="body14Medium">Primary body text</Text>
<Text variant="body13Medium">Menu items, labels</Text>
```

---

## ✅ Implementation Rules (CRITICAL)

When implementing with Syndigo Design System, follow these rules:

### DO ✅

1. **Import from @syndigo/design-system**
   ```tsx
   import { Button, TextField, Table } from '@syndigo/design-system';
   ```

2. **Use Text component for all typography**
   ```tsx
   <Text variant="body14Medium">Label text</Text>
   ```

3. **Use design tokens for colors**
   ```tsx
   <div style={{ color: 'var(--color-text-primary)' }}>Content</div>
   ```

4. **Use semantic spacing**
   ```tsx
   <div style={{ gap: 8 }}>Small gap</div>
   <div style={{ gap: 16 }}>Medium gap</div>
   <div style={{ gap: 24 }}>Large gap</div>
   ```

### DON'T ❌

1. **Never use HTML elements directly for UI**
   ```tsx
   ❌ <button>Click</button>
   ✅ <Button variant="primary">Click</Button>

   ❌ <input type="text" />
   ✅ <TextField label="Name" />
   ```

2. **Never use inline font styles**
   ```tsx
   ❌ <div style={{ fontFamily: 'Inter', fontSize: '14px' }}>
   ✅ <Text variant="body14Medium">Text</Text>
   ```

3. **Never use hardcoded colors**
   ```tsx
   ❌ <div style={{ color: '#2d75e2' }}>
   ✅ <div style={{ color: 'var(--color-blue-500)' }}>
   ```

4. **Never create custom wrapper components without approval**
   ```tsx
   ❌ function CustomButton() { return <div onClick={...}>...</div> }
   ✅ import { Button } from '@syndigo/design-system';
   ```

---

## 🎯 AI Assistant Workflow

### Step 1: Understand Requirements
When user provides requirements, ask clarifying questions:
- What data needs to be displayed?
- What actions can users take?
- Where does the data come from (API endpoints)?
- What's the main page type (list, detail, form, dashboard)?
- How many major UI elements (helps determine complexity tier)?

### Step 2: Create Component Mapping

**CRITICAL:** BEFORE writing any code, follow this complete process:

#### Step 2A: List Available Components
First, review available Syndigo components to ensure accurate selection:

**Form & Input (11 components):**
Button, InputField, TextField, TextArea, SelectField, Radio, Toggle, SearchField, SelectBox, SelectMenu, Upload

**Layout & Containers (10 components):**
Modal, Dialog, Tooltip, PageHeader, SideNav, RightPanel, ProductPanel, PDPSidePanel, ActionBar, ActionFooter

**Navigation (10 components):**
Table, Tab, TabGroup, TabHeader, MenuItem, TopNavigation, Stepper, FilterDropdown, FilterPanel, OpenPages

**Data Display (13 components):**
Avatar, Pill, Tag, StatusIndicator, CountIndicator, Thumbnail, DataWell, ComplexStatus, ProgressBar, ProductInfo, TogglePills, Profile, Logo

**Feedback & States (5 components):**
Toast, InlineError, EmptyState, BackgroundTasks, Spinner

**Actions & Controls (3 components):**
Button, ButtonGroup, Switcher

**Advanced (3 components):**
AttributeForm, Selector, Text

#### Step 2B: Estimate Component Count
Before mapping, estimate complexity:
```
"For a [screen type], I estimate approximately [X] components:
 - [Y] form/input elements
 - [Z] layout containers
 - [W] data display elements
 - [V] feedback/state handlers"
```

This helps catch missing components early.

#### Step 2C: Create Component Mapping Table

**Format based on complexity:**

**SIMPLE (1-5 components):** Single table
**MEDIUM (6-15 components):** Single table with section comments
**COMPLEX (16+ components):** Separate tables per section

**Use THIS EXACT MARKDOWN FORMAT:**

| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| [element description] | [exact component name] | [prop={value}, prop2={value2}] | [prop={value}] | [clarifications] |

**COMPLETE EXAMPLE (Product Listing Page):**

**SECTION: Page Header**
| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| Page title | PageHeader | title="Products" | subtitle="Manage your inventory", actions={<Button variant="primary" onClick={openCreate}>Create Product</Button>} | Fixed at top |

**SECTION: Filters & Search**
| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| Search box | SearchField | value={search}, onChange={setSearch} | placeholder="Search products...", debounce={300} | Debounced for performance |
| Status filter | FilterDropdown | options={statusOptions}, value={statusFilter}, onChange={setStatusFilter} | label="Status", clearable={true} | Multi-select enabled |

**SECTION: Data Display**
| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| Product table | Table | columns={productColumns}, data={products} | onSort={handleSort}, loading={isLoading}, onRowClick={handleRowClick} | Sortable by name, price, status |
| Product image | Thumbnail | src={product.imageUrl}, alt={product.name} | size="medium", fallback={<Avatar name={product.name} />} | Fallback for missing images |
| Status badge | StatusIndicator | status={product.status} | - | Shows active/draft/archived |

**SECTION: Empty & Loading States**
| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| Loading state | Spinner | - | - | Shows during initial load |
| Empty state | EmptyState | title="No products found", description="Start by creating your first product" | action={<Button variant="primary" onClick={openCreate}>Create Product</Button>} | Shows when products.length === 0 |
| Error alert | Toast | type="critical", message={error.message} | - | Shows on API error |

**SECTION: Modals & Overlays**
| UI Element | Syndigo Component | Required Props | Optional Props | Notes |
|-----------|------------------|----------------|----------------|-------|
| Create modal | Modal | isOpen={isCreateOpen}, onClose={closeCreate}, title="Create Product" | size="large" | Contains ProductForm |
| Delete confirmation | Dialog | isOpen={isDeleteOpen}, onClose={closeDelete}, title="Delete Product?", message="This action cannot be undone." | confirmLabel="Delete", onConfirm={handleDelete} | Destructive action confirmation |

#### Step 2D: Self-Validation Checklist
Before showing the mapping, verify:

**COMPLETENESS:**
- ☐ All major UI elements mapped (header, filters, content, actions)?
- ☐ All edge cases covered (loading, error, empty states)?
- ☐ All user interactions mapped (forms, buttons, modals, menus)?
- ☐ All data display elements included (tables, cards, badges)?

**ACCURACY:**
- ☐ Component names match EXACT names from available components list above?
- ☐ Required props include state bindings (value/onChange for form inputs)?
- ☐ Event handlers specified (onClick, onSubmit, onClose, onSelect)?
- ☐ Conditional props included (disabled, loading, error, hidden)?

**QUALITY:**
- ☐ Props column shows realistic values (not just prop names)?
- ☐ Data types are obvious (strings in quotes, functions as {handler}, booleans as {true})?
- ☐ State management clear (controlled components with value + onChange)?
- ☐ Notes column explains non-obvious decisions?

#### Step 2E: Present Mapping with Score
After validation, present your mapping like this:

```markdown
## Component Mapping Table
**Validation Score: [X/12 checks passed]**
**Estimated Components: [N] components across [M] categories**

[Your mapping table(s) here]

---
**WAITING FOR YOUR APPROVAL**

Please review the mapping above. Respond with:
- ✅ "APPROVED" or "Looks good" → I'll proceed to implementation
- 🔄 "Change [X] to [Y]" → I'll update the mapping and show the revised version
- ❌ "Start over" → I'll ask clarifying questions and create a new mapping
- 💬 "Add [element]" → I'll add the missing element to the mapping

I will NOT start coding until you explicitly approve.
```

### Step 3: Handle User Feedback

**If user says "APPROVED" or "Looks good":**
→ Proceed to Step 4 (Implementation)

**If user requests changes:**
1. Update the specific rows in the mapping table
2. Re-run validation checklist
3. Show revised mapping with new validation score
4. Wait for approval again
5. Do NOT proceed until approved

**If user says "Start over":**
1. Ask 3-5 clarifying questions about missing requirements
2. Return to Step 2A with new context
3. Create fresh mapping

**If AI skipped this step and user says "STOP. Show me the Component Mapping Table first":**
1. Apologize for skipping
2. Return to Step 2A immediately
3. Complete full mapping process
4. Do NOT use any code already written - start fresh after approval

### Step 4: Implement
After explicit approval, implement using ONLY Syndigo Design System components:

**Implementation Guidelines:**
- Use ONLY components from the approved mapping
- Follow exact prop specifications from mapping table
- Implement all edge cases included in mapping (loading, error, empty)
- Use design tokens for colors, spacing, typography
- Add comments referencing mapping table rows

**Code Structure:**
```tsx
// Component Mapping Reference: See table above
// Estimated components: [N] from mapping

import { 
  // [List all components from mapping]
} from '@syndigo/design-system';

function ScreenName() {
  // State management (from Required Props column)
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Event handlers (from Required Props column)
  const handleSort = (column) => { /* ... */ };
  const handleRowClick = (row) => { /* ... */ };
  
  // Loading/Error states (from Edge Cases section)
  if (isLoading) return <Spinner />;
  if (error) return <Toast type="critical" message={error} />;
  if (products.length === 0) return <EmptyState title="No products" />;
  
  // Main implementation (matching mapping table structure)
  return (
    <div>
      {/* Page Header - Row 1 of mapping */}
      <PageHeader 
        title="Products"
        subtitle="Manage your inventory"
        actions={<Button variant="primary" onClick={openCreate}>Create Product</Button>}
      />
      
      {/* Filters - Rows 2-3 of mapping */}
      <div style={{ display: 'flex', gap: 16 }}>
        <SearchField 
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
          debounce={300}
        />
        <FilterDropdown 
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          label="Status"
        />
      </div>
      
      {/* Data Table - Row 4 of mapping */}
      <Table 
        columns={productColumns}
        data={products}
        onSort={handleSort}
        loading={isLoading}
      />
    </div>
  );
}
```

### Step 5: Post-Implementation Validation
After implementation, self-check:
- ✅ All imports from @syndigo/design-system
- ✅ All components from approved mapping are used
- ✅ No components NOT in mapping are added
- ✅ Props match mapping specifications
- ✅ Using Text component for typography
- ✅ Using design tokens for colors
- ✅ No custom HTML UI elements
- ✅ All edge cases from mapping implemented
- ✅ Event handlers connected to state management

**If validation fails, fix immediately before presenting code.**

---

## 🚨 Common Mistakes to Avoid

### Mistake 1: Skipping Component List Review
❌ **DON'T:** Create mapping from memory
✅ **DO:** Review available components list in Step 2A first

### Mistake 2: Vague Props
❌ **DON'T:** `props: label, value, onChange`
✅ **DO:** `required: value={email}, onChange={setEmail}, required={true} | optional: error={emailError}, disabled={isSubmitting}`

### Mistake 3: Missing Edge Cases
❌ **DON'T:** Only map happy path components
✅ **DO:** Include loading, error, empty state components in separate section

### Mistake 4: Proceeding Without Approval
❌ **DON'T:** Show mapping then immediately start coding
✅ **DO:** Show mapping, explicitly say "WAITING FOR YOUR APPROVAL", then wait

### Mistake 5: Incorrect Component Names
❌ **DON'T:** Guess component names (FileUploadZone, DataTable, InputBox)
✅ **DO:** Use exact names from list (Upload, Table, InputField)

### Mistake 6: Single Table for Complex Screens
❌ **DON'T:** Create 25-row table for complex dashboard
✅ **DO:** Break into sections (Header, Filters, Content, Modals) with separate tables

### Mistake 7: Ignoring User Change Requests
❌ **DON'T:** User says "Change SelectField to SelectMenu" → AI proceeds with SelectField
✅ **DO:** Update mapping, show revised table, wait for new approval

---

## 🎯 Success Criteria

**You've done this correctly when:**
1. ✅ Component list reviewed before mapping
2. ✅ Complexity estimated (component count)
3. ✅ Mapping table in correct markdown format
4. ✅ All 5 columns present (UI Element, Component, Required Props, Optional Props, Notes)
5. ✅ All edge cases included (loading, error, empty)
6. ✅ Validation score shown (X/12)
7. ✅ Explicit "WAITING FOR YOUR APPROVAL" statement
8. ✅ User says "APPROVED" before any code is written
9. ✅ Implementation matches approved mapping exactly
10. ✅ Post-implementation validation passes

---

## 📚 Additional Resources

- **Component Guidelines:** See `/guidelines/components/`
- **Design Token Guidelines:** See `/guidelines/design-tokens/`
- **Publishing Guide:** See `/guidelines/Publishing.md`
- **General Guidelines:** See `/guidelines/Guidelines.md`
- **Figma Source:** [Orbit Design System](https://figma.com/file/Hxa07kuxW2VZuVRjKVS6zM)

---

## 🏷️ Keywords for Discovery

**When searching or referencing this design system, use:**
- Syndigo Design System
- @syndigo/design-system
- Syndigo components
- Orbit Design System

**Component categories:**
- Form components
- Layout components
- Navigation components
- Data display components
- Feedback components
- Action components
- Advanced components

---

**Version:** 2.0.0  
**Last Updated:** 2026-04-06  
**Maintained by:** Fess (Gideon Awolesi), Design Engineer  
**Status:** ✅ Production Ready (55/55 components)  
**AI Workflow:** Enhanced Component Mapping with 12-point validation