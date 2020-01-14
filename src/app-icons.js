/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt

Sources:
  - http://svgicons.sparkk.fr/
  
*/


import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import "@polymer/iron-icons/device-icons.js";
import "@polymer/iron-icons/social-icons.js";
import "@polymer/iron-icons/editor-icons.js";
import "@polymer/iron-icons/maps-icons.js";
import "@polymer/iron-icons/av-icons.js";
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

const template = html`<iron-iconset-svg name="app" size="24">
<svg><defs>
<g id="facebook"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></g>
<g id="twitter"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></g>
<g id="mail" transform="translate(-3 -3) scale(1.5)"><path d="M17.4 4.8H2.6c-0.2 0-0.4 0.2-0.4 0.4v9.7c0 0.2 0.2 0.4 0.4 0.4h14.8c0.2 0 0.4-0.2 0.4-0.4v-9.7C17.8 4.9 17.6 4.8 17.4 4.8M16.4 5.5L10 12 3.6 5.5H16.4ZM3 6.1l3.9 3.9 -3.9 3.9V6.1ZM3.6 14.5l3.9-3.9 2.3 2.3c0.2 0.2 0.4 0.2 0.5 0l2.3-2.3 3.9 3.9H3.6ZM17 13.9l-3.9-3.9 3.9-3.9V13.9Z"></path></g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild(template.content);
