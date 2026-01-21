import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-pdp-side-panel')
export class SynPdpSidePanel extends LitElement {
  @property({ type: Boolean }) loading = false;
  @property({ attribute: 'image-url' }) imageUrl = '';
  @property({ attribute: 'image-alt' }) imageAlt = '';
  @property() title = '';
  @property({ attribute: 'type-label' }) typeLabel = 'Item';
  @property({ attribute: 'item-id' }) itemId = '';
  @property({ type: Boolean, attribute: 'is-favorite' }) isFavorite = false;

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 14px;
      background-color: var(--color-surface-white, white);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      border: 1px solid #dee5ef;
      border-radius: 6px;
      overflow: hidden;
    }
    .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
    .favorite-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      color: var(--color-text-primary, black);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 24px;
      padding: 4px 7px;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px solid var(--color-grey-500, #4d5c6e);
      border-radius: 30px;
    }
    .tag-text { font-size: 12px; font-weight: 500; color: var(--color-grey-500, #4d5c6e); }
    .item-id { font-size: 12px; font-weight: 500; color: var(--color-text-secondary, #4d5c6e); margin: 0; }
    .meta-fields { display: flex; flex-direction: column; gap: 16px; }
    .skeleton-bar { background-color: var(--color-accent-grey-300, #dee5ef); border-radius: 10px; height: 12px; }
    .skeleton-bar.dim { opacity: 0.6; width: 96px; }
  `;

  private _handleFavoriteClick() {
    this.isFavorite = !this.isFavorite;
    this.dispatchEvent(new CustomEvent('syn-favorite', { detail: { isFavorite: this.isFavorite }, bubbles: true, composed: true }));
  }

  private _renderSkeleton() {
    return html`
      <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
        <div style="width: 100%; aspect-ratio: 1/1; background-color: var(--color-accent-grey-300, #dee5ef); border-radius: 6px;"></div>
        <div style="display: flex; flex-direction: column; gap: 7px;">
          <div class="skeleton-bar dim"></div>
          <div class="skeleton-bar" style="width: 100%;"></div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; flex-direction: column; gap: 7px;">
            <div class="skeleton-bar dim"></div>
            <div class="skeleton-bar" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="container">${this._renderSkeleton()}</div>`;
    }

    return html`
      <div class="container">
        ${this.imageUrl ? html`
          <div class="image-wrapper">
            <img src=${this.imageUrl} alt=${this.imageAlt} />
            <button type="button" class="favorite-btn" @click=${this._handleFavoriteClick}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.09 7.26L18 7.97L13.82 11.63L15.18 17.19L10 14.27L4.82 17.19L6.18 11.63L2 7.97L7.91 7.26L10 2Z"
                  fill="${this.isFavorite ? '#2d75e2' : 'none'}" stroke="#2d75e2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        ` : ''}
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${this.title ? html`<p class="title">${this.title}</p>` : ''}
            ${this.typeLabel ? html`
              <div class="tag">
                <slot name="type-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9.625 5.25L4.375 2.625" stroke="#4d5c6e" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.25 9.33V4.67a.83.83 0 00-.53-.78L7.47 1.43a.83.83 0 00-.81 0L2.15 3.76a.83.83 0 00-.53.78v4.67c0 .18.05.36.14.52.09.16.23.29.39.38l4.25 2.33a.83.83 0 00.81 0l4.25-2.33a.83.83 0 00.39-.38.83.83 0 00.14-.52z" stroke="#4d5c6e" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </slot>
                <span class="tag-text">${this.typeLabel}</span>
              </div>
            ` : ''}
            ${this.itemId ? html`<p class="item-id">ID: ${this.itemId}</p>` : ''}
          </div>
          <div class="meta-fields">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

@customElement('syn-meta-field')
export class SynMetaField extends LitElement {
  @property() label = '';
  @property() value = '';

  static styles = css`
    :host { display: block; }
    .field { display: flex; flex-direction: column; gap: 4px; }
    .label { font-size: 12px; font-weight: 500; color: var(--color-text-secondary, #4d5c6e); margin: 0; }
    .value { font-size: 13px; font-weight: 500; color: var(--color-text-primary, black); margin: 0; }
  `;

  render() {
    return html`
      <div class="field">
        <p class="label">${this.label}</p>
        <p class="value">${this.value}</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-pdp-side-panel': SynPdpSidePanel;
    'syn-meta-field': SynMetaField;
  }
}
