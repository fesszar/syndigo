import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-select-menu')
export class SynSelectMenu extends LitElement {
  @property({ type: Boolean }) multiple = false;
  @property({ type: Number, attribute: 'max-height' }) maxHeight = 200;

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      padding: 7px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
    }
    .list {
      display: flex;
      flex-direction: column;
      padding: 4px;
      overflow-y: auto;
    }
  `;

  render() {
    return html`
      <div class="container" role="listbox" aria-multiselectable=${this.multiple}>
        <div class="list" style="max-height: ${this.maxHeight}px;">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('syn-select-menu-item')
export class SynSelectMenuItem extends LitElement {
  @property() label = '';
  @property() value = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'show-checkbox' }) showCheckbox = false;

  static styles = css`
    :host { display: block; }
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 28px;
      padding: 0 7px;
      border-radius: 4px;
      background-color: transparent;
      cursor: pointer;
      border: none;
      width: 100%;
      text-align: left;
    }
    .item:hover, .item.selected { background-color: var(--color-surface-medium, #dee5ef); }
    .item.disabled { opacity: 0.5; cursor: not-allowed; }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, black);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-grow: 1;
    }
    .checkbox {
      width: 17px;
      height: 17px;
      border-radius: 2px;
      border: 1.5px solid var(--color-text-tertiary, #91a0b3);
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .checkbox.checked {
      border-color: var(--color-system-focus, #2d75e2);
      background-color: var(--color-system-focus, #2d75e2);
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.dispatchEvent(new CustomEvent('syn-select', {
        detail: { value: this.value, selected: this.selected },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const classes = ['item', this.selected ? 'selected' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <button type="button" role="option" class=${classes} @click=${this._handleClick}
        aria-selected=${this.selected} aria-disabled=${this.disabled}>
        <slot name="icon"></slot>
        ${this.showCheckbox ? html`
          <span class="checkbox ${this.selected ? 'checked' : ''}">
            ${this.selected ? html`<svg width="7" height="5" viewBox="0 0 7 5" fill="none">
              <path d="M1 2.5L2.5 4L6 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>` : ''}
          </span>
        ` : ''}
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-select-menu': SynSelectMenu;
    'syn-select-menu-item': SynSelectMenuItem;
  }
}
