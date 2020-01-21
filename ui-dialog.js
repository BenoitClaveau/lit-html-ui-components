import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import Dialog from "./src/dialog";

/**
 * J'implémente dialog car c'est un composant basique.
 */
customElements.define('ui-dialog', class extends Dialog {

    static get properties() {
        return {
            ...super.properties,
            renderBody: Function,
            renderFooter: Function,
        }
    }
});