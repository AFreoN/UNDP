import main from 'progressbar.js'
import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as uiControl from '../ui_controller/ui_controller'
import * as mainScipt from '../script'
import { clamp } from 'three/src/math/mathutils'
import * as outliner from '../character_controller/charcater_outliner'
//import { MathUtils } from 'three'

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
shadowMesh.position.set(0,-0.1,0)

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
maldivesCube.position.set(-0.75,0,0)
maldivesCube.material.visible = false
// console.log(maldivesCube.children[0]);
// maldivesCube.children[0].castShadow = true

export const sriLankaCube = new THREE.Mesh(new THREE.BoxGeometry(1.4,0.1,2.3), new THREE.MeshLambertMaterial({color: 0x2b2bee,wireframe:true}))
countryScene.add(sriLankaCube)
sriLankaCube.position.set(0.75,0,0)
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
    setMeshAnimProperties(sriLankaCube,0.0,0)
    setMeshAnimProperties(maldivesCube,0.0,0)
    sriLankaCube.position.y = 0
    maldivesCube.position.y = 0

    if(hoveringCountry){
        if('standardMap' in hoveringCountry 
        && 'hoveringMap' in hoveringCountry 
        && 'selectedMap' in hoveringCountry ){
            hoveringCountry.regionMaterial.map = hoveringCountry.standardMap
            // hoveringCountry.regionMaterial.needsUpdate = true;
        }else{
            hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
        }
        // hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
    }
    if(selectedCountry){
        if('standardMap' in selectedCountry 
        && 'hoveringMap' in selectedCountry 
        && 'selectedMap' in selectedCountry ){
            selectedCountry.regionMaterial.map = selectedCountry.standardMap
            // selectedCountry.regionMaterial.needsUpdate = true;
        }else{
            selectedCountry.regionMaterial.color = selectedCountry.standardColor
        }
        // selectedCountry.regionMaterial.color = selectedCountry.standardColor
    }
    hoveringCountry = null
    selectedCountry = null

    uiControl.disableNextButton()
    uiControl.resetLabels()
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
                    // hoveringCountry.position.y = 0
                    if('standardMap' in hoveringCountry 
                    && 'hoveringMap' in hoveringCountry 
                    && 'selectedMap' in hoveringCountry ){
                        hoveringCountry.regionMaterial.map = hoveringCountry.standardMap
                        // hoveringCountry.regionMaterial.needsUpdate = true;
                        console.log(hoveringCountry.material.map);
                    }else{
                        hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
                    }
                    setMeshAnimProperties(hoveringCountry,0.1,0)
                }

                hoveringCountry = closestIntersect
                if('standardMap' in hoveringCountry 
                && 'hoveringMap' in hoveringCountry 
                && 'selectedMap' in hoveringCountry ){
                    hoveringCountry.regionMaterial.map = hoveringCountry.hoveringMap
                    // hoveringCountry.regionMaterial.needsUpdate = true;
                    // console.log(hoveringCountry.regionMaterial.map);
                    // console.log('texture updated');
                }else{
                    hoveringCountry.regionMaterial.color = hoveringCountry.hoveringColor
                }
                // hoveringCountry.regionMaterial.color = hoveringCountry.hoveringColor
                // hoveringCountry.startValue = 0
                // hoveringCountry.endValue = 0.1
                // hoveringCountry.timeElapsed = 0
                setMeshAnimProperties(hoveringCountry,0,0.1)
                // console.log(hoveringCountry.timeElapsed);
                // hoveringCountry.position.y = 0.1
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
            // hoveringCountry.position.y = 0
            setMeshAnimProperties(hoveringCountry,0.1,0)

            if('standardMap' in hoveringCountry 
            && 'hoveringMap' in hoveringCountry 
            && 'selectedMap' in hoveringCountry ){
                hoveringCountry.regionMaterial.map = hoveringCountry.standardMap
                // hoveringCountry.regionMaterial.needsUpdate = true;
                // console.log(hoveringCountry.regionMaterial.map);
            }else{
                hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
            }
            // hoveringCountry.regionMaterial.color = hoveringCountry.standardColor
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
                // selectedCountry.position.y = 0
                setMeshAnimProperties(selectedCountry,0.25,0)
                if('standardMap' in selectedCountry 
                && 'hoveringMap' in selectedCountry 
                && 'selectedMap' in selectedCountry ){
                    selectedCountry.regionMaterial.map = selectedCountry.standardMap
                    // selectedCountry.regionMaterial.needsUpdate = true;

                }else{
                    selectedCountry.regionMaterial.color = selectedCountry.standardColor
                }
                // selectedCountry.regionMaterial.color = selectedCountry.standardColor
                selectedCountry = null
            }
            selectedCountry = hoveringCountry
            hoveringCountry = null
            // selectedCountry.position.y = 0.25
            setMeshAnimProperties(selectedCountry,0.1,0.25)
            if('standardMap' in selectedCountry 
            && 'hoveringMap' in selectedCountry 
            && 'selectedMap' in selectedCountry ){
                selectedCountry.regionMaterial.map = selectedCountry.selectedMap
                selectedCountry.regionMaterial.needsUpdate = true;
            }else{
                selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            }
            // selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            uiControl.enableNextButton()
            if(selectedCountry === maldivesCube){
                uiControl.enableConfirmation(0)
                uiControl.setCountryName('Maldives')
                uiControl.setMaldivesSelected()
            } else if (selectedCountry === sriLankaCube){
                uiControl.enableConfirmation(1)
                uiControl.setCountryName('Sri Lanka')
                uiControl.setSriLankaSelected()
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
                // selectedCountry.position.y = 0
                setMeshAnimProperties(selectedCountry,0.25,0)
                if('standardMap' in selectedCountry 
                && 'hoveringMap' in selectedCountry 
                && 'selectedMap' in selectedCountry ){
                    selectedCountry.regionMaterial.map = selectedCountry.standardMap
                    selectedCountry.regionMaterial.needsUpdate = true;
                }else{
                    selectedCountry.regionMaterial.color = selectedCountry.standardColor
                }
                // selectedCountry.regionMaterial.color = selectedCountry.standardColor
                selectedCountry = null
            }
            selectedCountry = closestIntersect
            // selectedCountry.position.y = 0.25
            setMeshAnimProperties(selectedCountry,0,0.25)
            if('standardMap' in selectedCountry 
            && 'hoveringMap' in selectedCountry 
            && 'selectedMap' in selectedCountry ){
                selectedCountry.regionMaterial.map = selectedCountry.selectedMap
                selectedCountry.regionMaterial.needsUpdate = true;
            }else{
                selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            }
            // selectedCountry.regionMaterial.color = selectedCountry.selectedColor
            uiControl.enableNextButton()
            if(selectedCountry === maldivesCube){
                uiControl.enableConfirmation(0)
                uiControl.setCountryName('Maldives')
                uiControl.setMaldivesSelected()
            } else if (selectedCountry === sriLankaCube){
                uiControl.enableConfirmation(1)
                uiControl.setCountryName('Sri Lanka')
                uiControl.setSriLankaSelected()
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

maldivesCamera.position.set(0,10,4.5)
maldivesCamera.rotation.set(Math.PI * -0.4,0,0)

const maldivesRegionBboxGroup = new THREE.Group()
maldivesRegionBboxGroup.scale.set(0.375,0.375,0.375)
maldivesScene.add(maldivesRegionBboxGroup)

const bboxMat = new THREE.MeshLambertMaterial({color: 0x03d7fc, wireframe: true, visible: true})

const upperNorthCube = new THREE.Mesh(new THREE.BoxGeometry(3.5,0.5,2.5),bboxMat )
maldivesRegionBboxGroup.add(upperNorthCube)
upperNorthCube.name = 'Upper North province'

const northCube = new THREE.Mesh(new THREE.BoxGeometry(4,0.5,3), bboxMat)
maldivesRegionBboxGroup.add(northCube)
northCube.name = 'North province'

const northCentralCube = new THREE.Mesh(new THREE.BoxGeometry(5,0.5,5), bboxMat)
maldivesRegionBboxGroup.add(northCentralCube)
northCentralCube.name = 'North Central province'

const centralCube = new THREE.Mesh(new THREE.BoxGeometry(3,0.5,2.5), bboxMat)
maldivesRegionBboxGroup.add(centralCube)
centralCube.name = 'Central province'

const upperSouthCube = new THREE.Mesh(new THREE.BoxGeometry(3,0.5,2.8), bboxMat)
maldivesRegionBboxGroup.add(upperSouthCube)
upperSouthCube.name = 'Upper South province'

const southCentralCube = new THREE.Mesh(new THREE.BoxGeometry(3.1,0.5,2.7), bboxMat)
maldivesRegionBboxGroup.add(southCentralCube)
southCentralCube.name = 'South Central province'

const southCube = new THREE.Mesh(new THREE.BoxGeometry(2,0.5,1.5), bboxMat)
maldivesRegionBboxGroup.add(southCube)
southCube.name = 'South province'

export var maldivesRegionBoxes = [//Storing region objects in an array for easy access 
    northCube,
    southCentralCube,
    southCube,
    upperSouthCube,
    centralCube,
    northCentralCube,
    upperNorthCube,
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

const maldivesStandardYValue = 0.5
const maldivesHoveringYValue = 1.5
const maldivesSelectedYValue = 2

export function resetMaldivesSelection(){
    currentSelectionScene = 'maldives'
    for (let i = 0; i < maldivesRegionBoxes.length; i++) {
       const element = maldivesRegionBoxes[i];
       setMeshAnimProperties(element,maldivesStandardYValue,maldivesStandardYValue)
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
    uiControl.disableNextButton()
    
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
                    // hoveringMaldivesRegion.regionPosition.y = 0
                    setMeshAnimProperties(hoveringMaldivesRegion,maldivesHoveringYValue,maldivesStandardYValue)
                    hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
                }

                hoveringMaldivesRegion = closestIntersect
                hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.hoveringColor
                // hoveringMaldivesRegion.regionPosition.y = 0.2
                setMeshAnimProperties(hoveringMaldivesRegion,maldivesStandardYValue,maldivesHoveringYValue)
                uiControl.setRegionName(hoveringMaldivesRegion.name)
                uiControl.showRegionAnswerContainer()
            }
        }
        else{
            if(hoveringMaldivesRegion){
                setMeshAnimProperties(hoveringMaldivesRegion,maldivesHoveringYValue,maldivesStandardYValue)
                hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
                hoveringMaldivesRegion = null
                if(selectedMaldivesRegion){
                    uiControl.setRegionName(selectedMaldivesRegion.name)
                }
            }
        }
    }
    else{
        if(hoveringMaldivesRegion){
            // hoveringMaldivesRegion.regionPosition.y = 0
            setMeshAnimProperties(hoveringMaldivesRegion,maldivesHoveringYValue,maldivesStandardYValue)
            hoveringMaldivesRegion.regionMaterial.color = hoveringMaldivesRegion.standardColor
            // uiControl.setRegionName(hoveringMaldivesRegion.name)
            hoveringMaldivesRegion = null
            // uiControl.setRegionName('')
            uiControl.hideRegionAnswerContainer()
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
                // selectedMaldivesRegion.regionPosition.y = 0
                setMeshAnimProperties(selectedMaldivesRegion,maldivesSelectedYValue,maldivesStandardYValue)
                selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.standardColor
                selectedMaldivesRegion = null
            }
            selectedMaldivesRegion = hoveringMaldivesRegion
            hoveringMaldivesRegion = null
            // selectedMaldivesRegion.regionPosition.y = 0.3
            setMeshAnimProperties(selectedMaldivesRegion,maldivesHoveringYValue,maldivesSelectedYValue)
            selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.selectedColor
            const regionIndex = maldivesRegionBoxes.indexOf(selectedMaldivesRegion)
            // console.log(regionIndex);
            uiControl.enableNextButton()
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
                // selectedMaldivesRegion.regionPosition.y = 0
                setMeshAnimProperties(selectedMaldivesRegion,maldivesSelectedYValue,maldivesStandardYValue)

                selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.standardColor
                selectedMaldivesRegion = null
            }
            selectedMaldivesRegion = closestIntersect
            // selectedMaldivesRegion.regionPosition.y = 0.3
            setMeshAnimProperties(selectedMaldivesRegion,maldivesStandardYValue,maldivesSelectedYValue)
            selectedMaldivesRegion.regionMaterial.color = selectedMaldivesRegion.selectedColor
            const regionIndex = maldivesRegionBoxes.indexOf(selectedMaldivesRegion)
            uiControl.enableNextButton()
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
        setMeshAnimProperties(element.parent,0,0)
        element.position.y = 0
    }

    if(hoveringSriLankaRegion){
        // hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
        hoveringSriLankaRegion.regionMaterial.map = hoveringSriLankaRegion.standardMap
    }
    if(selectedSriLankaRegion){
        selectedSriLankaRegion.regionMaterial.map = selectedSriLankaRegion.standardMap
    }

    hoveringSriLankaRegion = null
    selectedSriLankaRegion = null
    
    uiControl.disableNextButton()
}

