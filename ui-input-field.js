import { html, css } from "lit-element";
import Field from "./src/field.js";
import "./ui-input.js";

customElements.define("ui-input-field", class extends Field {

    static get styles() {
        return [
            super.styles,
            css`
               ui-input {
                    --ui-input-outline: none;
               }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            placeholder: String,
            type: String,
			autofocus: Boolean
        }
    }

    renderValue() {
        return html`
            <ui-input
                .placeholder=${this.placeholder}
                .value=${this.value}
                .type=${this.type}
                ?autofocus=${this.autofocus}
            ></ui-input>
        `;
    }
});
