import { LitElement, html, css } from 'lit-element';
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import Modal from "./modal.js";
import "../ui-icon.js";

export default class Dialog extends Modal {

    static get styles() {
        return [
            super.styles,
            css`
                ui-icon[icon="close"] {
                    width: 24px;
                    height: 24px;
                }
            `
        ];
    }

    renderHeader() {
        return html`
            ${this.renderTitle()}
            <ui-icon
                icon="close"
                @click="${e => this.opened = false}"
            ></ui-icon>
        `;
    }

    renderTitle() {
        return null;
    }
}