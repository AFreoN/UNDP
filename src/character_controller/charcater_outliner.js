import * as THREE from "three"
import { RenderPass, EffectComposer, OutlinePass, ClearMaskPass, ShaderPass, CopyShader } from "three-outlinepass"
import * as assetLoader from '../assets_loader/assets_loader'
// import * as POSTPROCESSING from "postprocessing"

var scene, camera, renderer
var compose
var selectedObjects = []
var renderPass
var outlinePass

const outShader = {
    'outline' : {
        vertex_shader: [
            "uniform float offset;",
            "void main() {",
                "vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
                "gl_Position = projectionMatrix * pos;",
            "}"
        ].join("\n"),

        fragment_shader: [
            "void main(){",
                "gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );",
            "}"
        ].join("\n")
    }
}
const outScene = new THREE.Scene()
const floorSize = 100
var floorgeo = new THREE.PlaneGeometry(floorSize,floorSize)
floorgeo.computeBoundingBox()
//const floorgeo = new THREE.CylinderGeometry(1000,1000,0.05, 256);
const floorMaterial = new THREE.MeshToonMaterial( {color: 0x5331FF})   //dark pink 801FCF    //prev new THREE.MeshToonMaterial( {color: 0x725FB3})
const RingMaterial = new THREE.MeshBasicMaterial({color: 0xf5eddc}) 
const floor = new THREE.Mesh (floorgeo, floorMaterial);
floor.name = "floor"
floor.rotation.set(Math.PI / -2, 0, 0)
floor.position.z = - floorSize / 4
floor.position.y = -.6
floor.receiveShadow = true
outScene.add(floor)

//#region Adding lights in slider scene
const ambLight = new THREE.AmbientLight(0xCFD1E6, 0.3);     //Prev 0.5
outScene.add(ambLight);

export const joyDirLight = new THREE.DirectionalLight(0xffffff, 1 );
const lightScale = 1;
joyDirLight.position.set(4 * lightScale,8 * lightScale,5 * lightScale);
joyDirLight.castShadow = true;
joyDirLight.shadow.camera.near = 0.1;
joyDirLight.shadow.camera.far = 100;
outScene.add(joyDirLight);

export const pointLight = new THREE.PointLight(0xA7C0FF, 1, 3);      //prev new THREE.PointLight(0xA7C0FF, 1, 3)
pointLight.position.y = -1;
pointLight.position.z = 3.5;
//joystickScene.add(pointLight);

const rimLightDistance = 40;
const bgPointLight = new THREE.PointLight(0xea7ff9, 10, rimLightDistance - 2);
bgPointLight.castShadow = false;
bgPointLight.position.y = 5;
bgPointLight.position.z = -rimLightDistance + 2;
//joystickScene.add(bgPointLight);

const bgPointLight2 = new THREE.PointLight(0xea7ff9, 2, rimLightDistance - 2);
bgPointLight2.position.y = -1;
bgPointLight2.position.z = -rimLightDistance + 7;
bgPointLight2.position.x = (rimLightDistance - 2) * 1.3;

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
    compose.addPass(outlinePass)
}

var cloned 
export function addOutlineObject( object ) {
    if(selectedObjects.includes(object))
        return;
    
    //console.log("Added object = ", object.name)

    // if(object.name == 'player'){
    //     selectedObjects.push(object)
    //     // cloned = object.clone()
    //     // cloned.scale.set(1.3,1.3,1.3)
    //     // cloned.position.z = 1

    //     // var matShader = new THREE.ShaderMaterial({
    //     //     uniforms : {
    //     //         offset : {
    //     //             type : 'f',
    //     //             value : 1.2
    //     //         }
    //     //     },
    //     //     vertexShader : outShader['outline'].vertex_shader,
    //     //     fragmentShader : outShader['outline'].fragment_shader
    //     // })

    //     // matShader = new THREE.MeshToonMaterial({color:0x000000, side : THREE.BackSide})
    //     // cloned.traverse((child) => {
    //     //     if(child.isMesh){
    //     //         child.castShadow = false
    //     //         child.material = matShader
    //     //     }
    //     // })
    //     cloned = assetLoader.getModel('playerOutline')
    //     outScene.add(cloned)
    //     return
    // }
    // else   
    //     return

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

export function renderOutlineJoystickscene(){
    if(compose){
        // renderer.render(outScene, camera)
        // renderer.clearDepth()
        // compose.render(scene, camera)

        renderer.autoClear = true
        //renderer.render(outScene,camera)
        renderer.render(outScene,camera)
        
        renderer.autoClear = false
        compose.render()
    }
}