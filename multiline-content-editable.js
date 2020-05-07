import { LitElement, html, css } from 'lit-element';
import MultilineContentEditable from "./src/multiline-content-editable.js";
import "./content-editable.js"

customElements.define('multiline-content-editable', class extends MultilineContentEditable {

    renderItem(item, index) {
        return html`
            <content-editable
                .value=${item}
            ></content-editable>
        `;
    }

});