import Tag from "lit-html-ui-components/src/tag";
import Tags from "lit-html-ui-components/src/tags";
import Dropdown from "lit-html-ui-components/src/dropdown";

customElements.define("ui-tag", Tag);

customElements.define("ui-tags-dropdown", class extends Dropdown {

    static get styles() {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    background-color: #f0f0f0;
                    border: 1px solid #e4e4e4;
                    max-height: 160px;
                }
                :host > * {
                    border: 1px solid #e4e4e4;
                    font-size: 14px;
                    font-weight: 400;
                    min-height: 18px;
                    padding: 2px 8px;
                }
            `
            
        ]
    }

    renderItem(item, index, isActive) {
        return item;
    }
});

customElements.define("ui-tags", class extends Tags {

    static get properties() {
        return {
            ...super.properties,
        }
    }

    getInputValue(item) {
        return `${item}`;
    }

    initInputValue() {
        const { value } = this;
        this.tags = value;
        this.inputValue = "";
    }

    renderTag(label, index) {
        return html`
            <ui-tag
                .label=${label}
                .index=${index}
            ></ui-tag>
        `
    }

    renderDropdown() {
        return html`
            <tag-dropdown
                .items="${this.items}"
            ></tag-dropdown>
        `
    }

    renderInput() {
        return html`
            <ui-input
                .value="${this.inputValue}"
                .dropdown="${this.dropdown}"
            ></ui-input>
        `
    }

});


