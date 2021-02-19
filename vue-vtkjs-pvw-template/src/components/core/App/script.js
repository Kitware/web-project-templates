import { mapGetters, mapActions } from 'vuex';
import logo from 'vue-vtkjs-pvw-template/src/assets/logo.png';
import RemoteRenderingView from 'vue-vtkjs-pvw-template/src/components/widgets/RemoteRenderingView';
import ProgressBar from 'vue-vtkjs-pvw-template/src/components/widgets/ProgressBar';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    RemoteRenderingView,
    ProgressBar,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapGetters({ client: 'WS_CLIENT', busyPercent: 'BUSY_PROGRESS' }),
    resolution: {
      get() {
        return this.$store.getters.CONE_RESOLUTION;
      },
      set(value) {
        this.updateConeResolution(Number(value));
      },
    },
  },
  watch: {
    client() {
      // This only happen once when the connection is ready
      this.initializeCone();
    },
  },
  methods: {
    ...mapActions({
      updateConeResolution: 'CONE_UPDATE_RESOLUTION',
      initializeCone: 'CONE_INITIALIZE',
      resetCamera: 'CONE_RESET_CAMERA',
      connect: 'WS_CONNECT',
      updateBusy: 'BUSY_UPDATE_PROGRESS',
    }),
  },
  mounted() {
    // Register view to the store
    if (this.$refs.vtkViewComponent) {
      this.$store.commit('VIEW_PROXY_SET', this.$refs.vtkViewComponent.view);
    }

    this.connect();

    setInterval(() => this.updateBusy(1), 50);
  },
};
