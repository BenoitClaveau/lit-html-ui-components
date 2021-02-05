import { css } from 'lit-element';
import Button from "./src/button.js";

customElements.define('ui-button', class extends Button {
    static get styles() {
        return [
            super.styles,
            css`
                #button {
                    min-height: 36px;
                    background-color: #f0f0f0;
                    color: #000;
                    border-radius: 4px;
                    font-family: Roboto;
                    font-weight: 500;
                    font-size: 16px;
                    padding-left: 16px;
                    padding-right: 16px;
                }
            `
        ];
    }
});

