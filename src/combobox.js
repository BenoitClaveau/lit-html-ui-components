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
        this.addEventListener('keydown', e => this.keydownHandler(e));   
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
                ${ this.renderInput() }
                ${ this.renderClearButton() }
                ${ this.renderDropdownButton() }
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
        this.dispatchEvent(new CustomEvent(this.dropdown ? "close" : "open", {
            bubbles: true,
            composed: true,
            detail: null
        }));
    };

    keydownHandler(e) {
        if (e.key == "Escape" && this.dropdown) {
            this.dispatchEvent(new CustomEvent("close", {
                bubbles: true,
                composed: true,
                detail: null
            }));
        }
    }
}

/**
 * events:
 * - select (item: object, index: number)
 * - sublit (value: text)
 * 
 * methods to defined:
 * - getInputValue (-> text)
 * - initInputValue 
 * - renderInput
 * - renderDropdown
 */
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
            this.dropdown = false; 
            this.initInputValue();
        }
        return super.shouldUpdate(changedProperties);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
    }

    firstUpdated() {
        const input = this.shadowRoot.querySelector("#input-wrapper");
        input.addEventListener('change', e => this.inputChangeHandler(e));
        input.addEventListener('submit', e => this.inputSubmitHandler(e));
        input.addEventListener('clear', e => this.inputClearHandler(e));
        input.addEventListener('open', e => this.inputOpenHandler(e));
        input.addEventListener('close', e => this.inputCloseHandler(e));

        const dropdown = this.shadowRoot.querySelector("#dropdown-wrapper");
        dropdown.addEventListener('select', e => this.dropdownSelectHandler(e));
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
        // prevent beacause select is re-dispatched   
        e.preventDefault();
        e.stopPropagation();
        
        // j'écrase la valeur de input car data peut ne pas avoir changé et ne pas avoir de re-render.
        this.inputValue = e.detail.item ? this.getInputValue(e.detail.item) : ""; 
        this.dropdown = false;

        this.dispatchEvent(new CustomEvent("select", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    /**
     * Le texte dans l'input à changé je modifie inputValue uniquement (traitement interne).
     */
    inputChangeHandler(e) {
        this.inputValue = e.detail.value; // je change uniquement l'affichage pas value qui correspond à la valeur séléctionné. 
        this.dropdown = true;
    }

    /**
     * Lors d'un submit dans l'input j'envoie un événement pour permettre de
     * séléctionner s'il faut un élement.  
     */
    inputSubmitHandler(e) {
        this.dropdown = false;

        this.dispatchEvent(new CustomEvent("submit", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    inputClearHandler(e) {
       this.dropdown = false;

        this.dispatchEvent(new CustomEvent("select", {
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
                <div id="input-wrapper">
                    ${ this.renderInput()}
                </div>
                <div id="dropdown-wrapper">
                    ${ dropdown && this.items && this.items.length ?
                        this.renderDropdown() :
                        null
                    }
                </div>
            </div>
        `;
    }

    /**
     * Retourne le texte à afficher dans l'input pour un item.
     */
    getInputValue(item) {
        throw new Error("Not implemented!");
    }

    /**
     * Initialise inputValue
     * ex: this.inputValue = this.value ? this.value : '';
     */
    initInputValue() {
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
