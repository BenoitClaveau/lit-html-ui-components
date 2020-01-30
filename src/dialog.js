import { LitElement, html, css } from 'lit-element';
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable";
import { styleMap } from 'lit-html/directives/style-map';
import Modal from "./modal";
import "../ui-icon";

export default class Dialog extends Modal {

    static get styles() {
        return [
            super.styles,
            css`
                header {
                    display: flex;
                    flex-direction: row;
                    padding: 8px;
                    margin: 0;
                    justify-content: space-between;
                    align-items: center;
                }
                footer {
                    margin: 0;
                    padding: 0;

                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }
                footer > * {
                    margin: 8px;
                }
                footer > *:last-child {
                    margin-right: 24px;
                }
            `
        ];
    }

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