import { LitElement, html, css } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            :host {
                background-color: white;
            }
            header {
                display: flex;
                justify-content: flex-end;
            }
            footer {
                display: flex;
                justify-content: flex-end;
            }
            footer > * {
                margin-left: 16px;
                margin-right: 16px;
            }
        `;
    }

    static get properties() {
        return {
            opened: Boolean
        }
    }

    constructor() {
        super();
        this.opened = false;
    }

    resize() {
        if (!this.dialog) return;
        this.dialog.notifyResize();
    }

    render() {
        if (!this.renderBody) throw new Error("renderBody is not defined.");
        return html`
            <paper-dialog 
                id="dialog"
                modal
                @iron-overlay-opened="${this.patchOverlay}"
                @iron-overlay-closed="${this.closeHandler}"
            >${this.renderContent()}</paper-dialog>
        `;
    }

    renderContent() {
        return html`
	        <header>
	            ${ this.renderHeader && this.renderHeader()}
	        </header>
	        <paper-dialog-scrollable>
	            <div style="margin-bottom: 2px;">${this.renderBody()}</div>
	        </paper-dialog-scrollable>
	        <footer>
	            ${ this.renderFooter && this.renderFooter()}
	        </footer>
        `;
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("#dialog");
    }

    updated(changedProps) {
        if (changedProps.has("opened")) {
            this.onVisibleChanged(this.opened, changedProps.get("opened"));
        }
    }

    onVisibleChanged(newValue, oldValue) {
        newValue ? this.dialog.open() : this.dialog.close();
    }

    closeHandler(e) {
        // j'arrete la propagation dans s'il y a plusieurs dialog ouverte.
        // et comme l'evenement close est stoppé. Je supprime moi meme le backDrop.
        e.stopPropagation();
        this.backdropElement.remove();
        this.dispatchEvent(new CustomEvent("close", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    };

    /**
     * bug fix iron-overlay, sometime the overlay is showing over the dialog.
     */
    patchOverlay(e) {
        if (e.target.withBackdrop) {
            this.backdropElement = e.target.backdropElement;
            e.target.parentNode.insertBefore(e.target.backdropElement, e.target);
        }
    }
}