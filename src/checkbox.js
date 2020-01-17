import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

const guid = () => {
    const s4 = ()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}

export default class Checkbox extends LitElement {

    static get styles() {
        return css`
            :host {
                --label-color: #eee;
            }
            .container {
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
            name: String,
            id: String,
        }
    }

    render() {
        return html`
            <div class="container">
                ${ this.renderContent() }
            </div>
        `;
    }

    renderContent() {
        const {
            checked,
            onChange,
            name,
        } = this;

        const id = this.id || `${guid()}`

        return html`
            <input 
                type="checkbox"
                id="${id}" 
                name="${name}" 
                ?checked=${checked}
                @change=${onChange}
            >
            <label for="${id}">
                ${ this.renderLabel() }
            </label>
        `;
    }

    renderLabel() {
        return html`<slot></slot>`;
    }

    onChange(e) {
        this.dispatchEvent(new CustomEvent('checkbox-change', {
            bubbles: true,
            composed: true,
            detail: { 
                checked: e.target.checked
            }
        }));
    }
}