var hoveringSriLankaRegion
var selectedSriLankaRegion

const SriLankaHoveringYValue = 0.5
const SriLankaSelectedYValue = 1

export function raycastSriLankaRegions(){
    raycaster.setFromCamera(mouse,sriLankaCamera)
    
    const intersects = raycaster.intersectObjects(sriLankaRegions)

    if(intersects.length > 0){
        const closestIntersect = intersects[0].object
        if(closestIntersect !== selectedSriLankaRegion){
            if(closestIntersect !== hoveringSriLankaRegion){
                if(hoveringSriLankaRegion){
                    // hoveringSriLankaRegion.position.y = 0
                    setMeshAnimProperties(hoveringSriLankaRegion.parent,SriLankaHoveringYValue,0)
                    // hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
                    hoveringSriLankaRegion.regionMaterial.map = hoveringSriLankaRegion.standardMap
                }
                hoveringSriLankaRegion = closestIntersect
                // hoveringSriLankaRegion.material = hoveringSriLankaRegion.hoveringMaterial
                hoveringSriLankaRegion.regionMaterial.map = hoveringSriLankaRegion.hoveringMap
                // hoveringSriLankaRegion.position.y = 0.1
                setMeshAnimProperties(hoveringSriLankaRegion.parent,0,SriLankaHoveringYValue)
                uiControl.setRegionName(hoveringSriLankaRegion.name)
                uiControl.showRegionAnswerContainer()
                // uiControl.hideRegionAnswerContainer(false)
            }
        }else{
            if(hoveringSriLankaRegion){
                // hoveringSriLankaRegion.position.y = 0
                setMeshAnimProperties(hoveringSriLankaRegion.parent,SriLankaHoveringYValue,0)
                // hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
                hoveringSriLankaRegion.regionMaterial.map = hoveringSriLankaRegion.standardMap
                hoveringSriLankaRegion = null
                if(selectedSriLankaRegion){
                    uiControl.setRegionName(selectedSriLankaRegion.name)
                    // uiControl.hideRegionAnswerContainer(false)
                }
            }
        }
    }
    else{
        if(hoveringSriLankaRegion){
            // hoveringSriLankaRegion.position.y = 0
            setMeshAnimProperties(hoveringSriLankaRegion.parent,SriLankaHoveringYValue,0)
            hoveringSriLankaRegion.regionMaterial.map = hoveringSriLankaRegion.standardMap
            // hoveringSriLankaRegion.material = hoveringSriLankaRegion.standardMaterial
            // uiControl.setRegionName(hoveringSriLankaRegion.name)
            hoveringSriLankaRegion = null
            uiControl.hideRegionAnswerContainer()
            // uiControl.hideRegionAnswerContainer(true)
            // uiControl.setRegionName('')
        }
        if(selectedSriLankaRegion){
            uiControl.setRegionName(selectedSriLankaRegion.name)
            // uiControl.hideRegionAnswerContainer(false)
        }
    }
}

