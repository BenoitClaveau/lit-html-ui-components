import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { render } from 'lit-html/lit-html.js';

export default class MultilineContentEditable extends LitElement {

    static get styles() {
        return css`
            :host {
                display: grid;
                grid-template-columns: 1fr;
                grid-row-gap: 4px;
            }
            p {
                padding: 8px;
                background-color: green;
            }
        `;
    }

    static get properties() {
        return {
            values: Array
        }
    }

    shouldUpdate(changedProperties) {
        if (!this.values.length) {
            this.dispatchEvent(new CustomEvent('add', {
                bubbles: true,
                composed: true,
                detail: {
                    index: 0
                }
            }));
            return false
        }
        if (changedProperties.has("values") && changedProperties.get("values")?.length != this.values?.length)
            return true;
        return false;
    }

    keypress = (e, index) => {
        const { list } = this;
        if (e.key == "Enter") {
            e.preventDefault();

            this.dispatchEvent(new CustomEvent('add', {
                bubbles: true,
                composed: true,
                detail: {
                    index: index + 1
                }
            }));
        }
        if (e.key == "-") {
            e.preventDefault();

            console.log("- remove", index)
            this.dispatchEvent(new CustomEvent('remove', {
                bubbles: true,
                composed: true,
                detail: {
                    index,
                }
            }));
        }

    }

    keyup = (e, index) => {
        if (["Enter", "-"].some(k => k == e.key)) return;

        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                value: e.target.textContent,
             }
        }));
    }

    domRender() {
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }

        for (let i = 0; i < this.values.length; i++) {
            const item = this.values[i];
            const blur = (e) => {
                const p = document.createElement("p");
                p.contentEditable = true;
                p.textContent = e.target.textContent;
                p.style.backgroundColor = "blue";
                p.style.padding = "8px";
                p.addEventListener("keydown", keypress);
                p.addEventListener("keyup", keyup);
                p.addEventListener("blur", blur);
                this.shadowRoot.replaceChild(p, e.target);
            }
            const keypress = (e) => {
                this.keypress(e, item, i)
            }
            const keyup = (e) => {
                this.keyup(e, item, i)
            }
            
            const p = document.createElement("p");
            p.style.backgroundColor = "red";
            p.style.padding = "8px";
            p.contentEditable = true;
            p.textContent = item;
            p.addEventListener("keydown", keypress);
            p.addEventListener("keyup", keyup);
            p.addEventListener("blur", blur);
            this.shadowRoot.appendChild(p);
        }

        const p = document.createElement("p");
        p.contentEditable = true;
        p.textContent = "";
        p.style.outline = "none"
        this.shadowRoot.appendChild(p);
        p.focus();
        requestAnimationFrame(() =>  {
            p.remove();
        })

    }

    firstUpdated() {
        this.domRender()
    }

    updated(updatedProperties) {
        this.domRender()
    }

    
}
