import { LitElement, html, css } from 'lit-element';

export default class Field extends LitElement {

    static get styles() {
        return [
            css`
                .container {
                    display: flex;
                    flex-direction: column;
                    min-width: 140px;
                }
                .label {
                    font-weight: 100;
                    color: var(--accent-color);
                }
                .label {
                    font-weight: 100;
                    color: var(--accent-color);
                }
                .value {
                    font-size: 16px;
                    border-bottom: 2px solid #e8e6e6;
                    min-height: 24px;
                }
            `
        ];
    }

    static get properties() {
        return {
            text: String,
            value: Number,
            label: String
        }
    }

    getValue() {
        if (this.value !== undefined) return this.value;
        return this.text;
    }

    render() {
        return html`
            <div class="container">
                <div class="label">${this.label}</div>
                <div class="value">${this.getValue()}</div>
            </div>
        `;
    }
}
