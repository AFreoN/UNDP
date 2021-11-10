import main from 'progressbar.js'
import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as uiControl from '../ui_controller/ui_controller'
import * as mainScipt from '../script'
import { clamp } from 'three/src/math/mathutils'

const mouse = new THREE.Vector2() 

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX /window.innerWidth  * 2 -1
    mouse.y = -(event. clientY / window.innerHeight * 2 -1)
})

const raycaster = new THREE.Raycaster()

const shadowPlane = new THREE.PlaneGeometry(20,20)
var shadowTexture = null
// const shadowMaterial = new THREE.MeshStandardMaterial(
//     {
//         // color:0x4dc1ff,
//         map: new THREE.TextureLoader().load( 'shadow_texture.png', function ( texture ) {
//             texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//             texture.repeat.set(10,10)
//             // texture.offset.set(0.5,0)
//             shadowTexture = texture
//         })
//     })

const shadowMaterial = new THREE.ShadowMaterial()
shadowMaterial.opacity = 0.5
const shadowMesh = new THREE.Mesh(shadowPlane,shadowMaterial)
shadowMesh.receiveShadow = true
shadowMesh.rotation.set(Math.PI / -2, 0 ,0)
shadowMesh.position.set(0,-0.06 ,0)

var shadowNormalOffset = 0
export function updateShadowNormalOffset(delta){
    if(shadowTexture){
        shadowTexture.offset.add(new THREE.Vector2(delta, 0))
    }
}

var currentSelectionScene = null

export function resetCurrentSelectionScene(){
    currentSelectionScene = null
}
//      Country selection scene
//
export const countryScene = new THREE.Scene()
export const countryCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
countryScene.add(countryCamera)
countryScene.add(shadowMesh.clone())

countryCamera.position.set(0,4,1.5)
countryCamera.rotation.set(Math.PI * -0.4,0,0)

export const maldivesCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,2.8), new THREE.MeshLambertMaterial({color: 0xee2b2b,wireframe:true}))
countryScene.add(maldivesCube)
maldivesCube.position.set(-1,0,0)
maldivesCube.material.visible = false
// console.log(maldivesCube.children[0]);
// maldivesCube.children[0].castShadow = true

export const sriLankaCube = new THREE.Mesh(new THREE.BoxGeometry(0.9,0.1,1.5), new THREE.MeshLambertMaterial({color: 0x2b2bee,wireframe:true}))
countryScene.add(sriLankaCube)
sriLankaCube.position.set(1,0,0)
sriLankaCube.material.visible = false
// sriLankaCube.children[0].castShadow = true

const countryDirectionalLight = new THREE.DirectionalLight(0xffffff,0.75)
countryScene.add(countryDirectionalLight)
countryDirectionalLight.position.set(0,1,0)
countryDirectionalLight.castShadow = true

countryDirectionalLight.shadow.camera.left = -10
countryDirectionalLight.shadow.camera.right = 10
countryDirectionalLight.shadow.camera.bottom = -10
countryDirectionalLight.shadow.camera.top = 10


// const cameraHelper = new THREE.CameraHelper(countryDirectionalLight.shadow.camera);
// countryScene.add(cameraHelper);

export function resetCountrySelection(){
    currentSelectionScene = 'country'
    sriLankaCube.position.y = 0
    maldivesCube.position.y = 0

    if(hoveringCountry){
        hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
    }
    if(selectedCountry){
        selectedCountry.regionMaterial.color = selectedCountry.standardColor
    }
    hoveringCountry = null
    selectedCountry = null
}

var hoveringCountry
var selectedCountry

