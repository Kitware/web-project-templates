// import Vue from 'vue';
import Vuex from 'vuex';

import busy from 'vue-vtkjs-pvw-template/src/store/busy';
import cone from 'vue-vtkjs-pvw-template/src/store/cone';
import wslink from 'vue-vtkjs-pvw-template/src/store/wslink';
import view from 'vue-vtkjs-pvw-template/src/store/view';

/* eslint-enable no-param-reassign */

function createStore() {
  return new Vuex.Store({
    state: {
      dark: false,
    },
    modules: {
      busy,
      cone,
      wslink,
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
