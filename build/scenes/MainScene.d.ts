import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
export declare class MainScene extends BABYLON.Scene {
    engine: BABYLON.Engine;
    canvas: HTMLCanvasElement;
    assetsManager: BABYLON.AssetsManager;
    camera: BABYLON.ArcRotateCamera;
    advancedTexture: GUI.AdvancedDynamicTexture;
    constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement, options?: BABYLON.SceneOptions);
}
