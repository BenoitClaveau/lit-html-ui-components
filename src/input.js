import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import "../ui-icon";

export default class Input extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
            }
            .container {
                border-radius: 4px;
                background-color: white;
                color: #111
            }
            .container > *:first-child {
                margin-left: 8px;
            }
            .container > *:last-child {
                margin-right: 8px;
            }
            input {
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
        `;
    }

    static get properties() {
        return {
            placeholder: String,
            value: String,
        }
    }

    render() {
        return html`
            <div class="container">
                ${ this.renderInput()}
                ${ this.renderClearButton()}
            </div>
        `;
    }

    renderInput() {
        const {
            onKeyUp,
            value,
            placeholder
        } = this;

        return html`
            <input
                type="text"
                @keyup="${onKeyUp}"
                .value="${value ? value : null}" // pour éviter d'afficher 'undefined'
                placeholder="${placeholder ? placeholder : ''}"
            />
        `;
    }

    renderClearButton() {
        return html`
            <ui-icon
                icon="close"
                height="18px"
                width="18px"
                @tap="${e => this.clear()}"
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
