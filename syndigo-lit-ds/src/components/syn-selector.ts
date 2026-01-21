import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SelectorState = 'default' | 'hover' | 'focus' | 'disabled' | 'error';

@customElement('syn-selector')
export class SynSelector extends LitElement {
  @property() label = '';
  @property() placeholder = 'Select...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) open = false;

  static styles = css`
    :host { display: inline-block; }
    .container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 5px 11px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
    .container:hover { background-color: var(--color-surface-light, #f7f9fb); }
    .container.disabled {
      background-color: var(--color-surface-medium, #dee5ef);
      cursor: not-allowed;
    }
    .container.error { border-color: var(--color-system-critical, #db3a3a); }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, black);
      text-align: center;
      flex-grow: 1;
    }
    .container.disabled .label { color: var(--color-text-tertiary, #91a0b3); }
    .icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }
    .icon.open { transform: rotate(180deg); }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
    }
  }

  render() {
    const classes = ['container', this.disabled ? 'disabled' : '', this.error ? 'error' : ''].filter(Boolean).join(' ');
    return html`
      <button type="button" class=${classes} @click=${this._handleClick}
        ?disabled=${this.disabled} aria-expanded=${this.open} aria-haspopup="listbox">
        <span class="label">${this.label || this.placeholder}</span>
        <span class="icon ${this.open ? 'open' : ''}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#718094" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-selector': SynSelector;
  }
}
