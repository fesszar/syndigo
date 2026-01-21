import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { iconPaths, availableIconNames } from './icon-paths.js';

/**
 * Icon component using unified SVG paths
 * 
 * @element syn-icon
 * @property {string} name - Icon name from the icon library
 * @property {number} size - Icon size in pixels (default: 24)
 * @property {string} color - Icon color (default: secondary gray)
 */
@customElement('syn-icon')
export class SynIcon extends LitElement {
  @property() name: string = '';
  @property({ type: Number }) size: number = 24;
  @property() color: string = 'var(--color-icon-secondary, #718094)';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      display: block;
    }
  `;

  render() {
    const svgContent = iconPaths[this.name];
    if (!svgContent) {
      console.warn(`syn-icon: Unknown icon name "${this.name}"`);
      return html``;
    }

    return html`
      <svg 
        width="${this.size}" 
        height="${this.size}" 
        viewBox="0 0 24 24" 
        fill="none"
        style="color: ${this.color}"
      >
        ${unsafeHTML(svgContent)}
      </svg>
    `;
  }
}

export const availableIcons = availableIconNames;

declare global {
  interface HTMLElementTagNameMap {
    'syn-icon': SynIcon;
  }
}
