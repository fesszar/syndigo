import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TabHeaderSize = 'default' | 'small';

@customElement('syn-tab-header')
export class SynTabHeader extends LitElement {
  @property() size: TabHeaderSize = 'default';
  @property({ attribute: 'active-tab' }) activeTab = '';
  @property({ type: Boolean, attribute: 'show-trailing-icon' }) showTrailingIcon = false;

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 16px 16px 0 16px;
      background-color: var(--color-surface-white, white);
      position: relative;
    }
    .container.small { border-bottom: 1px solid var(--color-stroke-light, #dee5ef); }
    .tabs-container {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      width: 100%;
    }
    .trailing-icon {
      position: absolute;
      right: 16.67px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }
  `;

  private _handleTabClick(e: Event) {
    const target = e.target as HTMLElement;
    const tab = target.closest('syn-tab-header-item') as SynTabHeaderItem;
    if (tab && !tab.disabled) {
      this.activeTab = tab.id;
      this.dispatchEvent(new CustomEvent('syn-tab-change', { detail: { tab: tab.id }, bubbles: true, composed: true }));
    }
  }

  private _handleTrailingClick() {
    this.dispatchEvent(new CustomEvent('syn-trailing-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container ${this.size}" role="tablist">
        <div class="tabs-container" @click=${this._handleTabClick}>
          <slot></slot>
        </div>
        ${this.showTrailingIcon ? html`
          <button type="button" class="trailing-icon" @click=${this._handleTrailingClick} aria-label="Toggle layout">
            <slot name="trailing-icon">
              <syn-icon name="layout" size="20"></syn-icon>
            </slot>
          </button>
        ` : ''}
      </div>
    `;
  }
}

@customElement('syn-tab-header-item')
export class SynTabHeaderItem extends LitElement {
  @property() label = '';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;
  @property() size: TabHeaderSize = 'default';

  static styles = css`
    :host { display: inline-block; }
    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 16px 0;
      cursor: pointer;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
    }
    .tab.active { border-bottom-color: var(--color-blue-500, #2d75e2); }
    .tab.disabled { opacity: 0.5; cursor: not-allowed; }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary, #4d5c6e);
      white-space: nowrap;
    }
    .tab.small .label { font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .tab.active .label { color: var(--color-blue-500, #2d75e2); }
    .tab:hover:not(.disabled) .label { color: var(--color-text-primary, black); }
  `;

  render() {
    const classes = ['tab', this.active ? 'active' : '', this.disabled ? 'disabled' : '', this.size].filter(Boolean).join(' ');
    return html`
      <button type="button" class=${classes} role="tab" aria-selected=${this.active} ?disabled=${this.disabled}>
        <span class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab-header': SynTabHeader;
    'syn-tab-header-item': SynTabHeaderItem;
  }
}
