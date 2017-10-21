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
import isEmpty from 'lodash/isEmpty';
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
    error: '',
    result: null
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
      state.loading = false;
      state.result = null;
    },
    selected(state, boolean) {
      state.selected = boolean;
    },
    update(state, result) {
      state.result = result;
    },
    loading(state, boolean) {
      state.loading = boolean;
    },
    error(state, error) {
      state.error = error;
    },
    record(state, {word, typeId}){
      state.word = word;
      state.typeId = typeId;
    },
    updataTypes(state, types) {
      state.types = types;
    }
  },
  actions: {
    initTypes(context) {
      return storage.getTypes().then((types) => {
        context.commit('updataTypes', types);
        return types;
      });
    },
    init(context) {
      return Promise.all([
        context.dispatch('initTypes'),
        //todo: other init...
      ]);
    },
    submit(context, parameters = {}){
      context.commit('record', parameters);
      let {word, typeId} = parameters;
      let type = context.getters.type;
      context.commit('error', '');
      context.commit('loading', true);
      return query(word, type).then((result) => {
        context.commit('loading', false);
        return context.commit('update', result);
      }).catch((error) => {
        console.log('error', error);
        context.commit('loading', false);
        context.commit('error', error.message);
        throw error;
      });
    },
    updateType(context, type) {
      return context.dispatch('initTypes').then((types) => {
        if (isEmpty(type.id)) {
          type.id = (Date.now()).toString(36);
          types.push(type);
        } else {
          types = types.from((item) => {
            if (item.id == type.id) {
              item = type;
            }
            return item;
          });
        }
        return storage.saveTypes(types).then((types) => {
          context.commit('updataTypes', types);
          return types;
        });
      });
    },
    removeType(context, {id}){
      return context.dispatch('initTypes').then((types) => {
        types = types.filter((type) => {
          return type.id != id
        });
        return storage.saveTypes(types).then((types) => {
          context.commit('updataTypes', types);
          return types;
        });
      });
    }
  }
});
export default store;