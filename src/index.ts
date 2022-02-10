import "@babylonjs/core/Loading/loadingScreen";
import { SceneLoader } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from "@babylonjs/loaders";
// import { DracoCompression } from "@babylonjs/core/Meshes/Compression/dracoCompression";
import { CreateCanvas } from "./utils/createCanvas";
import { MainScene } from "./scenes/MainScene";

window.addEventListener("DOMContentLoaded", function () {
  if (Engine.isSupported()) {
    const canvas = CreateCanvas();
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }, true);

    SceneLoader.OnPluginActivatedObservable.add(function (plugin) {
      if (plugin.name === "gltf" && plugin instanceof GLTFFileLoader) {
        plugin.animationStartMode = GLTFLoaderAnimationStartMode.NONE;
        plugin.compileMaterials = true;
        plugin.compileShadowGenerators = false;
      }
    });
    new MainScene(engine, canvas);
    // DracoCompression.Configuration = {
    //   decoder: {
    //     wasmUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_wasm_wrapper_gltf.js",
    //     wasmBinaryUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_decoder_gltf.wasm",
    //     fallbackUrl:
    //       document.location.pathname.substring(0, document.location.pathname.lastIndexOf("/")) +
    //       "/src/draco/draco_decoder_gltf.js",
    //   },
    // };

  } else {
    window.alert("Browser not supported");
  }
});
