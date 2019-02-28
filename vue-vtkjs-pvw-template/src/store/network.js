import Client from 'vue-vtkjs-pvw-template/src/io/Client';
import { Mutations, Actions } from 'vue-vtkjs-pvw-template/src/store/TYPES';

export default {
  state: {
    client: null,
    config: null,
  },
  getters: {
    NETWORK_CLIENT(state) {
      return state.client;
    },
    NETWORK_CONFIG(state) {
      return state.config;
    },
  },
  mutations: {
    NETWORK_CLIENT_SET(state, client) {
      state.client = client;
    },
    NETWORK_CONFIG_SET(state, config) {
      state.config = config;
    },
  },
  actions: {
    NETWORK_CONNECT({ commit, dispatch, state }) {
      const { config, client } = state;
      if (client && client.isConnected()) {
        client.disconnect();
      }
      const clientToConnect = client || new Client();

      clientToConnect.setBusyCallback((count) => {
        commit(Mutations.BUSY_COUNT_SET, count);
      });

      clientToConnect.updateBusy(+1);

      clientToConnect.setConnectionErrorCallback((type, httpReq) => {
        const message =
          (httpReq && httpReq.response && httpReq.response.error) ||
          `Connection ${type}`;
        console.error(message);
        console.log(httpReq);
      });

      clientToConnect
        .connect(config)
        .then((validClient) => {
          commit(Mutations.NETWORK_CLIENT_SET, validClient);
          dispatch(Actions.COLOR_FETCH_PRESET_NAMES, 500);
          clientToConnect.updateBusy(-1);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
