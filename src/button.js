import { LitElement, html, css } from 'lit-element';

/**
 * https://html.spec.whatwg.org/multipage/custom-elements.html
 */
export default class Button extends LitElement {

    static get styles() {
        return css`
            :host {
                position: relative;

                border: none;
                outline: none;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                cursor: pointer;
                user-select: none;
                overflow: hidden;

                color: #000;
                background-color: #f0f0f0;

                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;

                box-sizing: border-box;
                min-height: 36px;
                padding-left: 16px;
                padding-right: 16px;

            }
            [disabled] {
                opacity: 0.6;
                cursor: not-allowed;
            }
            .ripple {
                opacity: 0.3;
                border-radius: 50%;
                background-color: var(--ripple-color, black);
                position: absolute;
                transform: scale(0);
                animation: ripple 0.6s forwards;
            }
            .rippleout {
                opacity: 0.15;
                transform: scale(2.5);
                animation: rippleout 0.6s forwards;
            }
            @keyframes ripple {
                to {
                    transform: scale(2.5);
                    opacity: 0.15;
                }
            }
            @keyframes rippleout {
                to {
                    opacity: 0;
                }
            }
        `;
    }


    static get properties() { 
        return {
            disabled: {
                attribute: "disabled",
                type: Boolean
            }
        }
    }

    constructor() {
        super();

        this.addEventListener("keydown", e => {
            if (e.keyCode === 32 || e.keyCode === 13) {
                this.dispatchEvent(new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true
                }));
            }
        });

        this.addEventListener("click", e => {
            if (this.disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        this.addEventListener("mousedown", e => {
            this.createRipple(e);
            const onmouseup = (e) => {
                document.removeEventListener("mouseup", onmouseup);
                this.cancelRipple();
            };
            document.addEventListener("mouseup", onmouseup);
        });

        this._observer = new MutationObserver(() => {
            this.setAttribute("aria-label", this.textContent);
        });
    }

    connectedCallback() {
        this.setAttribute("role", "button");
        this.setAttribute("tabindex", "0");

        this._observer.observe(this, {
            childList: true,
            characterData: true,
            subtree: true
        });
        return super.connectedCallback();
    }

    disconnectedCallback() {
        this._observer.disconnect();
    }


    attributeChangedCallback() {
        // only is called for the disabled attribute due to observedAttributes
        if (this.disabled) {
            this.removeAttribute("tabindex");
            this.setAttribute("aria-disabled", "true");
        } else {
            this.setAttribute("tabindex", "0");
            this.setAttribute("aria-disabled", "false");
        }
    }

    cancelRipple() {
        if (!this.circle) return;
        const circle = this.circle;
        this.circle = null;
        circle.addEventListener("animationend", () => circle.remove());
        circle.classList.add("rippleout");
    }

    createRipple(e) {
        if (this.circle) this.container.removeChild(this.circle);
        const circle = document.createElement("div");
        const d = Math.max(this.container.clientWidth, this.container.clientHeight);
        circle.style.width = circle.style.height = d + "px";
        const rect = this.container.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left - d / 2 + "px";
        circle.style.top = e.clientY - rect.top - d / 2 + "px";
        circle.classList.add("ripple");
        this.circle = circle;
        this.container.appendChild(circle);
    }

    firstUpdated() {
        this.container = this.shadowRoot.querySelector("#container");
    }

    render() {
        return html`
            <div id="container">
            ${ this.renderContent() }
            </div>
        `;
    }

    renderContent() {
        return html`<slot></slot>`;
    }
}