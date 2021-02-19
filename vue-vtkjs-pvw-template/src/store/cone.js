export default {
  state: {
    resolution: 6,
  },
  getters: {
    CONE_RESOLUTION(state) {
      return state.resolution;
    },
  },
  mutations: {
    CONE_RESOLUTION_SET(state, value) {
      state.resolution = value;
    },
  },
  actions: {
    CONE_INITIALIZE({ rootState }) {
      const client = rootState.wslink.client;
      if (client) {
        client
          .getRemote()
          .Cone.createVisualization()
          .catch(console.error);
      }
    },
    CONE_UPDATE_RESOLUTION({ rootState, commit }, resolution) {
      commit('CONE_RESOLUTION_SET', resolution);
      const client = rootState.wslink.client;
      if (client) {
        client.getRemote().Cone.updateResolution(resolution);
      }
    },
    CONE_RESET_CAMERA({ rootState }) {
      const client = rootState.wslink.client;
      if (client) {
        client
          .getRemote()
          .Cone.resetCamera()
          .catch(console.error);
      }
    },
  },
};