export function raycastCountry(){
    raycaster.setFromCamera(mouse,countryCamera)
    const intersects = raycaster.intersectObjects([maldivesCube,sriLankaCube])

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        // console.log(closestIntersect)
        if(closestIntersect !== selectedCountry){
            if(closestIntersect !== hoveringCountry){
                if(hoveringCountry){
                    hoveringCountry.position.y = 0
                    hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
                }

                hoveringCountry = closestIntersect
                hoveringCountry.regionMaterial.color = hoveringCountry.hoveringColor
                hoveringCountry.position.y = 0.1
                if(hoveringCountry === maldivesCube){
                    uiControl.setCountryName('Maldives')
                } else if (hoveringCountry === sriLankaCube){
                    uiControl.setCountryName('Sri Lanka')
                }

            }
        }
    }
    else{
        if(hoveringCountry){
            hoveringCountry.position.y = 0
            hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
            hoveringCountry = null
            uiControl.setCountryName('')
        }
        if(selectedCountry){
            if(selectedCountry === maldivesCube){
                uiControl.setCountryName('Maldives')
            } else if (selectedCountry === sriLankaCube){
                uiControl.setCountryName('Sri Lanka')
            }
        }
    }
}

document.addEventListener('click',onCountryClick)

function onCountryClick(){
    if(hoveringCountry){
        if(hoveringCountry !== selectedCountry){
            if(selectedCountry){
                selectedCountry.position.y = 0
                selectedCountry.regionMaterial.color = selectedCountry.standardColor
                selectedCountry = null
            }
            selectedCountry = hoveringCountry
            hoveringCountry = null
            selectedCountry.position.y = 0.25
            selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            uiControl.enableNextButton()
            if(selectedCountry === maldivesCube){
                uiControl.enableConfirmation(0)
                uiControl.setCountryName('Maldives')
            } else if (selectedCountry === sriLankaCube){
                uiControl.enableConfirmation(1)
                uiControl.setCountryName('Sri Lanka')
            }
        }
    }
}

document.addEventListener('touchend',onCountryTouch)

function onCountryTouch(event){

    if(currentSelectionScene !== 'country') return;

    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,countryCamera)
    const intersects = raycaster.intersectObjects([maldivesCube,sriLankaCube])

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedCountry){
            if(selectedCountry){
                selectedCountry.position.y = 0
                selectedCountry.regionMaterial.color = selectedCountry.standardColor
                selectedCountry = null
            }
            selectedCountry = closestIntersect
            selectedCountry.position.y = 0.25
            selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            if(selectedCountry === maldivesCube){
                uiControl.enableConfirmation(0)
                uiControl.setCountryName('Maldives')
            } else if (selectedCountry === sriLankaCube){
                uiControl.enableConfirmation(1)
                uiControl.setCountryName('Sri Lanka')
            }
        }
    }
}

//
//      end of Country selection scene


//      Maldives region selection scene
//
export const maldivesScene = new THREE.Scene()
export const maldivesCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
maldivesScene.add(maldivesCamera)

maldivesScene.add(shadowMesh.clone())

maldivesCamera.position.set(0,4,2)
maldivesCamera.rotation.set(Math.PI * -0.4,0,0)

const maldivesRegionBboxGroup = new THREE.Group()
maldivesRegionBboxGroup.scale.set(0.375,0.375,0.375)
maldivesScene.add(maldivesRegionBboxGroup)

const bboxMat = new THREE.MeshLambertMaterial({color: 0x03d7fc, wireframe: true, visible: false})

const upperNorthCube = new THREE.Mesh(new THREE.BoxGeometry(1.4,0.5,1.6),bboxMat )
maldivesRegionBboxGroup.add(upperNorthCube)
upperNorthCube.name = 'Upper North province'

const northCube = new THREE.Mesh(new THREE.BoxGeometry(1.4,0.5,1.75), bboxMat)
maldivesRegionBboxGroup.add(northCube)
northCube.name = 'North province'

const northCentralCube = new THREE.Mesh(new THREE.BoxGeometry(1.75,0.5,1.75), bboxMat)
maldivesRegionBboxGroup.add(northCentralCube)
northCentralCube.name = 'North Central province'

const centralCube = new THREE.Mesh(new THREE.BoxGeometry(1.6,0.5,1), bboxMat)
maldivesRegionBboxGroup.add(centralCube)
centralCube.name = 'Central province'

