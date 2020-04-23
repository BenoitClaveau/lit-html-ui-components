import { LitElement, html, css } from 'lit-element';
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
                display: flex;
                flex-direction: row;
                align-items: center;
                box-sizing: box-content;
                border-radius: 4px;
                background-color: white;
                color: #111;
                height: 36px;

                font-family: Roboto;
                font-weight: 500;
                font-size: 16px;
            }
            *:first-child {
                margin-left: 8px;
            }
            *:last-child {
                margin-right: 8px;
            }
            input {
                flex-grow: 1;
                border: none;
                outline: none;
                background-color: transparent;

                width: 100%;
                height: 100%;
                font-family: inherit;
                font-weight: inherit;
                font-size: inherit;
            }
            input::placeholder {
                font-weight: 400;
            }
			ui-icon[icon="close"] {
                flex-grow: 0;
                flex-shrink: 0;
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
                .value="${value ? value : null}"
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
            // j'annule l'event car je ne veux d'entrée.
            // cela sera géré par contenteditable
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true,
                detail: { }
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
