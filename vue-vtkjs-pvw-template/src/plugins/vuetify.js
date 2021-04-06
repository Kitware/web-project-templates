import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  // Config for components to keep during treeshaking
  // Default = all
});

export default new Vuetify({
  // Config for icons
  icons: {
    iconfont: 'mdi',
    values: {
      resetCamera: 'mdi-camera',
    },
  },
});
