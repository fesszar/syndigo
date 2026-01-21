import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SwitcherType = 'primary' | 'secondary';

@customElement('syn-switcher')
export class SynSwitcher extends LitElement {
  @property() type: SwitcherType = 'primary';
  @property() value = '';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: inline-block; }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border-radius: 4px;
      border: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .container.primary { background-color: var(--color-surface-light, #f7f9fb); }
    .container.secondary { background-color: var(--color-surface-white, white); }
  `;

  private _handleOptionClick(e: Event) {
    const target = e.target as HTMLElement;
    const option = target.closest('syn-switcher-option') as SynSwitcherOption;
    if (option && !option.disabled && !this.disabled) {
      this.value = option.value;
      this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div class="container ${this.type}" role="radiogroup" @click=${this._handleOptionClick}>
        <slot></slot>
      </div>
    `;
  }
}

@customElement('syn-switcher-option')
export class SynSwitcherOption extends LitElement {
  @property() value = '';
  @property() label = '';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: block; flex: 1 1 0; }
    .option {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      padding: 10px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s ease;
      background-color: transparent;
      width: 100%;
    }
    .option.disabled { opacity: 0.5; cursor: not-allowed; }
    .option:hover:not(.active):not(.disabled) { background-color: var(--color-surface-medium, #dee5ef); }
    .option.active.primary { background-color: var(--color-button-primary, #2d75e2); }
    .option.active.secondary {
      background-color: var(--color-blue-100, #e7f1ff);
      border: 1px solid var(--color-stroke-medium, #91a0b3);
    }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      color: var(--color-text-secondary, #4d5c6e);
    }
    .option.active.primary .label { color: white; }
    .option.active.secondary .label { color: var(--color-text-primary, black); }
  `;

  render() {
    const parent = this.closest('syn-switcher') as SynSwitcher;
    const type = parent?.type || 'primary';
    const isActive = parent?.value === this.value;
    const classes = ['option', isActive ? 'active' : '', this.disabled ? 'disabled' : '', type].filter(Boolean).join(' ');
    
    return html`
      <button type="button" role="radio" class=${classes} aria-checked=${isActive} ?disabled=${this.disabled}>
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-switcher': SynSwitcher;
    'syn-switcher-option': SynSwitcherOption;
  }
}
