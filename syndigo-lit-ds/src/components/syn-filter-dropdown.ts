import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type FilterDropdownType = 'single' | 'multi' | 'boolean' | 'range' | 'workflow' | 'nested' | 'date';

@customElement('syn-filter-dropdown')
export class SynFilterDropdown extends LitElement {
  @property() type: FilterDropdownType = 'single';
  @property() label = 'Filter';
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = false;
  @property({ type: Boolean, attribute: 'show-reset' }) showReset = true;
  @property() unit = 'in';
  @property({ attribute: 'min-value' }) minValue = '';
  @property({ attribute: 'max-value' }) maxValue = '';
  @state() private searchQuery = '';

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      flex-direction: column;
      background-color: var(--color-surface-white, white);
      border-radius: 6px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      overflow: hidden;
      min-width: 280px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      background-color: var(--color-surface-light, #f7f9fb);
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .header-label {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 11px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-secondary, #4d5c6e);
    }
    .body {
      display: flex;
      flex-direction: column;
      padding: 12px;
      gap: 10px;
      flex-grow: 1;
    }
    .footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      background-color: var(--color-surface-white, white);
      border-top: 1px solid var(--color-stroke-light, #dee5ef);
    }
    .footer syn-button {
      flex: 1;
    }
    .search-input {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 34px;
      padding: 10px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    }
    .search-input input {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, black);
      border: none;
      outline: none;
      background: transparent;
      flex-grow: 1;
    }
    .search-input input::placeholder {
      color: var(--color-text-tertiary, #91a0b3);
    }
    .toggle-container {
      display: flex;
      align-items: center;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      padding: 4px;
    }
    .toggle-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 26px;
      padding: 10px;
      border-radius: 4px;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      flex-grow: 1;
      border: none;
      background: transparent;
      color: var(--color-text-secondary, #4d5c6e);
    }
    .toggle-pill.active {
      background-color: var(--color-button-primary, #2d75e2);
      color: white;
    }
    .range-inputs {
      display: flex;
      gap: 10px;
    }
    .range-field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 34px;
      padding: 9px 6px 9px 9px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      flex: 1;
    }
    .range-field input {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-primary, black);
      border: none;
      outline: none;
      background: transparent;
      flex-grow: 1;
      width: 60px;
    }
    .unit-badge {
      display: flex;
      align-items: center;
      padding: 4px 6px;
      background-color: var(--color-surface-medium, #dee5ef);
      border-radius: 4px;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 11px;
      font-weight: 500;
      color: var(--color-text-primary, black);
    }
    .checkbox-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 200px;
      overflow-y: auto;
    }
  `;

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('syn-close', { bubbles: true, composed: true }));
  }

  private _handleReset() {
    this.dispatchEvent(new CustomEvent('syn-reset', { bubbles: true, composed: true }));
  }

  private _handleApply() {
    this.dispatchEvent(new CustomEvent('syn-apply', { bubbles: true, composed: true }));
  }

  private _renderBody() {
    switch (this.type) {
      case 'boolean':
        return html`
          <div class="toggle-container">
            <button class="toggle-pill active">Yes</button>
            <button class="toggle-pill">No</button>
          </div>
        `;
      case 'range':
        return html`
          <div class="range-inputs">
            <div class="range-field">
              <input type="text" placeholder="Min" .value=${this.minValue} />
              <span class="unit-badge">${this.unit}</span>
            </div>
            <div class="range-field">
              <input type="text" placeholder="Max" .value=${this.maxValue} />
              <span class="unit-badge">${this.unit}</span>
            </div>
          </div>
        `;
      default:
        return html`
          ${this.showSearch ? html`
            <div class="search-input">
              <syn-icon name="search" size="16"></syn-icon>
              <input type="text" placeholder="Search..." .value=${this.searchQuery} 
                @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value} />
            </div>
          ` : ''}
          <div class="checkbox-list">
            <slot></slot>
          </div>
        `;
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <span class="header-label">${this.label}</span>
        </div>
        <div class="body">
          ${this._renderBody()}
        </div>
        <div class="footer">
          <syn-button variant="secondary" size="sm" @click=${this._handleClose}>Close</syn-button>
          ${this.showReset ? html`
            <syn-button variant="secondary" size="sm" @click=${this._handleReset}>Reset</syn-button>
          ` : ''}
          <syn-button variant="primary" size="sm" @click=${this._handleApply}>Apply</syn-button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-filter-dropdown': SynFilterDropdown;
  }
}
