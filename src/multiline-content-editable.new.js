import { LitElement, html, css } from 'lit-element';

/**
 * Cellule contenant plusieurs elememts editables pour g�rer des listes
 */
export default class MultilineContentEditable extends LitElement {

    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 1fr;
                grid-row-gap: 4px;
            }
        `;
    }

    static get properties() {
        return {
            values: Array
        }
    }

    createRenderRoot() {
        return this;
    }

    shouldUpdate(changedProperties) {
        if (!this.values.length) {
            this.dispatchEvent(new CustomEvent('add', {
                bubbles: true,
                composed: true,
                detail: { 
                    index: 0
                 }
            }));
            return false
        }
        return super.shouldUpdate(changedProperties);
    }

    render() {
        return html`
        ${this.values.map((item, i) => html`<div
            @change=${e => this.changeHandler(e, item, i)}
            @submit=${e => this.submitHandler(e, item, i)}
            @reset=${e => this.resetHandler(e, item, i)}
        >${this.renderItem(item, i)}`)}</div>`
    }

    updated(updateProperties) {
        if (updateProperties.has("values") && this.nextRenderResolver) {
            this.nextRenderResolver();
            this.nextRenderResolver = null;
        }
    }

    get nextRender() {
        return new Promise((resolve) => {
            this.nextRenderResolver = resolve
        })
    }

    renderItem(item, index) {
        throw new Error("Not implemented!");
    }

    /**
     * Je demande à ajouter un nouvel enfant (editable) lors d'un CR
     */
    async submitHandler(e, item, index) {
        // cancel CR
        e.detail.preventDefault();
        
        this.dispatchEvent(new CustomEvent('add', {
            bubbles: true,
            composed: true,
            detail: { 
                index: index + 1
             }
        }));

        // // Je donne le focus au bloc du dessous. Il a du �tre cr��.
        // await this.nextRender;
        // const elem = this.shadowRoot.querySelectorAll(":host > div")[index + 1];
        // if (!elem) return;
        // elem.firstElementChild.focus();
    }

    async resetHandler(e, item, index) {
        this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
             }
        }));

        // // Je donne le focus au bloc pr�cedent etje met le curseur � la fin de la ligne. 
        // await this.nextRender;
        // const elem = this.shadowRoot.querySelectorAll(":host > div")[index - 1];
        // if (!elem) return;
        // elem.firstElementChild.focus({ caretToEnd: true });
    }

    /**
     * Le text a été changé
     */
    changeHandler(e, item, index) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item,
                value: e.detail.value
             }
        }));
    }
}
