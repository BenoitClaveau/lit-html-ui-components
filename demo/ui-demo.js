import { LitElement, html, css } from "lit-element";
import "../ui-button.js";
import "../ui-checkbox.js";
import "../ui-text.js";
import "../ui-input.js";
import "../ui-input-combobox.js";
import "../ui-input-date.js";
import { close as svgClose } from "../src/icons";
import Dialog from "../src/dialog.js";
import Combobox from "../src/combobox.js";
import Dropdown from "../src/dropdown.js";
import Autocomplete from "../src/autocomplete.js";

import {
    useState,
    useEffect,
    component
} from 'haunted';

/**
 * Extends Dialog to define body
 */
customElements.define("ui-dialog", class extends Dialog {
    static get styles() {
        return [
            super.styles,
            css`
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 32px;
                    margin: 16px;
                }
            `];
    }
    renderTitle() {
        return html`<h1>TITLE</h1>`
    }
    renderBody() {
        return html`
        <div class="grid">
            <ui-button @click=${e => this.close({ selected: "item 1"})}>item 1</ui-button>
            <ui-button @click=${e => this.close({ selected: "item 2"})}>item 2</ui-button>
            <ui-button @click=${e => this.close({ selected: "item 3"})}>item 3</ui-button>
            <ui-button @click=${e => this.close({ selected: "item 4"})}>item 4</ui-button>
            <ui-button @click=${e => this.close({ selected: "item 5"})}>item 5</ui-button>
        </div>`
    }
    renderFooter() {
        return html`
            <ui-button
                @click=${e => this.close({ cancel: true })}
            >ANNULER</ui-button>
        `
    }
});

/**
 * Extends Dropdown to display items like you want
 * by default like a grid.
 */
customElements.define("ui-dropdown", class extends Dropdown {
    renderItem(item, index, isActive) {
        return html`<div>${item.label} (${item.code})</div>`
    }
});

/**
 * Adapt Combobox to your data
 */
customElements.define("ui-combobox", class extends Combobox {

    get items() {
        return [
            { label: "Invité", code: "inv" },
            { label: "Créateur", code: "cr" },
        ];
    }

    getInputValue(item) {
        return item?.label;
    }

    initInputValue() {
        const { value } = this;
        const item = this.items.find(e => e.label === value);
        this.inputValue = item ? this.getInputValue(item) : "";
    }

    renderDropdown() {
        /**
         * Pass items
         */
        return html`
            <ui-dropdown
                .items=${this.items}
                .dropdown="${this.dropdown}"
            ></ui-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input-combobox
                placeholder="Role"
                .value="${this.inputValue}"
                .dropdown="${this.dropdown}"
            ></ui-input-combobox>
        `
    }
});

customElements.define("ui-autocomplete-dropdown", class extends Dropdown {
    renderItem(item, index, isActive) {
        return html`<div>${item}</div>`
    }
});

customElements.define("ui-autocomplete", class extends Autocomplete {

    getInputValue(item) {
        return item;
    }

    initInputValue() {
        const { value } = this;
        this.inputValue = value;
    }

    renderDropdown() {
        /**
         * Pass items
         */
        return html`
            <ui-autocomplete-dropdown
                .items=${this.items}
                .dropdown="${this.dropdown}"
            ></ui-autocomplete-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input
                placeholder="Texte"
                .value="${this.inputValue}"
            ></ui-input>
        `
    }

    fetch(e) {
        this.items = [`${this.inputValue} ok`, `${this.inputValue} nok`, `${this.inputValue} war`]
    }

})

customElements.define("ui-demo", component(function() {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [role, setRole] = useState();

    return html`
        <style>
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 16px;
                align-items: center;
            }
            ui-input {
                background-color: red;
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

            <ui-text .value=${text}></ui-text>
            <ui-input 
                placeholder="placeholder" 
                label="label" 
                .value=${text}
                @change=${e => setText(e.detail.value)}
                @clear=${e => setText("")}
            ></ui-input>
            <div></div>

            <ui-button
                @click=${async e => {
                    const res = await this.shadowRoot.querySelector("ui-dialog").showModal();
                    if (res.selected) {
                        alert(`You have selected: ${res.selected}`);
                    }
                }}
            >SHOW MODAL</ui-button>
            
            <ui-dialog
                .open=${count > 0 ? 0 : count}
            ></ui-dialog>

            <ui-combobox
                .value=${role?.label}
                @select=${e => setRole(e.detail.item)}
            ></ui-combobox>

            <ui-autocomplete
                .value=${text}
                @select=${e => setText(e.detail.item)}
            ></ui-autocomplete>

        </div>
    `;
}));