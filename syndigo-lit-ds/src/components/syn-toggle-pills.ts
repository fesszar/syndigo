import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-toggle-pills')
export class SynTogglePills extends LitElement {
  @property() value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'allow-deselect' }) allowDeselect = false;

  static styles = css`
    :host { display: inline-block; }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px solid var(--color-stroke-medium, #91a0b3);
      border-radius: 4px;
    }
    .container.disabled { border-color: var(--color-stroke-light, #dee5ef); }
  `;

  private _handlePillClick(e: Event) {
    if (this.disabled) return;
    const target = e.target as HTMLElement;
    const pill = target.closest('syn-toggle-pill') as SynTogglePill;
    if (pill && !pill.disabled) {
      if (this.value === pill.value && this.allowDeselect) {
        this.value = '';
      } else {
        this.value = pill.value;
      }
      this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div class="container ${this.disabled ? 'disabled' : ''}" role="radiogroup" @click=${this._handlePillClick}>
        <slot></slot>
      </div>
    `;
  }
}

@customElement('syn-toggle-pill')
export class SynTogglePill extends LitElement {
  @property() value = '';
  @property() label = '';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: block; flex-shrink: 0; }
    .pill {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.15s ease;
      background-color: transparent;
      border: none;
    }
    .pill.disabled { cursor: not-allowed; }
    .pill.active { background-color: var(--color-button-primary, #2d75e2); }
    .pill.active.disabled { background-color: var(--color-surface-medium, #dee5ef); }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      color: var(--color-text-secondary, #4d5c6e);
    }
    .pill.active .label { color: white; }
    .pill.disabled .label { color: var(--color-text-tertiary, #91a0b3); }
  `;

  render() {
    const parent = this.closest('syn-toggle-pills') as SynTogglePills;
    const isActive = parent?.value === this.value;
    const isDisabled = this.disabled || parent?.disabled;
    const classes = ['pill', isActive ? 'active' : '', isDisabled ? 'disabled' : ''].filter(Boolean).join(' ');
    
    return html`
      <button type="button" role="radio" class=${classes} aria-checked=${isActive} ?disabled=${isDisabled}>
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-toggle-pills': SynTogglePills;
    'syn-toggle-pill': SynTogglePill;
  }
}
