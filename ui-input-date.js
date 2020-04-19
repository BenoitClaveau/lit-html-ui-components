import { html, css } from "lit-element";
import InputDate from "./src/input-date.js";

/**
 * https://stackoverflow.com/questions/14946091/are-there-any-style-options-for-the-html5-date-picker
 */
customElements.define("ui-input-date", class extends InputDate {

    static get styles() {
        return [
            super.styles,
            css`
                input::-webkit-calendar-picker-indicator { 
                    color: #777; 
                }
                input::-webkit-clear-button { 
                    font-size: 18px;
                    fill: #777; 
                } 
                input::-webkit-inner-spin-button { 
                    margin-top: 6px; 
                    color: #777; 
                }
              `
        ];
    }
});
