import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type SideNavState = 'expanded' | 'collapsed';

@customElement('syn-side-nav')
export class SynSideNav extends LitElement {
  @property() state: SideNavState = 'expanded';

  static styles = css`
    :host { display: block; height: 100%; }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: white;
      padding: 16px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      transition: width 0.2s ease-in-out;
    }
    .container.expanded { width: 206px; }
    .container.collapsed { width: 68px; }
    .main-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .top-wrapper { display: flex; flex-direction: column; gap: 12px; }
    .header { display: flex; align-items: center; }
    .header.collapsed { justify-content: center; padding-top: 10px; }
    .hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .logo-container { display: flex; align-items: center; padding: 10px 0; flex-grow: 1; }
    .menu-items { display: flex; flex-direction: column; gap: 14px; }
    .footer { display: flex; flex-direction: column; gap: 8px; }
    .footer.collapsed { align-items: center; }
    .footer-label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 11px;
      font-weight: 500;
      color: var(--color-text-secondary, #4d5c6e);
    }
  `;

  private _handleToggle() {
    this.state = this.state === 'expanded' ? 'collapsed' : 'expanded';
    this.dispatchEvent(new CustomEvent('syn-toggle', { detail: { state: this.state }, bubbles: true, composed: true }));
  }

  render() {
    const collapsed = this.state === 'collapsed';
    return html`
      <nav class="container ${this.state}" role="navigation">
        <div class="main-wrapper" style="width: ${collapsed ? '36px' : '174px'};">
          <div class="top-wrapper">
            <div class="header ${collapsed ? 'collapsed' : ''}">
              <button type="button" class="hamburger" @click=${this._handleToggle} aria-label="Toggle navigation">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M3 12H21M3 18H21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              ${!collapsed ? html`<div class="logo-container"><slot name="logo"></slot></div>` : ''}
            </div>
            <div class="menu-items">
              <slot name="actions"></slot>
              <slot></slot>
            </div>
          </div>
          <div class="footer ${collapsed ? 'collapsed' : ''}">
            ${collapsed ? html`<slot name="logo-icon"></slot>` : html`
              <span class="footer-label">Powered by</span>
              <slot name="logo-icon"></slot>
            `}
          </div>
        </div>
      </nav>
    `;
  }
}

@customElement('syn-side-nav-item')
export class SynSideNavItem extends LitElement {
  @property() label = '';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: block; }
    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 30px;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: var(--color-surface-white, white);
      cursor: pointer;
      border: none;
      width: 100%;
      text-align: left;
    }
    .item.active { background-color: var(--color-surface-black, black); }
    .item.disabled { opacity: 0.5; cursor: not-allowed; }
    .icon { width: 20px; height: 20px; color: var(--color-icon-tertiary, #91a0b3); }
    .item.active .icon { color: white; }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary, #4d5c6e);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item.active .label { color: white; }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
    }
  }

  render() {
    const classes = ['item', this.active ? 'active' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <button type="button" class=${classes} @click=${this._handleClick}>
        <span class="icon"><slot name="icon"></slot></span>
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-side-nav': SynSideNav;
    'syn-side-nav-item': SynSideNavItem;
  }
}
