import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarType = 'initials' | 'image' | 'icon';

const sizeConfig: Record<AvatarSize, { size: number; fontSize: number; iconSize: number; radius: string }> = {
  sm: { size: 24, fontSize: 12, iconSize: 14, radius: 'var(--radius-sm, 4px)' },
  md: { size: 28, fontSize: 12, iconSize: 16, radius: 'var(--radius-sm, 4px)' },
  lg: { size: 32, fontSize: 16, iconSize: 18, radius: 'var(--radius-sm, 4px)' },
  xl: { size: 40, fontSize: 16, iconSize: 24, radius: 'var(--radius-md, 8px)' },
};

/**
 * Avatar component for user/entity representation
 * 
 * @element syn-avatar
 */
@customElement('syn-avatar')
export class SynAvatar extends LitElement {
  @property() type: AvatarType = 'initials';
  @property() size: AvatarSize = 'md';
  @property() src?: string;
  @property() alt?: string;
  @property() initials?: string;
  @property() name?: string;

  @state() private _imageError = false;

  static styles = css`
    :host {
      display: inline-flex;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-surface-medium, #dee5ef);
      overflow: hidden;
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-weight: 500;
      line-height: 1.25;
      color: var(--color-text-primary, #1d3261);
      text-align: center;
    }

    .icon {
      color: var(--color-text-tertiary, #91a0b3);
    }
  `;

  private _getInitials(): string {
    if (this.initials) return this.initials;
    if (!this.name) return 'FL';

    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 0) return 'FL';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    const first = parts[0][0] || '';
    const last = parts[parts.length - 1][0] || '';
    return (first + last).toUpperCase();
  }

  private _handleImageError() {
    this._imageError = true;
  }

  render() {
    const config = sizeConfig[this.size];
    const effectiveType: AvatarType = 
      this.type === 'image' && (this._imageError || !this.src) ? 'initials' : this.type;

    const avatarStyle = `
      width: ${config.size}px;
      height: ${config.size}px;
      border-radius: ${config.radius};
      ${this.type === 'icon' && this.size === 'xl' ? 'padding: 8px;' : this.type === 'icon' ? 'padding: 4px;' : ''}
    `;

    if (effectiveType === 'image' && this.src) {
      return html`
        <div class="avatar" style=${avatarStyle}>
          <img
            src=${this.src}
            alt=${this.alt || this.name || 'Avatar'}
            @error=${this._handleImageError}
          />
        </div>
      `;
    }

    if (effectiveType === 'icon') {
      return html`
        <div class="avatar" style=${avatarStyle}>
          <svg class="icon" width=${config.iconSize} height=${config.iconSize} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="currentColor"/>
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
      `;
    }

    return html`
      <div class="avatar" style=${avatarStyle}>
        <span class="initials" style="font-size: ${config.fontSize}px">
          ${this._getInitials()}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-avatar': SynAvatar;
  }
}
