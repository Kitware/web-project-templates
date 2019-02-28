import { mapActions } from 'vuex';

import logo from 'vue-vtkjs-pvw-template/src/assets/logo.svg';
import VtkView from 'vue-vtkjs-pvw-template/src/components/widgets/VtkView';
import { Actions } from 'vue-vtkjs-pvw-template/src/store/TYPES';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

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
    client() {
      return this.$store.getters.NETWORK_CLIENT;
    },
    darkMode() {
      return this.$store.getters.APP_DARK_THEME;
    },
    busyPercent() {
      return this.$store.getters.BUSY_PROGRESS;
    },
  },
  mounted() {
    // Setup vtk pipeline
    const viewProxy = this.$refs.vtkViewComponent.view;

    const coneSource = vtkConeSource.newInstance({ height: 1.0 });

    const mapper = vtkMapper.newInstance();
    mapper.setInputConnection(coneSource.getOutputPort());

    const actor = vtkActor.newInstance();
    actor.setMapper(mapper);

    viewProxy.getRenderer().addActor(actor);
    viewProxy.resetCamera();
    viewProxy.renderLater();
  },
  methods: mapActions({
    connect: Actions.NETWORK_CONNECT,
  }),
};
