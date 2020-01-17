import { LitElement, html, css } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable";
import { styleMap } from "lit-html/directives/style-map";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            paper-dialog {
                background-color: white;
            }
        `;
    }

    static get properties() {
        return {
            opened: Boolean,
            width: String,
            height: String
        }
    }

    constructor() {
        super();
        this.opened = false;
    }

    render() {
        if (!this.renderBody) throw new Error("renderBody is not defined.");

        return html`
            <paper-dialog 
                style="${styleMap({
            width: this.width,
            height: this.height
        })}"
                modal
                @iron-overlay-opened="${this.patchOverlay}"
                @iron-overlay-closed="${this.closeHandler}"
            >
                <header>
                    ${ this.renderHeader && this.renderHeader()}
                </header>
                <paper-dialog-scrollable>
                    ${ this.renderBody()}
                </paper-dialog-scrollable>
                <footer>
                    ${ this.renderFooter && this.renderFooter()}
                </footer>
            </paper-dialog>
        `;
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("paper-dialog");
        this.header = this.dialog.querySelector("header");
        this.scrollable = this.dialog.querySelector("paper-dialog-scrollable");
        this.footer = this.dialog.querySelector("footer");
    }

    updated(changedProps) {
        console.log("updated")
        if (changedProps.has("opened")) {
            this.onVisibleChanged(this.opened, changedProps.get("opened"));

            if (this.opened) {
                window.requestAnimationFrame(() => {
    
                    const dialogHeight = parseFloat(window.getComputedStyle(this.dialog).getPropertyValue("height"));
                    const { height: headerHeight } = this.header.getBoundingClientRect();
                    const { height: footerHeight } = this.footer.getBoundingClientRect();

                    //this.scrollable.scrollTarget.style.overflow = "scroll";

                    this.scrollable.scrollTarget.style.maxHeight = this.scrollable.scrollTarget.style.height = (dialogHeight - headerHeight - footerHeight) + "px";

                    //this.requestUpdate();
                });
            }
        }


    }

    onVisibleChanged(newValue, oldValue) {
        newValue ? this.dialog.open() : this.dialog.close();
    }

    closeHandler(e) {
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
            e.target.parentNode.insertBefore(e.target.backdropElement, e.target);
        }
    }

}