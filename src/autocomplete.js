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
        this.items = [];
        this.debounceFetch = debounce((...args) => this.fetch(...args), 250);
    }

    shouldUpdate(changedProperties) {
        /**
         * Do no call initInputValue see Combobox.shouldUpdate
         */
        if (changedProperties.has("items") && !changedProperties.has("value")) { 
            return true;
        }
        const res = super.shouldUpdate(changedProperties);

        if (changedProperties.has("value")) { 
            this.initInputValue();
        }
        return res;
    }

    /**
     * surcharge de input change pour appeler fecth via un debounce
     */
    changeHandler(e) {
        super.changeHandler(e);
        this.debounceFetch(e);
    }

    /**
     * surcharge de clear pour appeler fecth via un debounce
     */
    clearHandler(e) {
        super.clearHandler(e);
        this.debounceFetch(e);
    }

    fetch() {
        /** 
         * items
        */
        throw new Error("Not implemented!");
    }
}
