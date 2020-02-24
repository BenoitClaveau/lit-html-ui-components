import { LitElement, html, css } from 'lit-element';

export default class ContentEditable extends LitElement {

    static get styles() {
        return css`
            .container {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
            }
        `;
    }

    static get properties() {
        return {
            values: String
        }
    }

    constructor() {
        super();
        this.focusIndex = null;
        this.setCaretToEnd = false;
    }
    
    render() {
        return html`
            <div 
                class="container"
                @add=${e => this.addHandler(e)}
                @remove=${e => this.removeHandler(e)}
                @input=${e => this.inputHandler(e)}
            >${this.values.map((item, i) => this.renderItem(item, i))}</div>
        `
    }

    firstUpdated() {
        this.container = this.shadowRoot.querySelector(".container");
    }

    updated(changedProperties) {
        if (this.focusIndex !== null) {
            const elems = [...this.container.children];
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
        const index = [...this.container.children].indexOf(e.target);
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

    removeHandler(e) {
        e.stopPropagation(); // je modifie remove pour ajouter item et index.
        const index = [...this.container.children].indexOf(e.target);
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
        const index = [...this.container.children].indexOf(e.target);
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
