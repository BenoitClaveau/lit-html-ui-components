import { LitElement, html, css } from 'lit-element';
import { live } from "lit-html/directives/live.js";
import "../ui-icon.js";
/**
 * events:
 * - change (value: text)
 * - submit (value: text)
 * - clear
 * 
 * methods to be defined:
 * - value (string)
 * - placeholder* (string
 */
export default class Input extends LitElement {

    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 1fr 24px;
                grid-template-rows: 36px;
                outline: none;

                border-radius: 4px;
                -moz-outline-radius: 4px;

                background-color: white;
                color: #111;
                
                font-family: Roboto;
                font-weight: 500;
                font-size: 16px;
            }
            :host(:host:focus-within) {
                outline: 1px solid var(--accent-color);
            }
            *:first-child {
                margin-left: 8px;
            }
            *:last-child {
                margin-right: 8px;
            }
            input {
                flex-grow: 1;
                box-sizing: border-box;

                min-width: 32px;

                border: none;
                outline: none;
                background-color: transparent;

                font-family: inherit;
                font-weight: inherit;
            }
            input::placeholder {
                font-weight: 400;
            }
			ui-icon[icon="close"] {
                color: #616161;
			}
        `;
    }

    static get properties() {
        return {
            placeholder: String,
            value: String,
			type: String,
			autofocus: Boolean
        }
    }

	constructor() {
		super();
		this.type = "text";
    }
    
    createRenderRoot() {
        // je délégue la gestion du focus à L'enfant.
        return this.attachShadow({ mode: "open", delegatesFocus: true });
    }

    render() {
        return html`
            ${ this.renderInput()}
            ${ this.renderClearButton()}
        `;
    }

    getValue() {
        return this.value;
    }

    renderInput() {
        const {
            placeholder,
			type,
			autofocus
        } = this;

        const value = this.getValue();

        return html`
            <input
                .type="${type}"
				?autofocus="${autofocus}"
                @keypress=${e => this.keypressHandler(e)}
                @keyup=${e => this.keyupHandler(e)}
                .value="${live(value ? value : null)}"
                placeholder="${placeholder ? placeholder : ''}"
            />
        `;
    }

    renderClearButton() {
        return html`
            <ui-icon
                icon="close"
                @click="${e => this.clear()}"
            ></ui-icon>
        `;
    }

    keypressHandler(e) {
        if (e.key == "Enter") {
            const path = e.path || (e.composedPath && e.composedPath());
            const { value } = path[0];
            // j'annule l'event car je ne veux d'entrée.
            // cela sera géré par contenteditable
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true,
                detail: { 
                    value
                }
            }));
        }
    }

    keyupHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const { value } = path[0];
        if (value != this.value) { // le text à changé
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
            return;
        }
    };

    clear() {
        this.dispatchEvent(new CustomEvent('clear', {
            bubbles: true,
            composed: true,
            detail: {}
        }));
    }
}
