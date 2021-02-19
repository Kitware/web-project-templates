import { mapGetters, mapActions } from 'vuex';
import logo from 'vue-vtkjs-pvw-template/src/assets/logo.png';
import RemoteRenderingView from 'vue-vtkjs-pvw-template/src/components/widgets/RemoteRenderingView';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    RemoteRenderingView,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapGetters({
      client: 'WS_CLIENT',
      busy: 'WS_BUSY',
      resolution: 'CONE_RESOLUTION',
    }),
  },
  methods: {
    ...mapActions({
      setResolution: 'CONE_UPDATE_RESOLUTION',
      initializeCone: 'CONE_INITIALIZE',
      resetCamera: 'CONE_RESET_CAMERA',
      connect: 'WS_CONNECT',
    }),
  },
  watch: {
    client() {
      // This only happen once when the connection is ready
      this.initializeCone();
    },
  },
  mounted() {
    this.connect();
  },
};
