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
                paper-dialog {
                    margin: 0;
                    padding: 0;
                }
                paper-dialog > * {
                    margin: 0;
                    padding: 0;
                }
                header {
                    display: flex;
                    flex-direction: row;
                    padding: 8px;
                    margin: 0;
                    justify-content: space-between;
                }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            renderBody: Function,
            renderFooter: Function,
        }
    }

    renderHeader() {
        return html`
            <div>
                ${this.renderTitle()}
            </div>
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