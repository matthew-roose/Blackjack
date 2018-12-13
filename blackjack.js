var suits = ["hearts", "diamonds", "spades", "clubs"];

var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

var deck = [];

function Card(rank, suit, value) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
}

function dealCard() {
    return deck.shift();
}



function Player() {
    this.total = 0;
    this.aceCount = 0;
    this.bankroll = 1000;
    this.hand = [];
    this.hand1 = [];
    this.hand2 = [];
    
    this.drawCard = function(card) {
        this.hand.push(card);
        this.total += card.value;
    };
    
    this.showCards = function() {
        this.total = 0;
        this.aceCount = 0;
        for(var i=0; i<this.hand.length; i++) {
            this.total += this.hand[i].value;
            if(this.hand[i].rank==="Ace") {
                this.aceCount++;
            }
        }
        while (this.total>21&&this.aceCount>0) {
            this.total-=10;
            this.aceCount-=1;
        }
    };
    
    this.returnCards = function() {
        while(this.hand.length>0) {
            deck.push(this.hand.pop());
        }
    };
    
    
}


var player = new Player();

var dealer = new Player();


function createDeck() {
    for(var i = 0; i < ranks.length; i++) {
        for(var j = 0; j<suits.length; j++) {
            var k = 0;
            switch(ranks[i]) {
                case "2": 
                    k = 2;
                    break;
                case "3": 
                    k = 3;
                    break;
                case "4": 
                    k = 4;
                    break;
                case "5": 
                    k = 5;
                    break;
                case "6": 
                    k = 6;
                    break;
                case "7": 
                    k = 7;
                    break;
                case "8": 
                    k = 8;
                    break;
                case "9": 
                    k = 9;
                    break;
                case "10": 
                    k = 10;
                    break;
                case "Jack": 
                    k = 10;
                    break;
                case "Queen": 
                    k = 10;
                    break;
                case "King": 
                    k = 10;
                    break;
                case "Ace": 
                    k = 11;
                    break;
            }
            deck.push(new Card(ranks[i], suits[j], k));
        }
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


var playing = false;
var bet;

function hideButtons() {
    document.querySelector(".btn-split").style.display = "none";
    document.querySelector(".btn-surrender").style.display = "none";
    document.querySelector(".btn-double").style.display = "none";
    document.querySelector(".btn-insurance").style.display = "none";
    document.querySelector(".btn-hit").style.display = "none";
    document.querySelector(".btn-stand").style.display = "none";
}

function init() {
    player.returnCards();
    dealer.returnCards();
    document.querySelector("#player-hand").innerHTML = "";
    document.querySelector("#dealer-hand").innerHTML = "";
    document.querySelector("#player").textContent = "PLAYER";
    document.querySelector("#dealer").textContent = "DEALER";
    document.querySelector(".player-panel").classList.remove("loser");
    document.querySelector(".dealer-panel").classList.remove("loser");
    document.querySelector(".player-panel").classList.remove("winner");
    document.querySelector(".dealer-panel").classList.remove("winner");
    document.querySelector(".player-panel").classList.remove("draw");
    document.querySelector(".dealer-panel").classList.remove("draw");
    shuffle(deck);
    player.total = 0;
    dealer.total = 0;
    player.aceCount = 0;
    dealer.aceCount = 0;
    bet = document.querySelector(".bet-size").value;
    bet = Number(bet);
    document.querySelector(".btn-split").style.display = "none";
    document.querySelector(".btn-surrender").style.display = "none";
    document.querySelector(".btn-double").style.display = "none";
    document.querySelector(".btn-hit").style.display = "none";
    document.querySelector(".btn-stand").style.display = "none";
}

function drawOut() {
    if(dealer.total>=17) {
        dealer.total = 0;
        dealer.aceCount = 0;
        document.querySelector("#dealer-hand").innerHTML = "";
        for(var i=0; i<dealer.hand.length; i++) {
            dealer.total+=(dealer.hand[i].value);
            if (dealer.hand[i].rank===("Ace")) {
                dealer.aceCount+=1;
            }
            while (dealer.aceCount>0 && dealer.total>21) {
                dealer.aceCount-=1;
                dealer.total-=10;
            }
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[i].rank + "_of_" + dealer.hand[i].suit + ".png " + "height='90' width='60'</img>";
        }
        document.querySelector("#dealer-score").textContent = dealer.total;
    }
    
    
    while(dealer.total<17) {
        // setTimeout(function (){
            dealer.drawCard(dealCard());
            dealer.total = 0;
            dealer.aceCount = 0;
            document.querySelector("#dealer-hand").innerHTML = "";
            for(var j=0; j<dealer.hand.length; j++) {
                dealer.total+=(dealer.hand[j].value);
            if (dealer.hand[j].rank===("Ace")) {
                dealer.aceCount+=1;
            }
            while (dealer.aceCount>0 && dealer.total>21) {
                dealer.aceCount-=1;
                dealer.total-=10;
            }
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[j].rank + "_of_" + dealer.hand[j].suit + ".png " + "height='90' width='60'</img>";
            }
            document.querySelector("#dealer-score").textContent = dealer.total;
            
        // }, 500);
        
    }
           
    if(dealer.total>21) {
        document.querySelector("#dealer").textContent = "DEALER BUSTED!";
        document.querySelector("#player").textContent = "PLAYER WINS!";
        document.querySelector(".player-panel").classList.add("winner");
        document.querySelector(".dealer-panel").classList.add("loser");
        playing = false;
        player.bankroll += bet;
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
    } else if(dealer.total>player.total) {
        document.querySelector("#dealer").textContent = "DEALER WINS!";
        document.querySelector(".player-panel").classList.add("loser");
        document.querySelector(".dealer-panel").classList.add("winner");
        playing = false;
        player.bankroll -= bet;
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        bankrupt();
    } else if(player.total>dealer.total) {
        document.querySelector("#player").textContent = "PLAYER WINS!";
        document.querySelector(".player-panel").classList.add("winner");
        document.querySelector(".dealer-panel").classList.add("loser");
        playing = false;
        player.bankroll += bet;
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
    } else {
        document.querySelector("#player").textContent = "DRAW!";
        document.querySelector("#dealer").textContent = "DRAW!";
        document.querySelector(".player-panel").classList.add("draw");
        document.querySelector(".dealer-panel").classList.add("draw");
        playing = false;
    }
    
    hideButtons();
}

function takeCard() {
    player.drawCard(dealCard());
    player.total = 0;
    player.aceCount = 0;
    document.querySelector("#player-hand").innerHTML = "";
    for(var i=0; i<player.hand.length; i++) {
        player.total+=(player.hand[i].value);
        if (player.hand[i].rank===("Ace")) {
            player.aceCount+=1;
        }
        while (player.aceCount>0 && player.total>21) {
            player.aceCount-=1;
            player.total-=10;
        }
        document.querySelector("#player-hand").innerHTML += "<img src=./Cards/" + player.hand[i].rank + "_of_" + player.hand[i].suit + ".png " + "height='90' width='60'</img>";
    }
    document.querySelector("#player-score").textContent = player.total;
    if(player.total>21) {
        document.querySelector(".player-panel").classList.add("loser");
        document.querySelector("#player").textContent = "PLAYER BUSTED!";
        document.querySelector("#dealer-hand").innerHTML = "";
        for(var j=0; j<dealer.hand.length; j++) {
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[j].rank + "_of_" + dealer.hand[j].suit + ".png " + "height='90' width='60'</img>";
        }
        document.querySelector("#dealer-score").textContent = dealer.total;
        player.bankroll -= bet;
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        bankrupt();
        hideButtons();
        playing = false;
    }
    if(player.total===21) {
        drawOut();
    }
}

function bankrupt() {
    if(player.bankroll===0) {
        setTimeout(function() {
            alert("You have $0 left. Hit the ATM or refresh the page!");
            document.querySelector(".wrapper").style.display = "none";
        }, 500);
    }
}


function blackjack() {
    if(player.total===21 || dealer.total===21) {
        playing = false;
        document.querySelector("#dealer-hand").innerHTML = "";
        for(var j=0; j<dealer.hand.length; j++) {
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[j].rank + "_of_" + dealer.hand[j].suit + ".png " + "height='90' width='60'</img>";
        }
        document.querySelector("#dealer-score").textContent = dealer.total;
        if(player.total===21 && dealer.total===21) {
            document.querySelector("#player").textContent = "BLACKJACK!";
            document.querySelector("#dealer").textContent = "BLACKJACK!";
            document.querySelector(".player-panel").classList.add("draw");
            document.querySelector(".dealer-panel").classList.add("draw");
        } else if(player.total===21) {
            document.querySelector("#player").textContent = "BLACKJACK!";
            document.querySelector(".player-panel").classList.add("winner");
            player.bankroll += (1.5*bet);
            document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        } else if(dealer.total===21) {
            document.querySelector("#dealer").textContent = "BLACKJACK!";
            document.querySelector(".player-panel").classList.add("loser");
            document.querySelector(".dealer-panel").classList.add("winner");
            player.bankroll -= bet;
            document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            bankrupt();
        }    
    } else {
        document.querySelector(".btn-surrender").style.display = "block";
        document.querySelector(".btn-double").style.display = "block";
        document.querySelector(".btn-hit").style.display = "block";
        document.querySelector(".btn-stand").style.display = "block";
        if(player.hand[0].rank === player.hand[1].rank) {
            document.querySelector(".btn-split").style.display = "block";
        }
    }
}

hideButtons();

createDeck();

document.querySelector("#bankroll").textContent = "BANKROLL: $" + 1000;

document.querySelector(".btn-deal").addEventListener("click", function() {
    if(!playing) {
        init();
        if(!bet) {
            alert("Please enter a bet amount.");
        } else if(bet<1) {
            alert("Bet amount must be positive.");
        } else if (bet>10000) {
            alert("Bet amount must be between 1-10000.");
        } else if (bet%1 !== 0) {
            alert("Please enter a whole number between 1-10000.");
        } else if (bet>player.bankroll) {
            alert("You don't have that much to bet. You have $" + player.bankroll +".");
        } else {
            player.drawCard(dealCard());
            player.drawCard(dealCard());
            dealer.drawCard(dealCard());
            dealer.drawCard(dealCard());
            for(var i=0; i<player.hand.length; i++) {
                document.querySelector("#player-hand").innerHTML += "<img src=./Cards/" + player.hand[i].rank + "_of_" + player.hand[i].suit + ".png " + "height='90' width='60'</img>";
            }
            if(player.total>21) {
                player.total-=10;
            ///this will account for the rare case of two aces before aces are counted upon "hit"
            }
            document.querySelector("#player-score").textContent = player.total;
            
            if(dealer.total>21) {
                dealer.total-=10;
            }
            document.querySelector("#dealer-hand").innerHTML += "<img src=card.jpg " + "height='90' width='60'</img>";
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[1].rank + "_of_" + dealer.hand[1].suit + ".png " + "height='90' width='60'</img>";
            document.querySelector("#dealer-score").textContent = "??";
            playing = true;
            
            blackjack(); //check for player blackjack and end hand if he has it
        }
        
        
    }
});


document.querySelector(".btn-hit").addEventListener("click", function() {
    if(player.total<21&&playing) {
        takeCard();
        document.querySelector(".btn-split").style.display = "none";
        document.querySelector(".btn-surrender").style.display = "none";
        document.querySelector(".btn-double").style.display = "none";
    }
});


document.querySelector(".btn-stand").addEventListener("click", function() {
    if(player.total<21&&playing) {
        hideButtons();
        drawOut();
    }
});

document.querySelector(".btn-double").addEventListener("click", function() {
    if(player.total<21&&playing) {
        if(player.bankroll<bet*2) {
            alert("You don't have enough to double your bet. You have " + player.bankroll + " and your bet was " + bet + ".");
        } else {
            bet = bet*2;
            takeCard();
            hideButtons();
            if(player.total<21) {
                drawOut();
            }
            playing = false;
        }
    }
});

document.querySelector(".btn-surrender").addEventListener("click", function() {
    if(player.total<21&&playing) {
        document.querySelector(".player-panel").classList.add("loser");
        document.querySelector("#player").textContent = "SURRENDERED!";
        hideButtons();
        player.bankroll -= (.5*bet);
        document.querySelector("#dealer-hand").innerHTML = "";
        for(var j=0; j<dealer.hand.length; j++) {
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[j].rank + "_of_" + dealer.hand[j].suit + ".png " + "height='90' width='60'</img>";
        }
        document.querySelector("#dealer-score").textContent = dealer.total;
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        playing = false;
    }
});

var currentBet = Number(document.querySelector(".bet-size").value);

document.querySelector("#ten").addEventListener("click", function() {
    currentBet += 10;
    // document.querySelector(".bet-size").textContent = currentBet;
});

document.querySelector("#fifty").addEventListener("click", function() {
    currentBet += 50;
//     // document.querySelector(".bet-size").textContent = currentBet;
});

document.querySelector("#hundred").addEventListener("click", function() {
    currentBet += 100;
//     // document.querySelector(".bet-size").textContent = currentBet;
});




