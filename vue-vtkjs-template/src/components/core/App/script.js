import logo from 'vue-vtkjs-template/src/assets/logo.svg';
import VtkView from 'vue-vtkjs-template/src/components/widgets/VtkView';
import { Mutations, Actions } from 'vue-vtkjs-template/src/store/TYPES';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    VtkView,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.getters.APP_DARK_THEME;
      },
      set(value) {
        this.$store.commit(Mutations.APP_DARK_THEME_SET, value);
      },
    },
    resolution: {
      get() {
        return this.$store.getters.CONE_RESOLUTION;
      },
      set(value) {
        this.$store.dispatch(Actions.CONE_UPDATE_RESOLUTION, Number(value));
      },
    },
  },
  methods: {
    resetCamera() {
      this.$store.dispatch(Actions.CONE_RESET_CAMERA);
    },
  },
  mounted() {
    // Register view to the store
    this.$store.commit(
      Mutations.VIEW_PROXY_SET,
      this.$refs.vtkViewComponent.view
    );
    this.$store.dispatch(Actions.CONE_INITIALIZE);
  },
};
