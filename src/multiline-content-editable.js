import { LitElement, html, css } from 'lit-element';

/**
 * Cellule contenant plusieurs elememts editables pour g�rer des listes
 */
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
        this.addEventListener("submit", e => this.submitHandler(e))
        this.addEventListener("reset", e => this.resetHandler(e))
        this.addEventListener("input", e => this.inputHandler(e))
    }
    
    render() {
        return html`${this.values.map((item, i) => this.renderItem(item, i))}`
    }

    renderItem(item, index) {
        throw new Error("Not implemented!");
    }

    /**
     * Je demande � ajouter un nouvel enfant (editable) lors d'un 
     */
    async submitHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (path[0] === this) return; // Emit par moi-m�me.
        e.detail.preventDefault();
        
        const i = path.indexOf(this);
        const child = path[i-2]; // -2 � cause du shadowRoot (shadowRoot + child = 2)
        const index = [...this.shadowRoot.children].indexOf(child);
        const item = this.values[index];
        this.dispatchEvent(new CustomEvent('add', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item
             }
        }));

        // Je donne le focus au bloc du dessous. Il a du �tre cr��.
        await this.updateComplete;
        const elems = [...this.shadowRoot.children];
        const elem = elems[index + 1];
        if (!elem) return;
        await elem.focus();
    }

    async resetHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (path[0] === this) return; // Emit par moi-m�me.
        const i = path.indexOf(this);
        const child = path[i-2]; // -2 � cause du shadowRoot (shadowRoot + child = 2)
        const index = [...this.shadowRoot.children].indexOf(child);
        const item = this.values[index];
        this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item
             }
        }));

        // Je donne le focus au bloc pr�cedent etje met le curseur � la fin de la ligne. 
        await this.updateComplete;
        const elems = [...this.shadowRoot.children];
        const elem = elems[index - 1];
        if (!elem) return;
        await elem.focus();
        console.log("set caret to end")
        await elem.setCaretToEnd();
    }

    /**
     * Le text a �t� chang�
     */
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
