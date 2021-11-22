import * as THREE from 'three'
import { getOtherCharacterInitialPosition, enablePlayerControl } from './character_controller/character_control';
import { setUiText, sliderHolder, enableBackButton, disableBackButton, enableNextButton, disableNextButton } from './ui_controller/ui_controller';
import { pointLight, joyDirLight } from './questions/scenes';
import { FlatShading, MathUtils } from 'three';

var dataInitialized = false;
var animate = false;
var playerMoved = false;

var transitionStyle;
const styleFadeIn = 'fadein';
const styleFadeOut = 'fadeout';
const styleJumpIn = 'jumpin';
const styleJumpOut = 'jumpout';
let canEnableControls = true;   //true to enable controls on slider question after transition, false on likert question
let needPlayerAdjustment = false;     //For offset adjustment on likert scene

const takeOnFactor = 1.2; //prev 0.4
const takeOffFactor = 0.2;   //prev 0.2
const takeSeparationFactor = 0.25;  //prev 0.35
const playerTransitionDistance = 0.05;   //Prev 0.05
const playerTransitionTime = 0.15;
var jerkValue = takeOnFactor;  //Lerps the lerp value to make transition smoother

const playerJumpDistance = 3;   //Player Y travel distance on Jump in and Jump out transition
const jumpTransitionTime = 0.5; //Player travel duration on Jump in and Jump out transition

const cameraTransitionDistance = 10;     //prev 2
var tempPlayerYpos = 0;
let minPlayerYpos = 0;
const otherTransitionDistance = 3;
var lerpFactor = 0;

let playerCharacter;
let otherCharacter;
let mainCamera;
let flowDirection;
const directionLeft = 'left';
const directionRight = 'right';

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

export function fadeIn(_otherModel, switchDirection, _canEnableControls, _callFunction, _targetXpos){
    if(_otherModel){
        otherCharacter = _otherModel;
        otherPos = otherCharacter.position.clone();
    }

    callBackFunction = _callFunction;
    transitionStyle = styleFadeIn;
    canEnableControls = _canEnableControls;
    flowDirection = switchDirection;
    //needPlayerAdjustment = !_canEnableControls;
    if(_targetXpos != null)
        targetXPosition = _targetXpos;
    else
        targetXPosition = playerPos.clone().x;

    needPlayerAdjustment = false;

    initCameraPos = cameraPos.clone();
    //initPlayerPos = playerPos.clone();
    
    const slideDirection = switchDirection == directionLeft ? 1 : -1;
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
    //jerkValue = takeOffFactor;
}

export function fadeOut(_otherModel, switchDirection, _callFunction){
    if(_otherModel){
        otherCharacter = _otherModel;
        otherPos = otherCharacter.position;
    }

    callBackFunction = _callFunction;
    transitionStyle = styleFadeOut;
    disableBackButton();
    disableNextButton();
    // canEnableControls = true;

    initCameraPos = cameraPos.clone();
    let z = playerOffset.z;
    playerOffset = playerCharacter.position.clone();
    playerOffset.sub(mainCamera.position);
    playerOffset.z = z;
    //initPlayerPos = playerPos.clone();

    const slideDirection = switchDirection == directionRight ? 1 : -1;
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
    //jerkValue = takeOnFactor;
}

const clock = new THREE.Clock();
let prevTime = clock.getElapsedTime();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltatime = elapsedTime - prevTime;
    prevTime = elapsedTime;

    if(animate){
        if(transitionStyle == styleFadeIn){
            if(playerMoved){
                transition(deltatime);
            }
            else{
                    if(needPlayerAdjustment)
                        adjustPlayerPosition(deltatime);
                    else
                        playerMovement(deltatime);
            }
        }
        else if(transitionStyle == styleFadeOut){
            if(playerMoved == false){
                playerMovement(deltatime);
            }
            else{
                if(needPlayerAdjustment)
                    adjustPlayerPosition(deltatime);
                else
                    transition(deltatime);
            }
        }
        
        if(transitionStyle == styleJumpIn || transitionStyle == styleJumpOut){
            jumpTransition(deltatime);
        }
        //transition(deltatime);
        
    }

    window.requestAnimationFrame(tick);
}
tick();

let adjustmentTime = 0.15;
let targetXPosition = 0;
let xPosAfterTransition = 0;
let adjustmentTravelPerSec = 3;   //2.5

const adjustPlayerPosition = function(deltatime){
    lerpFactor += deltatime / adjustmentTime;
    lerpFactor = MathUtils.clamp(lerpFactor, 0, 1);

    var tempPlayerXpos = 0;
    if(transitionStyle == styleFadeIn){
        tempPlayerXpos = (targetXPosition - xPosAfterTransition) * lerpFactor;
        playerCharacter.position.x = xPosAfterTransition + tempPlayerXpos;
    }
    else if(transitionStyle == styleFadeOut){
        tempPlayerXpos = (xPosAfterTransition - targetXPosition) * lerpFactor;
        playerCharacter.position.x = targetXPosition + tempPlayerXpos;
    }


    if(lerpFactor >= 0.98){
        lerpFactor = 0;
        needPlayerAdjustment = false;
    }
}

