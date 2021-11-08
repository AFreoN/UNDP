import * as THREE from 'three'
import { getOtherCharacterInitialPosition, enablePlayerControl } from './character_controller/character_control';
import { setUiText, sliderHolder } from './ui_controller/ui_controller';
import { pointLight, joyDirLight } from './questions/scenes';
import { EnableCharacterText, uiTextCheck } from './questions/questions';

var dataInitialized = false;
var animate = false;
var playerMoved = false;

var transitionStyle;

const takeOnTransitionTime = 1;
const takeOnFactor = 0.4; //prev 1
const takeOffTransitionTime = 0.5;
const takeOffFactor = 0.2;   //prev 0.3
const takeSeparationFactor = 0.35;
const playerTransitionDistance = 0.05;   //Prev 0.05
const playerTransitionTime = 0.15;

const cameraTransitionDistance = 10;     //prev 2
var tempPlayerYpos = 0;
let minPlayerYpos = 0;
const otherTransitionDistance = 3;
var lerpFactor = 0;

let playerCharacter;
let otherCharacter;
let mainCamera;

let playerPos;  //Standard player position
let otherPos;   //Base position of the other character
let cameraPos;  //Standard camera position
let playerOffset = new THREE.Vector3();     //Offset between player and camera
let pointOffset = new THREE.Vector3();
let directionLightOffset = new THREE.Vector3();

let initPlayerPos;  //position to set for player character before starting animation
let initOtherPos;   //positon to set for other character before starting animation
let initCameraPos = new THREE.Vector3();  //starting point on fadein, ending point on fadeout

let callBackFunction;       //Scene load function after transition is completed

export function initializeData(_player, _camera, _playerInitPos)
{
    if(dataInitialized){
        return;
    }
    playerCharacter = _player;
    mainCamera = _camera;

    playerPos = _playerInitPos.clone();
    minPlayerYpos = _playerInitPos.y;

    cameraPos = mainCamera.position.clone();
    //debugVector3(cameraPos, "Cam pos on initialize");

    playerOffset = playerPos.clone();
    playerOffset.sub(cameraPos);
    
    pointOffset = pointLight.position.clone();
    pointOffset.sub(playerCharacter.position);
    directionLightOffset = joyDirLight.position.clone();
    directionLightOffset.sub(playerCharacter.position);

    initPlayerPos = playerPos.clone();
    initPlayerPos.y += playerTransitionDistance;
    //debugVector3(playerOffset, "Player offset on init");

    dataInitialized = true;
    //console.log("Player = " + playerCharacter.name + ", Other = " + otherCharacter.name + ", camera = " + mainCamera.name);
}

export function fadeIn(_otherModel, switchDirection, _callFunction){
    if(_otherModel){
        otherCharacter = _otherModel;
        otherPos = otherCharacter.position.clone();
    }

    callBackFunction = _callFunction;
    transitionStyle = 'fadein';

    initCameraPos = cameraPos.clone();
    //initPlayerPos = playerPos.clone();
    
    const slideDirection = switchDirection == 'left' ? 1 : -1;
    initCameraPos.x += slideDirection * cameraTransitionDistance;
    mainCamera.position.set(initCameraPos.x, initCameraPos.y, initCameraPos.z);
    
    //initPlayerPos.y += playerTransitionDistance;
    tempPlayerYpos = playerTransitionDistance;
    var ppfinal = playerOffset.clone();
    ppfinal.add(mainCamera.position);
    ppfinal.y = minPlayerYpos + tempPlayerYpos;
    playerCharacter.position.set(ppfinal.x, ppfinal.y, ppfinal.z);

    otherPos = getOtherCharacterInitialPosition().clone();
    initOtherPos = otherPos.clone();
    initOtherPos.z -= otherTransitionDistance;
    //debugVector3(otherPos, "Other character position on fade in");
    //playerCharacter.position.set(initPlayerPos.x, initPlayerPos.y, initPlayerPos.z);
    
    lerpFactor = 0;
    animate = true;
    playerMoved = true;
    playerCharacter.traverse((child) => {
        if (child.isMesh){
            child.castShadow = false;
        }
    });
}

export function fadeOut(_otherModel, switchDirection, _callFunction){
    if(_otherModel){
        otherCharacter = _otherModel;
        otherPos = otherCharacter.position;
    }
    callBackFunction = _callFunction;
    transitionStyle = 'fadeout';

    initCameraPos = cameraPos.clone();
    //initPlayerPos = playerPos.clone();

    const slideDirection = switchDirection == 'right' ? 1 : -1;
    initCameraPos.x += slideDirection * cameraTransitionDistance;
    //mainCamera.position.set(initCameraPos.x, initCameraPos.y, initCameraPos.z);

    //initPlayerPos.y += playerTransitionDistance;
    //playerCharacter.position.set(initPlayerPos.x, initPlayerPos.y, initPlayerPos.z);

    otherPos = getOtherCharacterInitialPosition().clone();
    initOtherPos = otherPos.clone();
    initOtherPos.z -= otherTransitionDistance;

    tempPlayerYpos = 0;
    lerpFactor = 0;
    animate = true;
    playerMoved = false;
    playerCharacter.traverse((child) => {
        if (child.isMesh){
            child.castShadow = false;
        }
    });   
}

const clock = new THREE.Clock();
let prevTime = clock.getElapsedTime();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltatime = elapsedTime - prevTime;
    prevTime = elapsedTime;

    if(animate){
        if(transitionStyle == 'fadein'){
            if(playerMoved){
                transition(deltatime);
            }
            else{
                playerMovement(deltatime);
            }
        }
        else{
            if(playerMoved == false){
                playerMovement(deltatime);
            }
            else{
                transition(deltatime);
            }
        }
        //transition(deltatime);
        
    }

    window.requestAnimationFrame(tick);
}
tick();

