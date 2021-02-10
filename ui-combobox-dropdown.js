import Dropdown from "./src/dropdown.js";

customElements.define('ui-combobox-dropdown', class extends Dropdown {
    static get properties() {
        return {
            ...super.properties,
            renderItem: Function
        }
    }
});
