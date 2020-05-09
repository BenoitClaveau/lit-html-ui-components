import { css } from 'lit-element';
import Dialog from "./src/dialog.js";

/**
 * J'implémente dialog car c'est un composant basique.
 */
customElements.define('ui-dialog', class extends Dialog {

    static get styles() {
        return [
            super.styles,
            css`
                #dialog {
                    width: var(--width);
                    height: var(--height);
                    min-width: var(--min-width, 200px);
                    max-width: var(--max-width, 100vw);
                    min-height: var(--min-height, 140px);
                    max-height: var(--max-height, 100vh);
                }
				paper-dialog-scrollable {
                    height: calc(100% - 148px);
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