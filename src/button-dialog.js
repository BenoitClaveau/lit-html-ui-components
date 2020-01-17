import { LitElement, html, css } from 'lit-element';
import "../ui-dialog";

export default class ButtonDialog extends LitElement {

    static get properties() {
        return {
            opened: Boolean
        }
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
                width="90vw"
                height="90vh"
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

    onButtonClick(e) {
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