/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import mixins from './js/mixins';
import * as filters from './js/filters';
import store from './js/store';

Vue.mixin(mixins);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.use(iView);

import Setting from './components/Setting.vue';

var Layout = Vue.extend({
  template: `
  <div>
    <setting></setting>
    <p></p>
    <p>意见反馈：<a href="https://github.com/foreverglory/selection-popup/issues" target="_blank">提供划词工具，功能BUG反馈</a></p>
    <p>源码地址：<a href="https://github.com/foreverglory/selection-popup" target="_blank">https://github.com/foreverglory/selection-popup</a></p>
  </div>
`,
  components: {Setting},
  data() {
    return { 
      storage: {}
    }
  },
  methods: {

  }
});

new Vue({
  store,
  el: '#root',
  template: '<Layout/>',
  components: {Layout},
  created() {
    this.$store.dispatch('init').then(() => {

    });
  },
});

