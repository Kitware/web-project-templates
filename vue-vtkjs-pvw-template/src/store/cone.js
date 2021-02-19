export default {
  state: {
    resolution: 6,
  },
  getters: {
    CONE_RESOLUTION(state) {
      return state.resolution;
    },
  },
  actions: {
    async CONE_RESOLUTION_UPDATE({ state, dispatch }, resolution) {
      const r = Number(resolution);
      state.resolution = r;
      return dispatch('WS_UPDATE_RESOLUTION', r);
    },
  },
};
