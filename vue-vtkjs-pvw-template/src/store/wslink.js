import vtkWSLinkClient from 'vtk.js/Sources/IO/Core/WSLinkClient';
import SmartConnect from 'wslink/src/SmartConnect';

import coneProtocol from 'vue-vtkjs-pvw-template/src/io/protocol';

import { connectImageStream } from 'vtk.js/Sources/Rendering/Misc/RemoteView';

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect);

export default {
  state: {
    client: null,
    config: null,
    busy: false,
  },
  getters: {
    WS_CLIENT(state) {
      return state.client;
    },
    WS_CONFIG(state) {
      return state.config;
    },
    WS_BUSY(state) {
      return state.busy;
    },
  },
  mutations: {
    WS_CLIENT_SET(state, client) {
      state.client = client;
    },
    WS_CONFIG_SET(state, config) {
      state.config = config;
    },
    WS_BUSY_SET(state, busy) {
      state.busy = busy;
    },
  },
  actions: {
    WS_CONNECT({ commit, state }) {
      // Initiate network connection
      const config = { application: 'cone' };
      if (location.port === '8080') {
        // We suppose that we have dev server and that ParaView/VTK is running on port 1234
        config.sessionURL = `ws://${location.hostname}:1234/ws`;
      }

      const { client } = state;
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
        commit('WS_BUSY_SET', count);
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
          commit('WS_CLIENT_SET', validClient);
          clientToConnect.endBusy();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    CONE_INITIALIZE({ state }) {
      if (state.client) {
        state.client
          .getRemote()
          .Cone.createVisualization()
          .catch(console.error);
      }
    },
    CONE_UPDATE_RESOLUTION({ state, commit }, res) {
      const resolution = Number(res);
      commit('CONE_RESOLUTION_SET', resolution);
      if (state.client) {
        state.client
          .getRemote()
          .Cone.updateResolution(resolution)
          .catch(console.error);
      }
    },
    CONE_RESET_CAMERA({ state }) {
      if (state.client) {
        state.client
          .getRemote()
          .Cone.resetCamera()
          .catch(console.error);
      }
    },
  },
};
