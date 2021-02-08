import { LitElement, html, css } from "lit-element";
import "./ui-input.js";

customElements.define("ui-label", class extends LitElement {

    static get styles() {
        return css`
            label {
            }
        `;
    }

    static get properties() {
        return {
            label: String
        }
    }

    render() {
        return html`
            <label>
                ${this.label}
                <slot></slot>
            </label>
        `;
    }
});
