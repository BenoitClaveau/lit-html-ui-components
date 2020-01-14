import { LitElement, html, css } from 'lit-element';
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable";
import "@polymer/paper-button/paper-button.js";
import { styleMap } from 'lit-html/directives/style-map';
import buttonStyles from '../styles/button';

export default class ModalDialog extends LitElement {

    static get styles() {
        return [
            buttonStyles,
            css`
                :host {
                    margin: 0;
                }
                p {
                    font-size: 16px;
                }
                .row {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding: 0 16px;
                    align-items: flex-end;
                    min-height: 34px;
                }
                .row > * {
                    margin: 0 16px;
                }
            `
        ];
    }

    static get properties() {
        return {
            visible: Boolean,
            mode: String,
            dialogStyleMap: Object,
            renderHeader: Function,
            renderBody: Function,
            renderFooter: Function,
        }
    }

    constructor() {
        super();
        this.mode = null;
        this.visible = false;
    }

    renderDefaultFooter() {
        return html`
            <div class="buttons">
                ${ ["confirm", "edit"].some(e => e == this.mode)  ?
                    html`<paper-button dialog-dismiss>Annuler</paper-button>` :
                    null
                }
                <paper-button 
                    dialog-confirm
                    autofocus
                >${ this.mode == "edit" ? "Enregister" : "Continuer" }</paper-button>
            </div>
        `
    }

    render() {
        return html`
            <paper-dialog 
                id="dialog" 
                modal
                style="${this.dialogStyleMap ? styleMap(this.dialogStyleMap) : null}"
                @iron-overlay-opened="${this.patchOverlay}"
            >
                ${ this.visible && this.renderHeader ? 
                        this.renderHeader() : 
                        null 
                }
                <paper-dialog-scrollable>
                    ${ this.visible && this.renderBody ? 
                        this.renderBody() : 
                        null 
                    }
                </paper-dialog-scrollable>
                ${  this.visible && this.renderFooter ? 
                        this.renderFooter() : 
                        this.renderDefaultFooter() 
                }
                
            </paper-dialog>
        `;
    }

    disconnectedCallback() {
        if (this.dialog) this.dialog.removeEventListener('iron-overlay-closed', this.closeHandler);
    }

    firstUpdated() {
        this.dialog = this.shadowRoot.querySelector('#dialog');
        this.dialog.addEventListener('iron-overlay-closed', this.closeHandler);
    }

    updated(changedProps) {
        if (changedProps.has('visible')) {
            this.onVisibleChanged(this.visible, changedProps.get('visible'));
        }
    }

    onVisibleChanged(newValue, oldValue) {
        newValue ? this.dialog.open() : this.dialog.close();
    }

    closeHandler(e) {
        this.dispatchEvent(new CustomEvent('close', {
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

customElements.define('modal-dialog', ModalDialog);