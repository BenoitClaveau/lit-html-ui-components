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
                border-radius: 4px;
                background-color: white;
                color: #111
            }
            *:first-child {
                margin-left: 8px;
            }
            *:last-child {
                margin-right: 8px;
            }
            input {
                flex: 1 0 auto;
                width: 166px;   
                height: 36px;
                font-family: Roboto;
                background-color: transparent;
                font-size: 16px;
                font-weight: 500;
                border: none;
                outline: none;
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

    render() {
        return html`
            ${ this.renderInput()}
            ${ this.renderClearButton()}
        `;
    }

    renderInput() {
        const {
            onKeyUp,
            value,
            placeholder,
			type,
			autofocus
        } = this;

        return html`
            <input
                .type="${type}"
				?autofocus="${autofocus}"
                @keyup="${onKeyUp}"
                .value="${value ? value : null}"
                placeholder="${placeholder ? placeholder : ''}"
            />
        `;
    }

    focus() {
        this.shadowRoot.querySelector("input").focus();
    }

    renderClearButton() {
        return html`
            <ui-icon
                icon="close"
                @click="${e => this.clear()}"
            ></ui-icon>
        `;
    }

    onKeyUp(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].value;
        if (value != this.value) { // le text à changé
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
            return;
        }
        if (e.key == "Enter") {
            // ↵ dans l'input. J'envoie un évenement pour pouvoir séléctionner un élement.
            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
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
