import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import "../core/app-icons.js";

class AutoComplete extends LitElement {

    static get styles() {
        return [
            css`
                :host {
                    --auto-complete-input-width: var(--auto-complete-input-width, auto);
                }
                .container {
                    position: relative;
                    display: inline-block;
                }
                .suggestions {
                    position: absolute;
                    z-index: 99;
                    overflow: hidden;
                    margin-top: 4px;
                    border-radius: 4px;
                    top: 100%;
                    left: 0;
                    right: 0;

                    max-height: 400px;
                    overflow-y: auto;
                }
                .suggestions > div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 6px 8px;
                    cursor: pointer;
                    background-color: #fff;
                    border-bottom: 1px solid #d4d4d4;
                    font-family: Roboto;
                    color: #333;
                    font-size: 16px;
                    font-weight: 500;
                }
                .no-suggestions {
                    font-family: Roboto;
                    color: #333;
                    font-size: 16px;
                    font-weight: 500;
                }
                .input {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border: 1px solid #dcdcdc;
                    background-color: #f1f1f1;
                    width: 100%;
                    border-radius: 4px;
                }
                .input > *:first-child {
                    padding-left: 8px;
                }
                .input > *:last-child {
                    padding-right: 8px;
                }
                .input input {
                    width: var(--auto-complete-input-width);   
                    height: 36px;
                    font-family: Roboto;
                    color: #333;
                    font-size: 16px;
                    font-weight: 500;
                    border: none;
                    background-color: transparent;
                    outline: none;
                }
                
            `
        ];
    }

    static get properties() {
        return {
            renderItem: Function,
            renderContainer: Function,
            suggestions: Array,
            placeholder: String,
            value: String,
            _value: String,
        }
    }

    constructor() {
        super();
        // l'initalise pas suggestion. Il sera initalisé via une propriété externe.
        this.activeSuggestion = 0;
        this.clickHandler = (e) => this._clickHandler(e);
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('value')) { // value a été changé de l'exterieur. Pas besoin d'afficher des suggestions.
            this.suggestions = [];
            this._value = this.value;
        }
        return super.shouldUpdate(changedProperties);
    }

    async updated(changedProps) {
        if (changedProps.has('suggestions')) {
            this.activeSuggestion = 0;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.clickHandler);
    }

    _clickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (!inside) {
            console.log("[auto-complete] click outside");
            this.close();
        }
    }

    onChange(e) {
        const { suggestions } = this;
        // TODO comme onClick si 1 resultat
    };

    onClick(suggestion) {
        console.log("[auto-complete] click");
        this._value = "";
        this.suggestions = [];
        this.dispatchEvent(new CustomEvent('value-changed', {
            bubbles: true,
            composed: true,
            detail: suggestion
        }));
    };

    onKeyUp(e) {
        const previous = this._value;
        const path = e.path || (e.composedPath && e.composedPath());
        this._value = path[0].value;

        if (this._value != previous) {
            this.dispatchEvent(new CustomEvent('filter-changed', {
                bubbles: true,
                composed: true,
                detail: { value: this._value }
            }));
        }
        else {
            if (e.keyCode === 13) {
                this.activeSuggestion = 0
            }
            // User pressed the up arrow
            else if (e.keyCode === 38) {
                if (activeSuggestion === 0) {
                    return;
                }

                this.activeSuggestion = this.activeSuggestion - 1;
            }
            // User pressed the down arrow
            else if (e.keyCode === 40) {
                if (this.activeSuggestion - 1 === this.suggestions.length) {
                    return;
                }
                this.activeSuggestion = this.activeSuggestion + 1;
            }
        }
    };

    render() {
        const {
            onChange,
            onKeyUp,
            suggestions,
            _value,
            placeholder
        } = this;

        if (!suggestions) return null; // suggestions n'est pas initialisé on affiche rien. On attend l'initalisation de propriétés externes.

        let suggestionsListComponent;

        if (_value) {
            if (suggestions.length) {
                suggestionsListComponent = this.renderContainer(this.renderItems.bind(this));
            } else {
                suggestionsListComponent = this.renderEmpty();
            }
        }

        return html`
            <div class="container">
                <div class="input">
                    <input
                        type="text"
                        @change="${onChange}"
                        @keyup="${onKeyUp}"
                        .value="${_value ? _value : null}"
                        placeholder="${placeholder ? placeholder : ''}"
                    />
                    <iron-icon 
                        style="${styleMap({
                            marginLeft: "4px", 
                            height: "18px",
                            width: "18px",
                            flex: "0 0 auto",
                        })}"
                        icon="close"
                        title="clear"
                        @tap="${e => this.clear()}"
                    ></iron-icon>
                </div>
                ${suggestionsListComponent}
            </div>
        `;
    }

    renderEmpty() {
        const {
            value
        } = this;

        if (value) return null; // pas de suggestions

        return html`
            <div class="no-suggestions">
                <em>Aucun résultat</em>
            </div>
        `
    }

    clear() {
        this._value = "";
        this.suggestions = [];
        this.dispatchEvent(new CustomEvent('value-changed', {
            bubbles: true,
            composed: true,
            detail: null
        }));
    };

    close() {
        this._value = this.value;
        this.suggestions = [];
    };

    renderItems() {
        const {
            suggestions,
            activeSuggestion
        } = this;

        return suggestions.map((suggestion, index) => {
            return html`
                <div
                    @click="${e => this.onClick(suggestion)}"
                >
                    ${this.renderItem(suggestion, index, index === activeSuggestion, suggestions)}
                </div>
            `;
        })
    }

    renderContainer(renderItems) {
        return html`
            <div class="suggestions">
                ${renderItems()}
            </div>
        `;
    }
}

customElements.define('auto-complete', AutoComplete);
