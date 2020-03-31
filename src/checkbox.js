import { LitElement, html, css } from 'lit-element';

export default class Checkbox extends LitElement {

    static get styles() {
        return css`
            :host {
                --label-color: #eee;
            }
            slot {
                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
                color: var(--label-color);
            }
        `;
    }

    static get properties() {
        return {
            checked: Boolean,
        }
    }

    render() {
        const {
            checked,
        } = this;

        return html`
            <label>
                <input 
                    type="checkbox"
                    ?checked=${checked}
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
