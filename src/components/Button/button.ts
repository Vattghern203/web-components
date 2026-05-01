export class EdoButton extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'variant'];
  }

  private shadow: ShadowRoot;
  private btnElement: HTMLButtonElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    
    // 1. Create the element once
    this.btnElement = document.createElement('button');
    
    // 2. Use a slot so users can pass HTML, not just strings
    const slot = document.createElement('slot');
    this.btnElement.appendChild(slot);
    
    // 3. Setup Styles (Modern approach)
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
      :host { 
        display: inline-block; 
        width: 100%; 
      }
      button {
        padding: 10px 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        width: 100%;
        transition: background 0.2s;
        /* Use CSS Variables for theming */
        background: var(--edo-btn-bg, black);
        color: var(--edo-btn-color, white);

        &:hover {
          opacity: 80%;
        }
      }
      .secondary {
        background: transparent;
        color: var(--edo-btn-bg, black);
        border: 1px solid var(--edo-btn-bg, black);
      }
    `);
    this.shadow.adoptedStyleSheets = [sheet];
  }

  connectedCallback() {
    if (!this.btnElement.isConnected) {
      this.shadow.appendChild(this.btnElement);
    }
    this.updateComponent();
  }

  attributeChangedCallback() {
    this.updateComponent();
  }

  private updateComponent() {
    const variant = this.getAttribute('variant') || 'primary';
    this.btnElement.className = variant;
    
    // If you still want the 'label' attribute to work:
    const label = this.getAttribute('label');
    if (label) this.btnElement.textContent = label;
  }
}

if (!customElements.get('edo-button')) {
  customElements.define('edo-button', EdoButton);
}