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
      return state.types.find((type) => {
        return type.id == state.typeId;
      });
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
    updataTypes(state, types) {
      state.types = types;
    },
    startSubmit(state, {word, typeId}) {
      state.word = word.trim();
      state.typeId = typeId;
      state.error = null;
      state.loading = true;
    },
    stopSubmit(state, {word, typeId, error, result}) {
      if (error) {
        state.error = error;
      } else {
        state.result = result;
      }
      state.loading = false;
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
      let {word, typeId} = parameters;
      context.commit('startSubmit', {word, typeId});
      let type = context.getters.type;
      return query(word, type).then((result) => {
        context.commit('stopSubmit', {word, typeId, result});
        return context.commit('update', result);
      }).catch((error) => {
        context.commit('stopSubmit', {word, typeId, error});
        throw error;
      });
    },
    updateType(context, type) {
      return context.dispatch('initTypes').then((types) => {
        if (isEmpty(type.id)) {
          type.id = (Date.now()).toString(36);
          types.push(type);
        } else {
          types = types.map((item) => {
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