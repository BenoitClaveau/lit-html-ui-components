import { LitElement, html, css } from "lit-element";
import "../ui-button.js";
import { close as svgClose } from "../src/icons";

customElements.define("ui-demo", class extends LitElement {
    
    static get styles() {
        return css`
            ui-button {
                margin: 8px;
            }
        `;
    }

    render() {
        return html`
            <ui-button>BUTTON</ui-button>
            <ui-button>BUTTON ${svgClose()}</ui-button>
        `;
    }
});