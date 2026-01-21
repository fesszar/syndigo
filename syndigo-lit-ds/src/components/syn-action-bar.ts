import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ActionBarVariant = 'attributes' | 'relationships' | 'assets' | 'productSearch';

@customElement('syn-action-bar')
export class SynActionBar extends LitElement {
  @property() variant: ActionBarVariant = 'attributes';
  @property({ type: Boolean, attribute: 'show-border' }) showBorder = true;
  @property({ type: Boolean, attribute: 'alt-background' }) altBackground = false;

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-16, 16px);
      box-sizing: border-box;
      overflow: hidden;
      background-color: var(--color-surface-white, white);
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
      border-top-left-radius: var(--radius-sm, 4px);
      border-top-right-radius: var(--radius-sm, 4px);
    }
    .container.no-border {
      border: none;
    }
    .container.alt-bg {
      background-color: #e7ecf4;
    }
    .container.product-search {
      background-color: #e7ecf4;
      flex-wrap: wrap;
      gap: 10px;
    }
    .left {
      display: flex;
      align-items: center;
      gap: var(--spacing-16, 16px);
      flex-shrink: 0;
    }
    .center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-width: 0;
    }
    .right {
      display: flex;
      align-items: center;
      gap: var(--spacing-8, 8px);
      flex-shrink: 0;
    }
  `;

  render() {
    const classes = [
      'container',
      !this.showBorder ? 'no-border' : '',
      this.altBackground ? 'alt-bg' : '',
      this.variant === 'productSearch' ? 'product-search' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class=${classes}>
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="center">
          <slot name="center"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-action-bar': SynActionBar;
  }
}
