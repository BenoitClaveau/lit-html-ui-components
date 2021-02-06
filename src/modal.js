import { LitElement, html, css } from "lit-element";
// https://github.com/GoogleChrome/dialog-polyfill
import dialogPolyfill from "dialog-polyfill";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            dialog {
                border: none;
                border-radius: 4px;
                box-shadow: 0 0 40px rgba(0,0,0,0.1), 0 0 10px rgba(0,0,0,0.25);
            }
            dialog::backdrop { /* native */
                background: rgba(0,0,0,.7);
            }
            dialog + .backdrop { /* polyfill */
                background: rgba(0,0,0,.7);
            }
        `;
    }

    static get properties() {
        return {
            open: Boolean
        }
    }

    renderContent() {
        return null;
    }

    render() {
        console.log("RENDER DIALOG")
        if (this.open === "") this.open = true;
        return html`
            <dialog .open=${this.open}>
                ${ this.renderContent() }
            </dialog>
        `;
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("dialog");
        dialogPolyfill.registerDialog(this.dialog);
    }

    showModal() {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.dialog.showModal();
        });
    }

    close(data) {
        this.dialog.close();
        if (this.resolve) this.resolve(data);
        this.resolve = null;
    }
}