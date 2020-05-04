import { LitElement, html, css } from 'lit-element';

/**
 * events:
 * - select (item: object, index: number)
 * - submit (value: text)
 * 
 * methods to be defined:
 * - getInputValue (-> text): retourne le texte à afficher dans l'input pour un item.
 * - initInputValue: initialise this.inputValue avec lors de la création
 * - renderComponent
 * - renderDropdown
 */
export default class Dropdownable extends LitElement {

    static get styles() {
        return [
            css`
                #dropdown {
                    position: relative;
                    overflow: visible;
                }
            `
        ];
    }

    static get properties() {
        return {
            value: Object,      // value du composant
            dropdown: Boolean,  // true si dropdown est visible,
        }
    }

    constructor() {
        super();
        this.windowClickHandler = (e) => this._windowClickHandler(e);
        this.windowResizeHandler = (e) => this._windowResizeHandler(e);

        this.addEventListener('open', e => this.openHandler(e));
        this.addEventListener('close', e => this.closeHandler(e));

        this.addEventListener('select', e => this.dropdownSelectHandler(e));
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('value')) { // value a été changé depuis l'exterieur, j'écrase la valeur
            this.dropdown = false;
            this.initComponent();
        }
        return super.shouldUpdate(changedProperties);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('click', this.windowClickHandler);
        window.addEventListener('resize', this.windowResizeHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('click', this.windowClickHandler);
        window.removeEventListener('resize', this.windowResizeHandler);
    }

    _windowClickHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        const inside = path.some(e => e == this);
        if (!inside && this.dropdown) {
            this.dropdown = false;
        }
    }

    _windowResizeHandler(e) {
        this.dropdown = false;
    }

    openHandler(e) {
        this.dropdown = true;
    }

    closeHandler(e) {
        e.stopPropagation();
        this.dropdown = false;
    }

    dropdownSelectHandler(e) {
        const path = e.path || (e.composedPath && e.composedPath());
        if (path[0] === this) return; // Emit par moi-même.
        this.dropdown = false;
    }

    render() {
        const { dropdown } = this;

        return html`
            ${ this.renderComponent()}
            ${ dropdown ?
                html`<div id="dropdown">${this.renderDropdown()}</div>` :
                null
            }
        `;
    }

    /**
     * Initialise les données du composant principal.
     */
    initComponent(item) {
        throw new Error("Not implemented!");
    }

	/**
     * Render du composant principal
     * ex: ui-buttion, ui-touchable, ui-input.....
     */
    renderComponent() {
        /**
         * placeholder,
         * value
         */
        throw new Error("Not implemented!");
    }

	/**
     * Render du composant affichant le dropdown.
     * ex: ui-dropdown
     */
    renderDropdown() {
        throw new Error("Not implemented!");
    }
}
