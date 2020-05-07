import { LitElement, html, css } from 'lit-element';
import { live } from "lit-html/directives/live.js";

export default class Checkbox extends LitElement {

    static get styles() {
        return css`
            label {
                display: flex;
            }
        `;
    }

    static get properties() {
        return {
            checked: Boolean,
        }
    }

    get isChecked() {
        return this.checked == "" || this.checked == true;
    }

    render() {
        const {
            isChecked,
        } = this;

        return html`
            <label>
                <input 
                    type="checkbox"
                    .checked="${live(isChecked)}"
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
