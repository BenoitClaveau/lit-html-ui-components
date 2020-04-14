import { LitElement, html, css } from 'lit-element';
import Input from "./src/input";

/**
 * https://codepen.io/_emattiazzi/pen/ZWgWKw
 * https://codepen.io/Takumari85/pen/RaYwpJ
 * 
 * date: https://codepen.io/viitogutierrez/pen/LYVPOeV
*/

customElements.define('ui-input', class extends Input {
    static get styles() {
        return [
            super.styles,
            css`
                input {
                    outline: var(--ui-input-outline, 1px solid var(--accent-color));
                }
            `
        ]
    }
});