const upperSouthCube = new THREE.Mesh(new THREE.BoxGeometry(1.1,0.5,1.1), bboxMat)
maldivesRegionBboxGroup.add(upperSouthCube)
upperSouthCube.name = 'Upper South province'

const southCentralCube = new THREE.Mesh(new THREE.BoxGeometry(1.1,0.5,1.2), bboxMat)
maldivesRegionBboxGroup.add(southCentralCube)
southCentralCube.name = 'South Central province'

const southCube = new THREE.Mesh(new THREE.BoxGeometry(1,0.5,1), bboxMat)
maldivesRegionBboxGroup.add(southCube)
southCube.name = 'South province'

export var maldivesRegionBoxes = [//Storing region objects in an array for easy access 
    upperNorthCube,
    centralCube,
    northCentralCube,
    northCube,
    southCentralCube,
    southCube,
    upperSouthCube
]

// export function setMaldivesRegions(regions){
//     maldivesRegionBoxes = regions
// }

const maldivesDirectionalLight = new THREE.DirectionalLight(0xffffff,0.75)
maldivesScene.add(maldivesDirectionalLight)
maldivesDirectionalLight.position.set(2,10,2)
maldivesDirectionalLight.castShadow = true

maldivesDirectionalLight.shadow.camera.left = -20
maldivesDirectionalLight.shadow.camera.right = 20
maldivesDirectionalLight.shadow.camera.bottom = -20
maldivesDirectionalLight.shadow.camera.top = 20



export function resetMaldivesSelection(){
    currentSelectionScene = 'maldives'
    for (let i = 0; i < maldivesRegionBoxes.length; i++) {
       const element = maldivesRegionBoxes[i];
       element.position.y = 0
    }

    if(hoveringMaldivesRegion){
        hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
    }
    if(selectedMaldivesRegion){
        selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.standardColor
    }

    hoveringMaldivesRegion = null
    selectedMaldivesRegion = null
}

var hoveringMaldivesRegion
var selectedMaldivesRegion

export function raycastMaldivesRegions(){
    raycaster.setFromCamera(mouse,maldivesCamera)
    const intersects = raycaster.intersectObjects(maldivesRegionBoxes)

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedMaldivesRegion){
            if(closestIntersect !== hoveringMaldivesRegion){
                if(hoveringMaldivesRegion){
                    hoveringMaldivesRegion.regionPosition.y = 0
                    hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
                }

                hoveringMaldivesRegion = closestIntersect
                hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.hoveringColor
                hoveringMaldivesRegion.regionPosition.y = 0.2
                uiControl.setRegionName(hoveringMaldivesRegion.name)

            }
        }
    }
    else{
        if(hoveringMaldivesRegion){
            hoveringMaldivesRegion.regionPosition.y = 0
            hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
            hoveringMaldivesRegion = null
            uiControl.setRegionName('')
        }
        if(selectedMaldivesRegion){
            uiControl.setRegionName(selectedMaldivesRegion.name)
        }
    }
}

document.addEventListener('click',onMaldivesRegionClick)

function onMaldivesRegionClick(){
    if(hoveringMaldivesRegion){
        if(hoveringMaldivesRegion !== selectedMaldivesRegion){
            if(selectedMaldivesRegion){
                selectedMaldivesRegion.regionPosition.y = 0
                selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.standardColor
                selectedMaldivesRegion = null
            }
            selectedMaldivesRegion = hoveringMaldivesRegion
            hoveringMaldivesRegion = null
            selectedMaldivesRegion.regionPosition.y = 0.3
            selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.selectedColor
            const regionIndex = maldivesRegionBoxes.indexOf(selectedMaldivesRegion)
            // console.log(regionIndex);
            uiControl.enableConfirmation(regionIndex)
            uiControl.setRegionName(selectedMaldivesRegion.name)
        }
    }
}

document.addEventListener('touchend',onMaldivesRegionTouch)

