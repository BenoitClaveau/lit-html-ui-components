import { LitElement, html, css } from 'lit-element';
import Combobox from "./combobox"
import debounce from './core/debounce';

export default class Autocomplete extends Combobox {

    static get properties() {
        return super.properties;
    }

    constructor() {
        super();
        this.debounceFetch = debounce((...args) => this.fetch(...args), 250);
    }

    // la valeur dans la propriété data correspond au champ valeur dans items.
    // inputValue dois correspondre au label.
    // je rechercher le bon label dans les items.
    // shouldUpdate(changedProperties) {
    //     const res = super.shouldUpdate(changedProperties);
    //     // mon traitement est le dernier
    //     if (changedProperties.has('value')) { // value a été changé depuis l'exterieur
    //         const item = this.items.find(e => e.value == this.value)
    //         this.inputValue = item ? this.getLabel(item) : '';
    //     }
    //     else if (changedProperties.has('items')) { // cas si data n'a pas changé ex null, mais items oui dons 1 avec un label pour null
    //         // value a été changé depuis l'exterieur
    //         const item = this.items.find(e => e.value == this.value);
    //         this.inputValue = item ? this.getLabel(item) : '';
    //     }
    //     return res;
    // }

    /**
     * surcharge de input change
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
