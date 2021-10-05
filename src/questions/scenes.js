import * as THREE from 'three'
import * as assetLoader from '../assets_loader/assets_loader'
import * as uiControl from '../ui_controller/ui_controller'

const mouse = new THREE.Vector2() 

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX /window.innerWidth  * 2 -1
    mouse.y = -(event. clientY / window.innerHeight * 2 -1)
})

const raycaster = new THREE.Raycaster()


//      Country selection scene
//
export const countryScene = new THREE.Scene()
export const countryCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
countryScene.add(countryCamera)

countryCamera.position.set(0,4,2)
countryCamera.rotation.set(Math.PI * -0.4,0,0)

const maldivesCube = new THREE.Mesh(new THREE.BoxGeometry(1,0.1,1), new THREE.MeshLambertMaterial({color: 0xee2b2b}))
countryScene.add(maldivesCube)
maldivesCube.position.set(-1.5,0,0)

const sriLankaCube = new THREE.Mesh(new THREE.BoxGeometry(1,0.1,1), new THREE.MeshLambertMaterial({color: 0x2b2bee}))
countryScene.add(sriLankaCube)
sriLankaCube.position.set(1.5,0,0)

const countryAmbientLight = new THREE.AmbientLight(0xffffff)
countryScene.add(countryAmbientLight)
//
//      end of Country selection scene

export function resetCountrySelections(){
    sriLankaCube.position.y = 0
    maldivesCube.position.y = 0

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
                    hoveringCountry.material.emissive.setHex(0x000000)
                }

                hoveringCountry = closestIntersect
                hoveringCountry.material.emissive.setHex(0x444444)
                hoveringCountry.position.y = 0.1
            }
        }
    }
    else{
        if(hoveringCountry){
            hoveringCountry.position.y = 0
            hoveringCountry.material.emissive.setHex(0x000000)
            hoveringCountry = null
        }
    }
}

document.addEventListener('click',onCountryClick)

function onCountryClick(){
    if(hoveringCountry){
        if(hoveringCountry !== selectedCountry){
            if(selectedCountry){
                selectedCountry.position.y = 0
                selectedCountry = null
            }
            selectedCountry = hoveringCountry
            hoveringCountry = null
            selectedCountry.position.y = 0.25
            selectedCountry.material.emissive.setHex(0x000000)
            uiControl.enableNextButton()
            if(selectedCountry === maldivesCube){
                uiControl.enableConfirmation(0)
            } else if (selectedCountry === sriLankaCube){
                uiControl.enableConfirmation(1)
            }
        }
    }
}


//      Maldives region selection scene
//
export const maldivesScene = new THREE.Scene()
export const maldivesCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
maldivesScene.add(maldivesCamera)

maldivesCamera.position.set(0,4,2)
maldivesCamera.rotation.set(Math.PI * -0.4,0,0)

const upperNorthCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0x03d7fc}))
maldivesScene.add(upperNorthCube)
upperNorthCube.position.set(0,0,-3)

const northCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0xff5252}))
maldivesScene.add(northCube)
northCube.position.set(0,0,-2)

const northCentralCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0xcfcfcf}))
maldivesScene.add(northCentralCube)
northCentralCube.position.set(0,0,-1)

const centralCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0xffe0e0}))
maldivesScene.add(centralCube)
centralCube.position.set(0,0,0)

const upperSouthCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0xffe17d}))
maldivesScene.add(upperSouthCube)
upperSouthCube.position.set(0,0,1)

const southCentralCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0x4dff3d}))
maldivesScene.add(southCentralCube)
southCentralCube.position.set(0,0,2)

const southCube = new THREE.Mesh(new THREE.BoxGeometry(0.75,0.1,0.75), new THREE.MeshLambertMaterial({color: 0xab7aff}))
maldivesScene.add(southCube)
southCube.position.set(0,0,3)

const maldivesAmbientLight = new THREE.AmbientLight(0xffffff)
maldivesScene.add(maldivesAmbientLight)
//
//      end of Country selection scene

//      MCQ scene
//
export const mcqScene = new THREE.Scene() 
export const mcqCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
mcqScene.add(mcqCamera)

