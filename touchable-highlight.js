import { css } from 'lit-element';
import Button from "./src/button.js";

customElements.define('touchable-highlight', class extends Button {
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    background-color: transparent;
                }
                #button{
                    padding: 0;
                }
            `
        ];
    }
});