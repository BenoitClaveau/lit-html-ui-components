import { LitElement, html, css } from 'lit-element';
import { live } from "lit-html/directives/live.js";

export default class Checkbox extends LitElement {

    static get styles() {
        return css`
            host: {
                display: inline-flex;

                font-family: Roboto;
                font-weight: 500;
                font-size: 16px;
            }
        `;
    }

    static get properties() {
        return {
            checked: Boolean,
            disabled: Boolean
        }
    }

    get isChecked() {
        return this.checked == "" || this.checked == true;
    }

    get isDisabled() {
        return this.disabled == "" || this.disabled == true;
    }

    render() {
        const {
            isChecked,
            isDisabled
        } = this;

        return html`
            <label>
                <input 
                    type="checkbox"
                    .checked="${live(isChecked)}"
                    .disabled="${isDisabled}"
                    @change=${e => this.changeHandler(e)}
                >
                ${ this.renderLabel() }
            </label>
        `;
    }

    renderLabel() {
        return html`<slot></slot>`;
    }

    changeHandler(e) {
        e.stopPropagation();
        const path = e.path || (e.composedPath && e.composedPath());
        this.dispatchEvent(new CustomEvent("change", {
            bubbles: true,
            composed: true,
            detail: {
                checked: path[0].checked
            }
        }));
    }
}
