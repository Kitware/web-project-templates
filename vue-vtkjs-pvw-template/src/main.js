import Vue from 'vue';
import Vuex from 'vuex';

import App from 'vue-vtkjs-pvw-template/src/components/core/App';
import vuetify from 'vue-vtkjs-pvw-template/src/plugins/vuetify.js';
import store from 'vue-vtkjs-pvw-template/src/store';

/* eslint-disable-next-line import/extensions */
import 'typeface-roboto';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
