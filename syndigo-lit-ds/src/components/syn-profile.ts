import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-profile')
export class SynProfile extends LitElement {
  @property() name = '';
  @property() email = '';
  @property() role = '';
  @property() src = '';
  @property({ type: Boolean, attribute: 'show-menu' }) showMenu = true;

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      padding: 16px 14px;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      box-sizing: border-box;
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--color-surface-medium, #dee5ef);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary, black);
      flex-shrink: 0;
      overflow: hidden;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .name {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      color: var(--color-text-primary, black);
      margin: 0;
      word-break: break-word;
    }
    .meta {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 17px;
      color: var(--color-text-tertiary, #91a0b3);
      margin: 0;
    }
    .menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 7px;
      background-color: var(--color-surface-white, white);
      border-left: 1px solid var(--color-stroke-light, #dee5ef);
      border-right: 1px solid var(--color-stroke-light, #dee5ef);
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      box-sizing: border-box;
    }
  `;

  private _getInitials(): string {
    return this.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <div class="header-content">
            <div class="avatar">
              ${this.src ? html`<img src=${this.src} alt=${this.name} />` : this._getInitials()}
            </div>
            <div style="flex-grow: 1; min-width: 0;">
              <p class="name">${this.name}</p>
            </div>
          </div>
          ${(this.email || this.role) ? html`
            <div class="meta">
              ${this.email ? html`<p style="margin: 0;">${this.email}</p>` : ''}
              ${this.role ? html`<p style="margin: 0;">${this.role}</p>` : ''}
            </div>
          ` : ''}
        </div>
        ${this.showMenu ? html`
          <div class="menu">
            <slot></slot>
          </div>
        ` : ''}
      </div>
    `;
  }
}

@customElement('syn-profile-menu-item')
export class SynProfileMenuItem extends LitElement {
  @property() label = '';
  @property({ type: Boolean }) destructive = false;
  @property({ type: Boolean, attribute: 'show-separator' }) showSeparator = false;

  static styles = css`
    :host {
      display: block;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 38px;
      padding: 0 10px;
      background-color: var(--color-surface-white, white);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 17px;
      color: var(--color-text-primary, black);
      text-align: left;
      box-sizing: border-box;
    }
    .item.with-separator {
      border-top: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .item.destructive {
      color: var(--color-system-critical, #db3a3a);
    }
    .item:hover {
      background-color: var(--color-surface-light, #f7f9fb);
    }
    .icon {
      width: 17px;
      height: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-icon-secondary, #718094);
    }
    .item.destructive .icon {
      color: var(--color-system-critical, #db3a3a);
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
  }

  render() {
    const classes = [
      'item',
      this.destructive ? 'destructive' : '',
      this.showSeparator ? 'with-separator' : '',
    ].filter(Boolean).join(' ');

    return html`
      <button type="button" class=${classes} @click=${this._handleClick}>
        <span class="icon">
          <slot name="icon"></slot>
        </span>
        <span>${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-profile': SynProfile;
    'syn-profile-menu-item': SynProfileMenuItem;
  }
}