function onMaldivesRegionTouch(event){

    if(currentSelectionScene !== 'maldives') return;


    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,maldivesCamera)
    const intersects = raycaster.intersectObjects(maldivesRegionBoxes)

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedMaldivesRegion){
            if(selectedMaldivesRegion){
                selectedMaldivesRegion.regionPosition.y = 0
                selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.standardColor
                selectedMaldivesRegion = null
            }
            selectedMaldivesRegion = closestIntersect
            selectedMaldivesRegion.regionPosition.y = 0.3
            selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.selectedColor
            const regionIndex = maldivesRegionBoxes.indexOf(selectedMaldivesRegion)
            uiControl.enableConfirmation(regionIndex)
            uiControl.setRegionName(selectedMaldivesRegion.name)
        }
    }
}


//
//      end of Maldives region selection scene


//      Sri Lanka region selection scene
//
export const sriLankaScene = new THREE.Scene()
export const sriLankaCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
sriLankaScene.add(sriLankaCamera)

const sriLankaShadowMesh = shadowMesh.clone()
sriLankaShadowMesh.position.set(0,-0.25,0)

sriLankaScene.add(sriLankaShadowMesh)

sriLankaCamera.position.set(0,4,1.5)
sriLankaCamera.rotation.set(Math.PI * -0.4,0,0)

var sriLankaRegions = []

export function setSriLankaRegions(regions){
    sriLankaRegions = regions
}

const sriLankaDirectionalLight = new THREE.DirectionalLight(0xffffff,0.75)
sriLankaScene.add(sriLankaDirectionalLight)
sriLankaDirectionalLight.position.set(0,5,0)
sriLankaDirectionalLight.rotateZ(Math.PI * 0.25)
sriLankaDirectionalLight.rotateX(Math.PI * 0.25)
sriLankaDirectionalLight.castShadow = true

sriLankaDirectionalLight.shadow.camera.left = -20
sriLankaDirectionalLight.shadow.camera.right = 20
sriLankaDirectionalLight.shadow.camera.bottom = -20
sriLankaDirectionalLight.shadow.camera.top = 20

// sriLankaDirectionalLight.shadow.camera.zoom = 0.5

export function resetSriLankaSelection(){
    currentSelectionScene = 'srilanka'
    for (let i = 0; i < sriLankaRegions.length; i++) {
        const element = sriLankaRegions[i];
        element.position.y = 0
    }

    if(hoveringSriLankaRegion){
        hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
    }
    if(selectedSriLankaRegion){
        selectedSriLankaRegion.material = selectedSriLankaRegion.standardMaterial
    }

    hoveringSriLankaRegion = null
    selectedSriLankaRegion = null
}

var hoveringSriLankaRegion
var selectedSriLankaRegion

export function raycastSriLankaRegions(){
    raycaster.setFromCamera(mouse,sriLankaCamera)
    
    const intersects = raycaster.intersectObjects(sriLankaRegions)

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedSriLankaRegion){
            if(closestIntersect !== hoveringSriLankaRegion){
                if(hoveringSriLankaRegion){
                    hoveringSriLankaRegion.position.y = 0
                    hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
                }
                hoveringSriLankaRegion = closestIntersect
                hoveringSriLankaRegion.material = hoveringSriLankaRegion.hoveringMaterial
                hoveringSriLankaRegion.position.y = 0.1
                uiControl.setRegionName(hoveringSriLankaRegion.name)

            }
        }
    }
    else{
        if(hoveringSriLankaRegion){
            hoveringSriLankaRegion.position.y = 0
            hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
            hoveringSriLankaRegion = null
            uiControl.setRegionName('')
        }
        if(selectedSriLankaRegion){
            uiControl.setRegionName(selectedSriLankaRegion.name)
        }
    }
}

document.addEventListener('click',onSriLankaRegionClick)

