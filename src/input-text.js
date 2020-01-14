import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import "../core/app-icons.js";

class InputText extends LitElement {

    //border //1px solid #dcdcdc;
    static get styles() {
        return [
            css`
                .input {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border: var(--input-text-border); 
                    background-color: var(--input-text-background-color);
                    width: 100%;
                    border-radius: 4px;
                    
                }
                .input > *:first-child {
                    padding-left: 8px;
                }
                .input > *:last-child {
                    padding-right: 8px;
                }
                input {
                    width: var(--input-text-width, 156px);   
                    height: 36px;
                    font-family: Roboto;
                    color: var(--input-text-color);
                    background-color: transparent;
                    font-size: 16px;
                    font-weight: 500;
                    border: none;
                    outline: none;
                }
                input::placeholder {
                    color: var(--input-text-color);
                }
                iron-icon {
                    margin-left: 4px;
                    height: 18px;
                    width: 18px;
                    flex: 0 0 auto;
                    color: var(--input-text-color);
                }
            `
        ];
    }

    static get properties() {
        return {
            placeholder: String,
            value: String,
        }
    }

    onChange(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].value;
        this.dispatchEvent(new CustomEvent('value-changed', {
            bubbles: true,
            composed: true,
            detail: { value }
        }));
    };

    render() {
        const {
            onChange,
            onKeyUp,
            value,
            placeholder
        } = this;

        return html`
            <div class="input">
                <input
                    type="text"
                    @change="${onChange}"
                    @keyup="${onKeyUp}"
                    .value="${value ? value : null}"
                    placeholder="${placeholder ? placeholder : ''}"
                />
                <iron-icon
                    icon="close"
                    title="clear"
                    @tap="${e => this.clear()}"
                ></iron-icon>
            </div>
        `;
    }

    onKeyUp(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const value = path[0].value;
        if (value != this.value) {
            this.dispatchEvent(new CustomEvent('filter-changed', {
                bubbles: true,
                composed: true,
                detail: { value }
            }));
        }
        this.dispatchEvent(new CustomEvent('keyup', {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    };

    clear() {
        if (!this.value) return;
        this.dispatchEvent(new CustomEvent('value-changed', {
            bubbles: true,
            composed: true,
            detail: { value: null }
        }));
    }
}

customElements.define('input-text', InputText);