document.addEventListener('click',onSriLankaRegionClick)

function onSriLankaRegionClick(){
    if(hoveringSriLankaRegion){
        if(hoveringSriLankaRegion !== selectedSriLankaRegion){
            if(selectedSriLankaRegion){
                // selectedSriLankaRegion.position.y = 0
                setMeshAnimProperties(selectedSriLankaRegion.parent,SriLankaSelectedYValue,0)
                selectedSriLankaRegion.regionMaterial.map = selectedSriLankaRegion.standardMap
                selectedSriLankaRegion = null
            }
            selectedSriLankaRegion = hoveringSriLankaRegion
            hoveringSriLankaRegion = null
            // selectedSriLankaRegion.position.y = 0.2
            setMeshAnimProperties(selectedSriLankaRegion.parent,SriLankaHoveringYValue,SriLankaSelectedYValue)
            selectedSriLankaRegion.regionMaterial.map = selectedSriLankaRegion.selectedMap
            const regionIndex = sriLankaRegions.indexOf(selectedSriLankaRegion)
            uiControl.enableNextButton()
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
                // selectedSriLankaRegion.position.y = 0
                setMeshAnimProperties(selectedSriLankaRegion.parent,SriLankaSelectedYValue,0)
                selectedSriLankaRegion.regionMaterial.map = selectedSriLankaRegion.standardMap
                selectedSriLankaRegion = null
            }
            selectedSriLankaRegion = closestIntersect
            // selectedSriLankaRegion.position.y = 0.2
            setMeshAnimProperties(selectedSriLankaRegion.parent,0,SriLankaSelectedYValue)
            selectedSriLankaRegion.regionMaterial.map = selectedSriLankaRegion.selectedMap
            const regionIndex = sriLankaRegions.indexOf(selectedSriLankaRegion)
            // console.log(regionIndex);
            uiControl.enableNextButton()
            uiControl.enableConfirmation(regionIndex)
            uiControl.setRegionName(selectedSriLankaRegion.name)
            // uiControl.hideRegionAnswerContainer(false)
        }
    }
}

