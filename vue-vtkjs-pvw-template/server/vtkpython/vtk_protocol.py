import time

from vtk.web import protocols as vtk_protocols

from wslink import register as exportRpc

import vtk

# -------------------------------------------------------------------------
# ViewManager
# -------------------------------------------------------------------------

class VtkCone(vtk_protocols.vtkWebProtocol):
    def __init__(self):
        self.cone = vtk.vtkConeSource()

    @exportRpc("vtk.initialize")
    def createVisualization(self):
        renderWindow = self.getView('-1')
        renderer = renderWindow.GetRenderers().GetFirstRenderer()

        cone = self.cone
        mapper = vtk.vtkPolyDataMapper()
        actor = vtk.vtkActor()

        mapper.SetInputConnection(cone.GetOutputPort())
        actor.SetMapper(mapper)

        renderer.AddActor(actor)
        renderer.ResetCamera()
        renderWindow.Render()

        return self.resetCamera()


    @exportRpc("vtk.camera.reset")
    def resetCamera(self):
        renderWindow = self.getView('-1')
        renderWindow.GetRenderers().GetFirstRenderer().ResetCamera()
        renderWindow.Render()

        self.getApplication().InvalidateCache(renderWindow)
        self.getApplication().InvokeEvent('UpdateEvent')

        return -1


    @exportRpc("vtk.cone.resolution.update")
    def updateResolution(self, resolution):
        self.cone.SetResolution(resolution)
        renderWindow = self.getView('-1')
        # renderWindow.Modified() # either modified or render
        renderWindow.Render()
        self.getApplication().InvokeEvent('UpdateEvent')


    @exportRpc("viewport.mouse.zoom.wheel")
    def updateZoomFromWheel(self, event):
      if 'Start' in event["type"]:
        self.getApplication().InvokeEvent('StartInteractionEvent')

      renderWindow = self.getView(event['view'])
      if renderWindow and 'spinY' in event:
        zoomFactor = 1.0 - event['spinY'] / 10.0

        camera = renderWindow.GetRenderers().GetFirstRenderer().GetActiveCamera()
        fp = camera.GetFocalPoint()
        pos = camera.GetPosition()
        delta = [fp[i] - pos[i] for i in range(3)]
        camera.Zoom(zoomFactor)

        pos2 = camera.GetPosition()
        camera.SetFocalPoint([pos2[i] + delta[i] for i in range(3)])
        renderWindow.Modified()

      if 'End' in event["type"]:
        self.getApplication().InvokeEvent('EndInteractionEvent')