function onSriLankaRegionClick(){
    if(hoveringSriLankaRegion){
        if(hoveringSriLankaRegion !== selectedSriLankaRegion){
            if(selectedSriLankaRegion){
                selectedSriLankaRegion.position.y = 0
                selectedSriLankaRegion.material = selectedSriLankaRegion.standardMaterial
                selectedSriLankaRegion = null
            }
            selectedSriLankaRegion = hoveringSriLankaRegion
            hoveringSriLankaRegion = null
            selectedSriLankaRegion.position.y = 0.2
            selectedSriLankaRegion.material = selectedSriLankaRegion.selectedMaterial
            const regionIndex = sriLankaRegions.indexOf(selectedSriLankaRegion)
            uiControl.enableConfirmation(regionIndex)
            uiControl.setRegionName(selectedSriLankaRegion.name)
        }
    }
}

document.addEventListener('touchend',onSriLankaRegionTouch)

function onSriLankaRegionTouch(event){

    if(currentSelectionScene !== 'srilanka') return;


    mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse,sriLankaCamera)
    const intersects = raycaster.intersectObjects(sriLankaRegions)

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedSriLankaRegion){
            if(selectedSriLankaRegion){
                selectedSriLankaRegion.position.y = 0
                selectedSriLankaRegion.material = selectedSriLankaRegion.standardMaterial
                selectedSriLankaRegion = null
            }
            selectedSriLankaRegion = closestIntersect
            selectedSriLankaRegion.position.y = 0.2
            selectedSriLankaRegion.material = selectedSriLankaRegion.selectedMaterial
            const regionIndex = sriLankaRegions.indexOf(selectedSriLankaRegion)
            // console.log(regionIndex);
            uiControl.enableConfirmation(regionIndex)
            uiControl.setRegionName(selectedSriLankaRegion.name)
        }
    }
}

//
//      end of Sri Lanka region selection scene


//      About scene
//
export const aboutScene = new THREE.Scene() 
export const aboutCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
aboutScene.add(aboutCamera)

aboutCamera.position.x = 0
aboutCamera.position.y = -.6
aboutCamera.position.z = 3.5
aboutCamera.rotation.set(Math.PI * 0, 0, 0)

const aboutPointLight = new THREE.PointLight(0xffffff, 3)

aboutPointLight.position.x = 2
aboutPointLight.position.y = 3
aboutPointLight.position.z = 4
aboutPointLight.intensity = 1.3

aboutScene.add(aboutPointLight)

//
//      end of MCQ scene

//      Joystick scene
//
export const joystickScene = new THREE.Scene() 

let aspect = window.innerWidth / window.innerHeight;
aspect = clamp(aspect, 1, 2);
let fov = 35 + 8 * aspect;  // prev 35

export const joystickCamera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 50)
joystickCamera.position.x = 0
joystickCamera.position.y = 0 / aspect      //prev value is 4
joystickCamera.position.z = 3.5 /  aspect // 4 * aspect      //prev value is 6 / aspect

//setting rotation of the camera
joystickCamera.rotation.set(Math.PI * -0.2, 0, 0)
joystickCamera.lookAt(0, -0.3, 0);

joystickScene.add(joystickCamera)

const color = 0xea7ff9;   //prev 0x99CCFF
//joystickScene.background = new THREE.Color(color);

const minDis = joystickCamera.position.z;
const maxDis = 20;
const density = 0.13;   //prev 0.1
joystickScene.fog = new THREE.FogExp2(color, density);
//joystickScene.fog = new THREE.Fog(color, minDis, maxDis);

const mainBG = "linear-gradient(to top , #5f27fc, #e827fc )";
const sliderBG = "linear-gradient(to bottom, #bb56ff 0%,#ed81f9 35%)";
//document.body.style.background = sliderBG;

//Setting up level

//add floor
const floorSize = 100;
var floorgeo = new THREE.PlaneGeometry(floorSize,floorSize);
floorgeo.computeBoundingBox();

