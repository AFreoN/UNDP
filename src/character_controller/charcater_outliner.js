import * as THREE from "three"
import { RenderPass, EffectComposer, OutlinePass, ClearMaskPass, ShaderPass, CopyShader } from "three-outlinepass"
// import * as POSTPROCESSING from "postprocessing"

var scene, camera, renderer
var compose
var selectedObjects = []
var renderPass
var outlinePass

// var ec = new THREE.EffectComposer()
// console.log("Ec = ", ec)

const outlineVisibleColor = 0x000000    //111111
const outlineHiddenColor = 0x000000
const threeTone = new THREE.DataTexture(
    Uint8Array.from([0, 0, 0, 255 ,
         128, 128, 128, 255,
          255, 255, 255,255])
          ,3,1,THREE.RGBAFormat
);

export function setOutlineObject(_cam, _scene, _render){

    camera = _cam
    scene = _scene
    renderer = _render
    compose = new EffectComposer(renderer)
    renderPass = new RenderPass(scene,camera)
    compose.addPass(renderPass)

    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, selectedObjects)
    outlinePass.renderToScreen = true
    outlinePass.selectedObjects = selectedObjects
    
    var params = {
        edgeStrength: 5.0,
        edgeGlow: 0,
        edgeThickness: 2.0,
        pulsePeriod: 0,
        usePatternTexture: false
    };
    
    outlinePass.edgeStrength = params.edgeStrength;
    outlinePass.edgeGlow = params.edgeGlow;
    outlinePass.edgeThickness = params.edgeThickness;
    outlinePass.visibleEdgeColor.set(outlineVisibleColor);
    outlinePass.hiddenEdgeColor.set(outlineHiddenColor);
    //outlinePass.patternTexture = threeTone
    compose.addPass(outlinePass)

    // var effectFXAA = new ShaderPass( FXAAShader )
    // effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight )
    // compose.addPass( effectFXAA )
}


export function addOutlineObject( object ) {
    if(selectedObjects.includes(object) || true)
        return;
    
    console.log("Added object = ", object.name)
    selectedObjects.push( object )
    if(outlinePass)
        outlinePass.selectedObjects = selectedObjects
    //renderOutline()
}

var clock = new THREE.Clock()
export function renderOutline(){
    ///requestAnimationFrame(renderOutline)
    if(compose){
        var delta = clock.getDelta()
        compose.render(delta)   
    }
}