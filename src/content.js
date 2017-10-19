/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
console.log('Hello, Selection Popup WebExtensions.');

import Vue from 'vue';
import store from './js/store.js';
import Popup from './Popup.vue';

var images = {
  loading: browser.extension.getURL("images/loading.gif")
};

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    console.log("complete");
  }
};
browser.runtime.onMessage.addListener((message) => {
  return Promise.resolve({
    response: "Get it."
  });
});
Vue.config.productionTip = false;
new Vue({
  store,
  el: '#selection-popup',
  template: '<Popup/>',
  components: {Popup},
  beforeCreate() {
    let element = document.createElement('selection-popup');
    element.id = 'selection-popup';
    document.body.appendChild(element);
  },
  created() {
    this.$store.dispatch('init').then(() => {

    });
  },
  mounted() {
    var vm = this;
  }
});