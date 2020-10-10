let width = 5;
let height = 5;
let correctTilesCount = 5;
let totalScore = 0;
let correctGuess = 0;
let life = 3;
let min = 5;

// let totalSum = 3;
// let perfectScore = true;
// let sizeLimit = 7;
// let score = 1;
// let right;
// let wrong  = 0;



window.addEventListener('load', function() {
    createMemoryBoard(width, height);

});

function createMemoryBoard(width, height) {
    nums = correctLottery()
    correctGuess = 0;
    life = 3;
    let tiles =[]
    let counter = 0;
    let board = document.getElementById('game-board');
    board.classList.remove("spinBoard")
    board.innerHTML = "";
    for(i=0; i<height; i++){
        let row = document.createElement('div');
        board.append(row)
        row.className='row'
        for(y=0; y<width; y++){
            let square = document.createElement('div');
            square.className='box'
            square.onclick = checkBox
            row.append(square)
            tiles.push(square)
            if(nums.includes(counter)){
                square.classList.add('correct')
                square.classList.add('hide')
            }else{
                square.classList.add('incorrect')
                square.classList.add('hide')
            }
            counter++;
        }
    }
    setTimeout(function() {
        for(tile in tiles){
            tiles[tile].classList.remove('hide')
        }
    }, 000);
    setTimeout(function() {
        board.classList.add("spinBoard")
        for(tile in tiles){
            tiles[tile].classList.add('hide')
        }
    }, 2000);
    
}
function correctLottery(){
    var correctNums = []
    limit = width * height
    while(correctNums.length < correctTilesCount){
        winner =  Math.floor(Math.random() * width*height)
        if(!correctNums.includes(winner)){
            correctNums.push(winner)
        }
    }
    console.log(correctNums)
    return correctNums
}

function updateScore(input){
    switch (input){
        case("increase"):
            totalScore++;
            break;
        case("subtract"):
            totalScore--
            break;
    }
    let displayScore = document.getElementById('score')
    displayScore.innerHTML="" + totalScore;
    let inputScore = document.getElementById('score-input')
    inputScore.value= "" + totalScore;
}

function checkBox(){
    if(this.classList.contains('correct') && this.classList.contains('hide')){
        this.classList.add('correct-show')
        //CORRECT GUESS
        correctGuess++;
        updateScore("increase")
        this.classList.remove('hide');
        if(correctGuess >= correctTilesCount){
            //WON LEVEL
            console.log("WON")
            let consequence =  Math.floor(Math.random() * 2)
            if(consequence == 1){
                if(width <= height){
                    width++;
                }else{
                    height++;
                }
            }else{
                correctTilesCount++;
            }
            createMemoryBoard(width,height)
        }
        console.log("righty")
        
    }else if(this.classList.contains('incorrect')  && this.classList.contains('hide')){
        //WRONG SQUARE
        if(totalScore <=0){
            terminateGame()
        }
        console.log("wrongy")
        life--;
        updateScore("subtract")
        this.classList.remove('hide');
        
        if(life <= 0){
            console.log('lost level')
            //LOST LEVEL

            let consequence =  Math.floor(Math.random() * 2)
            if(consequence == 1){
                if (width <= 5 && height <=5){
                }
                else if(width >= height){
                    width--;
                }else{
                    height--;
                }
            }else{
                if(correctTilesCount>5){
                    correctTilesCount--;
                }
            }
            createMemoryBoard(width,height)
        }
    }
}
function terminateGame() {
    $.ajax({
        url: "/",
        complete: function (xmlHttp) {
            alert("YOU LOSE");
            if (xmlHttp.code != 200) {
                top.location.href = '/';
            }
        }
    });
}

