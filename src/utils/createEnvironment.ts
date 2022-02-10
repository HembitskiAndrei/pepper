import {Color3, Mesh, EnvironmentHelper} from "@babylonjs/core";
import type { MainScene } from "../scenes/MainScene";

export const createEnvironment = (scene: MainScene) => {
  const environmentTask = scene.assetsManager.addCubeTextureTask("environmentTask", "./assets/sky/environment.env");
  environmentTask.onSuccess = task => {
    scene.environmentTexture = task.texture;
    const helper = <EnvironmentHelper>scene.createDefaultEnvironment({
      createSkybox: false,
      enableGroundMirror: false,
      groundYBias: 0.01,
    });
    (helper.ground as Mesh).position.y -= 2;
    helper.setMainColor(new Color3(0.7, 1, 0.9));
  };
};
