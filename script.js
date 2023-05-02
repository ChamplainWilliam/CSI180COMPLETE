let myDeck = [];
let enemyDeck = [];
let numberOfCards = 108
//108 is the number of cards in an uno deck with all the +2s and +4s etc
//there are 4 0s, one from each color and 8 1-9s, 2 from each color (76)
//2 draw 2s from each color, 2 skips from each color, 2 reverse from each color (24)
//4 wild cards and 4 draw 4s (8)
let deckSize = [numberOfCards];

deckSize = [
    //the 25 red cards
    "red0", "red1", "red1", "red2", "red2", "red3", "red3", "red4", "red4", "red5", "red5", "red6", "red6",
    "red7", "red7", "red8", "red8", "red9", "red9", "red10", "red10", "red11", "red11", "red12", "red12",
    //the 25 blue cards
    "blue0", "blue1", "blue1", "blue2", "blue2", "blue3", "blue3", "blue4", "blue4", "blue5", "blue5", "blue6",
    "blue6", "blue7", "blue7", "blue8", "blue8", "blue9", "blue9", "blue10", "blue10", "blue11", "blue11", "blue12", "blue12",
    //the 25 yellow cards
    "yellow0", "yellow1", "yellow1", "yellow2", "yellow2", "yellow3", "yellow3", "yellow4", "yellow4",
    "yellow5", "yellow5", "yellow6", "yellow6", "yellow7", "yellow7", "yellow8", "yellow8",
    "yellow9", "yellow9", "yellow10", "yellow10", "yellow11", "yellow11", "yellow12", "yellow12",
    //the 25 green cards
    "green0", "green1", "green1", "green2", "green2", "green3", "green3", "green4", "green4",
    "green5", "green5", "green6", "green6", "green7", "green7", "green8", "green8",
    "green9", "green9", "green10", "green10", "green11", "green11", "green12", "green12",
    //the 8 wild cards, the half that is wild4 is the +4 cards
    "wild1", "wild1", "wild1", "wild1", "wild4", "wild4", "wild4", "wild4"
]


function testDrawCard() {
    let randomNum = Math.floor(Math.random() * numberOfCards);
    let randomCard = deckSize[randomNum];
    if (randomCard !== "gone") {
        console.log("you drew a", randomCard);
        myDeck.push(randomCard);
        document.getElementById("myDeck").innerHTML += `<img src="cards/${randomCard}.png" onclick="playCard(this)">`
        deckSize[randomNum] = "gone";
    }
    else {
        while (randomCard === "gone") {
            console.log("undefined, retry");
            randomNum = Math.floor(Math.random() * numberOfCards);
            randomCard = deckSize[randomNum];
            if (randomCard !== "gone") {
                console.log("you drew a", randomCard);
                myDeck.push(randomCard);
                document.getElementById("myDeck").innerHTML += `<img src="cards/${randomCard}.png" onclick="playCard(this)">`
                deckSize[randomNum] = "gone";
            }
        }
    }
}

function testStartingSeven() {
    for (let i = 0; i < 7; i++) {
        let randNum = Math.floor(Math.random() * numberOfCards);
        let randCard = deckSize[randNum];
        if (randCard !== "gone") {
            myDeck.push(randCard);
            deckSize[randNum] = "gone";
            document.getElementById("myDeck").innerHTML += `<img src="cards/${randCard}.png" onclick="playCard(this)">`
            //console log to see what cards are in the array in devtools pane
            console.log(randCard);
        }
        else {
            while (randCard === "gone") {
                console.log("undefined, retry");
                randomNum = Math.floor(Math.random() * numberOfCards);
                randomCard = deckSize[randomNum];
                if (randomCard !== "gone") {
                    myDeck.push(randCard);
                    deckSize[randNum] = "gone";
                    document.getElementById("myDeck").innerHTML += `<img src="cards/${randCard}.png" onclick="playCard(this)">`
                    //console log to see what cards are in the array in devtools pane
                    console.log(randCard);
                }
            }
        }
    }
}


function testOpponentStartingSeven() {
    for (let i = 0; i < 7; i++) {
        let randNum = Math.floor(Math.random() * numberOfCards);
        let randCard = deckSize[randNum];
        if (randCard !== "gone") {
            enemyDeck.push(randCard);
            deckSize[randNum] = "gone";
            document.getElementById("enemyDeck").innerHTML += `<img src="cards/back.png">`
        }
        else {
            while (randCard === "gone") {
                console.log("undefined, retry");
                randNum = Math.floor(Math.random() * numberOfCards);
                randCard = deckSize[randNum];
                if (randCard !== "gone") {
                    enemyDeck.push(randCard);
                    deckSize[randNum] = "gone";
                    document.getElementById("enemyDeck").innerHTML += `<img src="cards/back.png">`
                }
            }
        }
    }
}


function testStartingCard() {
    let randNum = Math.floor(Math.random() * numberOfCards);
    let randCard = deckSize[randNum];
    deckSize[randNum] = "gone";
    console.log("starting card is", randCard);
    document.getElementById("middle").innerHTML = `<img src="cards/${randCard}.png">`

}


function playCard(src) {
    console.log("play card");
    console.log(src);
    let test = src.getAttribute("src");
    console.log(test);
    document.getElementById("middle").innerHTML = `<img src="${test}">`
    document.getElementById("myDeck").removeChild(src);

    test2 = test.split("/")
    test3 = test2[1]
    test4 = test3.split(".")
    test5 = test4[0]
    console.log(test5)

    for (let i = 0; i < myDeck.length; i++)
    {
        if (test5 === myDeck[i])
        {
            myDeck.splice(i, 1)
            break;
        }
    }

}

function switchSides()
{
    document.getElementById("myDeck").innerHTML = "";
    document.getElementById("enemyDeck").innerHTML = "";

    let temp = [];
    for (let i = 0; i < enemyDeck.length; i++)
    {
        document.getElementById("myDeck").innerHTML += `<img src="cards/${enemyDeck[i]}.png" onclick="playCard(this)">`
    }
    for (let i = 0; i < myDeck.length; i++)
    {
        document.getElementById("enemyDeck").innerHTML += `<img src="cards/back.png">`

    }
    for (let i = 0; i < myDeck.length; i++)
    {
        temp[i] = myDeck[i];
    }
    myDeck.splice(0, myDeck.length);
    for (let i = 0; i < enemyDeck.length; i++)
    {
        myDeck[i] = enemyDeck[i];
    }
    enemyDeck.splice(0, enemyDeck.length);
    for(let i = 0; i < temp.length; i++)
    {
        enemyDeck[i] = temp[i];
    }
}