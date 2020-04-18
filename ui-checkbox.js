import { css } from 'lit-element';
import Checkbox from "./src/checkbox.js";

customElements.define('ui-checkbox', class extends Checkbox {
    static get styles() {
        return css`
            slot {
                font-family: Roboto;
                font-weight: 400;
            }
        `;
    }
});