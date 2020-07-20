import os, time

from wslink import register as exportRpc

from paraview import simple, servermanager
from paraview.web import protocols as pv_protocols

try:
    # PV 5.8+
    from paraview.modules.vtkRemotingViews import vtkPVRenderView
except:
    pass

try:
    # PV 5.7
    from paraview.modules.vtkPVClientServerCoreRendering import vtkPVRenderView
except:
    pass

try:
    # PV 5.6
    from vtkmodules.vtkPVClientServerCoreRendering import vtkPVRenderView
except:
    pass

# Make sure only one cone is available
cone = simple.Cone()

class ParaViewCone(pv_protocols.ParaViewWebProtocol):

    def getCamera(self):
        view = self.getView('-1')
        bounds = [-1, 1, -1, 1, -1, 1]

        if view and view.GetClientSideView().GetClassName() == 'vtkPVRenderView':
          rr = view.GetClientSideView().GetRenderer()
          bounds = rr.ComputeVisiblePropBounds()

        return {
          'id': view.GetGlobalIDAsString(),
          'bounds': bounds,
          'position': tuple(view.CameraPosition),
          'viewUp': tuple(view.CameraViewUp),
          'focalPoint': tuple(view.CameraFocalPoint),
          'centerOfRotation': tuple(view.CenterOfRotation),
        }


    @exportRpc("vtk.initialize")
    def createVisualization(self):
        simple.Show(cone)
        return self.resetCamera()


    @exportRpc("vtk.camera.reset")
    def resetCamera(self):
        view = self.getView('-1')
        simple.Render(view)
        simple.ResetCamera(view)
        try:
            view.CenterOfRotation = view.CameraFocalPoint
        except:
            pass

        self.getApplication().InvalidateCache(view.SMProxy)
        self.getApplication().InvokeEvent('UpdateEvent')

        return self.getCamera()


    @exportRpc("vtk.cone.resolution.update")
    def updateResolution(self, resolution):
        cone.Resolution = resolution
        self.getApplication().InvokeEvent('UpdateEvent')


    @exportRpc("viewport.mouse.zoom.wheel")
    def updateZoomFromWheel(self, event):
      if 'Start' in event["type"]:
        self.getApplication().InvokeEvent('StartInteractionEvent')

      viewProxy = self.getView(event['view'])
      if viewProxy and 'spinY' in event:
        rootId = viewProxy.GetGlobalIDAsString()
        zoomFactor = 1.0 - event['spinY'] / 10.0

        fp = viewProxy.CameraFocalPoint
        pos = viewProxy.CameraPosition
        delta = [fp[i] - pos[i] for i in range(3)]
        viewProxy.GetActiveCamera().Zoom(zoomFactor)
        viewProxy.UpdatePropertyInformation()
        pos2 = viewProxy.CameraPosition
        viewProxy.CameraFocalPoint = [pos2[i] + delta[i] for i in range(3)]

      if 'End' in event["type"]:
        self.getApplication().InvokeEvent('EndInteractionEvent')
