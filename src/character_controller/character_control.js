import * as THREE from 'three'

//Character control

//can enable/disable player control using canControlPlayer
let canControlPlayer = false

export function enablePlayerControl(){
    canControlPlayer = true
}

export function disablePlayerControl(){
    canControlPlayer = false
}


let player = null; //Holds player model
let playerMixer = null; //Holds player animation mixer
let playerAnimations = null //Holds player animation array

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
})

//executes when loading is complete. Imports player model, animation mixer and animations
export function setPlayer(playerModel, playerAnims){
    player = playerModel
    playerMixer = new THREE.AnimationMixer(player)
    playerAnimations = playerAnims
}

//holds cursor position calculated from center of the screen
const mouse = new THREE.Vector2() 

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX /sizes.width * 2 -1
    mouse.y = -(event. clientY / sizes.height * 2 -1)
})

//adding event listeners for controls

//mouse events
document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('mousedown', onDocumentMouseDown)
document.addEventListener('mouseup', onDocumentMouseUp)

//touch events
document.addEventListener('touchstart', onDocumentTouchStart)
document.addEventListener('touchmove', onDocumenttouchMove, preventDefault)
document.addEventListener('touchend', onDocumentTouchEnd)
document.addEventListener('touchcancel', onDocumentTouchEnd)

//disable Scrolling
function preventDefault(e) {
    e.preventDefault();
}

//keyboard events
document.addEventListener('keydown', keyPressed )
document.addEventListener('keyup',  keylifted)

const windowX = window.innerWidth / 2 ;
const windowY = window.innerHeight / 2;

//Is character moving
var move= false;

//variables for mouse movement
var mouseoriginalx, mouseoriginaly, mousenewx, mousenewy;

//variables for touch movement
var touchy,touchx, touchnewy, touchnewx;


function onDocumentMouseMove(event) {
    mousenewx = mouse.x
    mousenewy = mouse.y

    if(move)
    {
         idle = false;

        if(mousenewx - mouseoriginalx > 0.1){
            moveright = true;
            moveleft = false;
        }

        if(mousenewx - mouseoriginalx < -0.1){
            moveleft = true;
            moveright = false;
        }

         if(mousenewy - mouseoriginaly > 0.1){
            moveforward =  true;
            movebackwards = false;

        }

        if(mousenewy - mouseoriginaly < -0.1){
            movebackwards = true;
            moveforward = false;
        } 
    }   
}

function onDocumentTouchStart(event){

    touchx = (event.touches[0].clientX - windowX)
    touchy = (event.touches[0].clientY - windowY)

    move = true;

    window.scroll = false;
}    

function onDocumenttouchMove(event){
    touchnewx = (event.touches[0].clientX - windowX)
    touchnewy = (event.touches[0].clientY - windowY)

    if(move)
    {
         
        idle = false;
        if(touchnewx - touchx > 10 ){
            moveright = true;
            moveleft = false;
        }else{
            moveright = false;
        }

        if( touchnewx - touchx < -10 ){
            moveleft = true;
            moveright = false;
        }else{
            moveleft = false;
        }

         if(touchnewy - touchy  < -10){
            moveforward =  true;
            movebackwards = false;

        }

        if(touchnewy - touchy > 10){
            movebackwards = true;
            moveforward = false;
        } 
    }   
}

function onDocumentTouchEnd(event){
    move = false;
    moveforward = false;
    movebackwards= false;
    moveleft = false;
    moveright = false;
    idle = true;
}

function onDocumentMouseDown(event){
    move = true;
    mouseoriginalx = mouse.x
    mouseoriginaly = mouse.y
}

function onDocumentMouseUp(event){
    move = false;
    moveforward = false;
    movebackwards= false;
    moveleft = false;
    moveright = false;
    idle = true;
}

var moveforward, movebackwards, moveleft, moveright
var idle = true;

function Movecharacter(){
    idle = true;
    
    if(moveforward ){
        player.position.z +=  -.01
        player.rotation.set(0,Math.PI * 1,0)
        idle = false;
    }
  

    if(movebackwards ){
        player.position.z +=  .01
        player.rotation.set(0, 0 , 0)
        idle = false;
    }

    if(moveright ){
        player.position.x +=  .01
        player.rotation.set(0,Math.PI * .5 ,0)
        idle = false;
    }
  
    if(moveleft ){
        player.position.x += -.01
        idle = false;
        player.rotation.set(0,Math.PI * -.5 ,0)
    }

    if(moveleft && moveforward){
        player.rotation.set(0,Math.PI * -.7 ,0)
    }
    
    if(moveright && moveforward){
        player.rotation.set(0,Math.PI * .7 ,0)
    }

    if(moveleft && movebackwards){
        player.rotation.set(0,Math.PI * -.3 ,0)
    }

    if(moveright && movebackwards){
        player.rotation.set(0,Math.PI * .3 ,0)
    }

    //limit the player movment area
    if(player !== null){
        if( player.position.z >= 2.5){
            player.position.z = 2.5
        }

        if( player.position.z <= -2.5){
            player.position.z = -2.5
        }

        if( player.position.x >= 2.5){
            player.position.x = 2.5
        }

        if( player.position.x <= -2.5){
            player.position.x = -2.5
        }
    }
}


function keyPressed(){
    document.onkeydown = function(e){
        switch (e.key.toLowerCase()){
            case 'w':
                    moveforward = true;
                    idle = false;
                break;
                
            case 's':
                    movebackwards = true;
                    idle = false;
                break;

            case 'd':
                    moveright = true;
                    idle = false;
                break;  
                
            case 'a':
                    moveleft = true;
                    idle = false;
                break;
        }
    };
}


function keylifted(){
    document.onkeyup = function(e){
        switch(e.key.toLowerCase()){
            case 'w':
                moveforward = false;
                idle = true;
                break;

            case 's':
                movebackwards = false;
                idle = true;
                break;    

            case 'd':
                moveright = false;
                idle = true;
                break;
                
            case 'a':
                moveleft = false;
                idle = true;
                break;    
        }
    }
}

//animates player depending on player's start (eg - idle/ running)
function animatePlayer(){
    if(canControlPlayer){
        if(idle){
            if(playerMixer)
            {
                playerMixer.clipAction(playerAnimations[3]).stop();
                playerMixer.clipAction(playerAnimations[2]).play();
            }
        }
        else
        {
            if(playerMixer)
            {
                playerMixer.clipAction(playerAnimations[2]).stop();      
                playerMixer.clipAction(playerAnimations[3]).play();
            }
        }
    }else{
        if(playerMixer)
            {
                playerMixer.clipAction(playerAnimations[3]).stop();
                playerMixer.clipAction(playerAnimations[2]).play();
            }
    }
    
}

const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - previousTime //delta time can be retrieved from here
    previousTime = elapsedTime

    if(canControlPlayer){
        Movecharacter()
    }

    if(playerMixer !== null)playerMixer.update(deltatime)

    animatePlayer()
    //Implement loop here
    window.requestAnimationFrame(tick)
}
tick()