import { LitElement, html, css } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable";
import { styleMap } from "lit-html/directives/style-map";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            paper-dialog {
                margin: 0;
                padding: 0;
                background-color: white;
            }
            paper-dialog > * {
                margin: 0;
                padding: 0;
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
        this.resizeHandler = (e) => this._resizeHandler(e);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this.resizeHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.resizeHandler);
    }

    _resizeHandler(e) {
        if (!this.dialog) return;
        this.updateScrollableHeight();
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
                    ${ this.opened && this.renderHeader && this.renderHeader()}
                </header>
                <paper-dialog-scrollable>
                    ${ this.opened && this.renderBody()}
                </paper-dialog-scrollable>
                <footer>
                    ${ this.opened && this.renderFooter && this.renderFooter()}
                </footer>
            </paper-dialog>
        `;
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector("paper-dialog");
        this.header = this.dialog.querySelector("header");
        this.scrollable = this.dialog.querySelector("paper-dialog-scrollable");
        this.footer = this.dialog.querySelector("footer");

        const ro = new ResizeObserver(entries => {
            this.updateScrollableHeight();
        });

        ro.observe(this.scrollable.scrollTarget);
    }

    updateScrollableHeight() {
        const { y: dialogTop } = this.dialog.getBoundingClientRect();
        const { height: headerHeight } = this.header.getBoundingClientRect();
        const { height: footerHeight } = this.footer.getBoundingClientRect();
        const { scrollHeight } = this.scrollable.scrollTarget;
        const computedStyle = window.getComputedStyle(this.scrollable);
        const availableScrollHeight = window.innerHeight - dialogTop - headerHeight - footerHeight - parseFloat(computedStyle.getPropertyValue("padding-top")) - parseFloat(computedStyle.getPropertyValue("padding-bottom"));
        if (scrollHeight > availableScrollHeight) {
            this.scrollable.scrollTarget.style.maxHeight = availableScrollHeight + "px";
            this.scrollable.scrollTarget.style.height = availableScrollHeight + "px";
        }
        else {
            this.scrollable.scrollTarget.style.maxHeight = scrollHeight + "px";
            this.scrollable.scrollTarget.style.height = scrollHeight + "px";
            
        }
        this.dialog.notifyResize();
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
        // j'arrête la propagation dans s'il y a plusieurs dialog ouverte.
        // et comme le close est stoppé. Je supprime moi même le backDrop.
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