//
//      end of Sri Lanka region selection scene

//      Animation loop
//
const maxLerpDuration = 0.1

const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime //delta time can be retrieved from here
    previousTime = elapsedTime
    
    setLabelPositions()

    // console.log(pos);

    animateMeshPosition(sriLankaCube,deltatime,maxLerpDuration)
    animateMeshPosition(maldivesCube,deltatime,maxLerpDuration)

    for (let i = 0; i < maldivesRegionBoxes.length; i++) {
        const region = maldivesRegionBoxes[i];
        animateMeshRegionPosition(region,deltatime,maxLerpDuration)
    }

    if(sriLankaRegions.length !== 0){
        for (let i = 0; i < sriLankaRegions.length; i++) {
            const region = sriLankaRegions[i];
            animateMeshPosition(region.parent,deltatime,maxLerpDuration)
        }
    }


    //Implement loop here

    window.requestAnimationFrame(tick)
}

tick()

function setLabelPositions(){
    let sriLankaPos = new THREE.Vector3();
    sriLankaPos = sriLankaCube.getWorldPosition(sriLankaPos);
    // console.log(sriLankaPos);
    sriLankaPos.project(countryCamera);

    let maldivesPos = new THREE.Vector3();
    maldivesPos = maldivesCube.getWorldPosition(maldivesPos);
    // console.log(maldivesPos);
    maldivesPos.project(countryCamera);
    
    let widthHalf = window.innerWidth / 2;
    let heightHalf = window.innerHeight / 2;
    
    sriLankaPos.x = (sriLankaPos.x * widthHalf) + widthHalf;
    sriLankaPos.y = - (sriLankaPos.y * heightHalf) + heightHalf;
    sriLankaPos.z = 0;
    
    maldivesPos.x = (maldivesPos.x * widthHalf) + widthHalf;
    maldivesPos.y = - (maldivesPos.y * heightHalf) + heightHalf;
    maldivesPos.z = 0;

    uiControl.setSriLankaLabelPosition(sriLankaPos.x,sriLankaPos.y)
    uiControl.setMaldivesLabelPosition(maldivesPos.x,maldivesPos.y)

}

