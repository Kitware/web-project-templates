// Import polyfills
import 'core-js/modules/es7.promise.finally';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import App from 'vue-vtkjs-template/src/components/core/App';
import store from 'vue-vtkjs-template/src/store';

/* eslint-disable-next-line import/extensions */
import 'typeface-roboto';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuex);
Vue.use(Vuetify);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
