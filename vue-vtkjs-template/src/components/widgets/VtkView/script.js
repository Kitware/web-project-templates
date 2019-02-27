import vtkViewProxy from 'vtk.js/Sources/Proxy/Core/ViewProxy';

// ----------------------------------------------------------------------------

export default {
  name: 'VtkView',
  mounted() {
    const container = this.$el.querySelector('.js-renderer');
    this.view = vtkViewProxy.newInstance({ background: [0, 0, 0, 0] });
    this.view.setContainer(container);
    this.view.resize();
    this.view.renderLater();
  },
  beforeDestroy() {
    this.view.delete();
  },
  methods: {
    onResize() {
      if (this.view) {
        this.view.resize();
        this.view.renderLater();
      }
    },
    resetCamera() {
      if (this.view) {
        this.view.resetCamera();
      }
    },
  },
};