function setMeshAnimProperties(mesh,startValue,endValue){
    mesh.startValue = startValue
    mesh.endValue = endValue
    mesh.timeElapsed = 0
    // console.log(mesh);
}

//For animating Country and Sri Lankan regions meshes
function animateMeshPosition(mesh, deltaTime, duration){
    // console.log(mesh.timeElapsed);
    if('timeElapsed' in mesh && 'startValue' in mesh && 'endValue' in mesh){
        // console.log('animating');
        if(mesh.timeElapsed < duration){
            mesh.position.y = THREE.MathUtils.lerp(mesh.startValue,mesh.endValue,mesh.timeElapsed/duration)
            // console.log(mesh.position.y);
            mesh.timeElapsed+= deltaTime
        }else{
            mesh.position.y = mesh.endValue
        }
    }
}

//For animating Maldives regions meshes
function animateMeshRegionPosition(mesh, deltaTime, duration){
    // console.log(mesh);
    if('timeElapsed' in mesh && 'startValue' in mesh && 'endValue' in mesh){
        // console.log('animating');
        if(mesh.timeElapsed < duration){
            mesh.regionPosition.y = THREE.MathUtils.lerp(mesh.startValue,mesh.endValue,mesh.timeElapsed/duration)
            // console.log(mesh.regionPosition.y);
            mesh.timeElapsed+= deltaTime
        }else{
            mesh.regionPosition.y = mesh.endValue
        }
    }
}

