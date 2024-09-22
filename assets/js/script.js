//Initial Data
let square= {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;

reset();

//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{//pega todos os itens e adiciona a função para cada
    item.addEventListener('click', itemClick);
})


//Functions
function itemClick(event){
    let item = event.target.getAttribute('data-item');//com o target pegamos examente quem foi clicado
    if(playing && square[item] ===''){//se playing for verdadeiro e a celula estiver vazia
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}
function reset(){
    warning = '';

    let random = (Math.floor(Math.random() * 2));
    player = (random === 0) ? 'x' : 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];   
    }

    checkGame();
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if(checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()){
        warning = 'Empate';
        playing = false;
    }
}
function checkWinnerFor(player){
//No jogo da velha tem 8 possibilidades de vitoria, 3 verticais 3 horizontais e 2 diagonais, estamos pegando essas possibilidades e jogando no Array abaixo
    let pos = [
        //horizontal
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        //vertical
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        //diagonal
        'a1,b2,c3',
        'c1,b2,a3'
    ];
    for(let w in pos) {
        let pArray = pos[w].split(',');//pega cada linha de item do array e separa por virgula em 8 arrays diferentes separando esse único array em 8 arrays de possibilidades
        let hasWon = pArray.every(option => square[option] === player);//devido ao every retorna true ou false
        if(hasWon){
            return true;
        }
    }
    return false;  
}

function isFull(){
    for(let i in square){//se tem um vazio não esta todo preenchido
        if(square[i] === ''){
            return false;
        }
    }
    return true;//se esta tudo preenchido nesse caso foi empate
}