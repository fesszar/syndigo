import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type LogoColor = 'blue' | 'white' | 'black' | 'fullColor';
export type LogoType = 'full' | 'wordmark' | 'icon';
export type LogoBrand = 'syndigo' | 'whiteLabel';

@customElement('syn-logo')
export class SynLogo extends LitElement {
  @property() color: LogoColor = 'blue';
  @property() type: LogoType = 'full';
  @property() brand: LogoBrand = 'syndigo';
  @property({ type: Number }) height = 24;
  @property() width?: number | string;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }
    .logo-container {
      display: inline-flex;
      align-items: center;
    }
    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-wordmark {
      display: flex;
      align-items: center;
      margin-left: 8px;
    }
    svg {
      height: 100%;
      width: auto;
    }
  `;

  private _renderSyndigoIcon(color: string) {
    return html`
      <svg viewBox="0 0 32 32" fill="none" style="height: ${this.height * 0.83}px;">
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" fill="${color}"/>
        <path d="M16 6c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6z" fill="white" fill-opacity="0.2"/>
        <path d="M12 12l4 4 4-4M12 16l4 4 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  private _renderSyndigoWordmark(color: string) {
    return html`
      <svg viewBox="0 0 100 24" fill="none" style="height: ${this.height}px;">
        <text x="0" y="18" font-family="Inter, sans-serif" font-size="18" font-weight="700" fill="${color}">
          syndigo
        </text>
      </svg>
    `;
  }

  private _getColor(): string {
    switch (this.color) {
      case 'blue':
      case 'fullColor':
        return '#2d75e2';
      case 'white':
        return '#ffffff';
      case 'black':
        return '#1d3261';
      default:
        return '#2d75e2';
    }
  }

  render() {
    const color = this._getColor();
    const containerStyle = `height: ${this.height}px; ${this.width ? `width: ${typeof this.width === 'number' ? this.width + 'px' : this.width};` : ''}`;

    if (this.type === 'icon') {
      return html`
        <div class="logo-container" style=${containerStyle}>
          <div class="logo-icon">
            ${this._renderSyndigoIcon(color)}
          </div>
        </div>
      `;
    }

    if (this.type === 'wordmark') {
      return html`
        <div class="logo-container" style=${containerStyle}>
          <div class="logo-wordmark" style="margin-left: 0;">
            ${this._renderSyndigoWordmark(color)}
          </div>
        </div>
      `;
    }

    // Full logo (icon + wordmark)
    return html`
      <div class="logo-container" style=${containerStyle}>
        <div class="logo-icon">
          ${this._renderSyndigoIcon(color)}
        </div>
        <div class="logo-wordmark">
          ${this._renderSyndigoWordmark(color)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-logo': SynLogo;
  }
}
