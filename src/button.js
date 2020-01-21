import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export default class Button extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;

                color: #000;
                background-color: #f0f0f0;

                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;

                min-height: 36px;
            }
            button {
                flex: 1 0 auto;

                border: none;
                outline: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                

                cursor: pointer;

                user-select: none;
                
                overflow: hidden;

                position: relative;

                background-color: transparent;
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

    render() {
        const { onmousedown } = this;

        // je calcule le style de host pour l'appliquer au bouton.
        // le css host sera donc appliqué au boutton
        const {
            height,
            minHeight,
            width,
            color,
            backgroundColor,
            fontFamily,
            fontSize,
            fontWeight,
        } = getComputedStyle(this);
        
        const styles = {
            height,
            minHeight,
            width,
            color,
            backgroundColor,
            fontFamily,
            fontSize,
            fontWeight,
        };

        return html`
            <button
                @mousedown="${onmousedown}"
                style="${styleMap(styles)}"
            >
                ${ this.renderContent()}
            </button>
        `;
    }

    firstUpdated() {
        this.button = this.shadowRoot.querySelector("button");
    }

    renderContent() {
        return html`<slot></slot>`;
    }

    onmousedown(e) {
        this.createRipple(e);
        const onmouseup = (e) => {
            document.removeEventListener("mouseup", onmouseup);
            this.cancelRipple();
        };
        document.addEventListener("mouseup", onmouseup);
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
}
