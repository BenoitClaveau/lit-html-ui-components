import { LitElement, html, css } from 'lit-element';

/**
 * HACK for bug in firefox:
 * caret is not visible on focus.
 */

 // FIREFOX ajoute un /n si vide.
const sanitize = (str) => {
    if (!str) return null;
    return str.replace(/\r\n|\r|\n/g, "\n").replace(/^\n+$/g, "");
};

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

        // FIREFOX HACK je recréé le composant pour éviter le bug du focus
        this._onblur = e => {
            const { _onblur, _onkeypress, _onkeyup } = this;
            const copy = e.target.cloneNode(true); // event handler are not clones
            copy.onblur = _onblur;
            copy.onkeypress = _onkeypress;
            copy.onkeyup = _onkeyup;
            e.target.parentNode.replaceChild(copy, e.target);
        }

        // les handlers doivent être copiés dans onblur.Je les déclare comme fonction pour plus de facilté.
        this._onkeypress = e => {
            if (e.key == "Enter") {
                // j'annule l'event car je ne veux pas plusieurs lignes
                // cela sera géré par contenteditable
                e.preventDefault();
                this.dispatchEvent(new CustomEvent('submit', {
                    bubbles: true,
                    composed: true,
                    detail: {}
                }));
            }
        }

        this._onkeyup = e => {
            const path = e.path || (e.composedPath && e.composedPath());
            const value = sanitize(path[0].innerText);

            if (value != this.value) {
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: { value }
                }));
            }

            if (!this.value && ["Backspace", "Delete"].some(p => e.key === p)) {
                console.log("reset")
                this.dispatchEvent(new CustomEvent('reset', {
                    bubbles: true,
                    composed: true,
                    detail: { value }
                }));
            }
        };
     }

    // https://gist.github.com/islishude/6ccd1fbf42d1eaac667d6873e7b134f8
    async getCaretPos() {
        const elem = await this.getContentEditable();
        const selection = document.getSelection();
        if (!selection) return 0;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(elem);
        range.setEnd(range.endContainer, range.beginOffset);
        return range.startOffset;
    }

    async setCaretPos(pos) {
        const elem = await this.getContentEditable();
        const selection = document.getSelection();
        if (!selection) return;
        selection.collapse(elem, pos);
    }

    async setCaretToEnd() {
        const elem = await this.getContentEditable();
        const selection = document.getSelection();
        if (!selection) return;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(elem);
        range.collapse(false);
    }

    async getContentEditable() {
        let div = this.shadowRoot.querySelector("[contenteditable=true]");
        if (div) return div;
        await this.updateComplete;
        return this.shadowRoot.querySelector("[contenteditable=true]");
    }

    async focus() {
        super.focus();
        (await this.getContentEditable()).focus();
    }

    /**
     * Si this.value est identique à contentediable, je ne fais rien pour 
     * ne pas réinitialiser le composant editable et la position du curseur.
     * cf https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
     */
    shouldUpdate(changedProperties) {
        const res = super.shouldUpdate(changedProperties);
        return res && sanitize(this.localValue) == this.value ? false : res;
    }

    /**
     * Retourne value du conteneditable
     */
    get localValue() {
        const div = this.shadowRoot.querySelector("[contenteditable=true]");
        return !div ? 
            null : 
            div.innerText;
    }

    render() {
        const { _onblur, _onkeypress, _onkeyup } = this;
        return html`
            <div 
                contenteditable="true" 
                @blur=${_onblur}
                @keypress=${_onkeypress}
                @keyup=${_onkeyup}
            >${this.value}</div>
        `;
    }
}
