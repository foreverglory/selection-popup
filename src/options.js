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
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Row>
    <Col span="3" style="padding:6px;" align="center">激活：</Col>
    <Col span="2" style="padding-top:6px; text-align:center;"><label class="select-label">按键</label></Col>
    <Col span="5">
    <Select v-model="key">
      <Option value="0">无</Option>
      <Option value="17">Ctrl/Control</Option>
      <Option value="18">Alt</Option>
      <Option value="16">Shift</Option>
    </Select>
    </Col>
    <Col span="1" style="padding-top:6px;" align="center">+</Col>
    <Col span="2" style="padding-top:6px; text-align:center;">鼠标</Col>
    <Col span="5">
    <Select v-model="mouse">
      <Option value="1">Left</Option>
      <Option value="2">Center</Option>
      <Option value="3">Right</Option>
    </Select>
    </Col>
    <Col span="2" offset="3"><Button type="success" login v-on:click="saveActivate">保存</Button></Col>
    </Row>
    <br/>
    <setting></setting>
    <p></p>
    <p>意见反馈：<a href="https://github.com/foreverglory/selection-popup/issues" target="_blank">提供划词工具，功能BUG反馈</a></p>
    <p>源码地址：<a href="https://github.com/foreverglory/selection-popup" target="_blank">https://github.com/foreverglory/selection-popup</a></p>
  </div>
`,
  components: {
    Setting
  },
  computed: {
    key: {
      get: function() {
        return this.$store.state.activate.key;
      },
      set: function(value) {
        this.$store.state.activate.key = value;
      }
    },
    mouse: {
      get: function() {
        return this.$store.state.activate.mouse;
      },
      set: function(value) {
        this.$store.state.activate.mouse = value;
      }
    }
  },
  data() {
    return {
      spinShow: false,
      storage: {}
    }
  },
  methods: {
    saveActivate(){
      this.spinShow = true;
      this.$store.dispatch('updateActivate',{
        key: this.key,
        mouse: this.mouse
      }).then(() => {
        this.spinShow = false;
        this.$Message.success('更新成功');
      });
    }
  }
});

new Vue({
  store,
  el: '#root',
  template: '<Layout/>',
  components: {
    Layout
  },
  created() {
    this.$store.dispatch('init').then(() => {

    });
  },
});