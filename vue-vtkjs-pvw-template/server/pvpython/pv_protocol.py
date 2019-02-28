import os, time

from wslink import register as exportRpc

from paraview import simple, servermanager
from paraview.web import protocols as pv_protocols

from vtkmodules.vtkCommonCore import vtkUnsignedCharArray, vtkCollection
from vtkmodules.vtkCommonDataModel import vtkImageData
from vtkmodules.vtkPVClientServerCoreRendering import vtkPVRenderView
from vtkmodules.vtkPVServerManagerRendering import vtkSMPVRepresentationProxy, vtkSMTransferFunctionProxy, vtkSMTransferFunctionManager
from vtkmodules.vtkWebCore import vtkDataEncoder


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
