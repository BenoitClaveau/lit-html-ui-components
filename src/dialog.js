import { LitElement, html, css } from 'lit-element';
import Modal from "./modal.js";
import "../touchable-highlight.js";
import { close as svgClose } from "./icons";

export default class Dialog extends Modal {

    static get styles() {
        return [
            super.styles
        ];
    }

    renderHeader() {
        return html`
            ${this.renderTitle()}
            <touchable-highlight
                @click="${e => this.opened = false}"
            >${svgClose()}</touchable-highlight>
        `;
    }

    renderTitle() {
        return null;
    }
}