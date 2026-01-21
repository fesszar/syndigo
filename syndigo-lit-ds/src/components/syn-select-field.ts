import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './syn-input-field.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select field component with dropdown
 * 
 * @element syn-select-field
 * @fires syn-change - Fired when selection changes
 */
@customElement('syn-select-field')
export class SynSelectField extends LitElement {
  @property() label?: string;
  @property() value?: string;
  @property() placeholder = 'Select option';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) fullWidth = false;
  @property() helpText?: string;
  @property() errorText?: string;
  @property({ type: Boolean }) showSearch = false;
  @property() searchPlaceholder = 'Search';

  @state() private _isOpen = false;
  @state() private _searchValue = '';
  @state() private _hoveredOption: string | null = null;

  static styles = css`
    :host {
      display: block;
      width: 218px;
    }

    :host([fullWidth]) {
      width: 100%;
    }

    .wrapper {
      position: relative;
    }

    .trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      height: 34px;
      padding: 5px 10px;
      border-radius: var(--radius-sm, 4px);
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      cursor: pointer;
      transition: border-color 0.15s ease;
      box-sizing: border-box;
      width: 100%;
    }

    .trigger:hover:not(.disabled) {
      border-color: #91a0b3;
    }

    .trigger.open {
      border: 1.5px solid var(--color-button-primary, #2d75e2);
    }

    .trigger.disabled {
      background-color: #dee5ef;
      border: none;
      cursor: not-allowed;
    }

    .trigger.error {
      border: 1.5px solid var(--color-system-critical, #db3a3a);
    }

    .trigger-text {
      flex: 1;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .trigger-text.placeholder {
      color: var(--color-text-tertiary, #91a0b3);
    }

    .trigger-text.selected {
      color: var(--color-text-primary, #1d3261);
    }

    .chevron {
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    .chevron.open {
      transform: rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      z-index: 1000;
      overflow: hidden;
    }

    .search-container {
      padding: 7px;
    }

    .search-input {
      width: 100%;
      height: 34px;
      padding: 5px 10px;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      outline: none;
      box-sizing: border-box;
    }

    .options {
      padding: 4px;
      max-height: 200px;
      overflow-y: auto;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 28px;
      padding: 0 7px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-primary, #1d3261);
      cursor: pointer;
      border-radius: 4px;
    }

    .option:hover {
      background-color: var(--color-surface-medium, #dee5ef);
    }

    .option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._handleClickOutside = this._handleClickOutside.bind(this);
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  private _handleClickOutside(e: MouseEvent) {
    if (this._isOpen && !this.contains(e.target as Node)) {
      this._isOpen = false;
    }
  }

  private _handleToggle(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
    this._searchValue = '';
  }

  private _handleSelect(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this._isOpen = false;
    this._searchValue = '';
    this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: option.value } }));
  }

  private _handleSearchInput(e: Event) {
    e.stopPropagation();
    this._searchValue = (e.target as HTMLInputElement).value;
  }

  private get _selectedOption(): SelectOption | undefined {
    return this.options.find(o => o.value === this.value);
  }

  private get _filteredOptions(): SelectOption[] {
    if (!this._searchValue) return this.options;
    return this.options.filter(o => 
      o.label.toLowerCase().includes(this._searchValue.toLowerCase())
    );
  }

  render() {
    const isError = !!this.errorText;
    const triggerClass = this.disabled ? 'disabled' : isError ? 'error' : this._isOpen ? 'open' : '';

    return html`
      <syn-input-field
        label=${this.label || ''}
        ?required=${this.required}
        helpText=${this.helpText || ''}
        errorText=${this.errorText || ''}
      >
        <div class="wrapper">
          <div
            class="trigger ${triggerClass}"
            @click=${this._handleToggle}
            role="combobox"
            aria-expanded=${this._isOpen}
            aria-haspopup="listbox"
            tabindex=${this.disabled ? -1 : 0}
          >
            <span class="trigger-text ${this._selectedOption ? 'selected' : 'placeholder'}">
              ${this._selectedOption?.label || this.placeholder}
            </span>
            <svg class="chevron ${this._isOpen ? 'open' : ''}" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          ${this._isOpen
            ? html`
                <div class="dropdown">
                  ${this.showSearch
                    ? html`
                        <div class="search-container">
                          <input
                            class="search-input"
                            type="text"
                            placeholder=${this.searchPlaceholder}
                            .value=${this._searchValue}
                            @input=${this._handleSearchInput}
                            @click=${(e: Event) => e.stopPropagation()}
                          />
                        </div>
                      `
                    : ''}
                  <div class="options">
                    ${this._filteredOptions.map(
                      option => html`
                        <div
                          class="option ${option.disabled ? 'disabled' : ''}"
                          @click=${() => this._handleSelect(option)}
                          role="option"
                          aria-selected=${option.value === this.value}
                        >
                          ${option.label}
                        </div>
                      `
                    )}
                  </div>
                </div>
              `
            : ''}
        </div>
      </syn-input-field>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-select-field': SynSelectField;
  }
}
