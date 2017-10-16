/* 
 * This file is part of the current project.
 * 
 * (c) ForeverGlory <http://foreverglory.me/>
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import storage from './storage.js';
import query from './query.js';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    types: [],
    selected: false,
    popped: false,

    loading: false,

    word: '',
    typeId: '',
    auto: false,
    error: '',
    result: []
  },
  getters: {
    type(state) {
      for (let type of state.types) {
        if (type.id == state.typeId) {
          return type;
        }
      }
    }
  },
  mutations: {
    reset(state) {
      state.word = '';
      state.typeId = '';
      state.error = '';
      state.selected = false;
      state.popped = false;
      state.auto = false;
      state.loading = false;
      state.result = [];
    },
    selected(state, boolean) {
      state.selected = boolean;
    },
    popup(state, {word, typeId, auto = false}){
      state.popped = true;
      state.word = word;
      state.typeId = typeId;
      state.auto = auto;
    },
    update(state, result) {
      state.result = result;
    },
    loading(state, boolean) {
      state.loading = boolean;
    },
    error(state, error) {
      state.error = error;
    }
  },
  actions: {
    init(context) {
      return storage.getTypes().then((types) => {
        context.state.types = types;
      });
    },
    submit(context, parameters = {}){
      let {word, typeId} = parameters;
      let type = {};
      for (let item of context.state.types) {
        if (item.id == typeId) {
          type = item;
        }
      }
      context.commit('error', '');
      context.commit('loading', true);
      return query(word, type).then((result) => {
        context.commit('loading', false);
        return context.commit('update', result);
      }).catch((error) => {
        console.log(error);
        context.commit('loading', false);
        context.commit('error', error.message);
        throw error;
      });
    }
  }
});
export default store;