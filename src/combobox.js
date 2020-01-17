import { LitElement, html, css } from 'lit-element';
import "./iconset";
import Input from './input';
import "../ui-icon";

export class InputCombobox extends Input {

    static get styles() {
        return [
            super.styles,
            css`
                input {
                    width: 144px;
                }
            `
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            dropdown: Boolean,
        }
    }

    constructor() {
        super();
        this.clickHandler = (e) => this._clickHandler(e);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.clickHandler);
        this.addEventListener('keydown', this.keydownHandler);   
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
    }

    _clickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (inside && this.dropdown) {
            this.toggle();
        }
    }

    render() {
        return html`
            <div class="container">
                ${ this.renderInput()}
                ${ this.renderClearButton()}
                ${ this.renderDropdownButton()}
            </div>
        `;
    }

    renderDropdownButton() {
        return html`
            <ui-icon
                icon="arrow-drop-down"
                height="18px"
                width="18px"
                @click="${e => this.toggle(e)}"
            ></ui-icon>
        `;
    }

    toggle(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.dispatchEvent(new CustomEvent(this.dropdown ? "input-combobox-close" : "input-combobox-open", {
            bubbles: true,
            composed: true,
            detail: null
        }));
    };

    keydownHandler(e) {
        if (e.key == "Escape" && this.dropdown) {
            this.dispatchEvent(new CustomEvent("input-combobox-close", {
                bubbles: true,
                composed: true,
                detail: null
            }));
        }
    }
}

export default class Combobox extends LitElement {

    static get styles() {
        return [
            css`
                .container {
                    position: relative;
                    display: inline-block;
                }
            `
        ];
    }

    static get properties() {
        return {
            items: Array,
            placeholder: String,
            value: String,      // value du composant
            inputValue: String, // text bindé dans l'input c'est une copie interne de value 
            dropdown: Boolean,  // true si dropdown est visible,
        }
    }

    constructor() {
        super();
        this.clickHandler = (e) => this._clickHandler(e);
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('value')) { // value a été changé depuis l'exterieur, j'écrase la valeur
            this.inputValue = this.value ? this.value : '';
            this.dropdown = false; 
        }
        return super.shouldUpdate(changedProperties);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.clickHandler);
        this.addEventListener('input-combobox-open', this.inputOpenHandler);
        this.addEventListener('input-combobox-close', this.inputCloseHandler);
        this.addEventListener('dropdown-select', this.dropdownSelectHandler);
        this.addEventListener('input-change', this.inputChangeHandler);
        this.addEventListener('input-submit', this.inputSubmitHandler);
        this.addEventListener('input-clear', this.inputClearHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
    }

    _clickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (!inside && this.dropdown) {
            this.dropdown = false;
        }
    }

    inputOpenHandler(e) {
        this.dropdown = true;
    }

    inputCloseHandler(e) {
        this.dropdown = false;
    }

    dropdownSelectHandler(e) {
        // data peut ne pas changé et donc ne pas avoir de re-render.
        // je re-initalise les propriétés interne.
        this.inputValue = e.detail.item ? this.getLabel(e.detail.item) : ""; // j'écrase la valeur de input car data peut ne pas avoir changé.
        this.dropdown = false;

        this.dispatchEvent(new CustomEvent("combobox-select", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    inputChangeHandler(e) {
        this.inputValue = e.detail.value; // je change uniquement l'affichage pas value qui correspond à la valeur séléctionné. 
        this.dropdown = true;
    }

    /**
     * Submit dans l'input. Je séléctionne un élément.
     */
    inputSubmitHandler(e) {
        const {
            getLabel,
            items,
        } = this;

        const item = items.find(el => getLabel(el) == e.detail.value);
        
        this.dropdown = false;

        this.dispatchEvent(new CustomEvent("combobox-select", {
            bubbles: true,
            composed: true,
            detail: {
                item, 
                index: items.indexOf(item)
            }
        }));
    }

    inputClearHandler(e) {
       this.dropdown = false;

        this.dispatchEvent(new CustomEvent("combobox-select", {
            bubbles: true,
            composed: true,
            detail: {
                item: null, 
                index: -1
            }
        }));
    }

    render() {
        const { dropdown } = this;

        return html`
            <div class="container">
                ${ this.renderInput()}
                ${ dropdown && this.items && this.items.length ?
                    this.renderDropdown() :
                    null
                }
            </div>
        `;
    }

    getLabel(item) {
        throw new Error("Not implemented!");
    }

    renderInput() {
        /**
         * placeholder,
         * value
         */
        throw new Error("Not implemented!");
    }

    renderDropdown() {
        /** 
         * items
        */
        throw new Error("Not implemented!");
    }
}
