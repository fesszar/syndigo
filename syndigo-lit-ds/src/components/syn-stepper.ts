import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StepState = 'default' | 'active' | 'completed';

export interface StepConfig {
  id: string;
  label: string;
  state?: StepState;
}

/**
 * Stepper component for multi-step progress
 * 
 * @element syn-stepper
 */
@customElement('syn-stepper')
export class SynStepper extends LitElement {
  @property({ type: Array }) steps: StepConfig[] = [];
  @property({ type: Number }) activeStep = 0;
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 4px;
      background-color: white;
    }

    .step-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .step {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 11px;
    }

    .circle {
      width: 21px;
      height: 21px;
      border-radius: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .circle.default {
      border: 1px solid var(--color-stroke-medium, #91a0b3);
      background-color: transparent;
    }

    .circle.active {
      background-color: var(--color-blue-500, #2d75e2);
    }

    .circle.completed {
      background-color: var(--color-system-success, #0e8662);
    }

    .circle-number {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 13px;
      font-weight: 500;
      text-align: center;
    }

    .circle.default .circle-number {
      color: var(--color-text-secondary, #4d5c6e);
    }

    .circle.active .circle-number,
    .circle.completed .circle-number {
      color: white;
    }

    .step-label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }

    .step-label.default {
      color: var(--color-text-secondary, #4d5c6e);
    }

    .step-label.active {
      color: var(--color-blue-500, #2d75e2);
    }

    .step-label.completed {
      color: var(--color-text-primary, #1d3261);
    }

    .chevron {
      color: var(--color-icon-tertiary, #91a0b3);
    }
  `;

  private _getStepState(index: number): StepState {
    const step = this.steps[index];
    if (step.state) return step.state;
    if (index < this.activeStep) return 'completed';
    if (index === this.activeStep) return 'active';
    return 'default';
  }

  render() {
    return html`
      <nav aria-label="Progress">
        ${this.steps.map((step, index) => html`
          <div class="step-wrapper">
            <div class="step">
              <div class="circle ${this._getStepState(index)}">
                ${this._getStepState(index) === 'completed'
                  ? html`
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    `
                  : html`<span class="circle-number">${index + 1}</span>`}
              </div>
              <span class="step-label ${this._getStepState(index)}">${step.label}</span>
            </div>
            ${index < this.steps.length - 1
              ? html`
                  <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                `
              : ''}
          </div>
        `)}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-stepper': SynStepper;
  }
}
