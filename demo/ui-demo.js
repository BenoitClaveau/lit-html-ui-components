import { LitElement, html, css } from "lit-element";
import "../ui-button.js";
import "../ui-checkbox.js";
import "../ui-readonly-field.js";
import "../ui-input-field.js";
import "../ui-input-date.js";
import { close as svgClose } from "../src/icons";
import Dialog from "../src/dialog.js";

import {
    useState,
    useEffect,
    component
} from 'haunted';

customElements.define("ui-dialog", class extends Dialog {
    static get styles() {
        return [
            super.styles,
            css``
        ]
    }
    renderTitle() {
        return html`<h1>TITLE</h1>`
    }
    renderBody() {
        return html`<p>Message</p>`
    }
})

customElements.define("ui-demo", component(() => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    return html`
        <style>
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 16px;
            }
        </style>
        <div class="grid">
            <ui-button
                @click=${e => setCount(count + 1)}
            >BUTTON ${count}</ui-button>
            <ui-button
                @click=${e => setCount(count - 1)}
            >BUTTON ${svgClose()} ${count}</ui-button>
            <ui-checkbox>CHECKBOX</ui-checkbox>

            <ui-input 
                placeholder="placeholder"  
                .value=${text}
                @change=${e => setText(e.detail.value)}
                @clear=${e => setText("")}
            ></ui-input>
            <ui-input-date 
                placeholder="placeholder" 
                .value=${new Date(Date.now())}
            ></ui-input-date>
            <div></div>

            <ui-readonly-field label="label (readonly)" .value=${text}></ui-readonly-field>
            <ui-input-field 
                placeholder="placeholder" 
                label="label" 
                .value=${text}
                @change=${e => setText(e.detail.value)}
                @clear=${e => setText("")}
            ></ui-input-field>
            <div></div>
            
            <ui-dialog
                .open=${count > 0 ? 0 : count}
            ></ui-dialog>

        </div>
    `;
}));