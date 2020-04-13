import { css } from 'lit-element';
import Dialog from "./src/dialog";

/**
 * J'implémente dialog car c'est un composant basique.
 */
customElements.define('ui-dialog', class extends Dialog {

    static get styles() {
        return [
            super.styles,
            css`
                #dialog {
                    width: var(--ui-dialog-width);
                    height: var(--ui-dialog-height);
                    min-width: var(--ui-dialog-min-width);
                    max-width: var(--ui-dialog-max-width);
                    min-height: var(--ui-dialog-min-height);
                    max-height: var(--ui-dialog-max-height);
                }
                paper-dialog-scrollable {
                    height: calc(100% - 92px);
                }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            renderBody: Function,
            renderFooter: Function,
        }
    }

    firstUpdated() {
        super.firstUpdated();
        this.scrollable = this.dialog.querySelector("paper-dialog-scrollable");
        this.scrollable.scrollTarget.style.maxHeight = `100%`;
    }
});