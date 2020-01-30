import { LitElement, html, css } from 'lit-element';
import Autocomplete from "./Autocomplete"

export default class Tags extends Autocomplete {

    static get styles() {
        return [
            super.styles,
            css`
                .tag-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
                .tag-container > * {
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
        const { dropdown } = this;

        return html`
            <div class="container">
                <div id="tags-wrapper">
                    ${ this.renderTags()}
                </div>
                <div id="input-wrapper">
                    ${ this.renderInput()}
                </div>
                <div id="dropdown-wrapper">
                    ${ dropdown && this.items && this.items.length ?
                        this.renderDropdown() :
                        null
                    }
                </div>
            </div>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        const tags = this.shadowRoot.querySelector("#tags-wrapper");
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
        return html`
            <div class="tag-container">
                ${this.tags.map(e => this.renderTag(e))}
            </div>
        `
    }

    renderTag(e) {
        throw new Error("Not implemented!");
    }
}
