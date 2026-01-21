import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type OpenPagesType = 'digitalAssets' | 'product' | 'rdm' | 'edit' | 'productDetails' | 'tdm' | 'bulkEdit' | 'settings' | 'syndication' | 'reporting' | 'apps' | 'backgroundTasks';

const pageTypeConfigs: Record<OpenPagesType, { label: string; bg: string; color: string; hasIcon?: boolean }> = {
  digitalAssets: { label: 'Digital Assets', bg: '#cbffb7', color: '#4d5c6e' },
  product: { label: 'Product', bg: '#c8deff', color: '#4d5c6e' },
  rdm: { label: 'Reference Data Management', bg: '#ffd6b0', color: '#4d5c6e' },
  edit: { label: 'Currently Editing', bg: 'transparent', color: '#4d5c6e', hasIcon: true },
  productDetails: { label: 'Product Details', bg: '#5291f0', color: '#efefef' },
  tdm: { label: 'Taxonomy Data Management', bg: '#ffd6d6', color: '#4d5c6e' },
  bulkEdit: { label: 'Bulk Edit', bg: '#4d5c6e', color: '#efefef' },
  settings: { label: 'Settings', bg: '#dee5ef', color: '#4d5c6e' },
  syndication: { label: 'Syndication', bg: '#d1fff1', color: '#4d5c6e' },
  reporting: { label: 'Reporting', bg: '#505050', color: 'white' },
  apps: { label: 'Apps', bg: '#8fedd0', color: '#4d5c6e' },
  backgroundTasks: { label: 'Background Tasks', bg: '#d4b3ff', color: '#4d5c6e' },
};

@customElement('syn-open-page')
export class SynOpenPage extends LitElement {
  @property() type: OpenPagesType = 'product';
  @property() label = '';

  static styles = css`
    :host { display: inline-block; }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 2px 10px;
      border-radius: 40px;
      cursor: pointer;
    }
    .text {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 9px;
      font-weight: 500;
      line-height: 11px;
      white-space: nowrap;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
  }

  render() {
    const config = pageTypeConfigs[this.type];
    const displayLabel = this.label || config.label;

    return html`
      <div class="badge" style="background-color: ${config.bg};" @click=${this._handleClick}>
        ${config.hasIcon ? html`
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6.5 2.5L9.5 5.5M1.5 10.5L2.25 7.5L8.5 1.25C8.91421 0.835786 9.58579 0.835786 10 1.25L10.75 2C11.1642 2.41421 11.1642 3.08579 10.75 3.5L4.5 9.75L1.5 10.5Z" stroke="#4d5c6e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ` : ''}
        <span class="text" style="color: ${config.color};">${displayLabel}</span>
      </div>
    `;
  }
}

@customElement('syn-open-pages-list')
export class SynOpenPagesList extends LitElement {
  @property({ type: Number }) gap = 5;
  @property() direction: 'horizontal' | 'vertical' = 'vertical';

  static styles = css`
    :host { display: block; }
    .container { display: flex; align-items: flex-start; }
    .container.vertical { flex-direction: column; }
    .container.horizontal { flex-direction: row; flex-wrap: wrap; }
  `;

  render() {
    return html`
      <div class="container ${this.direction}" style="gap: ${this.gap}px;">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-open-page': SynOpenPage;
    'syn-open-pages-list': SynOpenPagesList;
  }
}
