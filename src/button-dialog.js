import { LitElement, html, css } from 'lit-element';
import "../ui-dialog.js";
import "../ui-button.js";

export default class ButtonDialog extends LitElement {

    static get styles() {
        return [
            css`
                #dialog {
                    width: 95vw;
                    height: 95vh;
                }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
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
                id="dialog"
                .opened=${this.opened}
                .renderBody=${() => this.renderDialogBody()}
                .renderFooter=${() => this.renderDialogFooter()}
                @close=${e => this.onDialogClose(e)}
            ></ui-dialog>
        `
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