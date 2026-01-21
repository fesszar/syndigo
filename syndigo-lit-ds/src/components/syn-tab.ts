import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Tab component
 * 
 * @element syn-tab
 * @slot - Tab content/label
 * @fires syn-click - Fired when tab is clicked
 */
@customElement('syn-tab')
export class SynTab extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      color: var(--color-text-secondary, #4d5c6e);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.15s ease;
    }

    .tab:hover:not(.disabled) {
      color: var(--color-text-primary, #1d3261);
    }

    .tab.active {
      color: var(--color-button-primary, #2d75e2);
      border-bottom-color: var(--color-button-primary, #2d75e2);
    }

    .tab.disabled {
      color: var(--color-text-tertiary, #91a0b3);
      cursor: not-allowed;
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click'));
    }
  }

  render() {
    const tabClass = [
      'tab',
      this.active ? 'active' : '',
      this.disabled ? 'disabled' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div
        class=${tabClass}
        role="tab"
        aria-selected=${this.active}
        aria-disabled=${this.disabled}
        tabindex=${this.disabled ? -1 : 0}
        @click=${this._handleClick}
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Tab group component
 * 
 * @element syn-tab-group
 * @slot - Tab elements
 */
@customElement('syn-tab-group')
export class SynTabGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab': SynTab;
    'syn-tab-group': SynTabGroup;
  }
}
