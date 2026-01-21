import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type SelectBoxRowType = 'add' | 'remove';

@customElement('syn-select-box')
export class SynSelectBox extends LitElement {
  @property({ attribute: 'row-type' }) rowType: SelectBoxRowType = 'add';
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = true;
  @property({ attribute: 'search-placeholder' }) searchPlaceholder = 'Search...';
  @property({ type: Number, attribute: 'max-height' }) maxHeight = 400;
  @state() private searchQuery = '';

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      overflow: hidden;
    }
    .search-container {
      background-color: var(--color-surface-light, #f7f9fb);
      padding: 10px 13px;
    }
    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 34px;
      padding: 5px 10px;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
    }
    .search-wrapper input {
      flex-grow: 1;
      border: none;
      outline: none;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      background: transparent;
    }
    .options-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 10px 13px;
      overflow-y: auto;
    }
  `;

  render() {
    return html`
      <div class="container" role="listbox">
        ${this.showSearch ? html`
          <div class="search-container">
            <div class="search-wrapper">
              <syn-icon name="search" size="16"></syn-icon>
              <input type="text" placeholder=${this.searchPlaceholder} .value=${this.searchQuery}
                @input=${(e: Event) => this.searchQuery = (e.target as HTMLInputElement).value} />
            </div>
          </div>
        ` : ''}
        <div class="options-container" style="max-height: ${this.maxHeight}px;">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

@customElement('syn-select-box-row')
export class SynSelectBoxRow extends LitElement {
  @property() label = '';
  @property({ attribute: 'secondary-label' }) secondaryLabel = '';
  @property() type: SelectBoxRowType = 'add';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: block; }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 7px 10px;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      cursor: pointer;
    }
    .row:hover { background-color: var(--color-surface-light, #f7f9fb); }
    .row.disabled { opacity: 0.5; cursor: not-allowed; }
    .text-container { display: flex; flex-direction: column; }
    .primary-label { font-size: 11px; font-weight: 600; color: var(--color-text-primary, black); }
    .secondary-label { font-size: 9px; color: var(--color-text-secondary, #4d5c6e); }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div class="row ${this.disabled ? 'disabled' : ''}" @click=${this._handleClick} role="option">
        <div class="text-container">
          <span class="primary-label">${this.label}</span>
          ${this.secondaryLabel ? html`<span class="secondary-label">${this.secondaryLabel}</span>` : ''}
        </div>
        <syn-icon name=${this.type === 'add' ? 'plus' : 'close'} size="18" 
          color=${this.type === 'add' ? '#2d75e2' : '#4d5c6e'}></syn-icon>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-select-box': SynSelectBox;
    'syn-select-box-row': SynSelectBoxRow;
  }
}
