import { LitElement, html, css } from 'lit-element';

export default class Text extends LitElement {

    static get styles() {
        return [
            css`
                :host {
                    min-width: 140px;
                    line-height: 34px;
                    min-height: 34px;

                    border-bottom: 2px solid #e8e6e6;
                }

            `
        ];
    }

    static get properties() {
        return {
            value: Object
        }
    }

    render() {
        return html`${this.value}`;
    }
}
