import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Toggle switch component
 * 
 * @element syn-toggle
 * @fires syn-change - Fired when the toggle state changes
 */
@customElement('syn-toggle')
export class SynToggle extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property() label?: string;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-8, 8px);
    }

    .toggle {
      position: relative;
      width: 36px;
      height: 20px;
      background-color: var(--color-surface-medium, #dee5ef);
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .toggle:hover:not(.disabled) {
      background-color: var(--color-stroke-medium, #91a0b3);
    }

    .toggle.checked {
      background-color: var(--color-button-primary, #2d75e2);
    }

    .toggle.checked:hover:not(.disabled) {
      background-color: var(--color-button-primary-hover, #5291f0);
    }

    .toggle.disabled {
      background-color: var(--color-surface-light, #f7f9fb);
      cursor: not-allowed;
    }

    .toggle.checked.disabled {
      background-color: var(--color-button-disabled, #dee5ef);
    }

    .knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: var(--color-surface-white, #ffffff);
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s ease;
    }

    .toggle.checked .knob {
      transform: translateX(16px);
    }

    .label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      line-height: var(--line-height-font-line-height-2xs, 14px);
      color: var(--color-text-primary, #1d3261);
    }

    .label.disabled {
      color: var(--color-text-tertiary, #91a0b3);
    }

    /* Hidden checkbox for accessibility */
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  `;

  private handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('syn-change', { detail: { checked: this.checked } }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.handleClick();
    }
  }

  render() {
    return html`
      <div
        class="toggle ${this.checked ? 'checked' : ''} ${this.disabled ? 'disabled' : ''}"
        role="switch"
        tabindex=${this.disabled ? -1 : 0}
        aria-checked=${this.checked}
        aria-disabled=${this.disabled}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <span class="knob"></span>
      </div>
      ${this.label
        ? html`<span class="label ${this.disabled ? 'disabled' : ''}">${this.label}</span>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-toggle': SynToggle;
  }
}
