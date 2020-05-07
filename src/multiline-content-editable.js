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
        // this.addEventListener("input", e => this.inputHandler(e))
    }
    
    render() {
        return html`${this.values.map((item, i) => this.renderItem(item, i))}`
    }

    updated(changedProperties) {
        if (this.focusIndex !== null) {
            const elems = [...this.children];
            const elem = elems[this.focusIndex];
            elem.focus(this.setCaretToEnd);
            this.focusIndex = null;
            this.setCaretToEnd = null;
        }
    }

    renderItem(item, index) {
        throw new Error("Not implemented!");
    }

    addHandler(e) {
        e.stopPropagation(); // je modifie add pour ajouter item et index.
        const index = [...this.children].indexOf(e.target);
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
        e.stopPropagation(); // je modifie remove pour ajouter item et index.
        const index = [...this.children].indexOf(e.target);
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

    // inputHandler(e) {
    //     const index = [...this.children].indexOf(e.target);
    //     const item = this.values[index];
    //     const path = e.path || (e.composedPath && e.composedPath());
    //     const value = path[0].innerText;
    //     this.dispatchEvent(new CustomEvent('change', {
    //         bubbles: true,
    //         composed: true,
    //         detail: { 
    //             index,
    //             item,
    //             value
    //          }
    //     }));
    // }
}
