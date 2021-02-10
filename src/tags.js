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
                #tags {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                #tags > * {
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

    initInputValue() {
        this.inputValue = "";
        this.debounceFetch(new CustomEvent("init", {
            bubbles: true,
            composed: true,
            detail: { value: null }
        }));
    }

    render() {
        return html`
            ${ this.renderTags() }
            ${ super.render() }
        `;
    }

    remove(tag) {
        this.dispatchEvent(new CustomEvent("remove", {
            bubbles: true,
            composed: true,
            detail: {
                item: tag
            }
        }));
    }

    renderTags() {
        if (!this.tags) return null;
        return html`
            <div 
                clas="tags"
                @remove=${e => this.opened = false}
            >${this.tags.map((e, i, arr) => this.renderTag(e, i, arr))}</div>
        `
    }

    renderTag(e, i, arr) {
        throw new Error("Not implemented!");
    }
}
