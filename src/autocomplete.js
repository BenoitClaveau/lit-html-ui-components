import Combobox from "./combobox.js"
import debounce from './core/debounce.js';

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
 * - fetch: fetch est appelé quand le texte affiché est modifié.
 */
export default class Autocomplete extends Combobox {

    static get properties() {
        return super.properties;
    }

    constructor() {
        super();
        this.debounceFetch = debounce((...args) => this.fetch(...args), 250);
    }

    /**
     * surcharge de input change pour appeler fecth via un debounce
     */
    inputChangeHandler(e) {
        super.inputChangeHandler(e);
        this.debounceFetch(e);
    }

    fetch() {
        /** 
         * items
        */
        throw new Error("Not implemented!");
    }
}
