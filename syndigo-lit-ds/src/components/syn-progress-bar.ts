import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ProgressBarType = 'bar' | 'circle';
export type ProgressBarTone = 'default' | 'success' | 'critical' | 'warning';

const toneColors: Record<ProgressBarTone, string> = {
  default: '#2d75e2',
  success: '#0e8662',
  critical: '#db3a3a',
  warning: '#f58319',
};

/**
 * Progress bar component - linear or circular
 * 
 * @element syn-progress-bar
 */
@customElement('syn-progress-bar')
export class SynProgressBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property() type: ProgressBarType = 'bar';
  @property() tone: ProgressBarTone = 'default';
  @property({ type: Number }) height = 14;
  @property({ type: Number }) size = 48;
  @property({ type: Boolean }) showLabel = false;
  @property() ariaLabel = 'Progress';

  static styles = css`
    :host {
      display: inline-block;
    }

    .bar-container {
      position: relative;
      width: 100%;
      background-color: var(--color-surface-medium, #dee5ef);
      border-radius: 24px;
      overflow: hidden;
    }

    .bar-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 24px;
      transition: width 0.3s ease-in-out;
    }

    .circle-container {
      position: relative;
    }

    .circle-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 10px;
      font-weight: 600;
      color: var(--color-text-primary, #1d3261);
    }
  `;

  private get _percentage(): number {
    return Math.min(100, Math.max(0, ((this.value - this.min) / (this.max - this.min)) * 100));
  }

  private _renderBar() {
    const fillColor = toneColors[this.tone];

    return html`
      <div
        class="bar-container"
        style="height: ${this.height}px"
        role="progressbar"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-label=${this.ariaLabel}
      >
        <div
          class="bar-fill"
          style="width: ${this._percentage}%; background-color: ${fillColor}"
        ></div>
      </div>
    `;
  }

  private _renderCircle() {
    const strokeWidth = 4;
    const radius = (this.size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (this._percentage / 100) * circumference;
    const fillColor = toneColors[this.tone];
    const trackColor = 'var(--color-surface-medium, #dee5ef)';

    return html`
      <div
        class="circle-container"
        style="width: ${this.size}px; height: ${this.size}px"
        role="progressbar"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-label=${this.ariaLabel}
      >
        <svg
          width=${this.size}
          height=${this.size}
          style="transform: rotate(-90deg)"
        >
          <circle
            cx=${this.size / 2}
            cy=${this.size / 2}
            r=${radius}
            fill="none"
            stroke=${trackColor}
            stroke-width=${strokeWidth}
          />
          <circle
            cx=${this.size / 2}
            cy=${this.size / 2}
            r=${radius}
            fill="none"
            stroke=${fillColor}
            stroke-width=${strokeWidth}
            stroke-linecap="round"
            stroke-dasharray=${circumference}
            stroke-dashoffset=${strokeDashoffset}
            style="transition: stroke-dashoffset 0.3s ease-in-out"
          />
        </svg>
        ${this.showLabel
          ? html`<span class="circle-label">${Math.round(this._percentage)}%</span>`
          : ''}
      </div>
    `;
  }

  render() {
    return this.type === 'circle' ? this._renderCircle() : this._renderBar();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-progress-bar': SynProgressBar;
  }
}
