import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './syn-input-field.js';

/**
 * Text area component for multi-line input
 * 
 * @element syn-text-area
 * @fires syn-input - Fired when the input value changes
 * @fires syn-change - Fired when the input loses focus after value change
 */
@customElement('syn-text-area')
export class SynTextArea extends LitElement {
  @property() value = '';
  @property() placeholder?: string;
  @property() label?: string;
  @property({ type: Boolean }) required = false;
  @property() helpText?: string;
  @property() errorText?: string;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number }) rows = 4;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Boolean }) resize = true;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    textarea {
      width: 100%;
      min-height: 80px;
      padding: 8px 10px;
      border-radius: var(--radius-sm, 4px);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      background-color: var(--color-surface-medium, #dee5ef);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      line-height: var(--line-height-font-line-height-sm, 18px);
      color: var(--color-text-primary, #1d3261);
      box-sizing: border-box;
      outline: none;
      transition: all 0.15s ease;
      resize: vertical;
    }

    textarea.no-resize {
      resize: none;
    }

    textarea::placeholder {
      color: var(--color-text-tertiary, #91a0b3);
    }

    textarea:hover:not(:disabled):not(:focus) {
      border-color: var(--color-stroke-medium, #91a0b3);
    }

    textarea:focus {
      border-color: var(--color-button-primary, #2d75e2);
      background-color: var(--color-surface-white, #ffffff);
    }

    textarea:disabled {
      background-color: var(--color-surface-light, #f7f9fb);
      color: var(--color-text-tertiary, #91a0b3);
      cursor: not-allowed;
    }

    :host([error]) textarea {
      background-color: var(--color-surface-medium, #dee5ef);
      border-color: var(--color-stroke-light, #dee5ef);
    }
  `;

  private handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(new CustomEvent('syn-input', { detail: { value: this.value } }));
  }

  private handleChange(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: textarea.value } }));
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('errorText')) {
      if (this.errorText) {
        this.setAttribute('error', '');
      } else {
        this.removeAttribute('error');
      }
    }
  }

  render() {
    return html`
      <syn-input-field
        label=${ifDefined(this.label)}
        ?required=${this.required}
        helpText=${ifDefined(this.helpText)}
        errorText=${ifDefined(this.errorText)}
      >
        <textarea
          class=${this.resize ? '' : 'no-resize'}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder)}
          ?disabled=${this.disabled}
          rows=${this.rows}
          maxlength=${ifDefined(this.maxLength)}
          @input=${this.handleInput}
          @change=${this.handleChange}
        ></textarea>
      </syn-input-field>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-text-area': SynTextArea;
  }
}
