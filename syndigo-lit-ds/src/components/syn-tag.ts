import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Tag component for displaying labels/categories
 * 
 * @element syn-tag
 * @slot - Tag content
 * @fires syn-remove - Fired when remove button is clicked
 */
@customElement('syn-tag')
export class SynTag extends LitElement {
  @property({ type: Boolean }) removable = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) selected = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-4, 4px);
      height: 22px;
      padding: 3px 8px;
      border-radius: var(--radius-sm, 4px);
      background-color: var(--color-surface-light, #f7f9fb);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      color: var(--color-text-secondary, #4d5c6e);
      transition: all 0.15s ease;
    }

    .tag.selected {
      background-color: var(--color-blue-100, #e7f1ff);
      color: var(--color-button-primary, #2d75e2);
    }

    .tag.disabled {
      color: var(--color-text-tertiary, #91a0b3);
    }

    .remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
    }

    .remove-btn:hover {
      opacity: 1;
    }

    .tag.disabled .remove-btn {
      cursor: not-allowed;
    }
  `;

  private handleRemove(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('syn-remove'));
  }

  render() {
    return html`
      <span class="tag ${this.selected ? 'selected' : ''} ${this.disabled ? 'disabled' : ''}">
        <slot></slot>
        ${this.removable
          ? html`
              <button class="remove-btn" @click=${this.handleRemove} aria-label="Remove">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            `
          : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tag': SynTag;
  }
}
