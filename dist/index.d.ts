declare class EdoButton extends HTMLElement {
    static get observedAttributes(): string[];
    private shadow;
    private btnElement;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(): void;
    private updateComponent;
}

export { EdoButton };