//const floorgeo = new THREE.CylinderGeometry(1000,1000,0.05, 256);
const floorMaterial = new THREE.MeshToonMaterial( {color: 0x725FB3});    //prev color 0xfff4db
var gradFloorMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color("#7d71cf")
      },
      color2: {
        value: new THREE.Color("#ea8bea")
      },
      bboxMin: {
        value: floorgeo.boundingBox.min
      },
      bboxMax: {
        value: floorgeo.boundingBox.max
      }
    },
    vertexShader: `
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;
    
      varying vec2 vUv;
  
      void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
    
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
    wireframe: false
  });
const RingMaterial = new THREE.MeshBasicMaterial({color: 0xf5eddc}) 

const floor = new THREE.Mesh (floorgeo, floorMaterial); 
floor.rotation.set(Math.PI / -2, 0, 0)
floor.position.z = - floorSize / 4
floor.position.y = -.6
floor.receiveShadow = true;
joystickScene.add(floor);

const ambLight = new THREE.AmbientLight(0xCFD1E6, 0.5);
joystickScene.add(ambLight);

export const joyDirLight = new THREE.DirectionalLight(0xffffff, 1 );
const lightScale = 1;
joyDirLight.position.set(4 * lightScale,8 * lightScale,5 * lightScale);
joyDirLight.castShadow = true;
joyDirLight.shadow.camera.near = 0.1;
joyDirLight.shadow.camera.far = 100;
joystickScene.add(joyDirLight);

export const pointLight = new THREE.PointLight(0xA7C0FF, 1, 3);      //0.7,3
pointLight.position.y = -1;
pointLight.position.z = 3.5/ aspect;
joystickScene.add(pointLight);

const rimLightDistance = 40;
const bgPointLight = new THREE.PointLight(0xea7ff9, 10, rimLightDistance - 2);
bgPointLight.castShadow = false;
bgPointLight.position.y = 5;
bgPointLight.position.z = -rimLightDistance + 2;
joystickScene.add(bgPointLight);

const bgPointLight2 = new THREE.PointLight(0xea7ff9, 2, rimLightDistance - 2);
bgPointLight2.position.y = -1;
bgPointLight2.position.z = -rimLightDistance + 7;
bgPointLight2.position.x = (rimLightDistance - 2) * 1.3;
//joystickScene.add(bgPointLight2);


//Adding rings
//Highlight material
//#region Radius Cylinders
/*
const rad1Material = new THREE.MeshBasicMaterial( { color: 0xfcf8ed } );

const totalCircleArea = 7;
const ringRadius = 0.3;
const ringHeight = 0.001;
const ringSegments = 64;
var curRadius = 0.3;
var yPos = -0.5;    //prev - ends in 0.61

//radius 1
const geometry = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments );
const cylinder = new THREE.Mesh( geometry, RingMaterial );
cylinder.position.set(0,yPos,0)
curRadius += ringRadius;
yPos -= 0.01;

//radius 2
const geometry2 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments );
const cylinder2 = new THREE.Mesh( geometry2, floorMaterial );
cylinder2.position.set(0,yPos,0)
curRadius += ringRadius;
yPos -= 0.01;

//radius 3
const geometry3 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments );
const cylinder3 = new THREE.Mesh( geometry3, RingMaterial );
cylinder3.position.set(0,yPos,0)
curRadius += ringRadius;
yPos -= 0.01;

//radius 4
const geometry4 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments);
const cylinder4 = new THREE.Mesh(geometry4, floorMaterial);
cylinder4.position.set(0,yPos,0);
curRadius += ringRadius;
yPos -= 0.01;

//radius 5
const geometry5 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments);
const cylinder5 = new THREE.Mesh(geometry5, RingMaterial);
cylinder5.position.set(0,yPos,0);
curRadius += ringRadius;
yPos -= 0.01;

//radius 6
const geometry6 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments);
const cylinder6 = new THREE.Mesh(geometry6, floorMaterial);
cylinder6.position.set(0,yPos,0);
curRadius += ringRadius;
yPos -= 0.01;

const geometry7 = new THREE.CylinderGeometry( curRadius, curRadius, ringHeight, ringSegments);
const cylinder7 = new THREE.Mesh(geometry7, RingMaterial);
cylinder7.position.set(0,yPos,0);

//joystickScene.add( cylinder);
//joystickScene.add( cylinder2 );
//joystickScene.add( cylinder3 );
//joystickScene.add( cylinder4 );
//joystickScene.add( cylinder5 );
//joystickScene.add( cylinder6 );
//joystickScene.add( cylinder7 );
*/
//#endregion

/*
//Adding light
const joystickPointLight = new THREE.PointLight(0xffffff, 3)

joystickPointLight.position.x = 2
joystickPointLight.position.y = 3
joystickPointLight.position.z = 4
joystickPointLight.intensity = 1.3
joystickPointLight.castShadow = true;

joystickScene.add(joystickPointLight)
//
//      end of Joystick scene
*/

export function calculateDistance(currentCenterModel, answers){
    const player = assetLoader.getModel('playerCharacter')
    let distance
    let answerDisplay = document.getElementById('joystick-answer-container')

    //#region Old Distance Check
    /*
    if(player && currentCenterModel){
        distance = player.position.distanceTo(currentCenterModel.position)
    }

    if(distance > ringRadius * (totalCircleArea - 1) && distance < ringRadius * (totalCircleArea)){
        cylinder7.material = rad1Material
        answerDisplay.innerText = answers[0]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(0)
    }
    else
    {
        cylinder7.material = RingMaterial
    }

     //neutral face
    if(distance > ringRadius * (totalCircleArea - 2) && distance < ringRadius * (totalCircleArea - 1)){
        cylinder6.material = rad1Material
        answerDisplay.innerText = answers[1]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(1)
    }
    else{
        cylinder6.material = floorMaterial
    }

     // Happy face
    if(distance > ringRadius * (totalCircleArea - 3) && distance < ringRadius * (totalCircleArea - 2)){
        cylinder5.material = rad1Material
        answerDisplay.innerText = answers[2]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(2)
    }
    else{
        cylinder5.material = RingMaterial  
    }

    if(distance > ringRadius * (totalCircleArea - 4) && distance < ringRadius * (totalCircleArea - 3)){
        cylinder4.material = rad1Material
        answerDisplay.innerText = answers[3]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(3)
    }
    else{
        cylinder4.material = floorMaterial  
    }

    if(distance > ringRadius * (totalCircleArea - 5) && distance < ringRadius * (totalCircleArea - 4)){
        cylinder3.material = rad1Material
        answerDisplay.innerText = answers[4]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(4)
    }
    else{
        cylinder3.material = RingMaterial  
    }

    if(distance > ringRadius * (totalCircleArea - 6) && distance < ringRadius * (totalCircleArea - 5)){
        cylinder2.material = rad1Material
        answerDisplay.innerText = answers[5]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(5)
    }
    else{
        cylinder2.material = floorMaterial  
    }

    if(distance >= 0 && distance <= ringRadius){
        cylinder.material = rad1Material
        answerDisplay.innerText = answers[6]
        if(mainScipt.isShowingTutorial() == false)
            uiControl.enableConfirmation(6)
    }
    else{
        cylinder.material = RingMaterial  
    }

    if(distance > ringRadius * totalCircleArea){
        answerDisplay.innerText  = ''
        uiControl.disableConfirmation()
    }
    */
    //#endregion
}

//Updates rings' location in regard center model position
export function updateRingLocation(currentCenterModel){
    if(currentCenterModel){
        const centerModelPosX = currentCenterModel.position.x 
        const centerModelPosZ = currentCenterModel.position.z 
        
        /*
        cylinder.position.set(centerModelPosX,-.55,centerModelPosZ)
        cylinder2.position.set(centerModelPosX,-.56,centerModelPosZ)
        cylinder3.position.set(centerModelPosX,-.57,centerModelPosZ)
        cylinder4.position.set(centerModelPosX,-.58,centerModelPosZ)
        cylinder5.position.set(centerModelPosX,-.59,centerModelPosZ)
        cylinder6.position.set(centerModelPosX,-.60,centerModelPosZ)
        cylinder7.position.set(centerModelPosX,-.61,centerModelPosZ)
        */
    }
}


