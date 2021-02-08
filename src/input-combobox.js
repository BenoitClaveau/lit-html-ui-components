import { LitElement, html, css } from 'lit-element';
import Input from './input.js';
import {
    expandLess as svgExpandLess,
    expandMore as svgExpandMore
} from "./icons";

/**
 * Input + icon dropdown
 */
export default class InputCombobox extends Input {

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    grid-template-columns: 1fr 24px 24px;
                }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            dropdown: Boolean
        }
    }

    render() {
        return html`
            ${this.renderInput()}
            ${this.renderClearButton()}
            ${this.renderDropdownButton()}
        `;
    }

    renderDropdownButton() {
        if (this.dropdown)
            return html`
                <touchable-highlight 
                    @click=${e => this.toggle(e)}
                >${svgExpandLess()}</touchable-highlight>`;

        return html`
            <touchable-highlight 
                @click=${e => this.toggle(e)}
            >${svgExpandMore()}</touchable-highlight>`;
    }

    toggle(e) {
        if (e) e.stopPropagation();
        this.dispatchEvent(new CustomEvent(this.dropdown ? "close" : "open", {
            bubbles: true,
            composed: true,
            detail: null
        }));
    };
}