const playerMovement = function(deltatime){
    
    lerpFactor += deltatime / playerTransitionTime;
    lerpFactor = MathUtils.clamp(lerpFactor, 0, 1);

    if(transitionStyle == styleFadeIn){
        tempPlayerYpos = (1 - lerpFactor) * playerTransitionDistance;
    }
    else if(transitionStyle == styleFadeOut){
        tempPlayerYpos = lerpFactor * playerTransitionDistance;
    }
    
    var curPpos = playerCharacter.position.clone();
    curPpos.y = tempPlayerYpos + minPlayerYpos;
    playerCharacter.position.set(curPpos.x,curPpos.y,curPpos.z);
    
    if(lerpFactor >= 0.98){
        playerMoved = true;
        if(transitionStyle == styleFadeOut){
            if(canEnableControls == false){
                //needPlayerAdjustment = true;
            }
        }

        if(transitionStyle == styleFadeIn){
            animate = false;
            enableBackButton();
            enableNextButton();
            if(canEnableControls)
                enablePlayerControl();
        }
        lerpFactor = 0;
    }
}

const jerkLerpSpeed = 0.5;
const transition = function(deltatime){
    if(transitionStyle == styleFadeOut){
        if(lerpFactor <= takeSeparationFactor){
            jerkValue = MathUtils.lerp(jerkValue, takeOnFactor, jerkLerpSpeed);
            //lerpFactor += deltatime / takeOnFactor;
        }
        else{
            jerkValue = MathUtils.lerp(jerkValue, takeOffFactor, jerkLerpSpeed);
            //lerpFactor += deltatime / takeOffFactor;
        }
    }
    else if(transitionStyle == styleFadeOut){
        if(lerpFactor <= 1-takeSeparationFactor){
            jerkValue = MathUtils.lerp(jerkValue, takeOffFactor, jerkLerpSpeed);
            //lerpFactor += deltatime / takeOffFactor;
        }
        else{
            jerkValue = MathUtils.lerp(jerkValue, takeOnFactor, jerkLerpSpeed);
            //lerpFactor += deltatime / takeOnFactor;
        }
    }
    lerpFactor += deltatime / jerkValue;
    lerpFactor = MathUtils.clamp(lerpFactor, 0, 1);
    
    var curCamPosition;
    var finalCamPosition;

    var curPlayerPosition;
    var finalPlayerPosition;

    var curOtherPosition;
    var finalOtherPosition;

    if(transitionStyle == styleFadeIn){
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
    else if(transitionStyle == styleFadeOut){
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
    
    if(transitionStyle == styleFadeIn){
        if(flowDirection == directionRight){
            if(playerCharacter.position.x < targetXPosition)
                playerCharacter.position.set(pOffsetPos.x, pOffsetPos.y, pOffsetPos.z);
            else
                playerCharacter.position.set(targetXPosition, pOffsetPos.y, pOffsetPos.z);
        }
        else if(flowDirection == directionLeft){
            if(playerCharacter.position.x > targetXPosition)
                playerCharacter.position.set(pOffsetPos.x, pOffsetPos.y, pOffsetPos.z);
            else
                playerCharacter.position.set(targetXPosition, pOffsetPos.y, pOffsetPos.z);
        }
    }
    else{
        playerCharacter.position.set(pOffsetPos.x, pOffsetPos.y, pOffsetPos.z);
    }
    //console.log("player pos = ", playerCharacter.position.x, ", L =", lerpFactor);

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
        if(transitionStyle == styleFadeIn){
            let dif = Math.abs(playerCharacter.position.x - targetXPosition);
            if(dif < 0.1){
                playerCharacter.position.set(targetXPosition, tempPlayerYpos, finalPlayerPosition.z);
            }
            //enablePlayerControl();
        }

        playerCharacter.traverse((child) => {
            if (child.isMesh){
                child.castShadow = true;
            }
        });
        
        if(transitionStyle == styleFadeIn){
            xPosAfterTransition = playerCharacter.position.clone().x;
            //xPosAfterTransition = playerOffset.x + mainCamera.position.x;
            let dif = Math.abs(xPosAfterTransition - targetXPosition);
            if(Math.abs(dif) > 0.1){
                adjustmentTime = dif / adjustmentTravelPerSec;
                needPlayerAdjustment = true;
                lerpFactor = 0;
            }
            else{
                needPlayerAdjustment = false;
            }
        }
        else{
            needPlayerAdjustment = false;
        }

        if(callBackFunction && transitionStyle == styleFadeOut){
            callBackFunction();
        }
    }
}

export const jumpIn = function(){
    playerCharacter.position.set(playerPos.x, minPlayerYpos + playerJumpDistance, playerPos.z);
    transitionStyle = styleJumpIn;
    animate = true;
    disableBackButton();
    disableNextButton();
}

export const jumpOut = function(_callBack){
    playerCharacter.position.set(playerPos.x, playerPos.y, playerPos.z);
    transitionStyle = styleJumpOut;
    callBackFunction = _callBack;
    animate = true;
}

const jumpTransition = function(deltatime){
    
    lerpFactor += deltatime / jumpTransitionTime;

    if(transitionStyle == styleJumpIn){
        tempPlayerYpos = (1 - lerpFactor) * playerJumpDistance;
    }
    else if(transitionStyle == styleJumpOut){
        tempPlayerYpos = lerpFactor * playerJumpDistance;
    }
    
    var curPpos = playerPos.clone();
    curPpos.y = tempPlayerYpos + minPlayerYpos;
    playerCharacter.position.set(curPpos.x,curPpos.y,curPpos.z);
    
    if(lerpFactor >= 0.98){
        playerMoved = true;
        animate = false;
        if(transitionStyle == styleJumpIn){
            enablePlayerControl();
            enableBackButton();
            enableNextButton();
        }
        if(transitionStyle == styleJumpOut){
            callBackFunction();
        }
        lerpFactor = 0;
    }
}