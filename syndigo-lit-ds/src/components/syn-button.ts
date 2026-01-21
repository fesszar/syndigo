import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'critical' | 'text';

/**
 * Button component with multiple variants and states
 * 
 * @element syn-button
 * @slot - Button content
 * @slot prefix - Content before the button text
 * @slot suffix - Content after the button text
 */
@customElement('syn-button')
export class SynButton extends LitElement {
  @property() variant: ButtonVariant = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-6, 6px);
      height: 34px;
      padding: var(--spacing-8, 8px) var(--spacing-10, 10px);
      border-radius: var(--radius-sm, 4px);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-semibold, 600);
      line-height: var(--line-height-font-line-height-2xs, 14px);
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    button:disabled {
      cursor: not-allowed;
    }

    /* Primary variant */
    :host([variant="primary"]) button {
      background-color: var(--color-button-primary, #2d75e2);
      color: var(--color-text-white, #ffffff);
    }

    :host([variant="primary"]) button:hover:not(:disabled) {
      background-color: var(--color-button-primary-hover, #5291f0);
      box-shadow: var(--shadow-button-primary-hover, 0 3px 8px 0 #2d75e27a);
    }

    :host([variant="primary"]) button:active:not(:disabled) {
      background-color: var(--color-button-primary-active, #1a5bb8);
      box-shadow: none;
    }

    :host([variant="primary"]) button:disabled {
      background-color: var(--color-button-disabled, #dee5ef);
      color: var(--color-text-tertiary, #91a0b3);
    }

    /* Secondary variant */
    :host([variant="secondary"]) button {
      background-color: var(--color-surface-white, #ffffff);
      color: var(--color-text-primary, #1d3261);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      box-shadow: var(--shadow-button-secondary-default, 0 1px 3px 0 #0000001a);
    }

    :host([variant="secondary"]) button:hover:not(:disabled) {
      background-color: var(--color-surface-light, #f7f9fb);
      box-shadow: var(--shadow-button-secondary-hover, 0 1px 3px 0 #0000001a);
    }

    :host([variant="secondary"]) button:active:not(:disabled) {
      background-color: var(--color-surface-medium, #dee5ef);
      box-shadow: none;
    }

    :host([variant="secondary"]) button:disabled {
      background-color: var(--color-surface-light, #f7f9fb);
      color: var(--color-text-tertiary, #91a0b3);
      border-color: var(--color-stroke-light, #dee5ef);
    }

    /* Critical variant */
    :host([variant="critical"]) button {
      background-color: var(--color-system-critical, #db3a3a);
      color: var(--color-text-white, #ffffff);
    }

    :host([variant="critical"]) button:hover:not(:disabled) {
      background-color: #f17676;
      box-shadow: var(--shadow-button-critical-hover, 0 3px 8px 0 #db3a3a7a);
    }

    :host([variant="critical"]) button:active:not(:disabled) {
      background-color: #c42b2b;
      box-shadow: none;
    }

    :host([variant="critical"]) button:disabled {
      background-color: var(--color-button-disabled, #dee5ef);
      color: var(--color-text-tertiary, #91a0b3);
    }

    /* Text variant */
    :host([variant="text"]) button {
      background-color: transparent;
      color: var(--color-text-link, #2d75e2);
      padding: var(--spacing-4, 4px) var(--spacing-8, 8px);
    }

    :host([variant="text"]) button:hover:not(:disabled) {
      background-color: var(--color-blue-100, #e7f1ff);
    }

    :host([variant="text"]) button:active:not(:disabled) {
      background-color: #c2dbff;
    }

    :host([variant="text"]) button:disabled {
      color: var(--color-text-tertiary, #91a0b3);
    }

    /* Loading state */
    .loader {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    ::slotted(*) {
      display: flex;
      align-items: center;
    }
  `;

  render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        part="button"
      >
        ${this.loading
          ? html`<span class="loader"></span>`
          : html`
              <slot name="prefix"></slot>
              <slot></slot>
              <slot name="suffix"></slot>
            `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-button': SynButton;
  }
}
