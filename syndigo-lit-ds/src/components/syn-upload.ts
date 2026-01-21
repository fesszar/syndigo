import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('syn-upload')
export class SynUpload extends LitElement {
  @property() title = 'Click or Drag & Drop';
  @property({ attribute: 'helper-text' }) helperText = 'SVG, PNG, JPG or GIF (max. 800x400px and 5GB)';
  @property({ type: Boolean }) disabled = false;
  @state() private isDragOver = false;

  static styles = css`
    :host { display: block; }
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      padding: 14px 16px;
      background-color: var(--color-surface-light, #f7f9fb);
      border: 1px dashed var(--color-grey-400, #91a0b3);
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }
    .container.drag-over {
      background-color: var(--color-blue-100, #e7f1ff);
      border-color: var(--color-blue-500, #2d75e2);
    }
    .container.disabled { cursor: not-allowed; opacity: 0.5; }
    .text-container { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
    .title { font-size: 13px; font-weight: 600; color: var(--color-text-primary, black); }
    .title .highlight { color: var(--color-blue-500, #2d75e2); }
    .helper { font-size: 11px; font-weight: 500; color: var(--color-text-secondary, #4d5c6e); }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-click', { bubbles: true, composed: true }));
    }
  }

  private _handleDragEnter(e: DragEvent) {
    e.preventDefault();
    if (!this.disabled) this.isDragOver = true;
  }

  private _handleDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = false;
  }

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragOver = false;
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('syn-drop', { detail: { files: e.dataTransfer?.files }, bubbles: true, composed: true }));
    }
  }

  render() {
    const iconSize = this.isDragOver ? 56 : 40;
    const iconColor = this.isDragOver ? '#2d75e2' : '#4d5c6e';
    const classes = ['container', this.isDragOver ? 'drag-over' : '', this.disabled ? 'disabled' : ''].filter(Boolean).join(' ');

    return html`
      <div class=${classes} @click=${this._handleClick} @dragenter=${this._handleDragEnter} 
        @dragleave=${this._handleDragLeave} @dragover=${this._handleDragOver} @drop=${this._handleDrop}
        role="button" tabindex=${this.disabled ? -1 : 0}>
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="${iconColor}" stroke-width="1.5"/>
          <path d="M3 15L8 10L13 15" stroke="${iconColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13 13L16 10L21 15" stroke="${iconColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="8" cy="9" r="1.5" fill="${iconColor}"/>
          <path d="M19 2V6M17 4H21" stroke="${iconColor}" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <div class="text-container">
          <span class="title"><span class="highlight">Click</span>${this.title.substring(5)}</span>
          ${this.helperText ? html`<span class="helper">${this.helperText}</span>` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-upload': SynUpload;
  }
}
