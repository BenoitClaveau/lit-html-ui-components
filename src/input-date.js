import { LitElement, html, css } from 'lit-element';
import Input from './input.js';

/**
 * Input + icon dropdown
 */
export default class InputDate extends Input {

  static get styles() {
    return [
      super.styles,
      css`
            :host {
                grid-template-columns: 1fr;
            }
            input::-webkit-calendar-picker-indicator { 
              color: #777; 
            }
            input::-webkit-clear-button { 
                font-size: 18px;
                fill: #777; 
            } 
            input::-webkit-inner-spin-button { 
                margin-top: 6px; 
                color: #777; 
            }
        `
    ];
  }

  constructor() {
    super();
    this.type = "date";
    this.addEventListener("blur", e => this.blurHandler(e));
  }

  renderClearButton() {
    return null;
  }

  getValue() {
    if (!this.value) return null;

    const day = ('0' + this.value.getDate()).slice(-2);
    const month = ('0' + (this.value.getMonth() + 1)).slice(-2);
    const year = this.value.getFullYear();

    return `${year}-${month}-${day}`;
  }

  blurHandler(e) {
    const path = e.path || (e.composedPath && e.composedPath());
    const { value } = path[0];
    if (value != this.value) {
      this.dispatchEvent(new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: {
          value
        }
      }));
    }
  }
}