const playerMovement = function(deltatime){
    
    lerpFactor += deltatime / playerTransitionTime;

    if(transitionStyle == 'fadein'){
        tempPlayerYpos = (1 - lerpFactor) * playerTransitionDistance;
    }
    else{
        tempPlayerYpos = lerpFactor * playerTransitionDistance;
    }
    
    var curPpos = playerCharacter.position.clone();
    curPpos.y = tempPlayerYpos + minPlayerYpos;
    playerCharacter.position.set(curPpos.x,curPpos.y,curPpos.z);
    
    if(lerpFactor >= 0.98){
        playerMoved = true;
        if(transitionStyle == 'fadein'){
            animate = false;
            enablePlayerControl();
            // if(otherCharacter)
            // {
            //     EnableCharacterText();  
            // }

        }

        lerpFactor = 0;

        //playerOffset = playerCharacter.position.clone();
        //playerOffset.sub(mainCamera.position);
    }
}

const transition = function(deltatime){
    if(transitionStyle == 'fadeout'){
        if(lerpFactor <= takeSeparationFactor){
            lerpFactor += deltatime / takeOnFactor;
        }
        else{
            lerpFactor += deltatime / takeOffFactor;
        }
    }
    else{
        if(lerpFactor <= 1-takeSeparationFactor){
            lerpFactor += deltatime / takeOffFactor;
        }
        else{
            lerpFactor += deltatime / takeOnFactor;
        }
    }

    
    var curCamPosition;
    var finalCamPosition;

    var curPlayerPosition;
    var finalPlayerPosition;

    var curOtherPosition;
    var finalOtherPosition;

    if(transitionStyle == 'fadein'){
        finalCamPosition = cameraPos.clone();
        curCamPosition = initCameraPos.clone();
        curCamPosition.lerp(cameraPos, lerpFactor);

        finalPlayerPosition = playerPos.clone();
        curPlayerPosition = initPlayerPos.clone();
        curPlayerPosition.lerp(playerPos, lerpFactor);
        tempPlayerYpos = playerTransitionDistance - (lerpFactor * playerTransitionDistance);

        finalOtherPosition = otherPos.clone();
        curOtherPosition = initOtherPos.clone();
        curOtherPosition.lerp(otherPos, lerpFactor);            
    }
    else{
        finalCamPosition = initCameraPos.clone();
        curCamPosition = cameraPos.clone();
        curCamPosition.lerp(initCameraPos, lerpFactor);

        finalPlayerPosition = initPlayerPos.clone();
        curPlayerPosition = playerPos.clone();
        curPlayerPosition.lerp(initPlayerPos, lerpFactor);
        tempPlayerYpos = lerpFactor * playerTransitionDistance;

        finalOtherPosition = initOtherPos.clone();
        curOtherPosition = otherPos.clone();
        curOtherPosition.lerp(initOtherPos, lerpFactor);
    }
    tempPlayerYpos = minPlayerYpos + playerTransitionDistance;
    
    mainCamera.position.set(curCamPosition.x, curCamPosition.y, curCamPosition.z);
    //playerCharacter.position.set(curPlayerPosition.x, curPlayerPosition.y, curPlayerPosition.z);

    var pOffsetPos = playerOffset.clone();
    pOffsetPos.add(mainCamera.position);
    pOffsetPos.y = tempPlayerYpos;
    //pOffsetPos.y = tempPlayerYpos + minPlayerYpos;
    
    //playerCharacter.position.lerp(pOffsetPos, 1);
    playerCharacter.position.set(pOffsetPos.x, pOffsetPos.y, pOffsetPos.z);

    var curPointLightPos = pointOffset.clone();
    curPointLightPos.add(playerCharacter.position);
    //pointLight.position.set(curPointLightPos.x, curPointLightPos.y, curPointLightPos.z);

    var curDirLightpos = directionLightOffset.clone();
    curDirLightpos.add(playerCharacter.position);
    //joyDirLight.position.set(curDirLightpos.x, curDirLightpos.y, curDirLightpos.z);

    otherCharacter.position.set(curOtherPosition.x, curOtherPosition.y, curOtherPosition.z);

    var checkCondition = mainCamera.position.distanceTo(finalCamPosition) <= 0.05;
    checkCondition = lerpFactor >= 0.98;
    if(checkCondition){
        //animate = false;
        lerpFactor = 0;
        playerMoved = false;

        mainCamera.position.set(finalCamPosition.x, finalCamPosition.y, finalCamPosition.z);
        if(transitionStyle == 'fadein'){
            playerCharacter.position.set(finalPlayerPosition.x, tempPlayerYpos, finalPlayerPosition.z);
            //enablePlayerControl();
        }

        playerCharacter.traverse((child) => {
            if (child.isMesh){
                child.castShadow = true;
            }
        });
        
        //debugVector3(finalPlayerPosition, "After transition final position");
        //debugVector3(curPlayerPosition, "Cur position after transition");
        //debugVector3(playerCharacter.position, "Player after transition");


        if(callBackFunction && transitionStyle == 'fadeout'){
            callBackFunction();
        }

        // if(transitionStyle == 'fadein'){
        //     sliderHolder.hidden = false;
        // }
    }
}

const debugVector3 = function(vector, msg){
    if(msg){
        console.log(msg + " --> x = " + vector.x + ", y = " + vector.y + ", z = " + vector.z);
    }
    else{
        console.log("x = " + vector.x + ", y = " + vector.y + ", z = " + vector.z);
    }
}