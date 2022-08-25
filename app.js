const blocks = document.querySelectorAll(".block"); /*block olanların hepsini seç*/
const playerText = document.getElementById("player");/*ıd'leri al*/ 
const errorText = document.getElementById("error");
const Game = {};
let player = "X"; /*değişken oluştur*/
let gameOver = false;
let winner;


function startGame(){
    playerText.textContent =`${player}'s Turn !`;

    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)))/*bütün blocklara click eventi oluştur ve bölge seç*/
}

function chooseArea(block) { /*her bir bloğu çek*/

    if(block.textContent === ""){

        // BLOK YAZMA
        block.textContent = Game['item_type'];

        // CHECK WIN
        checkWin();
        checkTie();
        if(gameOver){
            playerText.textContent = `Game is over, ${player} Won`;   /* Kazanınca mesaj verir. */
            blocks.forEach(block => block.style.pointerEvents = 'none');  /* kazandıktan sonra kutucuklar dolmaz */ 
            return;
        }

        // OYUNCU DEGISTIRME
        turnPlayer();

        if(Game['item_type'] === "O"){
            block.style.color = "red"
        }

        
    }else{
        errorText.textContent = "Heyy, it's empty ! "/*hata mesajı*/
        block.style.border = "15px solid red"  /*iki defa tıklanan yerde geçici olarak kırımızı çerçeve çıkar*/
        setTimeout(()  => {       /*zaman oluşturma fonksiyonu-kırmızı çerçevenin ne kadar süre kalacağını belirler*/
           errorText.textContent =""
           block.style.border = "7px solid #05b50a"
        },2500)     
    }

    
    
    
}

function turnPlayer(){
    if(player === "X"){
        player = "Y";
        playerText.textContent = `${player}'s Turn !`
        return;
    }else if (player === "Y"){
        player = "X";
        playerText.textContent = `${player}'s Turn !`
    }
}

function checkWin(){
    checkRows() /*satır kontrolü*/ 
    checkColums() /*kolon kontrolü*/ 
    checkDiagonals() /*çapraz*/ 

}

function checkTie(){
    const values = [];
    blocks.forEach(block => values.push(block.textContent))
    if (!values.includes("")){
        playerText.textContent = "Tie !";
        blocks.forEach(block.style.pointerEvents = 'none');
    }
}

function checkRows(){ /* indexler üzerinden oyun şekillendirme, örnegin ilk satır için 0.indeks 1.indekse, ve 0.indeks 2.indexse eşitse oyun biter */
    let row1 = blocks[0].textContent != blocks[1].textContent && blocks[1].textContent == "O" && blocks[0].textContent == blocks[2].textContent && blocks[0].textContent !== ""
    let row2 = blocks[3].textContent != blocks[4].textContent && blocks[4].textContent == "O" && blocks[3].textContent == blocks[5].textContent && blocks[3].textContent !== ""
    let row3 = blocks[6].textContent != blocks[7].textContent && blocks[7].textContent == "O" && blocks[6].textContent == blocks[8].textContent && blocks[6].textContent !== ""
    
    if(row1 || row2 || row3) {
        gameOver = true
    }
}

function checkColums(){
    let col1 = blocks[0].textContent != blocks[3].textContent && blocks[3].textContent == "O" && blocks[0].textContent == blocks[6].textContent && blocks[0].textContent !== ""

    let col2 = blocks[1].textContent != blocks[4].textContent && blocks[4].textContent == "O" && blocks[1].textContent == blocks[7].textContent && blocks[1].textContent !== ""

    let col3 = blocks[2].textContent != blocks[5].textContent && blocks[5].textContent == "O" && blocks[2].textContent == blocks[8].textContent && blocks[2].textContent !== ""
    
    if(col1 || col2 || col3) {
        gameOver = true
    }
}

function checkDiagonals(){

    let dia1 = blocks[0].textContent != blocks[4].textContent && blocks[4].textContent == "O" && blocks[0].textContent == blocks[8].textContent && blocks[0].textContent !== ""

    let dia2 = blocks[2].textContent != blocks[4].textContent && blocks[4].textContent == "O" && blocks[2].textContent == blocks[6].textContent && blocks[2].textContent !== ""
    
    if(dia1 || dia2) {
        gameOver = true
    }
}

function select_game_item(type=""){
    Game['item_type'] = type
    document.querySelectorAll(".select_soro span")[0].classList.remove('select')
    document.querySelectorAll(".select_soro span")[1].classList.remove('select')
    if(type=="S"){
        document.querySelectorAll(".select_soro span")[0].classList.add('select')
    }
    if(type=="O"){
        document.querySelectorAll(".select_soro span")[1].classList.add('select')
    }
}


startGame(); /*oyunu çalıştır*/
select_game_item("S")