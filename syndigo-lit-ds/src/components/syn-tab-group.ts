import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-tab-group')
export class SynTabGroup extends LitElement {
  @property({ attribute: 'active-tab' }) activeTab = '';

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
    }
  `;

  private _handleTabClick(e: Event) {
    const target = e.target as HTMLElement;
    const tab = target.closest('syn-tab') as SynTab;
    if (tab && !tab.disabled) {
      this.activeTab = tab.id;
      this.dispatchEvent(new CustomEvent('syn-tab-change', { detail: { tab: tab.id }, bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div class="container" role="tablist" @click=${this._handleTabClick}>
        <slot></slot>
      </div>
    `;
  }
}

@customElement('syn-tab')
export class SynTab extends LitElement {
  @property() label = '';
  @property({ type: Number }) badge?: number;
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host { display: inline-block; }
    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
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
    }
    .tab.active .label { color: var(--color-blue-500, #2d75e2); }
    .tab:hover:not(.disabled) .label { color: var(--color-text-primary, black); }
    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      background-color: var(--color-surface-medium, #dee5ef);
      border-radius: 9px;
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-secondary, #4d5c6e);
    }
  `;

  render() {
    const classes = ['tab', this.active ? 'active' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');
    return html`
      <button type="button" class=${classes} role="tab" aria-selected=${this.active} ?disabled=${this.disabled}>
        <span class="label">${this.label}</span>
        ${this.badge !== undefined ? html`<span class="badge">${this.badge}</span>` : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-tab-group': SynTabGroup;
    'syn-tab': SynTab;
  }
}
