import { LitElement, html, css } from 'lit-element';

/**
 * https://html.spec.whatwg.org/multipage/custom-elements.html
 */
export default class Button extends LitElement {

    static get styles() {
        return css`
            :host {
                position: relative;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                border: none;
                outline: none;
                box-sizing: border-box;
                overflow: hidden;

                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;
            }
            #button {
                cursor: pointer;

                border: none;
                
                min-height: inherit;
                height: inherit;
                max-height: inherit;
                min-width: inherit;
                width: inherit;
                max-width: inherit;
                border-radius: inherit;
                outline: inherit;

                background: inherit;
                color: inherit;
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

    // constructor() {
    //     super();

        

    //     // this._observer = new MutationObserver(() => {
    //     //     this.setAttribute("aria-label", this.textContent);
    //     // });
    // }

    // connectedCallback() {
    //     this.setAttribute("role", "button");
    //     this.setAttribute("tabindex", "0");

    //     this._observer.observe(this, {
    //         childList: true,
    //         characterData: true,
    //         subtree: true
    //     });
    //     return super.connectedCallback();
    // }

    // disconnectedCallback() {
    //     this._observer.disconnect();
    // }


    // attributeChangedCallback() {
    //     // only is called for the disabled attribute due to observedAttributes
    //     if (this.disabled) {
    //         this.removeAttribute("tabindex");
    //         this.setAttribute("aria-disabled", "true");
    //     } else {
    //         this.setAttribute("tabindex", "0");
    //         this.setAttribute("aria-disabled", "false");
    //     }
    // }

    cancelRipple() {
        if (!this.circle) return;
        const circle = this.circle;
        this.circle = null;
        circle.addEventListener("animationend", () => circle.remove());
        circle.classList.add("rippleout");
    }

    createRipple(e) {
        if (this.circle) this.button.removeChild(this.circle);
        const circle = document.createElement("div");
        const d = Math.max(this.button.clientWidth, this.button.clientHeight);
        circle.style.width = circle.style.height = d + "px";
        const rect = this.button.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left - d / 2 + "px";
        circle.style.top = e.clientY - rect.top - d / 2 + "px";
        circle.classList.add("ripple");
        this.circle = circle;
        this.button.appendChild(circle);
    }

    firstUpdated() {
        this.button = this.shadowRoot.querySelector("#button");

        this.button.addEventListener("keydown", e => {
            if (e.keyCode === 32 || e.keyCode === 13) {
                this.dispatchEvent(new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true
                }));
            }
        });

        this.button.addEventListener("click", e => {
            if (this.disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        this.button.addEventListener("mousedown", e => {
            this.createRipple(e);
            const onmouseup = (e) => {
                document.removeEventListener("mouseup", onmouseup);
                this.cancelRipple();
            };
            document.addEventListener("mouseup", onmouseup);
        });
    }

    render() {
        return html`
            <button id="button">
            ${ this.renderContent() }
            </button>
        `;
    }

    renderContent() {
        return html`<slot></slot>`;
    }
}