/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import Vue from 'vue';
import mixins from './js/mixins';
import * as filters from './js/filters';
import store from './js/store.js';

Vue.mixin(mixins);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

import Popup from './Popup.vue';

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