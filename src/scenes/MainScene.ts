import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import {createEnvironment} from "../utils/createEnvironment";
import {createCuttingButton} from "../utils/createCuttingButton";

export class MainScene extends BABYLON.Scene {
  engine: BABYLON.Engine;
  canvas: HTMLCanvasElement;
  assetsManager: BABYLON.AssetsManager;
  camera: BABYLON.ArcRotateCamera;
  advancedTexture: GUI.AdvancedDynamicTexture

  constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement, options?: BABYLON.SceneOptions) {
    super(engine, options);
    this.engine = engine;
    this.canvas = canvas;
    this.clearColor = new BABYLON.Color4(0.4, 0.7, 0.6, 1);

    this.assetsManager = new BABYLON.AssetsManager(this);

    this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");
    this.advancedTexture.renderAtIdealSize = true;
    this.advancedTexture.isForeground = true;

    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 10, new BABYLON.Vector3(0, 5, 5), this);
    this.camera.minZ = 0.0;
    this.camera.maxZ = 100;
    this.camera.lowerRadiusLimit = 10;
    this.camera.upperRadiusLimit = 20;
    this.camera.upperBetaLimit = Math.PI / 2.25;
    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl();
    this.camera.layerMask = 1;

    createEnvironment(this);

    const cuttingButton = createCuttingButton(this.advancedTexture);
    cuttingButton.isVisible = false;

    const meshTaskPepper = this.assetsManager.addContainerTask(
      "meshTaskPepper",
      "",
      "./assets/meshes/",
      "pepper.glb",
    );
    meshTaskPepper.onSuccess = task => {
       task.loadedContainer.instantiateModelsToScene(name => name, false);
       const pepperMesh = this.getMeshByName("pepper") as BABYLON.Mesh;
      pepperMesh.layerMask = 1;
      pepperMesh.position.y -= 1;
      pepperMesh.scaling.scaleInPlace(100);
    };

    const layerBlack = new BABYLON.Layer("layerBlack",null, this);
    layerBlack.color = new BABYLON.Color4(0, 0, 0, 1);
    // @ts-ignore
    layerBlack.texture = new BABYLON.RawTexture([0, 0, 0, 1], 1, 1, BABYLON.Constants.TEXTUREFORMAT_RGBA, this);
    layerBlack.layerMask = 10;
    layerBlack.isBackground = false;
    const layer = new BABYLON.Layer('',null, this, true);
    layer.layerMask = 10;
    layer.texture = new BABYLON.VideoTexture("videoTexture","assets/textures/pepper.mp4", this);
    layer.scale.x = 0.75;
    layer.texture.uScale = 1.33;
    layer.texture.uOffset = 0.835;
    layer.texture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
    layer.isBackground = false;

    cuttingButton.onPointerUpObservable.add(() => {
      layerBlack.layerMask = 1;
      cuttingButton.isVisible = false;
      (layer.texture as BABYLON.VideoTexture).video.play().then(() => {
        layer.layerMask = 1;
      });
    });

    this.assetsManager.onFinish = () => {
      this.executeWhenReady(() => {
        (layer.texture as BABYLON.VideoTexture).video.pause();
        (layer.texture as BABYLON.VideoTexture).video.currentTime = 0;
        cuttingButton.isVisible = true;
      })
    };

    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    this.engine.runRenderLoop(() => {
      this.render();
    });

    this.assetsManager.load();
  }
}
