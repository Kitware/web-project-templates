import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import App from 'vue-vtkjs-template/src/components/core/App';
import store from 'vue-vtkjs-template/src/store';

/* eslint-disable-next-line import/extensions */
import 'typeface-roboto';
import 'vuetify/dist/vuetify.min.css';

// Bring OpenGL rendering for basic geometry
import 'vtk.js/Sources/Rendering/OpenGL/Profiles/Geometry';

Vue.use(Vuex);
Vue.use(Vuetify);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
