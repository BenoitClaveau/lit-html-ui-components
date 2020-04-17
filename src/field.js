import { LitElement, html, css } from 'lit-element';

export default class Field extends LitElement {

    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    min-width: 140px;
                }
                .label {
                    font-size: 0.8em; 
                    font-weight: 400;
                    color: var(--accent-color);
                }
                .value {
                    min-height: 1.4em;
                    border-bottom: 2px solid #e8e6e6;
                }
            `
        ];
    }

    static get properties() {
        return {
            value: Object,
            label: String
        }
    }

    getValue() {
        return this.value;
    }

    renderValue() {
        return html`
            <div class="value">${this.getValue()}</div>
        `;
    }

    render() {
        return html`
            <div class="label">${this.label}</div>
            ${this.renderValue()}
        `;
    }
}
