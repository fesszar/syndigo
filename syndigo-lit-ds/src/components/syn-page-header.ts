import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-page-header')
export class SynPageHeader extends LitElement {
  @property() title = '';
  @property({ type: Boolean, attribute: 'show-border' }) showBorder = true;

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px;
      background-color: var(--color-surface-white, white);
      isolation: isolate;
    }
    .container.with-border {
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .breadcrumb-container {
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 4px;
      flex-grow: 1;
      max-width: 900px;
      min-width: 1px;
      z-index: 2;
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      color: var(--color-text-primary, black);
      white-space: nowrap;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
      z-index: 1;
    }
    ::slotted([slot="breadcrumbs"]) {
      display: flex;
      align-items: center;
      gap: 2px;
    }
  `;

  render() {
    return html`
      <header class="container ${this.showBorder ? 'with-border' : ''}">
        <div class="breadcrumb-container">
          <slot name="breadcrumbs"></slot>
          <span class="title">${this.title}</span>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

@customElement('syn-breadcrumb')
export class SynBreadcrumb extends LitElement {
  @property() label = '';
  @property() href = '';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }
    .link {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      color: var(--color-text-secondary, #4d5c6e);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
      cursor: pointer;
      text-decoration: none;
    }
    .link:hover {
      color: var(--color-button-primary, #2d75e2);
    }
    .separator {
      display: flex;
      align-items: center;
      margin: 0 2px;
      flex-shrink: 0;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="link" @click=${this._handleClick}>${this.label}</span>
      <span class="separator">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#91a0b3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    `;
  }
}

@customElement('syn-recipient-selector')
export class SynRecipientSelector extends LitElement {
  @property() label = '';

  static styles = css`
    :host {
      display: inline-flex;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 34px;
      padding: 10px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
    .container:hover {
      background-color: var(--color-surface-light, #f7f9fb);
    }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      color: var(--color-text-primary, black);
      white-space: nowrap;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container" @click=${this._handleClick}>
        <slot name="icon">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="6" stroke="#718094" stroke-width="1.2"/>
            <ellipse cx="7.5" cy="7.5" rx="3" ry="6" stroke="#718094" stroke-width="1.2"/>
            <path d="M1.5 7.5H13.5" stroke="#718094" stroke-width="1.2"/>
          </svg>
        </slot>
        <span class="label">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-page-header': SynPageHeader;
    'syn-breadcrumb': SynBreadcrumb;
    'syn-recipient-selector': SynRecipientSelector;
  }
}
