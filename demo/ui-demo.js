import { LitElement, html, css } from "lit-element";
import "../ui-button.js";
import "../ui-checkbox.js";
import "../ui-readonly-field.js";
import "../ui-input-field.js";
import "../ui-input-date.js";
import { close as svgClose } from "../src/icons";

customElements.define("ui-demo", class extends LitElement {
    
    static get styles() {
        return css`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 16px;
            }
        `;
    }

    render() {
        return html`
            <div class="grid">
                <ui-button>BUTTON</ui-button>
                <ui-button>BUTTON ${svgClose()}</ui-button>
                <ui-checkbox>CHECKBOX</ui-checkbox>
                <ui-readonly-field
                    placeholder="placeholder"
                    label="label"
                    value="value"
                ></ui-readonly-field>
                <ui-input-field
                    placeholder="placeholder"
                    label="label"
                    value="value"
                ></ui-input-field>

                <ui-input-date
                    placeholder="placeholder"
                    label="label"
                    value="value"
                ></ui-input-date>
            </div>
        `;
    }
});