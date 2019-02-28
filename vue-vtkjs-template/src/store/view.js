export default {
  state: {
    viewProxy: null,
  },
  getters: {
    VIEW_PROXY(state) {
      return state.viewProxy;
    },
  },
  mutations: {
    VIEW_PROXY_SET(state, viewProxy) {
      if (state.viewProxy !== viewProxy) {
        state.viewProxy = viewProxy;
      }
    },
  },
  actions: {},
};
