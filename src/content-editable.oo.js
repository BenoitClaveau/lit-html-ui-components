export default class ContentEditable extends HTMLElement {

    static get observedAttributes() { return ["value"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "value" && this.textContent != this.value) {
            this.textContent = newValue;
        }
    }
}