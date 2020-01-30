import { LitElement, html, css } from 'lit-element';
import "../ui-dialog";

export default class ButtonDialog extends LitElement {

    static get properties() {
        return {
            opened: Boolean,
            dialogWidth: String,
            dialogHeight: String,
        }
    }

    constructor() {
        super();
        this.dialogWidth = "95vw";
        this.dialogHeight = "95vh";
    }

    render() {
        return html`
            <div id="button">
                ${ this.renderButton()}
            </div>
            ${ this.renderDialog()}
        `;
    }

    firstUpdated() {
        const button = this.shadowRoot.querySelector("#button");
        button.addEventListener('click', e => this.onButtonClick(e));   
    }

    renderButton() {
        throw new Error("Not implemented!");
    }

    renderDialog() {
        return html`
            <ui-dialog
                width=${this.dialogWidth}
                height=${this.dialogHeight}
                .opened=${this.opened}
                .renderBody=${() => this.renderDialogBody()}
                .renderFooter=${() => this.renderDialogFooter()}
                @close=${e => this.onDialogClose(e)}
            ></ui-dialog>
        `
    }

    onDialogClose(e) {
        e.stopPropagation();
        this.opened = false;
    }

    onButtonClick(e) {
        e.stopPropagation();
        this.opened = true;
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