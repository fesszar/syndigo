import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DataWellSize = 'small' | 'medium';

/**
 * Data well component for displaying label-value pairs
 * 
 * @element syn-data-well
 * @slot - Custom value content (overrides value property)
 */
@customElement('syn-data-well')
export class SynDataWell extends LitElement {
  @property() label = '';
  @property() value = '';
  @property() size: DataWellSize = 'medium';
  @property({ type: Boolean }) clickable = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2, 2px);
    }

    :host([clickable]) {
      cursor: pointer;
    }

    :host([clickable]:hover) .value {
      color: var(--color-text-link, #2d75e2);
    }

    .label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      color: var(--color-text-tertiary, #91a0b3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-family: var(--font-family, 'Inter', sans-serif);
      color: var(--color-text-primary, #1d3261);
      transition: color 0.15s ease;
    }

    :host([size="small"]) .value {
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-2xs, 14px);
    }

    :host([size="medium"]) .value {
      font-size: var(--size-font-size-sm, 14px);
      font-weight: var(--weight-font-weight-semibold, 600);
      line-height: var(--line-height-font-line-height-sm, 18px);
    }

    .value-slot {
      display: flex;
      align-items: center;
    }
  `;

  private _handleClick() {
    if (this.clickable) {
      this.dispatchEvent(new CustomEvent('syn-click'));
    }
  }

  render() {
    return html`
      <span class="label">${this.label}</span>
      <div class="value-slot" @click=${this._handleClick}>
        <slot>
          <span class="value">${this.value}</span>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-data-well': SynDataWell;
  }
}
