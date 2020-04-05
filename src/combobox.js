import { LitElement, html, css } from 'lit-element';

/**
 * events:
 * - select (item: object, index: number)
 * - submit (value: text)
 * 
 * methods to be defined:
 * - getInputValue (-> text): retourne le texte à afficher dans l'input pour un item.
 * - initInputValue: initialise this.inputValue avec lors de la création
 * - renderInput
 * - renderDropdown
 */
export default class Combobox extends LitElement {

    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    flex: 1 0 auto;
                }
                #dropdown-container {
                    position: relative;
                    overflow: visible;
                }
            `
        ];
    }

    static get properties() {
        return {
            items: Array,
            placeholder: String,
            value: Object,      // value du composant
            inputValue: String, // text bindé dans l'input c'est une copie interne de value 
            dropdown: Boolean,  // true si dropdown est visible,
        }
    }

    constructor() {
        super();
        this.clickHandler = (e) => this._clickHandler(e);
        this.resizeHandler = (e) => this._resizeHandler(e);
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
        window.addEventListener('resize', this.resizeHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
        window.removeEventListener('resize', this.resizeHandler);
    }

    firstUpdated() {
        const input = this.shadowRoot.querySelector("#input-container");
        input.addEventListener('change', e => this.inputChangeHandler(e));
        input.addEventListener('submit', e => this.inputSubmitHandler(e));
        input.addEventListener('clear', e => this.inputClearHandler(e));
        input.addEventListener('open', e => this.inputOpenHandler(e));
        input.addEventListener('close', e => this.inputCloseHandler(e));

        const dropdown = this.shadowRoot.querySelector("#dropdown-container");
        dropdown.addEventListener('select', e => this.dropdownSelectHandler(e));
    }

    _clickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (!inside && this.dropdown) {
            this.dropdown = false;
        }
    }

    _resizeHandler(e) {
        this.dropdown = false;
    }

    inputOpenHandler(e) {
        this.dropdown = true;
    }

    inputCloseHandler(e) {
        e.stopPropagation();
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
        e.stopPropagation();
        this.inputValue = e.detail.value; // je change uniquement l'affichage pas value qui correspond à la valeur séléctionné. 
        this.dropdown = !!this.inputValue;
    }

    /**
     * Lors d'un submit dans l'input j'envoie un événement pour permettre de
     * séléctionner s'il faut un élement.  
     */
    inputSubmitHandler(e) {
        e.stopPropagation();
        this.dropdown = false;
        this.dispatchEvent(new CustomEvent("submit", {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    inputClearHandler(e) {
        e.stopPropagation();
        this.inputValue = "";
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
            <div id="input-container">
                ${ this.renderInput()}
            </div>
            <div id="dropdown-container">
                ${ dropdown && this.items && this.items.length ?
                    this.renderDropdown() :
                    null
                }
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

	/**
     * Render du composant affichant l'input
     * ex: ui-input
     */
    renderInput() {
        /**
         * placeholder,
         * value
         */
        throw new Error("Not implemented!");
    }

	/**
     * Render du composant affichant le dropdown
     * ex: ui-input
     */
    renderDropdown() {
        /** 
         * items
        */
        throw new Error("Not implemented!");
    }
}
