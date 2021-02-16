import { commitSymbol } from "haunted/lib/symbols";
import { LitElement, html, css } from "lit-element";

const sanitize = (str) => {
    if (!str) return "";
    return str.replace(/\r\n|\r|\n/g, "\n").replace(/^\n+$/g, "");
};

export default class ContentEditable extends LitElement {
    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 1fr;

                border-radius: 4px;
                -moz-outline-radius: 4px;

                background-color: #f0f0f0;
                color: #111;

                font-family: Roboto;
                font-weight: 500;
                font-size: 16px;
                line-height: 22px;

                padding-top: 7px;
                padding-bottom: 7px;
            }
            :host(:host:focus-within) {
                outline: 1px solid var(--accent-color, red);
            }
            :host > div {
                outline: none;
            }
        `;
    }

    static get properties() {
        return {
            value: String
        }
    }

    constructor() {
        super()
        // FIREFOX HACK je recréé le composant pour éviter le bug du focus
        this.addEventListener("blur", e => this.blurHanlder(e));
        this.addEventListener("keypress", e => this.keypressHanlder(e));
        this.addEventListener("keyup", e => this.keyupHanlder(e));
    }

    // createRenderRoot() {
    //     // je délégue la gestion du focus à L'enfant.
    //     return this.attachShadow({ mode: "open", delegatesFocus: true });
    // }

    get contentEditable() {
        return this.shadowRoot.querySelector("[contenteditable=true]");
    }

    get localValue() {
        const contentEditable = this.contentEditable;
        if (!contentEditable) return "";
        return sanitize(contentEditable.innerText);
    }

    shouldUpdate(changedProperties) {
        const res = super.shouldUpdate(changedProperties);
        const out =  res && this.localValue == this.value && this.contentEditable ? false : res;
        console.log("out", out, this.value)
        return out;
    }

    render() {
        return html`
            <div contenteditable="true" .textContent=${this.value}></div>
        `;
    }

    async focus(options = {}) {
        const contentEditable = this.contentEditable;
        if (contentEditable) {
            contentEditable.focus();
            if (options.caretToEnd) this.setCaretToEnd();
            return;
        }

        await this.updateComplete;
        this.contentEditable.focus();
        if (options.caretToEnd) this.setCaretToEnd();
    }

    blurHanlder(e) {
        const contentEditable = this.contentEditable;
        if (contentEditable) {
            const copy = contentEditable.cloneNode(true);
            contentEditable.parentNode.replaceChild(copy, contentEditable);
        }
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

    // https://gist.github.com/islishude/6ccd1fbf42d1eaac667d6873e7b134f8
    getCaretPos() {
        const selection = document.getSelection();
        if (!selection) return 0;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(this.contentEditable);
        range.setEnd(range.endContainer, range.beginOffset);
        return range.startOffset;
    }

    setCaretPos(pos) {
        const selection = document.getSelection();
        if (!selection) return;
        selection.collapse(this.contentEditable, pos);
    }

    setCaretToEnd() {
        const selection = document.getSelection();
        if (!selection) return;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(this.contentEditable);
        range.collapse(false);
    }
}