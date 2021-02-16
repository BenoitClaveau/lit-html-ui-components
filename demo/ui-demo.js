import { LitElement, html, css } from "lit-element";
import "../touchable-highlight.js";
import { close as svgClose } from "../src/icons";
import Button from "../src/button.js";
import Checkbox from "../src/checkbox.js";
import Input from "../src/input.js";
import InputDate from "../src/input-date.js";
import InputCombobox from "../src/input-combobox.js";
import Dialog from "../src/dialog.js";
import Combobox from "../src/combobox.js";
import Dropdown from "../src/dropdown.js";
import Autocomplete from "../src/autocomplete.js";
import Tags from "../src/tags.js";
import Text from "../src/text.js";
import MulilineContentEditable from "../src/multiline-content-editable.js";

import {
    useState,
    useEffect,
    component
} from 'haunted';

customElements.define('ui-button', class extends Button {
    static get styles() {
        return [
            super.styles,
            css`
                #button {
                    min-height: 36px;
                    background-color: #f0f0f0;
                    color: #000;
                    border-radius: 4px;
                    padding-left: 16px;
                    padding-right: 16px;
                }
            `
        ];
    }
});

customElements.define('ui-checkbox', class extends Checkbox {
    static get styles() {
        return css`
            host: {
                font-family: Roboto;
                font-weight: 400;
            }
        `;
    }
});

customElements.define('ui-input', Input);
customElements.define('ui-input-date', InputDate);
customElements.define('ui-text', Text);

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
            <ui-button @click=${e=> this.close({ selected: "item 1" })}>item 1</ui-button>
            <ui-button @click=${e=> this.close({ selected: "item 2" })}>item 2</ui-button>
            <ui-button @click=${e=> this.close({ selected: "item 3" })}>item 3</ui-button>
            <ui-button @click=${e=> this.close({ selected: "item 4" })}>item 4</ui-button>
            <ui-button @click=${e=> this.close({ selected: "item 5" })}>item 5</ui-button>
        </div>`
    }
    renderFooter() {
        return html`
            <ui-button @click=${e=> this.close({ cancel: true })}
                >ANNULER</ui-button>
        `
    }
});

customElements.define('ui-input-combobox', InputCombobox);

customElements.define('ui-combobox-dropdown', class extends Dropdown {
    static get properties() {
        return {
            ...super.properties,
            renderItem: Function
        }
    }
});

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
        return html`
            <ui-combobox-dropdown .items=${this.items} .dropdown="${this.dropdown}" .renderItem=${(item, index, isActive)=> html`
                <div>${item.label} (${item.code})</div>`}
            ></ui-combobox-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input-combobox placeholder="Role" .value="${this.inputValue}" .dropdown="${this.dropdown}"></ui-input-combobox>
        `
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
        return html`
            <ui-combobox-dropdown .items=${this.items} .dropdown="${this.dropdown}" .renderItem=${(item, index, isActive)=> html`
                <div>${item}</div>`}
            ></ui-combobox-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input placeholder="Texte" .value="${this.inputValue}"></ui-input>
        `
    }

    fetch(e) {
        this.items = [`${this.inputValue} ok`, `${this.inputValue} nok`, `${this.inputValue} war`]
    }

});

customElements.define("ui-tags", class extends Tags {

    VALUES = [
        "entrée",
        "plat",
        "garniture",
        "laitage",
        "dessert",
        "goûter",
        "crudités",
        "salade composée",
        "féculent",
        "légumes",
        "légumineux",
        "potage",
        "charcuterie",
        "volaille"
    ]

    getInputValue(item) {
        return item;
    }

    renderDropdown() {
        return html`
            <ui-combobox-dropdown .items=${this.items} .dropdown="${this.dropdown}" .renderItem=${(item, index, isActive)=> html`
                <div>${item}</div>`}
            ></ui-combobox-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input-combobox placeholder="Role" .value="${this.inputValue}" .dropdown="${this.dropdown}"></ui-input-combobox>
        `
    }
    renderTag(e) {
        return html`
            <touchable-highlight
                style="display: inline-flex; --padding:4px ; margin: 0 8px 8px 0; background-color: burlywood; border-radius: 4px;"
                @click="${() => this.remove(e)}">
                ${e}
                ${svgClose({ width: 14, height: 14 })}
            </touchable-highlight>
        `
    }

    fetch(e) {
        const { value } = e.detail;
        this.items = value ? this.VALUES.filter(e => new RegExp(`^${value}`, "ig").test(e)) : this.VALUES;
    }
});


customElements.define('ui-multiline-content-editable', class extends MulilineContentEditable {
    renderItem(item, index) {
        console.log("RENDER", index, item)
        return html`
            <ui-content-editable value=${item} date=${new Date(Date.now())}></ui-content-editable>
        `;
    }
});

customElements.define("ui-demo", component(function () {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const [role, setRole] = useState();
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState("content editable");

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
                @clear=${() => setRole()}
                @select=${e => setRole(e.detail.item)}
            ></ui-combobox>

            <ui-autocomplete
                .value=${text}
                @clear=${() => setText("")}
                @select=${e => setText(e.detail.item)}
            ></ui-autocomplete>

            <ui-tags
                .value=${text}
                .tags=${tags}
                @clear=${() => setText("")}
                @remove=${e => setTags(tags.filter(t => t !== e.detail.item))}
                @select=${e => setTags([...new Set(tags).add(e.detail.item)])}
                @submit=${e => setTags([...new Set(tags).add(e.detail.item)])}
            ></ui-tags>

            <ui-multiline-content-editable
                .values=${tags}
                @change=${e => {
                    console.log("before change", tags)
                    const t = tags.map((o, i) => i === e.detail.index ? e.detail.value : o)
                    console.log("after change", t)
                    setTags(t)
                }}
                @add=${e => {
                    setTags([
                        ...tags.slice(0, e.detail.index),
                        "",
                        ...tags.slice(e.detail.index)
                    ]);
                    e.detail.focus(e.detail.index);
                }}
                @remove=${e => {
                     console.log("before remove", tags, e.detail.index)
                     const t = tags.filter((t, i) => i !== e.detail.index)
                     console.log("after remove", t)
                     setTags(t);
                     e.detail.focus(e.detail.index - 1);
                }}
            ></ui-multiline-content-editable>

        </div>
    `;
}));