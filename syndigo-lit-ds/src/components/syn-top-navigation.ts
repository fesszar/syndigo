import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type EnvironmentStatus = 'success' | 'warning' | 'error';

@customElement('syn-top-navigation')
export class SynTopNavigation extends LitElement {
  @property() environment = '';
  @property({ attribute: 'environment-status' }) environmentStatus: EnvironmentStatus = 'success';
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search';
  @property({ attribute: 'search-value' }) searchValue = '';
  @property({ type: Number, attribute: 'message-count' }) messageCount?: number;
  @property({ type: Number, attribute: 'alert-count' }) alertCount?: number;
  @property({ attribute: 'avatar-src' }) avatarSrc = '';
  @property({ attribute: 'avatar-initials' }) avatarInitials = '';

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 58px;
      padding: 0 14px;
      background-color: var(--color-surface-white, white);
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .left-section, .right-section { display: flex; align-items: center; gap: 20px; }
    .right-section { gap: 27px; }
    .search-container {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 34px;
      padding: 5px 10px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      flex: 1;
      max-width: 400px;
    }
    .search-container input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 12px;
      font-family: Inter, sans-serif;
      font-weight: 500;
      color: var(--color-text-primary, black);
    }
    .badge {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 10px;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 30px;
    }
    .status-dot { width: 10px; height: 10px; border-radius: 50%; }
    .status-dot.success { background-color: #0e8662; }
    .status-dot.warning { background-color: #f58319; }
    .status-dot.error { background-color: #db3a3a; }
    .badge-text { font-size: 12px; font-weight: 500; color: var(--color-text-secondary, #4d5c6e); }
    .icons-container { display: flex; align-items: center; gap: 20px; }
    .icon-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    .badge-count {
      position: absolute;
      top: -3px;
      right: -3px;
      min-width: 17px;
      height: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-system-critical, #db3a3a);
      border: 2px solid white;
      border-radius: 60px;
      padding: 2px 4px;
      font-size: 10px;
      font-weight: 600;
      color: white;
    }
    .avatar-container {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }
  `;

  private _handleSearchChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('syn-search', { detail: { value }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <nav class="container">
        <div class="left-section">
          <slot name="logo"></slot>
          ${this.environment ? html`
            <div class="badge">
              <div class="status-dot ${this.environmentStatus}"></div>
              <span class="badge-text">${this.environment}</span>
            </div>
          ` : ''}
        </div>
        <div class="right-section">
          <div class="search-container">
            <syn-icon name="search" size="16" color="#718094"></syn-icon>
            <input type="text" placeholder=${this.searchPlaceholder} .value=${this.searchValue} @input=${this._handleSearchChange} />
          </div>
          <div class="icons-container">
            <button type="button" class="icon-button" @click=${() => this.dispatchEvent(new CustomEvent('syn-message-click', { bubbles: true, composed: true }))} aria-label="Messages">
              <syn-icon name="message" size="24" color="#91a0b3"></syn-icon>
              ${this.messageCount && this.messageCount > 0 ? html`<span class="badge-count">${this.messageCount}</span>` : ''}
            </button>
            <button type="button" class="icon-button" @click=${() => this.dispatchEvent(new CustomEvent('syn-alert-click', { bubbles: true, composed: true }))} aria-label="Notifications">
              <syn-icon name="bell" size="24" color="#91a0b3"></syn-icon>
              ${this.alertCount && this.alertCount > 0 ? html`<span class="badge-count">${this.alertCount}</span>` : ''}
            </button>
          </div>
          <button type="button" class="avatar-container" @click=${() => this.dispatchEvent(new CustomEvent('syn-avatar-click', { bubbles: true, composed: true }))} aria-label="User menu">
            <syn-avatar size="sm" src=${this.avatarSrc} initials=${this.avatarInitials}></syn-avatar>
            <syn-icon name="chevron-down" size="20" color="#91a0b3"></syn-icon>
          </button>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-top-navigation': SynTopNavigation;
  }
}
