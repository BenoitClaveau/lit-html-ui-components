import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

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
                    font-size: .8em; 
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
            text: String,
            value: Number,
            label: String
        }
    }

    getValue() {
        if (this.value !== undefined) return this.value;
        return this.text;
    }

    renderValue() {
        return html`
            <div class="value">${this.getValue()}</div>
        `;
    }

    render() {

        const {
            width,
            minWidth,
            maxWidth,
        } = getComputedStyle(this);
        
        // pour surcharger le style de container
        const computedStyle = {
            ...parseInt(width) ? { width } : {},
            ...parseInt(minWidth) ? { minWidth } : {},
            ...parseInt(maxWidth) ? { maxWidth } : {},
        };

        return html`
            <div class="container" style="${styleMap(computedStyle)}">
                <div class="label">${this.label}</div>
                ${this.renderValue()}
            </div>
        `;
    }
}
