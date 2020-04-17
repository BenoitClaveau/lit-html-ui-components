import { LitElement, html, css } from 'lit-element';
import Input from "./src/input.js";

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
                :host {
                    background-color: var(--ui-input-background-color);
                    color: var(--ui-input-color);

                }
                :host(:host:focus-within) {
                    box-shadow: 0 0 0 1px var(--accent-color);
                }
            `
        ]
    }
});
