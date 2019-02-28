// import Vue from 'vue';
import Vuex from 'vuex';

import cone from 'vue-vtkjs-template/src/store/cone';
import view from 'vue-vtkjs-template/src/store/view';

/* eslint-enable no-param-reassign */

function createStore() {
  return new Vuex.Store({
    state: {
      dark: false,
    },
    modules: {
      cone,
      view,
    },
    getters: {
      APP_DARK_THEME(state) {
        return state.dark;
      },
    },
    mutations: {
      APP_DARK_THEME_SET(state, isDark) {
        state.dark = isDark;
      },
    },
  });
}

export default createStore;