//
//      End of animation loop



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

//#region Joystick scene setup
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

const color = 0xfa76ff;   //prev 0xea7ff9
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
joystickScene.add(floor)

//#region Characters ring
const rRadius = 0.5;
const geoRing = new THREE.CylinderGeometry(rRadius, rRadius, 0.001, 32);
const ringmat = new THREE.MeshBasicMaterial({color : 0xFFFFFF, opacity : 0.2, transparent : true});
export const ring1 = new THREE.Mesh(geoRing, ringmat);
ring1.position.set(0, -0.59, 0);

export const ring2 = new THREE.Mesh(geoRing, ringmat);
ring2.position.set(0, -0.59, 0);
//#endregion

//#region Adding lights in slider scene
const ambLight = new THREE.AmbientLight(0xCFD1E6, 0.3);     //Prev 0.5
joystickScene.add(ambLight);

export const joyDirLight = new THREE.DirectionalLight(0xffffff, 1 );
const lightScale = 1;
joyDirLight.position.set(4 * lightScale,8 * lightScale,5 * lightScale);
joyDirLight.castShadow = true;
joyDirLight.shadow.camera.near = 0.1;
joyDirLight.shadow.camera.far = 100;
joystickScene.add(joyDirLight);

export const pointLight = new THREE.PointLight(0xA7C0FF, 1, 3);      //prev new THREE.PointLight(0xA7C0FF, 1, 3)
pointLight.position.y = -1;
pointLight.position.z = 3.5/ aspect;
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
//joystickScene.add(bgPointLight2);
// console.log(joystickScene);
//#endregion
//#endregion

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

