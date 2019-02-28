import { Mutations } from 'vue-vtkjs-template/src/store/TYPES';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

export default {
  state: {
    coneSource: null,
    resolution: 6,
  },
  getters: {
    CONE_RESOLUTION(state) {
      return state.resolution;
    },
    CONE_SOURCE(state) {
      return state.coneSource;
    },
  },
  mutations: {
    CONE_RESOLUTION_SET(state, value) {
      state.resolution = value;
    },
    CONE_SOURCE_SET(state, value) {
      state.coneSource = value;
    },
  },
  actions: {
    CONE_INITIALIZE({ rootState, commit }) {
      const coneSource = vtkConeSource.newInstance({ height: 1.0 });

      const mapper = vtkMapper.newInstance();
      mapper.setInputConnection(coneSource.getOutputPort());

      const actor = vtkActor.newInstance();
      actor.setMapper(mapper);

      commit(Mutations.CONE_SOURCE_SET, coneSource);
      const viewProxy = rootState.view.viewProxy;

      viewProxy.getRenderer().addActor(actor);
      viewProxy.resetCamera();
      viewProxy.renderLater();
    },
    CONE_UPDATE_RESOLUTION({ state, rootState, commit }, resolution) {
      commit(Mutations.CONE_RESOLUTION_SET, resolution);

      const viewProxy = rootState.view.viewProxy;
      state.coneSource.setResolution(resolution);
      viewProxy.renderLater();
    },
    CONE_RESET_CAMERA({ rootState }) {
      const viewProxy = rootState.view.viewProxy;
      viewProxy.resetCamera();
      viewProxy.renderLater();
    },
  },
};
