// const fs = require("fs");
// const csv = require("csvtojson");
// const { Parser } = require("json2csv");
// const fs = require("fs");
// const csv = fs.readFileSync("CSV_file.csv");

$(function () {
    loadGame();
})
class person {
    constructor(name, score, answer) {
        this.name = name;
        this.score = score;
        this.answer = answer;
    }
};
export async function loadGame() {
    
    const $boot = $('#boot');
    
    
   
    
    $boot.on('click', "#startgame", GameHasStarted);
    $boot.on('click', "#waitinggame", GameHasReallyStarted);
    $boot.on('click', "#endgame", EndTheGame);
    showanswer = false;
    db.collection("adminVars").doc("GameState").set({
        questionIndex: null,
        state: "OFFLINE"
         })
    

    
}




let gamequestion = 1;

var questionArr;


var answeredA;
var answeredB;
var answeredC;
var answeredD;
var percentage;
let players = [];
var myMachine;
var answering;
var showanswer;
export const playerTableRender = function (players) {

    players.sort(function(a,b) {
        return b.score - a.score
     })
    let timeTable = document.createElement("table")
    timeTable.id = "PlayerScore"
    timeTable.className = "table is-fullwidth"
    // timeTable.style = "border: 2px solid black;border-collapse: collapse;width: 15%; background-color: powderblue;text-align: center"
    //timeDiv.append(timeTable)
    let timeRowHeader = document.createElement("tr")
    timeRowHeader.style = "background-color: grey; font-family: sans-serif;color: white"
    let timeHeader0 = document.createElement("th")
    timeHeader0.innerText = ""
    let timeHeader1 = document.createElement("th")
    timeHeader1.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader1.innerText = "Player"
    let timeHeader2 = document.createElement("th")
    timeHeader2.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader2.innerText = "Score"
    

    timeRowHeader.append(timeHeader0)
    timeRowHeader.append(timeHeader1)
    timeRowHeader.append(timeHeader2)
    timeTable.append(timeRowHeader)

    /*
    lettimeTable2 = document.createElement("ol")
    timeTable2.id = "times"
    timeTable2.style = "border: 2px solid black; width: 10%; background-color: white; float: left; text-align: center"
    */
    //timeScoreBoard.forEach(e => {

    for (let i =0; i < players.length; i++) {
        // let e = timeScoreBoard[i]
        var qLetter;
        var coloranswered;
        if(showanswer){
            if(players[i].answer == 0){
                qLetter = "A"
            }
            else if(players[i].answer == 1){
                qLetter = "B"
            }
            else if(players[i].answer == 2){
                qLetter = "C"
            }
            else {
                qLetter = "D"
            }
            console.log(players[i].answer)
            console.log(questionArr[gamequestion-1])
            if(players[i].answer == questionArr[gamequestion-1].answerIndex){
                coloranswered = 'has-text-success'
            }
            else{
                coloranswered = 'has-text-danger'
            }
        }
        let timeRow = document.createElement("tr")
        let timeData0 = document.createElement("td")
        timeData0.innerText = `${i+1}`
        let timeData1 = document.createElement("td")
        timeData1.className = 'has-text-weight-bold'
        timeData1.innerText = `${players[i].name}`
        let timeData2 = document.createElement("td")
        timeData2.className = 'has-text-link'
        timeData2.innerText = `${players[i].score}`
        
        timeRow.append(timeData0)
        timeRow.append(timeData1)
        timeRow.append(timeData2)
        if(showanswer){
            let timeData3 = document.createElement("td")
            timeData3.className = coloranswered
            timeData3.innerText = `${qLetter}`
            timeRow.append(timeData3)
        }
        timeTable.append(timeRow)
        /** 
        timeRow2 = document.createElement("li")
        timeRow2.innerText = `${e.player} ${e.time}`
        timeTable2.append(timeRow2)
        */
    //});
    }
    // document.getElementById("PlayerScore").replaceWith(timeTable); 
    return timeTable;

}
var idata;
export const GameHasStarted = function(event) {
    db.collection("adminVars").doc("GameState").set({
        questionIndex: null,
        state: "WAITING"
         })
    const $boot = $('#boot');
    $boot.empty();
    
    const $root = $('#root');
    
    const $cut = $('#cut');
    $cut.empty();
    let geu = `     
    <div class="content has-text-centered">
            <h1 class="title has-text-info is-family-secondary">Waiting For Players</h1>
        </div>
    `
    $cut.append(geu);
    let duck = `
            
    <button id = "waitinggame" class="button is-fullwidth is-link title has-text-weight-bold ">Begin</button>


    `
    $boot.append(duck);
    
    var importedFile = document.getElementById('lol').files[0];
    var reader = new FileReader();
    

  reader.readAsText(importedFile);
  
  
  reader.onload = function() {
    idata = JSON.parse(reader.result);
    console.log(idata);
    document.getElementById('lol').remove();
  };
  
  
     
    
    myMachine = window.setInterval(function () {
        answeredA = 0;
        answeredB = 0;
        answeredC = 0;
        answeredD = 0;
    db.collection('playersDB').get().then((snapshot) => {snapshot.docs.forEach(doc => {
        players[players.length] = new person(doc.data().name, doc.data().score, doc.data().answers[gamequestion - 1])
        if(doc.data().answers[gamequestion - 1] == 0){
                
            answeredA += 1;
        }
        else if (doc.data().answers[gamequestion - 1] == 1){
            
            answeredB += 1;
        }
        else if (doc.data().answers[gamequestion - 1] == 2){
            
            answeredC += 1;
        }
        else {
            
            answeredD += 1;
        }
    
    })});
    $root.empty();
    $root.append(playerTableRender(players));
    
    players = [];
    }, 1000);

    
    
};

