import { LitElement, html, css } from 'lit-element';
import "./iconset.js";
import "../ui-icon.js";
import Input from './input.js';

/**
 * Input + ui-icon dropdown
 */
export default class InputCombobox extends Input {

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    background-color: #f0f0f0;
                    color: #111;
                    grid-template-columns: 1fr 24px 24px;
                }
				ui-icon[icon="expand-less"],
				ui-icon[icon="expand-more"] {
                    color: #616161;
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

    constructor() {
        super();
        this.outsideHandler = (e) => this._outsideClickHandler(e);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('mousedown', this.outsideHandler);
        this.addEventListener('keydown', e => this.keydownHandler(e));   
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mousedown', this.outsideHandler);
    }

    _outsideClickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (inside && this.dropdown) {
            this.toggle();
        }
    }

    render() {
        return html`
            ${ this.renderInput() }
            ${ this.renderClearButton() }
            ${ this.renderDropdownButton() }
        `;
    }

    renderDropdownButton() {
        return html`
            <ui-icon
                icon="${this.dropdown ? "expand-less" : "expand-more"}"
                @click="${e => this.toggle(e)}"
            ></ui-icon>
        `;
    }

    toggle(e) {
        if (e) e.stopPropagation();
        this.dispatchEvent(new CustomEvent(this.dropdown ? "close" : "open", {
            bubbles: true,
            composed: true,
            detail: null
        }));
    };

    keydownHandler(e) {
        if (e.key == "Escape" && this.dropdown) {
            this.dispatchEvent(new CustomEvent("close", {
                bubbles: true,
                composed: true,
                detail: null
            }));
        }
    }
}

