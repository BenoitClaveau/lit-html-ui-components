import { LitElement, html, css } from 'lit-element';
import Input from './input.js';

/**
 * Input + ui-icon dropdown
 */
export default class InputDate extends Input {

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

