import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ComplexStatusType = 'success' | 'partialSuccess' | 'processing' | 'error';

const statusColors: Record<ComplexStatusType, string> = {
  success: 'var(--color-system-success, #0e8662)',
  partialSuccess: 'var(--color-system-warning, #f58319)',
  processing: 'var(--color-button-primary, #2d75e2)',
  error: 'var(--color-system-critical, #db3a3a)',
};

@customElement('syn-complex-status')
export class SynComplexStatus extends LitElement {
  @property({ type: Number }) levels = 4;

  static styles = css`
    :host { display: block; }
    .container {
      position: relative;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 14px 18px 0px rgba(77, 92, 110, 0.15);
      overflow: hidden;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 19px;
      padding: 14px 19px;
    }
    .divider-h { width: 1px; height: 34px; background-color: var(--color-stroke-light, #dee5ef); }
    .divider-v { width: 100%; height: 1px; background-color: var(--color-stroke-light, #dee5ef); }
  `;

  render() {
    return html`
      <div class="container">
        <div class="row">
          <slot name="item-1"></slot>
          ${this.levels >= 2 ? html`<div class="divider-h"></div><slot name="item-2"></slot>` : ''}
        </div>
        ${this.levels >= 3 ? html`
          <div class="divider-v"></div>
          <div class="row">
            <slot name="item-3"></slot>
            ${this.levels >= 4 ? html`<div class="divider-h"></div><slot name="item-4"></slot>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

@customElement('syn-status-item')
export class SynStatusItem extends LitElement {
  @property() type: ComplexStatusType = 'success';
  @property() count = '0';
  @property() label = '';

  static styles = css`
    :host { display: block; }
    .item { display: flex; flex-direction: column; gap: 4px; }
    .count { font-size: 16px; font-weight: 500; color: var(--color-text-primary, black); }
    .label-row { display: flex; align-items: center; gap: 6px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .label { font-size: 12px; font-weight: 500; color: var(--color-text-secondary, #4d5c6e); }
  `;

  render() {
    return html`
      <div class="item">
        <span class="count">${this.count}</span>
        <div class="label-row">
          <div class="dot" style="background-color: ${statusColors[this.type]};"></div>
          <span class="label">${this.label}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-complex-status': SynComplexStatus;
    'syn-status-item': SynStatusItem;
  }
}
