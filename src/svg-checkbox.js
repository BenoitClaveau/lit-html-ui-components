import { LitElement, html, css, svg } from 'lit-element';
import "../touchable-highlight.js"

export default class SvgCheckbox extends LitElement {

    static get properties() {
        return {
            checked: Boolean
        }
    }

    get isChecked() {
        if (this.checked == "" || this.checked) return true;
        return false;
    }

    render() {
        const {
            isChecked,
        } = this;

        // comme l'icone est petite je bind sur mousedown pour éviter un clique hors zone qui annulerai le clique.
        return html`
            <touchable-highlight
                @mousedown=${e => this.clickHandler()}
            >
                ${isChecked ? this.renderChecked(): this.renderUnchecked() }
            </touchable-highlight>
        `
    }

    
    clickHandler(e) {
        this.dispatchEvent(new CustomEvent("change", {
            bubbles: true,
            composed: true,
            detail: {
                checked: !this.isChecked
            }
        }));
    }
}

