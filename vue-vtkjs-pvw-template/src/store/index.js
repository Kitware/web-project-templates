// import Vue from 'vue';
import Vuex from 'vuex';

import cone from 'vue-vtkjs-pvw-template/src/store/cone';
import wslink from 'vue-vtkjs-pvw-template/src/store/wslink';

/* eslint-enable no-param-reassign */

function createStore() {
  return new Vuex.Store({
    modules: {
      cone,
      wslink,
    },
  });
}

export default createStore;
