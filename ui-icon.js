import { LitElement, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import "./src/iconset";

export default class UiIcon extends LitElement {

    /**
     * 
     * `--iron-icon` | Mixin applied to the icon | {}
     * `--iron-icon-width` | Width of the icon | `24px`
     * `--iron-icon-height` | Height of the icon | `24px`
     * `--iron-icon-fill-color` | Fill color of the svg icon | `currentcolor`
     * `--iron-icon-stroke-color` | Stroke color of the svg icon | none
     */

    static get properties() {
        return {
            icon: String,
            title: String,
            width: String,
            height: String,
            fillColor: String,
            strokeColor: String,
        }
    }

    constructor() {
        super();
        this.width = this.height = "24px";
        this.fillColor = "currentcolor";
        this.strokeColor = "none";
    }

    render() {
        return html`
            <iron-icon
                style="${styleMap({
                    "--iron-icon-width": this.width,
                    "--iron-icon-height": this.height,
                    "--iron-icon-fill-color": this.fillColor,
                    "--iron-icon-stroke-color": this.strokeColor,
                })}"
                icon="${this.icon}"
                title="${this.title || this.icon}"
            ></iron-icon>
        `;
    }
}

customElements.define('ui-icon', UiIcon);
