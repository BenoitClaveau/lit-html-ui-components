import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import "./src/iconset.js";

export default class UiIcon extends LitElement {

    static get properties() {
        return {
            icon: String,
            title: String,
        }
    }

    render() {
        const {
            width, height, fillColor, strokeColor
        } = window.getComputedStyle(this);
        return html`
            <iron-icon
                style="${styleMap({
                    "--iron-icon-width": width === "0px" ? "18px" : width,
                    "--iron-icon-height": height === "0px" ? "18px" : height,
                    "--iron-icon-fill-color": fillColor || "currentcolor",
                    "--iron-icon-stroke-color": strokeColor || "none",
                })}"
                icon="${this.icon}"
                title="${this.title || this.icon}"
            ></iron-icon>
        `;
    }
}

customElements.define('ui-icon', UiIcon);
