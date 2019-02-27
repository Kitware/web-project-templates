// import Vue from 'vue';
import Vuex from 'vuex';

/* eslint-enable no-param-reassign */

function createStore() {
  return new Vuex.Store({
    state: {
      dark: false,
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
