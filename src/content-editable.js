import { LitElement, html, css } from 'lit-element';

export default class ContentEditable extends LitElement {

    static get styles() {
        return css`
            :host > div {
                min-height: 20px;
            }
        `;
    }

    static get properties() {
        return {
            value: String
        }
    }

    constructor() {
        super();
        this.setAttribute("tabindex", 1);
        this.setAttribute("contenteditable", true);
        this.addEventListener("keypress", e => this.keypressHandler(e));
        this.addEventListener("keyup", e => this.keyupHandler(e));
        this.addEventListener("focus", e => this.focusHandler(e));
    }

    createRenderRoot() {
        // je délégue la gestion du focus à L'enfant.
        return this; //.attachShadow({ mode: "open", delegatesFocus: true });
    }

    // https://gist.github.com/islishude/6ccd1fbf42d1eaac667d6873e7b134f8
    getCaretPos() {
        // ne focntionne pas bien
        // a verifier

        const selection = document.getSelection();
        if (!selection) return 0;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(this);
        range.setEnd(range.endContainer, range.beginOffset);
        return range.startOffset;
    }

    setCaretPos(pos) {
        const selection = document.getSelection();
        if (!selection) return;
        selection.collapse(this, pos);
    }

    setCaretToEnd() {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        range.selectNodeContents(this);
        range.collapse(false);

        // range.setStart(range.endContainer, 5);
        // range.setEnd(range.endContainer, range.endOffset);

        // selection.collapse(this, range.endOffset);
    }

    focus({ setCaretToEnd } = {}) {
        super.focus();
        if (setCaretToEnd) this.setCaretToEnd();
    }

    shouldUpdate(changedProperties) {
        const res = super.shouldUpdate(changedProperties);
        // si pas de changement je ne fais rien
        // cela évite de gérer la position du curseur.
        // cf https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
        if (res && this.innerText == this.value)
            return false;
        return res;
    }

    render() {
        return html`${this.value}<br />`;
    }

    keypressHandler(e) {
        if (e.key == "Enter") {
            // j'annule l'event car je ne veux pas plusieurs lignes
            // cela sera géré par contenteditable
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                composed: true,
                detail: { }
            }));
        }
    }

    keyupHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].innerText;

        if (value != this.value) { 
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }

        if (!this.value && ["Backspace", "Delete"].some(p => e.key === p)) {
            this.dispatchEvent(new CustomEvent('reset', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }
    };
    
	focusHandler(e) {
        requestAnimationFrame(() => document.execCommand('selectAll'));
    }
}
