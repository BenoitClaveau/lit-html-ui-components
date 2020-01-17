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

Tools:
  - http://kevingleason.me/Polymer-Todo/bower_components/iron-icons/demo/index.html
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

class Iconset {

  static add(str) {
    const template = html`${str}`;
    document.head.appendChild(template.content);
  }

}

export default new Iconset();