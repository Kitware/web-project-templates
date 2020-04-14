import logo from 'vue-vtkjs-pvw-template/src/assets/logo.png';
import VtkView from 'vue-vtkjs-pvw-template/src/components/widgets/VtkView';
import RemoteRenderingView from 'vue-vtkjs-pvw-template/src/components/widgets/RemoteRenderingView';
import ProgressBar from 'vue-vtkjs-pvw-template/src/components/widgets/ProgressBar';

import { Mutations, Actions } from 'vue-vtkjs-pvw-template/src/store/TYPES';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    VtkView,
    RemoteRenderingView,
    ProgressBar,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    client() {
      return this.$store.getters.NETWORK_CLIENT;
    },
    darkMode: {
      get() {
        return this.$store.getters.APP_DARK_THEME;
      },
      set(value) {
        this.$store.commit(Mutations.APP_DARK_THEME_SET, value);
      },
    },
    busyPercent() {
      return this.$store.getters.BUSY_PROGRESS;
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
  watch: {
    client() {
      // Setup view for remote rendering
      this.$store.dispatch(Actions.VIEW_REMOTE_RENDERING_SETUP);

      // This only happen once when the connection is ready
      this.$store.dispatch(Actions.CONE_INITIALIZE);
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

    // Initiate network connection
    const config = { application: 'cone' };
    if (location.host === 'localhost:8080') {
      // We suppose that we have dev server and that ParaView/VTK is running on port 1234
      config.sessionURL = 'ws://localhost:1234/ws';
    }
    this.$store.commit(Mutations.NETWORK_CONFIG_SET, config);
    this.$store.dispatch(Actions.NETWORK_CONNECT);

    setInterval(
      () => this.$store.dispatch(Actions.BUSY_UPDATE_PROGRESS, 1),
      50
    );
  },
};
