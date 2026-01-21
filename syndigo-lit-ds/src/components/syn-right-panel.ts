import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-right-panel')
export class SynRightPanel extends LitElement {
  @property() title = '';
  @property({ type: Number }) width = 376;
  @property({ type: Boolean }) open = true;

  static styles = css`
    :host { display: block; height: 100%; }
    :host([open="false"]) { display: none; }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
      flex-shrink: 0;
    }
    .tabs-container { display: flex; align-items: center; gap: 8px; }
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
    }
    .title-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
      flex-shrink: 0;
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary, black);
      margin: 0;
    }
    .stats-section { display: flex; gap: 12px; padding: 12px 16px; flex-shrink: 0; }
    .filter-section { padding: 0 16px 12px; flex-shrink: 0; }
    .content { display: flex; flex-direction: column; flex-grow: 1; overflow-y: auto; padding: 0 16px 16px; }
  `;

  private _handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('syn-close', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="container" style="width: ${this.width}px;" role="complementary">
        <div class="header">
          <div class="tabs-container">
            <slot name="tabs"></slot>
          </div>
          <button type="button" class="close-btn" @click=${this._handleClose} aria-label="Close panel">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="#718094" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        ${this.title ? html`
          <div class="title-section">
            <h2 class="title">${this.title}</h2>
            <slot name="header-action"></slot>
          </div>
        ` : ''}
        <slot name="stats"></slot>
        <slot name="filter"></slot>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-right-panel': SynRightPanel;
  }
}
