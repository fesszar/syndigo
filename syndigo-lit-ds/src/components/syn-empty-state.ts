import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type EmptyStateType = 'recipient' | 'search' | 'tasks';

const defaultContent: Record<EmptyStateType, { title: string; description: string; actionLabel?: string }> = {
  recipient: {
    title: 'No linked recipients.',
    description: "Select the retailers or channels you'd like to share your product data with.",
    actionLabel: 'Add Recipients',
  },
  search: {
    title: 'No results found',
    description: 'No results matched your search criteria.',
    actionLabel: 'Clear Search',
  },
  tasks: {
    title: 'All caught up',
    description: 'No action needed at this time.',
  },
};

/**
 * Empty state component for blank/empty views
 * 
 * @element syn-empty-state
 * @slot icon - Custom icon slot
 * @fires syn-action - Fired when action button is clicked
 */
@customElement('syn-empty-state')
export class SynEmptyState extends LitElement {
  @property() type: EmptyStateType = 'recipient';
  @property() title?: string;
  @property() description?: string;
  @property() actionLabel?: string;
  @property({ type: Boolean }) noBorder = false;

  static styles = css`
    :host {
      display: block;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px;
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 16px;
      overflow: hidden;
    }

    .container.no-border {
      border: none;
      background: transparent;
    }

    .icon-container {
      width: 50px;
      height: 50px;
      color: var(--color-icon-tertiary, #91a0b3);
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      width: 320px;
      padding-top: 16px;
      padding-bottom: 32px;
      text-align: center;
    }

    .container[data-type="tasks"] .text-wrapper {
      padding-bottom: 16px;
    }

    .title {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      color: var(--color-text-primary, #1d3261);
      margin: 0;
      width: 100%;
    }

    .description {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-tertiary, #91a0b3);
      margin: 0;
      width: 100%;
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 34px;
      padding: 8px 10px;
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-primary, #1d3261);
      cursor: pointer;
    }

    .action-btn:hover {
      background-color: var(--color-surface-light, #f7f9fb);
    }
  `;

  private _handleAction() {
    this.dispatchEvent(new CustomEvent('syn-action'));
  }

  private _renderIcon() {
    switch (this.type) {
      case 'search':
        return html`
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="22.5" cy="22.5" r="14" stroke="currentColor" stroke-width="2.5"/>
            <line x1="32.5" y1="32.5" x2="43.75" y2="43.75" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        `;
      case 'tasks':
        return html`
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="10" stroke="currentColor" stroke-width="2.5"/>
            <line x1="25" y1="4" x2="25" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="25" y1="40" x2="25" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="4" y1="25" x2="10" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="40" y1="25" x2="46" y2="25" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        `;
      default: // recipient
        return html`
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <rect x="18.75" y="6.25" width="12.5" height="37.5" rx="2" stroke="currentColor" stroke-width="2"/>
            <rect x="6.25" y="18.75" width="12.5" height="25" rx="2" stroke="currentColor" stroke-width="2"/>
            <rect x="31.25" y="18.75" width="12.5" height="25" rx="2" stroke="currentColor" stroke-width="2"/>
          </svg>
        `;
    }
  }

  render() {
    const defaults = defaultContent[this.type];
    const displayTitle = this.title ?? defaults.title;
    const displayDescription = this.description ?? defaults.description;
    const displayActionLabel = this.actionLabel ?? defaults.actionLabel;

    return html`
      <div class="container ${this.noBorder ? 'no-border' : ''}" data-type=${this.type}>
        <div class="icon-container">
          <slot name="icon">${this._renderIcon()}</slot>
        </div>
        <div class="text-wrapper">
          <p class="title">${displayTitle}</p>
          <p class="description">${displayDescription}</p>
        </div>
        ${displayActionLabel
          ? html`
              <button class="action-btn" @click=${this._handleAction}>
                ${displayActionLabel}
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-empty-state': SynEmptyState;
  }
}
