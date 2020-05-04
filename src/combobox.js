import { LitElement, html, css } from 'lit-element';
import Dropdownable from "./dropdownable.js"

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
export default class Combobox extends Dropdownable {

    static get styles() {
        return [
            super.styles
        ];
    }

    static get properties() {
        return {
            ...super.properties,
            items: Array,
            placeholder: String,
            inputValue: String, // text bindé dans l'input c'est une copie interne de value 
        }
    }

    constructor() {
        super();
        this.items = [];
        this.clickHandler = (e) => this._clickHandler(e);
        this.resizeHandler = (e) => this._resizeHandler(e);

        this.addEventListener('change', e => this.changeHandler(e));
        this.addEventListener('submit', e => this.submitHandler(e));
        this.addEventListener('clear', e => this.clearHandler(e));
    }

    /**
     * Le texte dans l'input à changé je modifie inputValue uniquement (traitement interne).
     */
    changeHandler(e) {
        e.stopPropagation();
        this.inputValue = e.detail.value; // je change uniquement l'affichage pas value qui correspond à la valeur séléctionné. 
        this.dropdown = !!this.inputValue;
    }

    /**
     * Lors d'un submit dans l'input j'envoie un événement pour permettre de
     * séléctionner s'il faut un élement.  
     */
    submitHandler(e) {
        this.dropdown = false;
    }

    clearHandler(e) {
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

    /**
     * Le composant principale doit être un input. Je préfère renommer la fonction renderComponent en renderInput.
     */
    renderComponent() {
        return this.renderInput();
    }

    /**
     * Le composant principale doit être un input avec un value de type text. Je préfère renommer la fonction initComponent en initInputValue.
     */
    initComponent() {
        return this.initInputValue();
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
