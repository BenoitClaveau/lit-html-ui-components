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
                    background-color: #f1f1f1;
                }
            `
        ]
    }
});
