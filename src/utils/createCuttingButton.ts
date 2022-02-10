import * as GUI from "@babylonjs/gui";
import {BUTTON_CONFIG} from "./constants";

export const createCuttingButton = (advancedTexture: GUI.AdvancedDynamicTexture) => {
  const rectBack = new GUI.Rectangle();
  rectBack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  rectBack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  rectBack.top = "-50px";
  rectBack.width = "190px";
  rectBack.height = "90px";
  rectBack.cornerRadius = 10;
  rectBack.color = BUTTON_CONFIG.defaultColor.color;
  rectBack.thickness = 4;
  rectBack.background = BUTTON_CONFIG.defaultColor.background;
  rectBack.hoverCursor = "pointer";
  rectBack.isPointerBlocker = true;
  rectBack.onPointerEnterObservable.add(() => {
    rectBack.background = BUTTON_CONFIG.enterColor.background;
    rectBack.color = BUTTON_CONFIG.enterColor.color;
  })
  rectBack.onPointerOutObservable.add(() => {
    rectBack.background = BUTTON_CONFIG.outColor.background;
    rectBack.color = BUTTON_CONFIG.outColor.color;
  })
  rectBack.onPointerDownObservable.add(() => {
    rectBack.background = BUTTON_CONFIG.downColor.background;
    rectBack.color = BUTTON_CONFIG.downColor.color;
  })
  rectBack.onPointerUpObservable.add(() => {
    rectBack.background = BUTTON_CONFIG.upColor.background;
    rectBack.color = BUTTON_CONFIG.upColor.color;
  })
  advancedTexture.addControl(rectBack);

  const label = new GUI.TextBlock();
  label.text = "Cut";
  label.color = BUTTON_CONFIG.textureColor;
  label.fontSize = 42;
  rectBack.addControl(label);

  return rectBack
}
