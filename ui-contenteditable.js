import { LitElement, html, css } from 'lit-element';
import ContentEditableElement from "./src/contenteditable-element";
import ContentEditable from "./src/contenteditable";

customElements.define('ui-contenteditable-element', class extends ContentEditableElement {
});

customElements.define('ui-contenteditable', class extends ContentEditable {

    static get properties() {
        return {
            values: String,
        }
    }

    renderContentEditableRow() {
        return html`
            <ui-contenteditable-element
                .value=${this.value}
            ></ui-contenteditable-element>
        `;
    }

});