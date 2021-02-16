import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { render } from 'lit-html/lit-html.js';
import { TemplateInstance } from 'lit-html/lib/template-instance';

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
                    index: 0,
                    focus: (index) => {
                        // no want to set focus
                    }
                }
            }));
            return false
        }

        console.log(changedProperties.get("values"))
        console.log(this.values)
        if (changedProperties.has("values"))
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
                    index: index + 1,
                    focus: async (index) => {
                        await this.nextRender;
                        this.shadowRoot.querySelectorAll("[contenteditable=true]")[index].focus();
                    }
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
                    focus: async (index) => {
                        await this.nextRender;
                        const elem = this.shadowRoot.querySelectorAll("[contenteditable=true]")[index];
                        elem.focus();
                        const selection = document.getSelection();
                        if (!selection) return;
                        const range = selection.getRangeAt(0);
                        range.selectNodeContents(elem);
                        range.collapse(false);
                    }
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

    blur = (e, index)=> {
        /**
         * FIREFOX hack. Recreate ediable dom element otherwise caret will not be visible.
         */
        const item = this.values[index];
        console.log("BLUR item", item, "index", index);
        const zombie = document.createElement("div");
        render(this.renderEditable(item, index), zombie);
        if (e.target.parentNode)
            e.target.parentNode.replaceChild(zombie.firstElementChild, e.target);
        zombie.remove();
    }

    renderEditable(item, index) {
        return html`
            <p 
                contenteditable="true"
                .textContent=${item}
                @keypress=${e => this.keypress(e, index)}
                @keyup=${e => this.keyup(e, index)}
                @blur=${e => this.blur(e, index)}
            ></p>`;
    }

    // render() {
    //     console.log("RENDER")
    //     //return ;
    // }

    firstUpdated() {
        this.div = document.createElement("div");
        this.shadowRoot.appendChild(this.div);
    }

    updated() {
        const template = html`${this.values.map((item, index) => this.renderEditable(item, index))}`

        /**
         * Je supprime div, pour forcer le rendering complet du template. Sinon le cache semble être utilisé.
         */
        
        const div = document.createElement("div");
        render(template, div);

        const olds = [...this.shadowRoot.querySelectorAll("[contenteditable=true]")];
        const news = [...div.querySelectorAll("[contenteditable=true]")];

        let domChanged = false;

        for (let i = news.length; i < olds.length; i++) {
            olds[i].remove();
            domChanged = true;
        }

        for (let i = 0; i < news.length; i++) {
            if (!olds[i]) {
                this.div.appendChild(news[i]);
                domChanged = true;
                continue;
            }
            if (news[i].textContent === olds[i].textContent) 
                continue;

            this.div.replaceChild(news[i], olds[i]);
            domChanged = true;
        }
        
        if (!domChanged) return;
        // .remove();
        // this.shadowRoot.appendChild(div);
        /**
         * FIREFOX hack
         */
        const p = document.createElement("p");
        p.contentEditable = true;
        p.textContent = "";
        p.style.outline = "none"
        this.shadowRoot.appendChild(p);
        p.focus();
        requestAnimationFrame(() =>  {
            p.remove();
            if (this.nextRenderResolver) {
                this.nextRenderResolver();
            }
            this.nextRenderResolver = null;
        });
    }

    get nextRender() {
        return new Promise((resolve) => {
            this.nextRenderResolver = resolve;
        })
    }
}