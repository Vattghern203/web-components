// src/components/before/before.ts
export class VattBefore extends HTMLElement {
  static get observedAttributes() {
    return ['before', 'after']
  }

  private shadow: ShadowRoot
  private isDragging = false
  private position = 50

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.attachEvents()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const before = this.getAttribute('before')
    const after = this.getAttribute('after')

    this.shadow.innerHTML = `
      <style>
        .container {
          position: relative;
          width: 100%;
          max-width: 600px;
          overflow: hidden;
          user-select: none;
        }

        img {
          display: block;
          width: 100%;
          height: auto;
        }

        .after {
          position: absolute;
          top: 0;
          left: 0;
          width: ${this.position}%;
          overflow: hidden;
        }

        .slider {
          position: absolute;
          top: 0;
          left: ${this.position}%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: white;
          cursor: ew-resize;
        }
      </style>

      <div class="container">
        <img src="${before}" />

        <div class="after">
          <img src="${after}" />
        </div>

        <div class="slider"></div>
      </div>
    `
  }