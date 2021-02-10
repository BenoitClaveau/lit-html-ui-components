import { svg } from "lit-element";

export const close = ({ width=24, height=24 } = {}) => 
    svg`<svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 24 24">
        <g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
    </svg>`;

export const expandLess = ({ width=24, height=24 } = {}) => 
    svg`<svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 24 24">
        <g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
    </svg>`;

export const expandMore = ({ width=24, height=24 } = {}) => 
    svg`<svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 24 24">
        <g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
    </svg>`;