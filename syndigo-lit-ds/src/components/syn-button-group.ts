import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupAlignment = 'start' | 'center' | 'end';

@customElement('syn-button-group')
export class SynButtonGroup extends LitElement {
  @property() orientation: ButtonGroupOrientation = 'horizontal';
  @property() align: ButtonGroupAlignment = 'end';
  @property({ type: Number }) gap = 8;
  @property({ type: Boolean }) attached = false;
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      align-items: center;
    }
    .container.horizontal {
      flex-direction: row;
    }
    .container.vertical {
      flex-direction: column;
    }
    .container.align-start {
      justify-content: flex-start;
    }
    .container.align-center {
      justify-content: center;
    }
    .container.align-end {
      justify-content: flex-end;
    }
    .container.full-width {
      width: 100%;
    }
    .container.attached {
      gap: 0;
    }
    .container.attached ::slotted(*:not(:last-child)) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: -1px;
    }
    .container.attached ::slotted(*:not(:first-child)) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .container.attached.vertical ::slotted(*:not(:last-child)) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-right-radius: var(--radius-sm, 4px);
      margin-right: 0;
      margin-bottom: -1px;
    }
    .container.attached.vertical ::slotted(*:not(:first-child)) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: var(--radius-sm, 4px);
    }
  `;

  render() {
    const classes = [
      'container',
      this.orientation,
      `align-${this.align}`,
      this.fullWidth ? 'full-width' : '',
      this.attached ? 'attached' : '',
    ].filter(Boolean).join(' ');

    const gapStyle = this.attached ? '' : `gap: ${this.gap}px;`;

    return html`
      <div class=${classes} style=${gapStyle}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-button-group': SynButtonGroup;
  }
}
