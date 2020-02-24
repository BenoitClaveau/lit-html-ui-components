import { LitElement, html, css } from 'lit-element';

export default class ContentEditableElement extends LitElement {

    static get styles() {
        return css`
            :host {
                height: 100%;
                width: 100%;
            }
            .container {
                text-align: center;
            }
            div:focus {
                outline: none;
            }
        `;
    }

    static get properties() {
        return {
            value: String,
        }
    }

    // https://gist.github.com/islishude/6ccd1fbf42d1eaac667d6873e7b134f8
    getCaretPos() {
        // ne focntionne pas bien
        // a verifier

        const selection = document.getSelection();
        if (!selection) return 0;
        const range = selection.getRangeAt(0);
        range.selectNodeContents(this.container);
        range.setEnd(range.endContainer, range.beginOffset);
        const pos = range.toString().length;

        // const clonedRange = range.cloneRange();
        // clonedRange.selectNodeContents(this.container);
        // clonedRange.setStart(range.startContainer, range.startOffset);
        // clonedRange.setEnd(range.endContainer, range.endOffset);
        // console.log(pos)

        
        return range.startOffset;
    }

    setCaretPos(pos) {
        const selection = document.getSelection();
        if (!selection) return;
        selection.collapse(this.container, pos);
    }

    setCaretToEnd() {
        const selection = document.getSelection();
        const range = selection.getRangeAt(0);
        //range.setEnd(range.endContainer, range.endOffset);
        selection.collapse(this.container, range.endOffset);
    }

    focus(setCaretToEnd) {
        if (this.container) {
            this.container.focus();
            if (setCaretToEnd) this.setCaretToEnd();
        }
 
        if (!this.container) {
            // j'attend l'update pour mettre le focus
            this.updateComplete.then(() => {
                this.container.focus();
                if (setCaretToEnd) this.setCaretToEnd();
            })
        }
    }

    shouldUpdate(changedProperties) {
        const res = super.shouldUpdate(changedProperties);
        // si pas de changement je ne fais rien
        // cela évite de gérer la position du curseur.
        // cf https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
        if (res && this.container)
            return this.container.innerText != this.value
        return res;
    }

    render() {
        return html`
            <div 
                class="container" 
                contenteditable
                @keypress=${e => this.keypressHandler(e)}
                @keyup=${e => this.keyupHandler(e)}
            >${this.value}</div>
        `;
    }

    firstUpdated() {
        this.container = this.shadowRoot.querySelector(".container");
    }

    keypressHandler(e) {
        if (e.key == "Enter") {
            // j'annule l'event car je ne veux pas plusieurs lignes
            // cela sera géré par contenteditable
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('add', {
                bubbles: true,
                composed: true,
                detail: { }
            }));
        }
    }

    keyupHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].innerText;
        if (!this.value && e.key == "Backspace") {
            this.dispatchEvent(new CustomEvent('remove', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }
    };
}
