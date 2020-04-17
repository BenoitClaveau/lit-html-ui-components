import { LitElement, html, css } from 'lit-element';
import Autocomplete from "./autocomplete.js"

/**
 * events:
 * - change (value: text)
 * - submit (value: text)
 * - clear
 * - remove
 * 
 * methods to be defined:
 */
export default class Tags extends Autocomplete {

    static get styles() {
        return [
            super.styles,
            css`
                #tags-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                #tags-container > * {
                    margin: 4px 4px 4px 0px;
                }
                
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            tags: Array
        }
    }

    constructor() {
        super();
        this.tags = [];
    }

    render() {
        return html`
            ${ this.renderTags() }
            ${ super.render() }
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        const tags = this.shadowRoot.querySelector("#tags-container");
        tags.addEventListener('remove', e => this.tagRemoveHandler(e));
    }

    tagRemoveHandler(e) {
        e.stopPropagation();
        this.opened = false;
        this.dispatchEvent(new CustomEvent("remove", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    renderTags() {
        if (!this.tags) return null;
        return html`
            <div id="tags-container">
                ${this.tags.map((e, i, arr) => this.renderTag(e, i, arr))}
            </div>
        `
    }

    renderTag(e, i, arr) {
        throw new Error("Not implemented!");
    }
}
