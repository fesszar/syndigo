import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Divider component for visual separation
 * 
 * @element syn-divider
 */
@customElement('syn-divider')
export class SynDivider extends LitElement {
  @property() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property() spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';

  static styles = css`
    :host {
      display: block;
    }

    :host([orientation="vertical"]) {
      display: inline-block;
      height: 100%;
    }

    .divider {
      background-color: var(--color-stroke-light, #dee5ef);
    }

    .horizontal {
      width: 100%;
      height: 1px;
    }

    .vertical {
      width: 1px;
      height: 100%;
    }

    .spacing-none {
      margin: 0;
    }

    .spacing-sm.horizontal {
      margin: 8px 0;
    }

    .spacing-md.horizontal {
      margin: 16px 0;
    }

    .spacing-lg.horizontal {
      margin: 24px 0;
    }

    .spacing-sm.vertical {
      margin: 0 8px;
    }

    .spacing-md.vertical {
      margin: 0 16px;
    }

    .spacing-lg.vertical {
      margin: 0 24px;
    }
  `;

  render() {
    return html`
      <div class="divider ${this.orientation} spacing-${this.spacing}"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-divider': SynDivider;
  }
}
