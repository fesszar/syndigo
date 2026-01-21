import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type FilterPanelVariant = 'default' | 'compact';

@customElement('syn-filter-panel')
export class SynFilterPanel extends LitElement {
  @property() variant: FilterPanelVariant = 'default';
  @property() title = 'Filter';
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = false;
  @property({ type: Boolean, attribute: 'show-header' }) showHeader = true;
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search attributes';
  @property({ attribute: 'search-value' }) searchValue = '';
  @property({ attribute: 'clear-text' }) clearText = 'Clear All';
  @property({ attribute: 'apply-text' }) applyText = 'Apply';
  @property({ type: Boolean, attribute: 'apply-disabled' }) applyDisabled = false;

  static styles = css`
    :host {
      display: block;
    }
    .panel {
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface-white, white);
      border-radius: 4px;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      overflow: hidden;
    }
    .panel.compact {
      background-color: var(--color-surface-light, #f7f9fb);
      padding: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      color: var(--color-text-primary, black);
      margin: 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .search-container {
      padding: 12px;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .search-input {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      height: 34px;
      padding: 8px 12px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, black);
      outline: none;
      box-sizing: border-box;
    }
    .body {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(211px, 1fr));
      gap: 12px;
      padding: 12px;
      flex-grow: 1;
      overflow-y: auto;
    }
    .body.compact {
      display: flex;
      flex-direction: column;
    }
  `;

  private _handleSearchChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('syn-search', { 
      detail: { value }, 
      bubbles: true, 
      composed: true 
    }));
  }

  private _handleClearAll() {
    this.dispatchEvent(new CustomEvent('syn-clear-all', { bubbles: true, composed: true }));
  }

  private _handleApply() {
    this.dispatchEvent(new CustomEvent('syn-apply', { bubbles: true, composed: true }));
  }

  render() {
    const isCompact = this.variant === 'compact';

    return html`
      <div class="panel ${isCompact ? 'compact' : ''}">
        ${this.showHeader && !isCompact ? html`
          <div class="header">
            <h2 class="title">${this.title}</h2>
            <div class="header-actions">
              <syn-button variant="tertiary" @click=${this._handleClearAll}>${this.clearText}</syn-button>
              <syn-button variant="primary" ?disabled=${this.applyDisabled} @click=${this._handleApply}>${this.applyText}</syn-button>
            </div>
          </div>
        ` : ''}
        
        ${this.showSearch && !isCompact ? html`
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder=${this.searchPlaceholder}
              .value=${this.searchValue}
              @input=${this._handleSearchChange}
            />
          </div>
        ` : ''}
        
        <div class="body ${isCompact ? 'compact' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('syn-filter-box')
export class SynFilterBox extends LitElement {
  @property() title = '';
  @property({ type: Boolean }) collapsed = false;

  static styles = css`
    :host {
      display: block;
    }
    .box {
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 6px;
      overflow: hidden;
      min-width: 211px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 34px;
      padding: 8px;
      background-color: var(--color-surface-medium, #dee5ef);
      cursor: pointer;
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 600;
      line-height: 14px;
      color: var(--color-text-primary, black);
      margin: 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 7px;
    }
    .content.collapsed {
      display: none;
    }
  `;

  private _handleToggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('syn-toggle', { 
      detail: { collapsed: this.collapsed }, 
      bubbles: true, 
      composed: true 
    }));
  }

  render() {
    return html`
      <div class="box">
        <div class="header" @click=${this._handleToggle}>
          <slot name="icon">
            <syn-icon name="filter" size="18"></syn-icon>
          </slot>
          <p class="title">${this.title}</p>
        </div>
        <div class="content ${this.collapsed ? 'collapsed' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('syn-filter-item')
export class SynFilterItem extends LitElement {
  @property() label = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 28px;
      padding: 0 7px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .item:hover {
      background-color: var(--color-surface-medium, #dee5ef);
    }
    .item.selected {
      background-color: var(--color-blue-100, #e8f1fd);
    }
    .item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-secondary, #4d5c6e);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.dispatchEvent(new CustomEvent('syn-select', { 
        detail: { selected: this.selected }, 
        bubbles: true, 
        composed: true 
      }));
    }
  }

  render() {
    const classes = [
      'item',
      this.selected ? 'selected' : '',
      this.disabled ? 'disabled' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class=${classes} @click=${this._handleClick}>
        <span class="label">${this.label}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-filter-panel': SynFilterPanel;
    'syn-filter-box': SynFilterBox;
    'syn-filter-item': SynFilterItem;
  }
}
