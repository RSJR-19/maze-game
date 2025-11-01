const level1 = document.getElementById('level-1');
const level2 = document.getElementById('level-2');
const level3 = document.getElementById('level-3');
const sideA = document.getElementById('sideA');
const sideB = document.getElementById('sideB');
const screen = document.getElementById('screen');
const video = document.getElementById('video');
const vidFrame = document.getElementById('vid-frame');
const music = document.getElementById('music');

let videoPlaying = false;

document.addEventListener("contextmenu", e => e.preventDefault());

const player = document.getElementById('player');
let walls = [{x : 0, y: 0, width: 100, height: 400},
    {x : 380, y: 0, width: 100, height: 400},
    {x : 0, y: 350, width: 480, height: 50}];
let finishA = {x: 100, y:0, width:280 , height:25}
const playerPosition = {x: 220, y: 305, height: 35, width: 35}
const speed = 5;

function print(misskonasya){
    console.log(misskonasya);
}

let level = 1;
level1.style.display = "flex";


document.addEventListener('keydown', ()=>{
    if (videoPlaying === true){
        video.muted = false;
        video.play().then(() => {
        video.onpause()
        videoPlaying = true;
        }).catch(err => print(err))}});

function backStart(){

    if (level === 2){
            playerPosition.x = 50;
            playerPosition.y = 300;
            player.style.top = `${playerPosition.y}px`;
            player.style.left = `${playerPosition.x}px`;

            level1.style.display = "none";
            level2.style.display = "flex";
            walls = [{x:0, y:350, width:480, height:50},
            {x:0, y:0, height:280, width:350},
            {x:430, y:0, height:350, width:50},
            {x:0, y:280, height:70, width:50}]
            finishA = {x:350, y:0, height:25, width:80}
    }
    if (level === 3){
            playerPosition.x = 53;
            playerPosition.y = 315;
            player.style.top = `${playerPosition.y}px`;
            player.style.left = `${playerPosition.x}px`;

            level2.style.display = "none";
            level3.style.display = "flex";
            walls = [{x:0, y:0, height:400, width:40}, {x:0, y:0, height:40, width:360},
                {x:0, y:360, height:40, width:480},{x:440, y:0, height:400, width:40},
                {x:100, y: 100, width:40, height:300},{x:220, y:0, height:300, width:40},
                {x:220, y:260, height:40, width:150}, {x:320, y:90, height:120, width:120}]
            finishA = {x:360, y:0, height:20, width:80};


    }



    }


function checkFinish(playerPosition, finishA){
    if (playerPosition.x < finishA.x + finishA.width &&
        playerPosition.x + playerPosition.width > finishA.x &&
        playerPosition.y < finishA.y + finishA.height &&
        playerPosition.y + playerPosition.height > finishA.y){
            return true
        }
        return false
    }

 function checkCollision(position, wall){
        if (position.x < wall.x + wall.width &&
        position.x + position.width > wall.x &&
        position.y < wall.y + wall.height &&
        position.y + position.height > wall.y){
            return true
        }
        return false
 }

 function checkWall(playerPosition, walls){
    return walls.some(wall => checkCollision(playerPosition, wall));
 }



function movePlayer(moveX, moveY){

        playerPosition.x += moveX
        playerPosition.y += moveY;

        if (checkWall(playerPosition, walls)){
            playerPosition.x -= moveX;
            playerPosition.y -= moveY;
        }

        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;

        if (checkFinish(playerPosition, finishA)){
                playerPosition.x -= moveX; 
                playerPosition.y -= moveY;

        
                level ++;
                if (level !== 4){
                backStart();
                }
                else{
                    sideA.style.opacity = 0;
                    sideB.style.opacity = 0;
                    screen.style.opacity = 0;

                    music.pause()
                    vidFrame.style.display = "flex";
                    video.currentTime = 0;
                    video.muted = false;
                    video.play()
                
                }
    }



}


document.addEventListener('keydown', event=>{
    if (event.key === "ArrowLeft"){ movePlayer(-speed, 0);}
    if (event.key === "ArrowRight"){ movePlayer(speed, 0);}
    if (event.key === "ArrowUp"){ movePlayer(0, -speed);}
    if (event.key === "ArrowDown"){ movePlayer(0, speed)};
})

let btnHolding;

function holdStart(direction){
    clearInterval(btnHolding);
    moveTowards(direction);
    btnHolding = setInterval(() =>moveTowards(direction), 100)
}

function holdStop(){
    clearInterval(btnHolding);
}

function moveTowards(dir){
    if (dir === "left") movePlayer(-speed, 0);
    if (dir === "right") movePlayer(speed, 0);
    if (dir === "up") movePlayer(0, -speed);
    if (dir === "down") movePlayer(0, speed);
}

["left", "right", "up", "down"].forEach(dir => {
  const btn = document.getElementById(`${dir}-btn`);
  btn.onmousedown = () => holdStart(dir);
  btn.onmouseup = holdStop;
  btn.onmouseleave = holdStop;
  btn.ontouchstart = () => holdStart(dir);
  btn.ontouchend = holdStop;
});

let isMusicPlaying = false;

function playMusic(){
    if (!isMusicPlaying){
        music.currentTime = 0;
        music.muted = false;
        music.play()
        isMusicPlaying = true;
    }}

document.addEventListener('click', playMusic);
document.addEventListener('keydown', playMusic);
