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
        let {
            width, height, fillColor, strokeColor
        } = window.getComputedStyle(this);
        if (width === "0px" || width === "auto") width = "24px";
        if (height === "0px" || height === "auto") height = "24px";
        if (!fillColor) fillColor = "currentcolor";
        if (!strokeColor) strokeColor = "none";
        return html`
            <iron-icon
                style="${styleMap({
                    "--width": width,
                    "--height": height,
                    "--fill-color": fillColor,
                    "--stroke-color": strokeColor
                })}"
                icon="${this.icon}"
                title="${this.title || this.icon}"
            ></iron-icon>
        `;
    }
}

customElements.define('ui-icon', UiIcon);
