import { LitElement, html, css } from "lit-element";
// https://github.com/GoogleChrome/dialog-polyfill
import Modal from "./modal.js";
import "../touchable-highlight.js";
import { close as svgClose } from "./icons";

export default class Dialog extends Modal {

    static get styles() {
        return [
            super.styles,
            css`
                header {
                    display: inline-flex;
                    align-items: center;
                    justify-content: space-around;
                }
                section {
                    flex-grow: 1;
                }
                footer {
                    display: flex;
                    justify-content: space-around;
                }
            `];
    }

    renderTitle() {
        return null;
    }

    renderHeader() {
        return html`
            ${this.renderTitle()}
            <touchable-highlight
                @click="${e => {
                    console.log("on click")
                    this.open = false;
                    this.requestUpdate();
                }}"
            >${svgClose()}</touchable-highlight>
        `;
    }

    renderBody() {
        return null;
    }

    renderFooter() {
        return null;
    }

    renderContent() {
        return html`
            <header>
                ${ this.renderHeader()}
            </header>
            <section>
                ${ this.renderBody()}
            </section>
            <footer>
                ${ this.renderFooter()}
            </footer>
        `;
    }
}