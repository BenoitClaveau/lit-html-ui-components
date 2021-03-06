import { LitElement, html, css } from 'lit-element';

/**
 * https://html.spec.whatwg.org/multipage/custom-elements.html
 */
export default class Button extends LitElement {

    static get styles() {
        return css`
            :host {
                display: inherit;

                font-family: Roboto;
                font-weight: 500;
                font-size: 16px;
            }
            #button {
                display: var(--display, inline-flex);
                align-items: var(--align-items, center);
                justify-content: var(--justify-content, center);
                flex: 1;

                position: relative;
                overflow: hidden;
                border: none;
                background-color: var(--background-color, transparent);
                padding: var(--padding, 0);
            }
            slot {
                font-size: inherit;
                font-weight: inherit;
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