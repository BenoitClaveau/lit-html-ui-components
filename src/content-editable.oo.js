export default class ContentEditable extends HTMLElement {

    static get observedAttributes() { return ["date","value"]; }

    constructor() {
        super(); // always call super() first in the constructor.
        this.addEventListener("blur", e => this.blurHanlder(e));
        this.addEventListener("keypress", e => this.keypressHanlder(e));
        this.addEventListener("keyup", e => this.keyupHanlder(e));

        this._shadowRoot = this.attachShadow({ mode: "open", delegatesFocus: true });

    }

    connectedCallback() {
        // Render the initial value
        // when this element is placed into the DOM
        console.log("CONNECTED CALLBACK", this.getAttribute("value"), this.value)
        this.render();
    }

    get contentEditable() {
        return this._shadowRoot.querySelector("[contenteditable=true]");
    }

    get localValue() {
        return this.contentEditable ? this.contentEditable.innerText : "";
    }

    focus() {
        this.contentEditable.focus();
    }

    render() {
        console.log("render editable", this.value)
        this._shadowRoot.innerHTML = `<div contenteditable="true" style="min-height: 32px; background-color: brown;">${this.value ? this.value : ""}</div>`;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attributeChangedCallback", name, oldValue, newValue)
        if (name == "value" && this.localValue != this.value) {
            this.value = newValue;
            // this.render();
        }
    }

    blurHanlder(e) {
        this.render();
    }

    keypressHanlder(e) {
        if (e.key == "Enter") {
            // si j'appelle preventDefault j'annule le keypress
            // pour ne pas avoir de cr
            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true,
                detail: {
                    preventDefault: () => e.preventDefault()
                }
            }));
        }
    }

    keyupHanlder(e) {
        const value = this.localValue;
        if (!value && ["Backspace", "Delete"].some(p => e.key === p)) {
            this.dispatchEvent(new CustomEvent('reset', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }
        else if (value !== this.value) {
            console.log("change", value)
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }
    }
}