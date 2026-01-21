import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type MenuItemState = 'default' | 'hover' | 'active' | 'disabled';

/**
 * Menu item component for navigation/dropdowns
 * 
 * @element syn-menu-item
 * @slot prefix - Leading icon slot
 * @slot suffix - Trailing icon slot
 * @fires syn-click - Fired when item is clicked
 */
@customElement('syn-menu-item')
export class SynMenuItem extends LitElement {
  @property() label = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property() badge?: string;
  @property() shortcut?: string;
  @property({ type: Boolean }) collapsed = false;

  static styles = css`
    :host {
      display: block;
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 4px 8px;
      min-height: 32px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .menu-item.collapsed {
      justify-content: center;
    }

    .menu-item:hover:not(.disabled) {
      background-color: var(--color-surface-medium, #dee5ef);
    }

    .menu-item.selected {
      background-color: var(--color-surface-black, #000000);
    }

    .menu-item.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .left-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-grow: 1;
      min-width: 0;
    }

    .menu-item.collapsed .left-wrapper {
      flex-grow: 0;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: #91a0b3;
    }

    .menu-item.selected .icon-wrapper {
      color: white;
    }

    .label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      min-width: 0;
      color: var(--color-text-secondary, #4d5c6e);
    }

    .menu-item.selected .label {
      color: white;
    }

    .menu-item.disabled .label {
      color: var(--color-text-disabled, #91a0b3);
    }

    .trailing-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 3px;
      background-color: var(--color-grey-500, #4d5c6e);
      border-radius: 4px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 13px;
      font-weight: 500;
      color: white;
    }

    .menu-item.selected .badge {
      background-color: white;
      color: black;
    }

    .shortcut {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: #91a0b3;
    }

    .menu-item.selected .shortcut {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click'));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
      e.preventDefault();
      this._handleClick();
    }
  }

  render() {
    const itemClass = [
      'menu-item',
      this.selected ? 'selected' : '',
      this.disabled ? 'disabled' : '',
      this.collapsed ? 'collapsed' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class=${itemClass}
        role="menuitem"
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <div class="left-wrapper">
          <span class="icon-wrapper">
            <slot name="prefix"></slot>
          </span>
          ${!this.collapsed
            ? html`<span class="label">${this.label}</span>`
            : ''}
        </div>
        ${!this.collapsed && (this.badge !== undefined || this.shortcut)
          ? html`
              <div class="trailing-wrapper">
                ${this.badge !== undefined
                  ? html`<span class="badge">${this.badge}</span>`
                  : ''}
                ${this.shortcut
                  ? html`<span class="shortcut">${this.shortcut}</span>`
                  : ''}
                <slot name="suffix"></slot>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-menu-item': SynMenuItem;
  }
}
