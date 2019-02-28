/* eslint-disable arrow-body-style */
export default function createMethods(session) {
  return {
    getCamera: (viewId = '-1') => session.call('vtk.camera.get', [viewId]),
  };
}
