var deck = new Array();
var players = new Array();
var howManyPlayers = 1;
var currentPlayer = new Number();
currentPlayer = 1;

// create a new array of objects with keys suit, rank, and value
function createDeck(){
  deck = new Array();
  var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  for (i = 0; i < suits.length; i++){
    for (j = 0; j < ranks.length; j++){
      var newVal = new Number();
      if (j < 9){
        newVal = j+2;
      }
      else if (j == 12){
        newVal = 11;
      }
      else {
        newVal = 10;
      }
      deck.push({
        suit: suits[i],
        rank: ranks[j],
        value: newVal
      });
    }
  }
}

// swaps the position of two random objects in the deck array 1000x
function shuffle(){
  for (i = 0; i < 1000; i++){
    var x = Math.floor(Math.random()*52);
    var y = Math.floor(Math.random()*52);
    [deck[x], deck[y]] =[deck[y], deck[x]];
  }
}

function createPlayers(){
  players = new Array();
  for (i=1; i <= howManyPlayers; i++){
    var hand = new Array();
    var total = new Number();
    players.push({
      name: "Player " + i,
      bet: 0,
      cash: 500,
      total: total,
      hand: hand
    })
  }
}

function createDealer(){
  var hand = new Array();
  var total = new Number();
  players.push({
    name: "Dealer",
    total: total,
    hand: hand
  })
}

function dealHand(){
  for (i=0; i < 2; i++){
    players.forEach(function(player){
      player.hand.push(deck.pop())
    })
  }
  updateTotal();
  isBlackjack();
}

function updateTotal(){
  players.forEach(function(player){
    var total = new Number();
    player.hand.forEach(function(card){
      total += card.value;
    })
    player.total = total;
  })

}

function hit(){
  players[currentPlayer].hand.push(deck.pop())
  updateTotal();
  isBust();
  isTwentyOne();
}

function stay(){
  currentPlayer = (currentPlayer + 1) % howManyPlayers;
}

function isBust(){
  if(players[currentPlayer].total > 21){
    console.log("Bust");
  }
}

function isBlackjack(){
  do{
    if(players[currentPlayer].total == 21){
      console.log("Blackjack");
    }
    currentPlayer = (currentPlayer + 1) % howManyPlayers;
  } while (currentPlayer != 0);
  
}

function isTwentyOne(){
  if(players[currentPlayer].total == 21){
    console.log("Twenty-One");
  }
}

function dealerTurn(){
    while(players[currentPlayer].total <= 16){
      if(players[currentPlayer].total < 16){
        hit();
        updateTotal();
      }
      else if(players[currentPlayer].total == 16){
        isLowAce();
        updateTotal();
        dealerTurn();
      }
      else {
        stay();
      }
    }
}

function isLowAce(){
  x = players[currentPlayer].hand.findIndex(function(element){
    return element.rank == "A";
  })
  if(x){
    players[currentPlayer].hand[x].value = 1;
  }
  
}

createDeck();
shuffle();
createPlayers();
createDealer();
dealHand();
dealerTurn();

console.log(players);