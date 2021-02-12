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
        `;
    }

    static get properties() {
        return {
            values: Array
        }
    }

    createRenderRoot() {
        // BUG dans firefox. ne pas utiliser shadowRoot
        return this;
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
        return super.shouldUpdate(changedProperties);
    }

    keypress = (e, item, index) => {
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

    keyup = (e, item, index) => {
        if (["Enter", "-"].some(k => k == e.key)) return;

        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { 
                index,
                item,
                value: e.target.textContent,
             }
        }));
    }

    domRender() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
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
                this.replaceChild(p, e.target);
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
            this.appendChild(p);
        }

        const p = document.createElement("p");
        p.contentEditable = true;
        p.textContent = "";
        p.style.outline = "none"
        this.appendChild(p);
        p.focus();
        requestAnimationFrame(() =>  {
            p.remove();
        })

    }

    firstUpdated() {
        this.domRender()
    }

    updated(updatedProperties) {
        if (this.children.length != this.values.length) {

            console.log("RENDER", this)
            this.domRender()
        }
    }
}
