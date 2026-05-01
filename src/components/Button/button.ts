// src/components/button/button.ts
export class EdoButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'variant']
  }

  private shadow: ShadowRoot

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const label = this.getAttribute('label') ?? 'Click'
    const variant = this.getAttribute('variant') ?? 'primary'

    this.shadow.innerHTML = `
      <style>
        button {
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          width: 100%
        }

        .primary {
          background: black;
          color: white;
        }

        .secondary {
          background: white;
          color: black;
          border: 1px solid black;
        }
      </style>

      <button class="${variant}">
        ${label}
      </button>
    `
  }
}