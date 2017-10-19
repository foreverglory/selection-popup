/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import Vue from 'vue';

var Layout = Vue.extend({
  template: `
  <div>
    <p>通过划词，实现立即进行搜索、翻译等功能</p>
    <p>目前仅支持<em>百度搜索</em>、<em>必应搜索</em>、<em>金山词霸</em>及<em>MDN查询</em></p>
    <p></p>
    <p>后期将逐步实现可配置，更人性化的划词操作。</p>
    <p></p>
    <p></p>
    <p>意见反馈：<a href="https://github.com/foreverglory/selection-popup/issues" target="_blank">提供划词工具，功能BUG反馈</a></p>
    <p>源码地址：<a href="https://github.com/foreverglory/selection-popup" target="_blank">https://github.com/foreverglory/selection-popup</a></p>
  </div>
`,
  data() {
    return {
      storage: {}
    }
  },
  methods: {
    clear() {
      browser.storage.local.clear().then(() => {
        //todo: clear storage
      });
    }
  }
});

new Vue({
  el: '#root',
  template: '<Layout/>',
  components: {Layout},
});

