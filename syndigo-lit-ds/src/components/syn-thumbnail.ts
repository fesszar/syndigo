import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ThumbnailSize = 'xsmall' | 'small' | 'default' | 'large';
export type ThumbnailRadius = 'full' | 'half';

const sizeConfig: Record<ThumbnailSize, { container: number; icon: number }> = {
  xsmall: { container: 24, icon: 12 },
  small: { container: 40, icon: 16 },
  default: { container: 60, icon: 24 },
  large: { container: 80, icon: 32 },
};

const radiusConfig: Record<ThumbnailRadius, Record<ThumbnailSize, number>> = {
  full: { xsmall: 4, small: 4, default: 8, large: 8 },
  half: { xsmall: 2, small: 2, default: 4, large: 4 },
};

@customElement('syn-thumbnail')
export class SynThumbnail extends LitElement {
  @property() src = '';
  @property() alt = '';
  @property() size: ThumbnailSize = 'default';
  @property() radius: ThumbnailRadius = 'full';

  static styles = css`
    :host { display: inline-block; }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-surface-white, white);
      overflow: hidden;
      flex-shrink: 0;
    }
    .container.placeholder { border: 1px solid var(--color-stroke-light, #dee5ef); }
    .container.large { box-shadow: 0px 1px 0px 0px rgba(26, 26, 26, 0.07); }
    img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
    .placeholder-icon { color: #91a0b3; }
  `;

  render() {
    const config = sizeConfig[this.size];
    const borderRadius = radiusConfig[this.radius][this.size];
    const hasImage = !!this.src;
    const containerClasses = ['container', !hasImage ? 'placeholder' : '', this.size === 'large' && hasImage ? 'large' : ''].filter(Boolean).join(' ');
    
    return html`
      <div class=${containerClasses} style="width: ${config.container}px; height: ${config.container}px; border-radius: ${borderRadius}px;">
        ${hasImage ? html`<img src=${this.src} alt=${this.alt} />` : html`
          <svg class="placeholder-icon" width="${config.icon}" height="${config.icon}" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-thumbnail': SynThumbnail;
  }
}
