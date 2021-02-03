import { LitElement, html, css } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            dialog {
                background-color: red;
                color: var(--text-color);
                text-align: center;
                border: none;
                border-radius: 4px;
                box-shadow: 0 0 40px rgba(0,0,0,0.1), 0 0 10px rgba(0,0,0,0.25);
            }
              dialog::backdrop {
                background: rgba(0,0,0,.7);
            }
            header {
                display: flex;
                justify-content: flex-end;
            }
            footer {
                display: flex;
                justify-content: space-around;
            }
            section {
                flex-grow: 1;
            }
        `;
    }

    static get properties() {
        return {
            opened: Boolean
        }
    }

    resize() {
        if (!this.dialog) return;
        // this.dialog.notifyResize();
    }

    render() {
        if (this.opened === "") this.opened = true;
        return html`
            <dialog>
                <header>
                    ${ this.renderHeader && this.renderHeader()}
                </header>
                <section>
                    ${ this.renderBody()}
                </section>
                <footer>
                    ${ this.renderFooter && this.renderFooter()}
                </footer>
            </dialog>
        `;
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("dialog");
    }

    updated(changedProps) {
        if (changedProps.has("opened")) {
            this.onVisibleChanged(this.opened, changedProps.get("opened"));
        }
    }

    onVisibleChanged(newValue, oldValue) {
        if (newValue) this.dialog.showModal();
        else {
            this.dialog.close();
            this.dispatchEvent(new CustomEvent("close", {
                bubbles: true,
                composed: true,
                detail: {}
            }));
        }
    }

    // closeHandler(e) {
    //     // j'arrete la propagation dans s'il y a plusieurs dialog ouverte.
    //     // et comme l'evenement close est stoppe. Je supprime moi meme le backDrop.
    //     console.log("8888")
    //     e.stopPropagation();
    //     //this.backdropElement.remove();
    //     // this.dispatchEvent(new CustomEvent("close", {
    //     //     bubbles: true,
    //     //     composed: true,
    //     //     detail: e.detail
    //     // }));
    // };

    // /**
    //  * bug fix iron-overlay, sometime the overlay is showing over the dialog.
    //  */
    // patchOverlay(e) {
    //     if (e.target.withBackdrop) {
    //         this.backdropElement = e.target.backdropElement;
    //         e.target.parentNode.insertBefore(e.target.backdropElement, e.target);
    //     }
    // }
}