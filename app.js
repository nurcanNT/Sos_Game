const blocks = document.querySelectorAll(".block"); /*block olanların hepsini seç*/
const playerText = document.getElementById("player");/*ıd'leri al*/ 
const errorText = document.getElementById("error");
let player = "S"; /*değişken oluştur*/
let gameOver = false;
let winner;

function startGame(){
    playerText.textContent =`${player}'s Turn !`;

    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)))/*bütün blocklara click eventi oluştur ve bölge seç*/
}

function chooseArea(block) { /*her bir bloğu çek*/
    if(block.textContent === ""){
        block.textContent = player;
        turnPlayer();
        if(player === "S"){
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
    
    checkWin();
    checkTie();

    if(gameOver){
        playerText.textContent = `Game is over, ${winner} Won`;   /*Kazanınca mesaj verir.*/
        blocks.forEach(block => block.style.pointerEvents = 'none');  /*kazandıktan sonra kutucuklar dolmaz*/ 
    }
}

function turnPlayer(){
    if(player === "S"){
        player = "O";
        playerText.textContent = `${player}'s Turn !`
        return;
    }else if (player === "O"){
        player = "S";
        playerText.textContent = `${player}'s Turn !`
        
    }
}

function checkWin(){
    checkRows()/*satır kontrolü*/ 
    checkColums()/*kolon kontrolü*/ 
    checkDiagonals()/*çapraz*/ 

}

function checkTie(){
    const values = [];
    blocks.forEach(block => values.push(block.textContent))
    if (!values.includes("")){
        playerText.textContent = "Tie !";
        blocks.forEach(block.style.pointerEvents = 'none');

    }


}

function checkRows(){ /*indexler üzerinden oyun şekillendirme, örnegin ilk satır için 0.indeks 1.indekse, ve 0.indeks 2.indexse eşitse oyun biter*/
    let row1 = blocks[0].textContent == blocks[1].textContent && blocks[0].textContent == blocks[2].textContent && blocks[0].textContent !== ""
    let row2 = blocks[3].textContent == blocks[4].textContent && blocks[3].textContent == blocks[5].textContent && blocks[3].textContent !== ""
    let row3 = blocks[6].textContent == blocks[7].textContent && blocks[6].textContent == blocks[8].textContent && blocks[6].textContent !== ""
    
    if(row1 || row2 || row3) {
        gameOver = true
    }
    if(row1) return winner = blocks[0].textContent
    if(row2) return winner = blocks[3].textContent
    if(row3) return winner = blocks[6].textContent

}

function checkColums(){
    let col1 = blocks[0].textContent == blocks[3].textContent && blocks[0].textContent == blocks[6].textContent && blocks[0].textContent !== ""
    let col2 = blocks[1].textContent == blocks[4].textContent && blocks[1].textContent == blocks[7].textContent && blocks[1].textContent !== ""
    let col3 = blocks[2].textContent == blocks[5].textContent && blocks[2].textContent == blocks[8].textContent && blocks[2].textContent !== ""
    
    if(col1 || col2 || col3) {
        gameOver = true
    }
    if(col1) return winner = blocks[0].textContent
    if(col2) return winner = blocks[1].textContent
    if(col3) return winner = blocks[2].textContent


}

function checkDiagonals(){
    let dia1 = blocks[0].textContent == blocks[4].textContent && blocks[0].textContent == blocks[8].textContent && blocks[0].textContent !== ""
    let dia2 = blocks[2].textContent == blocks[4].textContent && blocks[2].textContent == blocks[6].textContent && blocks[2].textContent !== ""
    
    if(dia1 || dia2) {
        gameOver = true
    }
    if(dia1) return winner = blocks[0].textContent
    if(dia2) return winner = blocks[2].textContent
    

}

startGame(); /*oyunu çalıştır*/