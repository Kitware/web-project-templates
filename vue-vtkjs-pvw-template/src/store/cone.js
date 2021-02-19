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
};
