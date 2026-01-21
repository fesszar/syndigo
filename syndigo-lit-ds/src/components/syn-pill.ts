import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Pill component - selectable chip/tag with optional icon
 * 
 * @element syn-pill
 * @slot - Pill content
 * @slot prefix - Icon or content before text
 * @fires syn-click - Fired when pill is clicked
 */
@customElement('syn-pill')
export class SynPill extends LitElement {
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) removable = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-4, 4px);
      height: 26px;
      padding: 4px 10px;
      border-radius: 13px;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      background-color: var(--color-surface-white, #ffffff);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      color: var(--color-text-primary, #1d3261);
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .pill:hover:not(.disabled) {
      background-color: var(--color-surface-light, #f7f9fb);
      border-color: var(--color-stroke-medium, #91a0b3);
    }

    .pill.selected {
      background-color: var(--color-blue-100, #e7f1ff);
      border-color: var(--color-button-primary, #2d75e2);
      color: var(--color-button-primary, #2d75e2);
    }

    .pill.selected:hover:not(.disabled) {
      background-color: #c2dbff;
    }

    .pill.disabled {
      background-color: var(--color-surface-light, #f7f9fb);
      color: var(--color-text-tertiary, #91a0b3);
      cursor: not-allowed;
    }

    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      padding: 0;
      margin-left: 2px;
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
    }

    .remove-btn:hover {
      opacity: 1;
    }

    .pill.disabled .remove-btn {
      cursor: not-allowed;
    }
  `;

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('syn-click', { detail: { selected: !this.selected } }));
  }

  private handleRemove(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('syn-remove'));
  }

  render() {
    return html`
      <div
        class="pill ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        @click=${this.handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        ${this.removable
          ? html`
              <button class="remove-btn" @click=${this.handleRemove} aria-label="Remove">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-pill': SynPill;
  }
}
