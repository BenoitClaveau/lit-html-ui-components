import { LitElement, html, css } from 'lit-element';
import "../touchable-highlight.js";
import { close as svgClose } from "./icons";

export default class extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    padding-left: 4px;
                    background-color: rgb(241, 241, 241);
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(220, 220, 220);
                    border-radius: 4px;
                }
            `
        ];
    }

    static get properties() {
        return {
            label: String,
            index: Number
        }
    }

    render() {
        return html`
            ${ this.renderLabel()}
            ${ this.renderRemoveButton()}
        `;
    }

    renderLabel() {
        return html`
            <div>${this.label}</div>
        `;
    }

    renderRemoveButton() {
        return html`
            <touchable-highlight
                @click=${() => this.remove()}
            >${svgClose()}</touchable-highlight>
        `;
    }

    remove(e) {
        this.dispatchEvent(new CustomEvent("remove", {
            bubbles: true,
            composed: true,
            detail: { 
                label: this.label,
                index: this.index,
            }
        }));
    }
});