//#region Stage 3 scene
export const stage3Scene = joystickScene.clone()
export const stage3Camera = stage3Scene.children[0]

const stage3Floor = stage3Scene.getObjectByName("floor")
stage3Floor.position.y -= 0.12

//#endregion

//#region Submit Scene
// export const submitScene = new THREE.Scene() 
// export const submitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// submitScene.add(submitCamera)

export const submitScene = joystickScene.clone()
export const submitCamera = submitScene.children[0]

submitCamera.position.x = 0
submitCamera.position.y = -0.3
submitCamera.position.z = 3.5
// submitCamera.rotation.set(Math.PI * 0, 0, 0)

submitCamera.lookAt(0, -0.6, 0);

//joystickScene.remove(floor)


// const submitPointLight = new THREE.PointLight(0xffffff, 3)

// submitPointLight.position.x = 2
// submitPointLight.position.y = 3
// submitPointLight.position.z = 4
// submitPointLight.intensity = 1.3

// submitScene.add(submitPointLight)
//#endregion





// const submitFloorSize = 100;
// var submitFloorgeo = new THREE.PlaneGeometry(submitFloorSize,submitFloorSize);
// // submitFloorgeo.computeBoundingBox();
// //const submitFloorgeo = new THREE.CylinderGeometry(1000,1000,0.05, 256);
// const submitFloorMaterial = new THREE.MeshToonMaterial( {color: 0x5331FF, fog:true});   //dark pink 801FCF    //prev new THREE.MeshToonMaterial( {color: 0x725FB3})

// const submitFloor = new THREE.Mesh (submitFloorgeo, submitFloorMaterial); 
// submitFloor.rotation.set(Math.PI / -2, 0, 0)
// console.log(submitFloor);
// submitFloor.position.z = - submitFloorSize / 4
// submitFloor.position.y = -.6
// submitFloor.position.x = 0
// submitFloor.receiveShadow = true;
// submitScene.add(submitFloor);

// const submitFogColor = 0xfa76ff;

// const submitFogDensity = 0.2; 
// submitScene.fog = new THREE.FogExp2(submitFogColor, submitFogDensity);

//
//      end of Submit scene


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

export function GetModelIds(questionIndex){
    switch(questionIndex){
        default:
            return null;
        case 3: //Mother scene
            return [{
                name : 'lamp',
                position : new THREE.Vector3(0, -0.6, -0.6),
                rotation : new THREE.Vector3(0, 45, 0)
            },
            {
                name : 'carpet',
                position : new THREE.Vector3(0, -0.6, 0),
                rotation : new THREE.Vector3(0,0,0)
            }]
            break;
        case 4:     //Father
            return [{
                name : 'lamp',
                position : new THREE.Vector3(0, -0.6, -0.6),
                rotation : new THREE.Vector3(0, -45, 0)
            },
            {
                name : 'carpet',
                position : new THREE.Vector3(0, -0.6, 0),
                rotation : new THREE.Vector3(0,0,0)
            }]
            break;
        case 5:     //Siblings
            return [{
                name : 'lamp',
                position : new THREE.Vector3(-1, -0.6, -1),
                rotation : new THREE.Vector3(0, 45, 0)
            },
            {
                name : 'carpet',
                position : new THREE.Vector3(-0.5, -0.6, -0.8),
                rotation : new THREE.Vector3(0,45,0)
            },
            {
                name:'sofasmall',
                position : new THREE.Vector3(-0.7, -0.6, -1.3),
                rotation : new THREE.Vector3(0,45,0)
            },
            {
                name:'sofa',
                position : new THREE.Vector3(0.7, -0.6, -0.8),
                rotation : new THREE.Vector3(0,-45,0)
            }]
            break;
        case 7:     //Distant friends
            return [{
                name : 'letter',
                position : new THREE.Vector3(0, 0, 0),
                rotation : new THREE.Vector3(0, 0, 0)
            }]
            break;

    }
}