export const GameHasReallyStarted = function(event) {
    showanswer = true;
    db.collection("adminVars").doc("GameState").set({
        questionIndex: gamequestion - 1,
        state: "PLAYING"
         })
    const $boot = $('#boot');
    $boot.empty();
    let duck = `
            
    <button id = "endgame" class="button is-fullwidth is-link title has-text-weight-bold">End Game</button>`
    
    
    $boot.append(duck);
    
    
    
    
    
    const $cut = $('#cut');
    $cut.empty()
    answering = window.setInterval(function () {
        const $lut = $('#lut');
        $lut.empty();
        if(questionArr[gamequestion-1].answerIndex == 0){
            percentage = answeredA / (answeredA + answeredB + answeredC + answeredD)
        }
        else if (questionArr[gamequestion-1].answerIndex == 1){
            percentage = answeredB / (answeredA + answeredB + answeredC + answeredD)
        }
        else if (questionArr[gamequestion-1].answerIndex == 2){
            percentage = answeredC / (answeredA + answeredB + answeredC + answeredD)
        }
        else {
            console.log(answeredA);
            percentage = answeredD / (answeredA + answeredB + answeredC + answeredD)
        }
        percentage = percentage * 100;
        
        $lut.append(`<h1 class="title has-text-weight-bold has-text-danger-dark">${percentage}</h1>`);
        }, 1000);
    questionArr = idata;
    for(let i = 0; i < questionArr.length; i++){
        let kc = i + 1;
        console.log(1);
        db.collection("questions").doc("q" + kc).set({
            xStart: questionArr[i].xStart,
            xEnd: questionArr[i].xEnd,
            xInc: questionArr[i].xInc,
            renderChoices: questionArr[i].renderChoices,
            evalChoices: questionArr[i].evalChoices,
            answerIndex: questionArr[i].answerIndex
             })
    }
    let Quiz = document.createElement("table");
    let qrow = document.createElement("tr")
    for(let on = 0; on < questionArr[gamequestion-1].renderChoices.length; on++){
        let acolumn = document.createElement("td")
        if(on == questionArr[gamequestion-1].answerIndex){
            acolumn.className = 'title has-text-primary'
        }
        else{
            acolumn.className = 'title has-text-danger'
        }
        if (on == 0){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredA}`
        }
        if (on == 1){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredB}`
        }
        if (on == 2){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredC}`
        }
        if (on == 3){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredD}`
        }
        qrow.append(acolumn);
    }
    Quiz.append(qrow);
    let geu = `     
    <button id = "nextquestion" class="button is-link  has-text-weight-bold">Next question</button>
    `
    
    $cut.append(Quiz);
    $cut.append(geu);

    
    $cut.on('click', "#nextquestion", QuestionMove);
   
    
    
};

export const EndTheGame = function(event) {
    db.collection("adminVars").doc("GameState").set({
        questionIndex: null,
        state: "REVIEW"
         })
    // db.collection("adminVars").doc("GameState").delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
    
    db.collection('questions').get().then((snapshot) => {snapshot.docs.forEach(doc => doc.delete())});
    const $boot = $('#boot');
    $boot.empty();

    const $root = $('#root');
    clearInterval(myMachine);
    clearInterval(answering);
    $root.empty();
    const $cut = $('#cut');
    $cut.empty()
    let duck = `
            
    <button id = "startgame" class="button is-fullwidth is-link title has-text-weight-bold">Start Game</button>


    `
    $boot.append(duck);
    
    $root.append(winnerRender(players));
    $root.append(playerTableRender(players));
};

