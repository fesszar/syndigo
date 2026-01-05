# Stepper

A multi-step progress indicator with step labels.

**Figma Source:** [Stepper](https://www.figma.com/design/Lo9r632ePw6mQTi42uqNCk?node-id=22496-28903)

---

## Overview

Stepper is a **horizontal progress indicator** that shows the current position in a multi-step workflow. Each step displays a numbered circle and label.

**Use cases:**
- Multi-step forms
- Wizard flows
- Onboarding sequences
- Checkout processes

---

## Props

### Stepper Props

```typescript
interface StepperProps {
  /** Array of steps */
  steps: StepItem[];
  /** Current active step index (0-indexed) */
  activeStep?: number;
  /** Orientation */
  orientation?: 'horizontal';
}

interface StepItem {
  id: string;
  label: string;
  state?: StepState;
}

type StepState = 'default' | 'active' | 'completed';
```

---

## Step States

| State | Circle | Number/Icon | Label Color |
|-------|--------|-------------|-------------|
| `default` | Grey border (#91a0b3) | Grey number | Grey (#4d5c6e) |
| `active` | Blue filled (#2d75e2) | White number | Blue (#2d75e2) |
| `completed` | Green filled (#0e8662) | White checkmark | Black |

---

## Visual Specifications

### Step Circle
- **Size:** 21×21px
- **Border radius:** 80px (fully rounded)
- **Border (default):** 1px solid #91a0b3
- **Background (active):** #2d75e2
- **Background (completed):** #0e8662

### Step Number
- **Font:** Inter Medium
- **Size:** 13px
- **Line height:** 15px
- **Color:** White (active/completed), #4d5c6e (default)

### Step Label
- **Font:** Inter Medium
- **Size:** 12px
- **Line height:** 17px
- **Color:** Per state (see table)

### Spacing
- **Gap between circle and label:** 11px
- **Gap between steps:** 20px
- **Container padding:** 4px

### Separator (Chevron)
- **Width:** ~4px
- **Height:** 11px
- **Color:** #718094

---

## Usage Examples

### Basic Usage

```tsx
import { Stepper } from '@syndigo/components';

<Stepper
  steps={[
    { id: 'step1', label: 'Account' },
    { id: 'step2', label: 'Profile' },
    { id: 'step3', label: 'Review' },
  ]}
  activeStep={1}
/>
```

### Controlled Step State

```tsx
const [currentStep, setCurrentStep] = useState(0);

<Stepper
  steps={[
    { id: 'step1', label: 'Account Details' },
    { id: 'step2', label: 'Product Selection' },
    { id: 'step3', label: 'Payment' },
    { id: 'step4', label: 'Confirmation' },
  ]}
  activeStep={currentStep}
/>

<Button onClick={() => setCurrentStep(prev => prev + 1)}>
  Next
</Button>
```

### Manual State Override

```tsx
<Stepper
  steps={[
    { id: 'step1', label: 'Complete', state: 'completed' },
    { id: 'step2', label: 'Current', state: 'active' },
    { id: 'step3', label: 'Upcoming', state: 'default' },
  ]}
/>
```

### Wizard Form Pattern

```tsx
function WizardForm() {
  const [step, setStep] = useState(0);
  const steps = [
    { id: 'info', label: 'Basic Info' },
    { id: 'details', label: 'Details' },
    { id: 'confirm', label: 'Confirm' },
  ];

  return (
    <>
      <Stepper steps={steps} activeStep={step} />
      
      {step === 0 && <BasicInfoForm onNext={() => setStep(1)} />}
      {step === 1 && <DetailsForm onNext={() => setStep(2)} onBack={() => setStep(0)} />}
      {step === 2 && <ConfirmForm onSubmit={handleSubmit} onBack={() => setStep(1)} />}
    </>
  );
}
```

---

## State Visual Parity ✅

| Property | Default | Active | Completed |
|----------|---------|--------|-----------|
| Circle border | 1px #91a0b3 | none | none |
| Circle bg | transparent | #2d75e2 | #0e8662 |
| Number color | #4d5c6e | white | — |
| Icon | — | — | ✓ checkmark |
| Label color | #4d5c6e | #2d75e2 | black |

---

## Accessibility

- `role="navigation"` on container
- `aria-label="Progress"` for screen readers
- Clear visual distinction between states
- Semantic step labels

---

## Do's and Don'ts

### Do's
- ✅ Use for multi-step workflows
- ✅ Keep step labels short
- ✅ Show current progress clearly
- ✅ Allow navigation back to completed steps

### Don'ts
- ❌ Don't use for single-step processes
- ❌ Don't use more than 5-7 steps
- ❌ Don't skip steps without user action
- ❌ Don't use for non-linear navigation

---

## Related Components

- [ProgressBar](./progress-bar.md) - Linear progress
- [Tabs](./tabs.md) - Content switching
- [Wizard](./wizard.md) - Full wizard pattern
