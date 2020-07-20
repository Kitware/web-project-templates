import vtkWSLinkClient from 'vtk.js/Sources/IO/Core/WSLinkClient';
import SmartConnect from 'wslink/src/SmartConnect';

import coneProtocol from 'vue-vtkjs-pvw-template/src/io/protocol';

import { Mutations } from 'vue-vtkjs-pvw-template/src/store/TYPES';

import { connectImageStream } from 'vtk.js/Sources/Rendering/Misc/RemoteView';

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect);

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
    NETWORK_CONNECT({ commit, state }) {
      const { config, client } = state;
      if (client && client.isConnected()) {
        client.disconnect();
      }
      let clientToConnect = client;
      if (!clientToConnect) {
        clientToConnect = vtkWSLinkClient.newInstance();
        clientToConnect.setProtocols({
          Cone: coneProtocol,
        });
      }

      // Connect to busy store
      clientToConnect.onBusyChange((count) => {
        commit(Mutations.BUSY_COUNT_SET, count);
      });
      clientToConnect.beginBusy();

      // Error
      clientToConnect.onConnectionError((httpReq) => {
        const message =
          (httpReq && httpReq.response && httpReq.response.error) ||
          `Connection error`;
        console.error(message);
        console.log(httpReq);
      });

      // Close
      clientToConnect.onConnectionClose((httpReq) => {
        const message =
          (httpReq && httpReq.response && httpReq.response.error) ||
          `Connection close`;
        console.error(message);
        console.log(httpReq);
      });

      // Connect
      clientToConnect
        .connect(config)
        .then((validClient) => {
          connectImageStream(validClient.getConnection().getSession());
          commit(Mutations.NETWORK_CLIENT_SET, validClient);
          clientToConnect.endBusy();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
