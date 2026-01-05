# BackgroundTasks Components

**Source:** Figma file `Lo9r632ePw6mQTi42uqNCk` (node-id: 22478-9291)

---

## Overview

The BackgroundTasks system is a **status panel pattern** for displaying background job progress. It consists of three composable components:

| Component | Figma Name | Purpose |
|-----------|------------|---------|
| `BackgroundTasksPanel` | Background Tasks | Main panel container |
| `BackgroundTasksSectionHeader` | Baxkground Tasks Section Header | Section dividers |
| `BackgroundTasksCard` | Background Tasks Activity Card | Individual task items |

---

## Components

### BackgroundTasksPanel

Main panel container with header and footer.

```tsx
interface BackgroundTasksPanelProps {
  title?: string;              // default: "Background Tasks"
  loading?: boolean;           // Shows skeleton state
  onSeeAllClick?: () => void;  // "See all" link handler
  children?: ReactNode;        // Sections and cards
  className?: string;
  style?: CSSProperties;
}
```

### BackgroundTasksSectionHeader

Section divider with label.

```tsx
interface BackgroundTasksSectionHeaderProps {
  variant: 'currentlyRunning' | 'recentlyCompleted';
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}
```

### BackgroundTasksCard

Individual task item with status.

```tsx
interface BackgroundTasksCardProps {
  type: BackgroundTaskType;      // Task type (uploadAssets, bulkEdit, etc.)
  state: BackgroundTaskState;    // Task state (queued, processing, etc.)
  title: string;                 // Task title
  progress?: string;             // e.g., "5/10"
  timestamp?: string;            // e.g., "Now", "4 seconds ago", "12/05/2024 9:45 AM"
  isNow?: boolean;               // Show colored dot before timestamp
  showViewDetails?: boolean;     // Show "View details" button
  onViewDetails?: () => void;    // Button click handler
  progressPercent?: number;      // Progress ring percentage (0-100)
  fileInfo?: {                   // File preview for download tasks
    fileName: string;
    fileSize: string;
    onDownloadAgain?: () => void;
  };
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}
```

---

## Variants (from Figma)

### Task Types

| Type | Description |
|------|-------------|
| `uploadAssets` | Upload assets to product |
| `uploadProduct` | Upload new product |
| `downloadAssets` | Download assets |
| `bulkEdit` | Bulk edit operation |
| `deleteProduct` | Delete product |
| `workflowAssignment` | Assign workflow |
| `workflowClearAssignment` | Clear workflow assignment |
| `workflowChangeAssignment` | Change workflow assignment |
| `workflowTransition` | Workflow transition |
| `bulkPublish` | Bulk publish operation |
| `linkRecipients` | Link recipients |

### Task States

