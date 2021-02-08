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
                    display: grid;
                    grid-template-columns: 1fr 24px;
                    grid-column-gap: 36px;
                    align-items: start;
                }
                header > * {
                    margin-top: 0;
                }
                section {
                    flex-grow: 1;
                }
                footer {
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
                    this.close({});
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