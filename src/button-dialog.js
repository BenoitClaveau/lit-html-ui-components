import { LitElement, html, css } from 'lit-element';
import "../ui-dialog.js";
import "../ui-button.js";

export default class ButtonDialog extends LitElement {

    static get styles() {
        return [
            css`
                ui-dialog {
                    --ui-dialog-width: 95vw;
                    --ui-dialog-height: 95vh;
                }
            `
        ];
    }

    static get properties() {
        return {
            opened: Boolean
        }
    }

    renderButton() {
        throw new Error("Not implemented!")
    }

    render() {
        return html`
            ${ this.renderButton() }
            ${ this.renderDialog() }
        `;
    }

    renderDialog() {
        return html`
            <ui-dialog
                .opened=${this.opened}
                .renderBody=${() => this.renderDialogBody()}
                .renderFooter=${() => this.renderDialogFooter()}
                @close=${e => this.onDialogClose(e)}
            ></ui-dialog>
        `
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("ui-dialog");
    }

    onDialogClose(e) {
        this.opened = false;
    }

    renderDialogBody() {
        throw new Error("Not implemented!");
    }

    /**
     * optionel
     */
    renderDialogFooter() {
        return null;
    }
}