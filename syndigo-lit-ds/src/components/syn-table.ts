import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type SortDirection = 'asc' | 'desc' | undefined;

/**
 * Table container component
 * 
 * @element syn-table
 * @slot - Table rows (syn-table-header, syn-table-row)
 */
@customElement('syn-table')
export class SynTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }
  `;

  render() {
    return html`
      <div class="table" role="table">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Table header row component
 * 
 * @element syn-table-header
 * @slot - Header cells (syn-table-header-cell)
 */
@customElement('syn-table-header')
export class SynTableHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 16px;
      background-color: var(--color-surface-white, #ffffff);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * Table header cell component
 * 
 * @element syn-table-header-cell
 * @slot - Cell content
 * @fires syn-sort - Fired when sortable header is clicked
 */
@customElement('syn-table-header-cell')
export class SynTableHeaderCell extends LitElement {
  @property({ type: Boolean }) sortable = false;
  @property() sortDirection?: SortDirection;
  @property() width?: string;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 40px;
      padding: 0 16px;
      flex: 1 1 0;
      min-width: 1px;
    }

    :host([sortable]) {
      cursor: pointer;
    }

    .content {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
      color: var(--color-text-secondary, #4d5c6e);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sort-icon {
      width: 12px;
      height: 12px;
      color: var(--color-icon-tertiary, #91a0b3);
    }

    .sort-icon.active {
      color: var(--color-button-primary, #2d75e2);
    }
  `;

  private _handleClick() {
    if (this.sortable) {
      this.dispatchEvent(new CustomEvent('syn-sort'));
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width') && this.width) {
      this.style.flex = `0 0 ${this.width}`;
    }
  }

  render() {
    return html`
      <span class="content" @click=${this._handleClick}>
        <slot></slot>
      </span>
      ${this.sortable
        ? html`
            <svg class="sort-icon ${this.sortDirection ? 'active' : ''}" viewBox="0 0 24 24" fill="none">
              ${this.sortDirection === 'asc'
                ? html`<path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
                : this.sortDirection === 'desc'
                  ? html`<path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
                  : html`<path d="M11 5H21M11 9H18M11 13H15M3 17L6 20M6 20L9 17M6 20V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`}
            </svg>
          `
        : ''}
    `;
  }
}

/**
 * Table row component
 * 
 * @element syn-table-row
 * @slot - Row cells (syn-table-cell)
 * @fires syn-click - Fired when row is clicked
 */
@customElement('syn-table-row')
export class SynTableRow extends LitElement {
  @property({ type: Boolean }) selected = false;
  @state() private _isHovered = false;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 42px;
      padding: 0 16px;
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: var(--radius-sm, 4px);
      transition: background-color 0.15s ease;
    }

    :host(:hover) {
      background-color: var(--color-surface-light, #f7f9fb);
    }

    :host([selected]) {
      background-color: var(--color-blue-100, #e7f1ff);
    }

    :host([clickable]) {
      cursor: pointer;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('syn-click'));
  }

  render() {
    return html`<slot @click=${this._handleClick}></slot>`;
  }
}

/**
 * Table cell component
 * 
 * @element syn-table-cell
 * @slot - Cell content
 */
@customElement('syn-table-cell')
export class SynTableCell extends LitElement {
  @property() width?: string;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 40px;
      padding: 0 16px;
      flex: 1 1 0;
      min-width: 1px;
      overflow: hidden;
    }

    .content {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
      color: var(--color-text-primary, #1d3261);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width') && this.width) {
      this.style.flex = `0 0 ${this.width}`;
    }
  }

  render() {
    return html`
      <span class="content">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-table': SynTable;
    'syn-table-header': SynTableHeader;
    'syn-table-header-cell': SynTableHeaderCell;
    'syn-table-row': SynTableRow;
    'syn-table-cell': SynTableCell;
  }
}