| State | Description | Icon | Card Background | Has Button |
|-------|-------------|------|-----------------|------------|
| `queued` | Waiting to process | clock-refresh (gray) | white | No |
| `processing` | Currently running | package-plus (blue) + ring | white | Yes |
| `successNow` | Just completed | package-check (green) + ring | green (#e1fbf5) | Yes |
| `successDefault` | Completed | package-check (green) + ring | white | Yes |
| `failedNow` | Just failed | package-x (red) | red (#ffecec) | Yes |
| `failedDefault` | Failed | package-x (red) | white | Yes |
| `partialFail` | Partial failure | package-x (orange) | orange (#fff7e6) | Yes |
| `partialFlow` | Partial completion | package-x (orange) | white | Yes |

### Section Variants

| Variant | Label |
|---------|-------|
| `currentlyRunning` | "Currently Running" |
| `recentlyCompleted` | "Recently Completed" |
| `skeleton` | Loading placeholder |

### Panel Status

| Status | Description |
|--------|-------------|
| `skeleton` | Loading state with skeleton cards |
| `queued` | Shows queued tasks |
| `processing` | Shows processing tasks |
| `successNow` | Shows recent successful tasks |
| `successDefault` | Shows successful tasks |
| `multi` | Shows multiple task types |
| `mixStatus` | Shows mixed status tasks |

### Title Overrides

Some task types display different titles:

| Type | Display Title |
|------|---------------|
| `uploadProduct` | "Product Upload" |
| `deleteProduct` | "Delete Products" |
| `workflowAssignment` | "Assign to Me" |
| `workflowClearAssignment` | "Clear Assignee" |
| `workflowChangeAssignment` | "Change Assignee" |

### Type-Specific Icons

Icons change based on task type and state:

| Type | Success Icon | Failed/Partial Icon |
|------|--------------|---------------------|
| `downloadAssets` | upload-01 (arrow up) | package-x |
| `uploadProduct` | package-check | file-x-02 |
| `bulkEdit` | package-check | user-x-01 |
| All others | package-check | package-x |

---

## Usage Examples

### Example 1: Basic Panel with Tasks

```tsx
import {
  BackgroundTasksPanel,
  BackgroundTasksSectionHeader,
  BackgroundTasksCard,
} from '@syndigo/design-system';

function TasksPanel() {
  return (
    <BackgroundTasksPanel onSeeAllClick={() => navigate('/tasks')}>
      <BackgroundTasksSectionHeader variant="currentlyRunning" />
      <BackgroundTasksCard
        type="uploadAssets"
        state="processing"
        title="Upload Assets"
        progress="5/10"
      />
      <BackgroundTasksCard
        type="bulkEdit"
        state="queued"
        title="Bulk Edit"
        progress="0/25"
      />

      <BackgroundTasksSectionHeader variant="recentlyCompleted" />
      <BackgroundTasksCard
        type="downloadAssets"
        state="successDefault"
        title="Download Assets"
        timestamp="2 min ago"
      />
    </BackgroundTasksPanel>
  );
}
```

### Example 2: Loading State

```tsx
function LoadingTasksPanel() {
  return (
    <BackgroundTasksPanel loading />
  );
}
```

### Example 3: Processing Task with Progress Ring

```tsx
<BackgroundTasksCard
  type="bulkPublish"
  state="processing"
  title="Bulk Publish"
  progress="12/50"
  progressPercent={70}
  onViewDetails={() => showTaskDetails()}
/>
```

### Example 4: Failed Task with "Now" Indicator

```tsx
<BackgroundTasksCard
  type="deleteProduct"
  state="failedNow"
  title="Delete Product"
  timestamp="Now"
  isNow={true}
  onViewDetails={() => showErrorDetails()}
/>
```

### Example 5: Success Task (Default)

```tsx
<BackgroundTasksCard
  type="uploadAssets"
  state="successDefault"
  title="Upload Assets"
  progress="10/10"
  timestamp="4 seconds ago"
  onViewDetails={() => showDetails()}
/>
```

### Example 6: Download Assets with File Preview

```tsx
<BackgroundTasksCard
  type="downloadAssets"
  state="successNow"
  title="Download Assets"
  progress="1/1"
  timestamp="Now"
  isNow={true}
  fileInfo={{
    fileName: "Data-structures.csv",
    fileSize: "14 MB",
    onDownloadAgain: () => downloadFile()
  }}
/>
```

### Example 7: Partial Fail with Full Timestamp

```tsx
<BackgroundTasksCard
  type="uploadProduct"
  state="partialFail"
  title="Product Upload"
  progress="4/10"
  timestamp="12/05/2024 9:45 AM"
  onViewDetails={() => showDetails()}
/>
```

---

## Styling Tokens

| Property | Token |
|----------|-------|
| Panel background | `--color-surface-white` |
| Panel shadow | `0px 14px 18px rgba(77, 92, 110, 0.15)` |
| Panel radius | `12px` |
| Header text | `body14Semibold` |
| Section header text | `body12Medium`, `--color-text-secondary` |
| Card title | `body13Semibold` |
| Card state text | `11px`, `--color-text-secondary` |
| Border | `--color-stroke-light` |
| Processing color | `--color-button-primary` |
| Success color | `--color-system-success` |
| Error color | `--color-system-critical` |
| Warning color | `--color-system-warning` |

---

## Do's and Don'ts

### ✅ Do

```tsx
// Use loading state for initial fetch
<BackgroundTasksPanel loading={isLoading}>
  {tasks.map(task => <BackgroundTasksCard key={task.id} {...task} />)}
</BackgroundTasksPanel>

// Group by status
<BackgroundTasksSectionHeader variant="currentlyRunning" />
{runningTasks.map(...)}
<BackgroundTasksSectionHeader variant="recentlyCompleted" />
{completedTasks.map(...)}

// Show progress for running tasks
<BackgroundTasksCard
  state="processing"
  progress="5/10"
/>

// Handle "See all" navigation
<BackgroundTasksPanel onSeeAllClick={() => navigate('/tasks')} />
```

### ❌ Don't

```tsx
// Don't invent new task types
<BackgroundTasksCard type="customType" />  // Not in DS

// Don't use raw status text
<span>Processing...</span>  // Use state prop

// Don't skip section headers
<BackgroundTasksCard />  // Missing context
<BackgroundTasksCard />

// Don't hardcode colors
<div style={{ backgroundColor: 'blue' }} />  // Use tokens
```

---

## Figma Mapping

| Figma Component | React Component |
|-----------------|-----------------|
| `Background Tasks` | `<BackgroundTasksPanel />` |
| `Baxkground Tasks Section Header` | `<BackgroundTasksSectionHeader />` |
| `Background Tasks Activity Card` | `<BackgroundTasksCard />` |
| `Background Tasks Widget Header` | Built into `BackgroundTasksPanel` |
| `Background Tasks Action Footer Modal` | Built into `BackgroundTasksPanel` |

| Figma Prop | React Prop |
|------------|------------|
| `Status=Skeleton` | `loading={true}` |
| `Property 1=Currently Running` | `variant="currentlyRunning"` |
| `Property 1=Recently Completed` | `variant="recentlyCompleted"` |
| `Type=Upload Assets` | `type="uploadAssets"` |
| `State=Processing` | `state="processing"` |

---

## Accessibility

- Panel has semantic structure
- Cards are clickable with proper focus states
- Status text is screen-reader friendly
- Loading states announce appropriately
