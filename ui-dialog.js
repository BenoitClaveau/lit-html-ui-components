import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import Dialog from "./src/dialog";

/**
 * J'implémente dialog car c'est un composant basique.
 */
customElements.define('ui-dialog', class extends Dialog {

    static get styles() {
        return [
            super.styles,
            css`
                paper-dialog {
                    margin: 0;
                    padding: 0;
                }
                paper-dialog > * {
                    margin: 0;
                    padding: 0;
                }
                header {
                    margin: 0;
                    padding: 8px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                footer {
                    margin: 0;
                    padding: 0;

                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                }
                footer > * {
                    margin: 8px;
                }
                footer > *:last-child {
                    margin-right: 24px;
                }
            `
        ];
    }

    
});