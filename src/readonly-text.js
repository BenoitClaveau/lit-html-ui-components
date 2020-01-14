import { LitElement, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

class ReadonlyText extends LitElement {

    static get properties() {
        return {
            text: String,
            value: Number,
            label: String
        }
    }

    get fieldValue() {
        if (this.value !== undefined) return this.value;
        return this.text;
    }

    render() {
        return html`
            <div
                style="${styleMap({
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "140px",
                    padding: "8px 0",
                })}"
            >
                <div
                    style="${styleMap({
                        fontWeight: "100",
                        color: "var(--accent-color)"
                    })}"
                >${this.label}</div>
                <div
                    style="${styleMap({
                        fontSize: "16px",
                        padding: "6px 0"
                    })}"
                >${this.fieldValue}</div>
            </div>
        `;
    }
}

customElements.define('readonly-text', ReadonlyText);