export const winnerRender = function (players) {

    players.sort(function(a,b) {
        return b.score - a.score
     })
    let timeTable = document.createElement("table")
    timeTable.id = "Winners"
    timeTable.className = "table is-fullwidth"
    // timeTable.style = "border: 2px solid black;border-collapse: collapse;width: 15%; background-color: powderblue;text-align: center"
    //timeDiv.append(timeTable)
    let timeRowHeader = document.createElement("tr")
    timeRowHeader.style = "background-color: brown; font-family: sans-serif;color: white"
    let timeHeader0 = document.createElement("th")
    timeHeader0.innerText = ""
    let timeHeader1 = document.createElement("th")
    timeHeader1.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader1.innerText = "Player"
    let timeHeader2 = document.createElement("th")
    timeHeader2.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader2.innerText = "Score"
    

    timeRowHeader.append(timeHeader0)
    timeRowHeader.append(timeHeader1)
    timeRowHeader.append(timeHeader2)
    timeTable.append(timeRowHeader)

    /*
    lettimeTable2 = document.createElement("ol")
    timeTable2.id = "times"
    timeTable2.style = "border: 2px solid black; width: 10%; background-color: white; float: left; text-align: center"
    */
    //timeScoreBoard.forEach(e => {
        db.collection('playersDB').get().then((snapshot) => {snapshot.docs.forEach(doc => {players[players.length] = new person(doc.data().name, doc.data().score, doc.data().answers[gamequestion - 1])})});

    for (let i =0; i < 3; i++) {
        // let e = timeScoreBoard[i]
        let timeRow = document.createElement("tr")
        let timeData0 = document.createElement("td")
        timeData0.className = 'title has-text-weight-bold has-text-info is-family-secondary'
        if(i == 0){
            timeData0.innerText = 'Winner! 👑🥇';
        }
        if(i == 1){
            timeData0.innerText = 'Runner Up 🥈 ';
        }
        if(i == 2){
            timeData0.innerText = '3rd Place 🥉';
        }
        // timeData0.innerText = `${i+1}`
        let timeData1 = document.createElement("td")
        timeData1.className = 'title has-text-weight-bold'
        timeData1.innerText = `${players[i].name}`
        let timeData2 = document.createElement("td")
        timeData2.className = 'title'
        timeData2.innerText = `${players[i].score}`
        timeRow.append(timeData0)
        timeRow.append(timeData1)
        timeRow.append(timeData2)
        timeTable.append(timeRow)
        /** 
        timeRow2 = document.createElement("li")
        timeRow2.innerText = `${e.player} ${e.time}`
        timeTable2.append(timeRow2)
        */
    //});
    }
    // document.getElementById("PlayerScore").replaceWith(timeTable); 
    return timeTable;

}
export const ClearDB = function(event) {
    // var first_clean = await db.collection('PlayersDB').delete();
    // var second_clean = await db.collection('adminVars').delete();
    db.collection('PlayersDB').delete();
    db.collection('adminVars').delete();
}
export const QuestionMove = function(event) {
    gamequestion++;
    console.log(gamequestion);
    if(gamequestion > questionArr.length){
        EndTheGame();
        
    } else{
        const $cut = $('#cut');
        $cut.empty()

        let Quiz = document.createElement("table");
        let qrow = document.createElement("tr")
        for(let on = 0; on < questionArr[gamequestion-1].renderChoices.length; on++){
        let acolumn = document.createElement("td")
        if(on == questionArr[gamequestion-1].answerIndex){
            acolumn.className = 'title has-text-primary'
        }
        else{
            acolumn.className = 'title has-text-danger'
        }
        
        if (on == 0){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredA}`
        }
        if (on == 1){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredB}`
        }
        if (on == 2){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredC}`
        }
        if (on == 3){
            acolumn.innerText = `${questionArr[gamequestion-1].renderChoices[on]}: ${answeredD}`
        }
        qrow.append(acolumn);
    }
    Quiz.append(qrow);
    let geu = `     
    <button id = "nextquestion" class="button is-link  has-text-weight-bold">Next question</button>
    `
    $cut.append(Quiz);
    $cut.append(geu);
    
    
        
    db.collection("adminVars").doc("GameState").set({
        questionIndex: gamequestion - 1,
        state: "PLAYING"
         })
    }
    
    
    

    
};

