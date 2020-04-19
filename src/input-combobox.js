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
                }
				ui-icon[icon="expand-less"],
				ui-icon[icon="expand-more"] {
                    color: #616161;
                    flex-grow: 0;
                    flex-shrink: 0;
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
        this.clickHandler = (e) => this._clickHandler(e);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.clickHandler);
        this.addEventListener('keydown', e => this.keydownHandler(e));   
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
    }

    _clickHandler(e) {
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

