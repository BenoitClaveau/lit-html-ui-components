import { LitElement, html, css } from 'lit-element';

export default class Field extends LitElement {

    static get styles() {
        return [
            css`
                .container {
                    display: flex;
                    flex-direction: column;
                    min-width: 140px;
                    padding: 8px 0;
                    
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
                    padding: 6px 0;
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
