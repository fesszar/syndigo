import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TextVariant =
  | 'heading20Semibold'
  | 'heading16Semibold'
  | 'heading14Semibold'
  | 'body14Medium'
  | 'body14Regular'
  | 'body13Medium'
  | 'body13Regular'
  | 'body12Medium'
  | 'body12Regular'
  | 'body11Medium'
  | 'body11Regular'
  | 'body10Medium'
  | 'body10Regular';

export type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';

/**
 * Text component for consistent typography
 * 
 * @element syn-text
 * @slot - Text content
 */
@customElement('syn-text')
export class SynText extends LitElement {
  @property() variant: TextVariant = 'body14Regular';
  @property() as: TextElement = 'span';
  @property() color?: string;

  static styles = css`
    :host {
      display: inline;
      font-family: var(--font-family, 'Inter', sans-serif);
    }

    .text {
      margin: 0;
      padding: 0;
    }

    /* Heading variants */
    .heading20Semibold {
      font-size: var(--size-font-size-lg, 20px);
      font-weight: var(--weight-font-weight-semibold, 600);
      line-height: var(--line-height-font-line-height-lg, 20px);
    }

    .heading16Semibold {
      font-size: var(--size-font-size-md, 16px);
      font-weight: var(--weight-font-weight-semibold, 600);
      line-height: var(--line-height-font-line-height-md, 20px);
    }

    .heading14Semibold {
      font-size: var(--size-font-size-sm, 14px);
      font-weight: var(--weight-font-weight-semibold, 600);
      line-height: var(--line-height-font-line-height-sm, 18px);
    }

    /* Body 14 variants */
    .body14Medium {
      font-size: var(--size-font-size-sm, 14px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-sm, 18px);
    }

    .body14Regular {
      font-size: var(--size-font-size-sm, 14px);
      font-weight: 400;
      line-height: var(--line-height-font-line-height-sm, 18px);
    }

    /* Body 13 variants */
    .body13Medium {
      font-size: var(--size-font-size-xs, 13px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-xs, 16px);
    }

    .body13Regular {
      font-size: var(--size-font-size-xs, 13px);
      font-weight: 400;
      line-height: var(--line-height-font-line-height-xs, 16px);
    }

    /* Body 12 variants */
    .body12Medium {
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-2xs, 14px);
    }

    .body12Regular {
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: 400;
      line-height: var(--line-height-font-line-height-2xs, 14px);
    }

    /* Body 11 variants */
    .body11Medium {
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
    }

    .body11Regular {
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: 400;
      line-height: var(--line-height-font-line-height-3xs, 12px);
    }

    /* Body 10 variants */
    .body10Medium {
      font-size: var(--size-font-size-4xs, 10px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
    }

    .body10Regular {
      font-size: var(--size-font-size-4xs, 10px);
      font-weight: 400;
      line-height: var(--line-height-font-line-height-3xs, 12px);
    }
  `;

  render() {
    const style = this.color ? `color: ${this.color}` : '';
    
    switch (this.as) {
      case 'h1':
        return html`<h1 class="text ${this.variant}" style=${style}><slot></slot></h1>`;
      case 'h2':
        return html`<h2 class="text ${this.variant}" style=${style}><slot></slot></h2>`;
      case 'h3':
        return html`<h3 class="text ${this.variant}" style=${style}><slot></slot></h3>`;
      case 'h4':
        return html`<h4 class="text ${this.variant}" style=${style}><slot></slot></h4>`;
      case 'h5':
        return html`<h5 class="text ${this.variant}" style=${style}><slot></slot></h5>`;
      case 'h6':
        return html`<h6 class="text ${this.variant}" style=${style}><slot></slot></h6>`;
      case 'p':
        return html`<p class="text ${this.variant}" style=${style}><slot></slot></p>`;
      case 'label':
        return html`<label class="text ${this.variant}" style=${style}><slot></slot></label>`;
      case 'div':
        return html`<div class="text ${this.variant}" style=${style}><slot></slot></div>`;
      default:
        return html`<span class="text ${this.variant}" style=${style}><slot></slot></span>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-text': SynText;
  }
}
