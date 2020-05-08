import { LitElement, html, css } from 'lit-element';

export default class MultilineContentEditable extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }
        `;
    }

    static get properties() {
        return {
            values: Array
        }
    }

    constructor() {
        super();
        this.focusIndex = null;
        this.setCaretToEnd = false;
        this.addEventListener("submit", e => this.submitHandler(e))
        this.addEventListener("reset", e => this.resetHandler(e))
        this.addEventListener("input", e => this.inputHandler(e))
    }
    
    render() {
        return html`${this.values.map((item, i) => this.renderItem(item, i))}`
    }

    updated(changedProperties) {
        if (this.focusIndex !== null) {
            const elems = [...this.shadowRoot.children];
            const elem = elems[this.focusIndex];
            elem.focus({ setCaretToEnd: this.setCaretToEnd });
            this.focusIndex = null;
            this.setCaretToEnd = null;
        }
    }

    renderItem(item, index) {
        throw new Error("Not implemented!");
    }

    submitHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (path[0] === this) return; // Emit par moi-même.

        const i = path.indexOf(this);
        const child = path[i-2]; // -2 à cause du shadowRoot (shadowRoot + child = 2)

        const index = [...this.shadowRoot.children].indexOf(child);
        const item = this.values[index];

        this.focusIndex = index + 1;

        this.dispatchEvent(new CustomEvent('add', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item
             }
        }));
    }

    resetHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (path[0] === this) return; // Emit par moi-même.

        const i = path.indexOf(this);
        const child = path[i-2]; // -2 à cause du shadowRoot (shadowRoot + child = 2)

        
        const index = [...this.shadowRoot.children].indexOf(child);
        const item = this.values[index];

        this.focusIndex = index - 1;
        this.setCaretToEnd = true;

        this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item
             }
        }));
    }

    inputHandler(e) {
        const index = [...this.children].indexOf(e.target);
        const item = this.values[index];
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].innerText;
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item,
                value
             }
        }));
    }
}
