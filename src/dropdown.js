import { LitElement, html, css } from 'lit-element';

export default class Dropdown extends LitElement {

    static get styles() {
        return css`
            .container {
                position: fixed;
                z-index: 99;
                overflow: hidden;
                margin-top: 4px;
                border-radius: 4px;
                max-height: 400px;
                overflow: auto;
                min-width: 204px;

                background-color: #f0f0f0;
                color: #111;
                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
            }
            .container > * {
                padding: 6px 8px;
                cursor: pointer;
                border-bottom: 1px solid #d4d4d4;
                min-height: 24px;
            }
        `;
    }

    static get properties() {
        return {
            items: Array,
            activeIndex: Number,
        }
    }

    render() {
        return html`
            <div class="container">
                ${this.renderItems()}
            </div>
        `;
    }

    renderItems() {
        const {
            items,
            activeIndex
        } = this;

        if (!items || items.length == 0) return null;

        return items.map((item, index) => {
            return html`
                <div
                    @click="${e => this.onSelect(e, item, index)}"
                >
                    ${this.renderItem(item, index, index === activeIndex)}
                </div>
            `;
        })
    }

    renderItem(item, index, isActive) {
        throw new Error("Not implemented!");
    }

    onSelect(e, item, index) {
        this.dispatchEvent(new CustomEvent("select", {
            bubbles: true,
            composed: true,
            detail: {
                item: item,
                index: index,
            }
        }));
    };

    // onKeyUp(e) {
    //     const previous = this._value;
    //     const path = e.path || (e.composedPath && e.composedPath());
    //     this._value = path[0].value;

    //     if (this._value != previous) {
    //         this.dispatchEvent(new CustomEvent('filter-changed', {
    //             bubbles: true,
    //             composed: true,
    //             detail: { value: this._value }
    //         }));
    //     }
    //     else {
    //         if (e.keyCode === 13) {
    //             this.activeIndex = 0
    //         }
    //         // User pressed the up arrow
    //         else if (e.keyCode === 38) {
    //             if (activeIndex === 0) {
    //                 return;
    //             }

    //             this.activeIndex = this.activeIndex - 1;
    //         }
    //         // User pressed the down arrow
    //         else if (e.keyCode === 40) {
    //             if (this.activeIndex - 1 === this.suggestions.length) {
    //                 return;
    //             }
    //             this.activeIndex = this.activeIndex + 1;
    //         }
    //     }
    // };
}
