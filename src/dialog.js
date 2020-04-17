import { LitElement, html, css } from 'lit-element';
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import Modal from "./modal.js";
import "../ui-icon.js";

export default class Dialog extends Modal {

    renderHeader() {
        return html`
            ${this.renderTitle()}
            <ui-icon
                icon="close"
                height="24px"
                width="24px"
                @click="${e => this.opened = false}"
            ></ui-icon>
        `;
    }

    renderTitle() {
        return null;
    }
}