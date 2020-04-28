import { css } from 'lit-element';
import Button from "./src/button.js";

customElements.define('ui-button', class extends Button {
    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    min-height: 36px;
                    background-color: #f0f0f0;
                    color: #000;
                    border-radius: 4px;
                }
                slot {
                    font-family: Roboto;
                    font-weight: 500;
                    fot-size: 16px;
                }
                #button {
                    padding: var(--ui-button-padding);
                    padding-left: var(--ui-button-padding-left, 16px);
                    padding-right: var(--ui-button-padding-right, 16px);
                    padding-top: var(--ui-button-padding-top);
                    padding-bottom: var(--ui-button-padding-bottom);
                }
            `
        ];
    }
});

