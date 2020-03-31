import { LitElement, html, css } from "lit-element";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import { styleMap } from "lit-html/directives/style-map.js";

export default class Modal extends LitElement {

    static get styles() {
        return css`
            :host {
                background-color: white;
            }
            paper-dialog {
                
            }
            paper-dialog > * {
                margin: 0;
                padding: 0;
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

        const {
            height, minHeight, maxHeight,
            width, minWidth, maxWidth,
            backgroundColor,
        } = getComputedStyle(this);

        const paperDialogStyleMap = {
            height, minHeight, maxHeight,
            width, minWidth, maxWidth,
            backgroundColor, 
        };
        
        return html`
            <paper-dialog 
                style="${styleMap(paperDialogStyleMap)}"
                modal
                @iron-overlay-opened="${this.patchOverlay}"
                @iron-overlay-closed="${this.closeHandler}"
            >
                <header>
                    ${ this.opened && this.renderHeader && this.renderHeader()}
                </header>
                <paper-dialog-scrollable>
                    <div id="body">${this.opened && this.renderBody()}</div>
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
        // Important pour un re-render.
        this.body = this.dialog.querySelector("#body");

        const ro = new ResizeObserver(async entries => {
            await this.updateScrollableHeight();
        });
        ro.observe(this.body);
    }

    shouldUpdate(changedProps) {
        const res = super.shouldUpdate();
        if (changedProps.has("opened") && this.opened && this.dialog) {
            // je cache en attendant le chargement de la dialog
            this.dialog.style.visibility = "hidden";
        }
        return res;
    }

    updated(changedProps) {
        if (changedProps.has("opened")) {
            this.onVisibleChanged(this.opened, changedProps.get("opened"));
        }
    }

    async updateScrollableHeight() {
        
        const { y: dialogTop, height: dialogHeight } = this.dialog.getBoundingClientRect();
        const { height: headerHeight } = this.header.getBoundingClientRect();
        const { height: footerHeight } = this.footer.getBoundingClientRect();
        
        const computedStyle = window.getComputedStyle(this.scrollable);
        const headerFooterHeight = headerHeight + footerHeight + parseFloat(computedStyle.getPropertyValue("padding-top")) + parseFloat(computedStyle.getPropertyValue("padding-bottom"));
        const maxAvailableScrollHeight = window.innerHeight - dialogTop - headerFooterHeight;
        // ja calcul la hauteur disponible
        const availableScrollHeight = dialogHeight - headerFooterHeight;

        this.scrollable.scrollTarget.style.maxHeight = availableScrollHeight + "px";
        this.scrollable.scrollTarget.style.height = availableScrollHeight + "px";

        this.dialog.notifyResize();
        this.dialog.style.visibility = "visible";
    }

    onVisibleChanged(newValue, oldValue) {
        newValue ? this.dialog.open() : this.dialog.close();
    }

    closeHandler(e) {
        // j'arrete la propagation dans s'il y a plusieurs dialog ouverte.
        // et comme l'evenement close est stoppe. Je supprime moi meme le backDrop.
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