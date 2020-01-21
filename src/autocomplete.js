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