mcqCamera.position.x = -.1
mcqCamera.position.y = -.4
mcqCamera.position.z = 2.6
mcqCamera.rotation.set(Math.PI * 0, 0, 0)

const mcqPointLight = new THREE.PointLight(0xffffff, 3)

mcqPointLight.position.x = 2
mcqPointLight.position.y = 3
mcqPointLight.position.z = 4
mcqPointLight.intensity = 1.3

mcqScene.add(mcqPointLight)

//
//      end of MCQ scene

//      Joystick scene
//
export const joystickScene = new THREE.Scene() 
export const joystickCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

joystickCamera.position.x = 0
joystickCamera.position.y = 2
joystickCamera.position.z = 4.0
joystickCamera.rotation.set(Math.PI * -0.2, 0, 0)
joystickScene.add(joystickCamera)

//Setting up level

//add floor
const floorgeo = new THREE.BoxGeometry(100,.05,100);
const floorMaterial = new THREE.MeshBasicMaterial( {color: 0xfff4db});
const RingMaterial = new THREE.MeshBasicMaterial({color: 0xf5eddc})

const floor = new THREE.Mesh (floorgeo, floorMaterial);
floor.position.y = -.65

joystickScene.add(floor);

//Adding rings
//Highlight material
const rad1Material = new THREE.MeshBasicMaterial( { color: 0xfcf8ed } );

//radius 1
const geometry = new THREE.CylinderGeometry( .5, .5, 0.008, 64 );
const cylinder = new THREE.Mesh( geometry, RingMaterial );
cylinder.position.set(0,-.59,0)

//radius 2
const geometry2 = new THREE.CylinderGeometry( 1, 1, 0.008, 64 );
const cylinder2 = new THREE.Mesh( geometry2, floorMaterial );
cylinder2.position.set(0,-.60,0)

//radius 3
const geometry3 = new THREE.CylinderGeometry( 1.5, 1.5, 0.008, 64 );
const cylinder3 = new THREE.Mesh( geometry3, RingMaterial );
cylinder3.position.set(0,-.61,0)

joystickScene.add( cylinder);
joystickScene.add( cylinder2 );
joystickScene.add( cylinder3 );

//Adding light
const joystickPointLight = new THREE.PointLight(0xffffff, 3)

joystickPointLight.position.x = 2
joystickPointLight.position.y = 3
joystickPointLight.position.z = 4
joystickPointLight.intensity = 1.3

joystickScene.add(joystickPointLight)
//
//      end of Joystick scene


export function calculateDistance(currentCenterModel, answers){
    const player = assetLoader.getModel('playerCharacter')
    let distance
    let answerDisplay = document.getElementById('joystick-answer-container')

    if(player && currentCenterModel){
        distance = player.position.distanceTo(currentCenterModel.position)
    }

    if(distance > 1 && distance < 1.5){
        cylinder3.material = rad1Material
        answerDisplay.innerText = answers[0]
        uiControl.enableConfirmation(0)
    }
    else
    {
        cylinder3.material = RingMaterial
    }

     //neutral face
    if(distance > 0.5 && distance < 1){
        cylinder2.material = rad1Material
        answerDisplay.innerText = answers[1]
        uiControl.enableConfirmation(1)
    }
    else{
        cylinder2.material = floorMaterial
    }

     // Happy face
    if(distance > 0 && distance < 0.5){
        cylinder.material = rad1Material
        answerDisplay.innerText = answers[2]
        uiControl.enableConfirmation(2)
    }
    else{
        cylinder.material = RingMaterial  
    }

    if(distance > 1.5){
        answerDisplay.innerText  = ''
        uiControl.disableConfirmation()
    }
}

//Updates rings' location in regard center model position
export function updateRingLocation(currentCenterModel){
    if(currentCenterModel){
        const centerModelPosX = currentCenterModel.position.x 
        const centerModelPosZ = currentCenterModel.position.z 
        
        cylinder.position.set(centerModelPosX,-.59,centerModelPosZ)
        cylinder2.position.set(centerModelPosX,-.60,centerModelPosZ)
        cylinder3.position.set(centerModelPosX,-.61,centerModelPosZ)

    }
}


