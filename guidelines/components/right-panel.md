# RightPanel

A generic side panel container for displaying contextual content alongside the main view.

**Figma Source:** [Right Panel](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22495-25911)

---

## Overview

RightPanel is a **flexible container component** with slots for header tabs, title, stats, filters, and scrollable content. It contains **no routing/business logic** - all content and handlers are passed via props.

**Use cases:**
- Side panel details view
- Contextual information display
- Multi-tab panels (Workflows, Syndication, Variants, etc.)
- Any auxiliary content panel

---

## Props

```typescript
interface RightPanelTab {
  id: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}

interface RightPanelProps {
  /** Panel title */
  title?: string;
  /** Header action (link/button) */
  headerAction?: ReactNode;
  /** Tab icons in header */
  tabs?: RightPanelTab[];
  /** Active tab id */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Close handler */
  onClose?: () => void;
  /** Stats section content */
  statsContent?: ReactNode;
  /** Filter section content */
  filterContent?: ReactNode;
  /** Main content */
  children?: ReactNode;
  /** Panel width */
  width?: number | string;
  /** Whether panel is open */
  open?: boolean;
}
```

---

## Visual Specifications

### Container
- **Width:** 376px (default)
- **Background:** white
- **Border:** 1px solid #dee5ef
- **Border radius:** 4px
- **Layout:** Flex column, full height

### Header Section
- **Padding:** 12px 16px
- **Border bottom:** 1px solid #dee5ef
- **Tab icons:** 20×20px, 8px gap
- **Active tab color:** #2d75e2
- **Inactive tab color:** #718094
- **Close icon:** 14×14px

### Title Section
- **Font:** Inter Semi Bold, 16px
- **Padding:** 12px 16px
- **Action link:** Inter Medium, 12px, #2d75e2

### Stats Section
- **Padding:** 12px 16px
- **Gap:** 12px

### Content Section
- **Padding:** 0 16px 16px
- **Overflow:** Scrollable Y

---

## Usage Examples

### Basic Panel

```tsx
import { RightPanel } from '@syndigo/components';

<RightPanel
  title="Syndication"
  open={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
>
  {/* Content goes here */}
</RightPanel>
```

### With Tabs

```tsx
<RightPanel
  tabs={[
    { id: 'history', icon: <ClockIcon />, label: 'History' },
    { id: 'workflow', icon: <WorkflowIcon />, label: 'Workflows' },
    { id: 'syndication', icon: <SyncIcon />, label: 'Syndication' },
    { id: 'analytics', icon: <ChartIcon />, label: 'Analytics' },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onClose={handleClose}
>
  {renderTabContent(activeTab)}
</RightPanel>
```

### With Header Action

```tsx
<RightPanel
  title="Syndication"
  headerAction={
    <button onClick={handleManage}>Manage Recipients</button>
  }
>
  {children}
</RightPanel>
```

### With Stats and Filter

```tsx
<RightPanel
  title="Syndication"
  statsContent={
    <>
      <DataWell label="Average Readiness" value="75%" />
      <DataWell label="Synchronized" value="5 of 20" />
    </>
  }
  filterContent={
    <SearchInput placeholder="Search recipients" />
  }
>
  <RecipientList items={recipients} />
</RightPanel>
```

### Custom Width

```tsx
<RightPanel width={450}>
  {/* Wide panel content */}
</RightPanel>
```

---

## Slots

| Slot | Description |
|------|-------------|
| `tabs[].icon` | Tab icon elements |
| `headerAction` | Action link/button in title row |
| `statsContent` | Data wells/summary cards |
| `filterContent` | Search, filters, sorting |
| `children` | Main scrollable content |

---

## No Routing/Business Logic

This component does NOT:
- ❌ Handle routing
- ❌ Fetch data
- ❌ Manage tab state internally
- ❌ Apply business rules

All logic belongs in the consuming application:

```tsx
// Good - state managed externally
const [activeTab, setActiveTab] = useState('syndication');

<RightPanel
  activeTab={activeTab}
  onTabChange={setActiveTab}
>
  {/* Content based on activeTab */}
</RightPanel>

// Bad - expecting internal routing
<RightPanel
  route="/panel/:tab"  // ❌ No routing support
/>
```

---

## Accessibility

- `role="complementary"` for landmark
- Tab buttons with `aria-label` and `aria-pressed`
- Close button with `aria-label`
- Scrollable content region

---

## Do's and Don'ts

### Do's
- ✅ Use for side panel content
- ✅ Pass pre-formatted data
- ✅ Handle tab state externally
- ✅ Provide close handler for dismissible panels

### Don'ts
- ❌ Don't bake in routing logic
- ❌ Don't fetch data internally
- ❌ Don't hardcode tab content
- ❌ Don't use for modal dialogs

---

## Related Components

- [Modal](./modal.md) - Overlay dialogs
- [Dialog](./dialog.md) - Confirmations
- [PDPSidePanel](./pdp-side-panel.md) - Product detail side panel
