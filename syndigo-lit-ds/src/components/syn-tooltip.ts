import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip component
 * 
 * @element syn-tooltip
 * @slot - Element that triggers the tooltip
 */
@customElement('syn-tooltip')
export class SynTooltip extends LitElement {
  @property() content = '';
  @property() placement: TooltipPlacement = 'top';
  @property({ type: Number }) delay = 200;
  @state() private _visible = false;

  private _timeout?: ReturnType<typeof setTimeout>;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-block;
    }

    .tooltip {
      position: absolute;
      z-index: 1000;
      padding: 6px 10px;
      background-color: var(--color-surface-black, #000000);
      color: var(--color-text-white, #ffffff);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      border-radius: var(--radius-sm, 4px);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s ease;
    }

    .tooltip.visible {
      opacity: 1;
    }

    /* Placement styles */
    .tooltip.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
    }

    .tooltip.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
    }

    .tooltip.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }

    .tooltip.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 8px;
    }

    /* Arrow */
    .tooltip::after {
      content: '';
      position: absolute;
      border: 5px solid transparent;
    }

    .tooltip.top::after {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--color-surface-black, #000000);
    }

    .tooltip.bottom::after {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--color-surface-black, #000000);
    }

    .tooltip.left::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: var(--color-surface-black, #000000);
    }

    .tooltip.right::after {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: var(--color-surface-black, #000000);
    }
  `;

  private _show() {
    this._timeout = setTimeout(() => {
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._visible = false;
  }

  render() {
    return html`
      <div
        class="trigger"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
      >
        <slot></slot>
      </div>
      ${this.content
        ? html`
            <div class="tooltip ${this.placement} ${this._visible ? 'visible' : ''}" role="tooltip">
              ${this.content}
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tooltip': SynTooltip;
  }
}
