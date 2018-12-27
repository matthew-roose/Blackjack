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
    this.total1 = 0;
    this.total2 = 0;
    this.aceCount1 = 0;
    this.aceCount2 = 0;
    
    this.drawCard = function(card) {
        this.hand.push(card);
        this.total += card.value;
    };
    
    this.drawCard1 = function(card) {
        this.hand1.push(card);
        this.total1 += card.value;
    };
    
    this.drawCard2 = function(card) {
        this.hand2.push(card);
        this.total2 += card.value;
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
        while(this.hand1.length>0) {
            deck.push(this.hand1.pop());
        }
        while(this.hand2.length>0) {
            deck.push(this.hand2.pop());
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
var split1 = false;
var split2 = false;
var blackjack1 = false;
var blackjack2 = false;
var surrendered1 = false;
var doubled1 = false;
var bet;
var chipBet = 0;

document.querySelector(".btn-clear").style.display = "none";


function hideButtons() {
    document.querySelector(".btn-split").style.display = "none";
    document.querySelector(".btn-surrender").style.display = "none";
    document.querySelector(".btn-double").style.display = "none";
    document.querySelector(".btn-hit").style.display = "none";
    document.querySelector(".btn-stand").style.display = "none";
    document.querySelector("#current-bet").style.display = "none";
}

function dealerReveal() {
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

function init() {
    player.returnCards();
    dealer.returnCards();
    document.querySelector("#player-hand").innerHTML = "";
    document.querySelector("#player-hand1").innerHTML = "";
    document.querySelector("#player-hand2").innerHTML = "";
    document.querySelector("#dealer-hand").innerHTML = "";
    document.querySelector("#player").textContent = "PLAYER";
    document.querySelector("#dealer").textContent = "DEALER";
    document.querySelector(".player-panel").classList.remove("loser");
    document.querySelector(".dealer-panel").classList.remove("loser");
    document.querySelector(".player-panel").classList.remove("winner");
    document.querySelector(".dealer-panel").classList.remove("winner");
    document.querySelector(".player-panel").classList.remove("draw");
    document.querySelector(".dealer-panel").classList.remove("draw");
    document.querySelector("#player-hand1").style.backgroundColor = ("transparent");
    document.querySelector("#player-hand2").style.backgroundColor = ("transparent");
    document.querySelector("#dealer-hand").style.backgroundColor = ("transparent");

    shuffle(deck);
    player.total = 0;
    player.total1 = 0;
    player.total2 = 0;
    dealer.total = 0;
    player.aceCount = 0;
    player.aceCount1 = 0;
    player.aceCount2 = 0;
    dealer.aceCount = 0;
    split1 = false;
    split2 = false;
    blackjack1 = false;
    blackjack2 = false;
    surrendered1 = false;
    doubled1 = false;
    //don't need to track double or surrender for 2nd hand because hand ends when 2nd hand clicks either button
    document.querySelector("#bet-size").style.display = "none";
    document.querySelector("#current-bet").style.display = "block";
    document.querySelector(".btn-clear").style.display = "none";

}

function drawOut() {
    if(dealer.total>17 || (dealer.total===17&&dealer.aceCount===0)) {
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
    
    
    while(dealer.total<17 || (dealer.total===17&&dealer.aceCount>0)) {
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
}

function compare() {
    if(dealer.total>21) {
        document.querySelector("#dealer").textContent = "DEALER BUSTED!";
        document.querySelector("#player").textContent = "PLAYER WINS!";
        document.querySelector(".player-panel").classList.add("winner");
        document.querySelector(".dealer-panel").classList.add("loser");
        player.bankroll += bet;
    } else if(dealer.total>player.total) {
        document.querySelector("#dealer").textContent = "DEALER WINS!";
        document.querySelector(".player-panel").classList.add("loser");
        document.querySelector(".dealer-panel").classList.add("winner");
        player.bankroll -= bet;
        bankrupt();
    } else if(player.total>dealer.total) {
        document.querySelector("#player").textContent = "PLAYER WINS!";
        document.querySelector(".player-panel").classList.add("winner");
        document.querySelector(".dealer-panel").classList.add("loser");
        player.bankroll += bet;
    } else {
        document.querySelector("#player").textContent = "DRAW!";
        document.querySelector("#dealer").textContent = "DRAW!";
        document.querySelector(".player-panel").classList.add("draw");
        document.querySelector(".dealer-panel").classList.add("draw");
    }
    
    document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
    playing = false;
    hideButtons();
    document.querySelector("#bet-size").style.display = "block";
    document.querySelector(".btn-clear").style.display = "block";
    document.querySelector(".btn-deal").style.display = "block";
}

function compareSplit(splitScore, handNo, thisBet) {
    if(dealer.total>21) {
        document.querySelector("#dealer-hand").style.backgroundColor = "#FF9999";
        document.querySelector("#dealer").textContent = "DEALER BUSTED!";
        if(splitScore<=21) {
            document.querySelector("#player-hand"+handNo).style.backgroundColor = "#84E184";
            player.bankroll += thisBet;
        }
    } else if(dealer.total>splitScore) {
        player.bankroll -= thisBet;
        bankrupt();
        document.querySelector("#player-hand"+handNo).style.backgroundColor = "#FF9999";
    } else if(dealer.total<splitScore) {
        player.bankroll += thisBet;
        document.querySelector("#player-hand"+handNo).style.backgroundColor = "#84E184";
    } else {
        document.querySelector("#player-hand"+handNo).style.backgroundColor = "#FFFF80";
    }
    playing = false;
    hideButtons();
    document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
    document.querySelector("#bet-size").style.display = "block";
    document.querySelector(".btn-clear").style.display = "block";
    document.querySelector(".btn-deal").style.display = "block";
}

function takeCard() {
    document.querySelector(".btn-split").style.display = "none";
    document.querySelector(".btn-surrender").style.display = "none";
    document.querySelector(".btn-double").style.display = "none";
    if(!split1 && !split2) {
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
            document.querySelector("#bet-size").style.display = "block";
            document.querySelector(".btn-clear").style.display = "block";
            document.querySelector(".btn-deal").style.display = "block";
            playing = false;
        }
        if(player.total===21) {
            document.querySelector(".btn-hit").style.display = "none";
        }
    }
    
    if(split1 || split2) {
        if(split1) {
            player.drawCard1(dealCard());
            player.total1 = 0;
            player.aceCount1 = 0;
            document.querySelector("#player-hand1").innerHTML = "";
            for(var i=0; i<player.hand1.length; i++) {
                player.total1+=(player.hand1[i].value);
                if (player.hand1[i].rank===("Ace")) {
                    player.aceCount1+=1;
                }
                while (player.aceCount1>0 && player.total1>21) {
                    player.aceCount1-=1;
                    player.total1-=10;
                }
                document.querySelector("#player-hand1").innerHTML += "<img src=./Cards/" + player.hand1[i].rank + "_of_" + player.hand1[i].suit + ".png " + "height='90' width='60'</img>";
            }
            document.querySelector("#player-score").textContent = player.total1;
            if(player.total1>21) {
                document.querySelector("#player-hand1").style.backgroundColor = "#FF9999";
                player.bankroll -= bet;
                document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
                
                if(!blackjack2) {
                    document.querySelector("#player-score").textContent = player.total2;
                    document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
                    document.querySelector(".btn-surrender").style.display = "block";
                    document.querySelector(".btn-double").style.display = "block";
                    split1 = false;
                    split2 = true;
                } else {
                    dealerReveal();
                    hideButtons();
                    document.querySelector(".btn-deal").style.display = "block";
                    document.querySelector("#bet-size").style.display = "block";
                    playing = false;
                }
            }
            
            if(player.total1===21 && !doubled1) {
                document.querySelector(".btn-hit").style.display = "none";
            }
           
        } else if(split2) {
            player.drawCard2(dealCard());
            player.total2 = 0;
            player.aceCount2 = 0;
            document.querySelector("#player-hand2").innerHTML = "";
            for(var i=0; i<player.hand2.length; i++) {
                player.total2+=(player.hand2[i].value);
                if (player.hand2[i].rank===("Ace")) {
                    player.aceCount2+=1;
                }
                while (player.aceCount2>0 && player.total2>21) {
                    player.aceCount2-=1;
                    player.total2-=10;
                }
                document.querySelector("#player-hand2").innerHTML += "<img src=./Cards/" + player.hand2[i].rank + "_of_" + player.hand2[i].suit + ".png " + "height='90' width='60'</img>";
            }
            document.querySelector("#player-score").textContent = player.total2;
            
  
            if(player.total2>21) {
                player.bankroll -= bet;
                document.querySelector("#player-hand2").style.backgroundColor = "#FF9999";
                document.querySelector(".btn-deal").style.display = "block";
                document.querySelector(".btn-clear").style.display = "block";
                document.querySelector("#bet-size").style.display = "block";
                hideButtons();
                playing = false;
                
                
                if(player.total1>21) {
                    dealerReveal();
                } else if(player.total1<=21 && !blackjack1 && !surrendered1) {
                    drawOut();
                    if(!doubled1) {
                        compareSplit(player.total1, 1, bet);
                    } else {
                        compareSplit(player.total1, 1, bet*2);
                    }
                } else if (blackjack1) {
                    dealerReveal();
                }
                
                document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
                bankrupt();
            }
            if(player.total2===21) {
                document.querySelector(".btn-hit").style.display = "none";
            }
        }    
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
        document.querySelector("#bet-size").style.display = "block";
        document.querySelector(".btn-clear").style.display = "block";
        document.querySelector(".btn-deal").style.display = "block";


    } else {
        document.querySelector(".btn-surrender").style.display = "block";
        document.querySelector(".btn-double").style.display = "block";
        document.querySelector(".btn-hit").style.display = "block";
        document.querySelector(".btn-stand").style.display = "block";
        // if(player.hand[0].rank === player.hand[1].rank) {
            document.querySelector(".btn-split").style.display = "block";
        // }
    }
}

hideButtons();

createDeck();

document.querySelector("#bankroll").textContent = "BANKROLL: $" + 1000;

document.querySelector(".btn-deal").addEventListener("click", function() {
    if(!playing) {
        bet = chipBet;
        if(!bet) {
            alert("Please enter a bet amount.");
        } else if (bet>player.bankroll) {
            alert("You don't have that much to bet. You have $" + player.bankroll +".");
        } else if (bet>10000) {
            alert("Max bet is $10000.");
        } else {
            init();
            document.querySelector("#current-bet").style.display = "block";
            document.querySelector("#current-bet").textContent = "Your bet: $" + bet;
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
            
            
            for(var a=0; a<dealer.hand.length; a++) {
                if(dealer.hand[a].rank==="Ace") {
                    dealer.aceCount+=1;
                ///this was needed for soft 17 rule
                }
            }
            if(dealer.total>21) {
                dealer.total-=10;
            }
            document.querySelector("#dealer-hand").innerHTML += "<img src=card.jpg " + "height='90' width='60'</img>";
            document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[1].rank + "_of_" + dealer.hand[1].suit + ".png " + "height='90' width='60'</img>";
            document.querySelector("#dealer-score").textContent = "??";
            document.querySelector("#logo").style.display = "none";
            playing = true;
            document.querySelector(".btn-deal").style.display = "none";

            
            blackjack(); //check for player blackjack and end hand if he has it
        }
        
        
    }
});


document.querySelector(".btn-hit").addEventListener("click", function() {
    if(player.total<21 && (player.total1<21 || player.total2<21)) {
        takeCard();
    }
});


document.querySelector(".btn-stand").addEventListener("click", function() {
    if(!(split1 || split2) && player.total<=21) {
        hideButtons();
        drawOut();
        compare();
    }
    
    if(split1) {
        
        if(!blackjack2) {
            document.querySelector("#player-score").textContent = player.total2;
            document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
            document.querySelector(".btn-surrender").style.display = "block";
            document.querySelector(".btn-double").style.display = "block";
            document.querySelector(".btn-hit").style.display = "block";
            split1 = false;
            split2 = true;
            document.querySelector("#player-hand1").style.backgroundColor = "transparent";
            document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
            document.querySelector("#player-score").textContent = player.total2;
        } else {
            drawOut();
            compareSplit(player.total1, 1, bet);
        }
        

    } else if(split2) {
        drawOut();
        if(player.total1<22 && !blackjack1 && !surrendered1) {
            if(!doubled1) {
                compareSplit(player.total1, 1, bet);
            } else {
                compareSplit(player.total1, 1, bet*2);
            }
        }    
            
        compareSplit(player.total2, 2, bet);
    }
    
});

document.querySelector(".btn-double").addEventListener("click", function() {
    if(!split1 && !split2) {
        if(player.bankroll<bet*2) {
            alert("You don't have enough to double your bet. You have $" + player.bankroll + " and your bet was $" + bet + ".");
        } else {
            bet = bet*2;
            takeCard();
            hideButtons();
            if(player.total<=21) {
                drawOut();
                compare();
            }
            playing = false;
        }
    } else if(split1) {
        if(player.bankroll<bet*3) {
            alert("You don't have enough to double your bet. You have $" + player.bankroll + " and your bets were $" + bet + " each.");
        } else {
            doubled1 = true;
            takeCard();
            if(player.total1>21) {
                document.querySelector("#player-hand1").style.backgroundColor = "#FF9999";
                player.bankroll -= bet;
                ////not 2x because takeCard() already subtracts 1x for a bust
                document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            } else {
                document.querySelector("#player-hand1").style.backgroundColor = "transparent";
            }
            if(!blackjack2) {
                document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
                document.querySelector("#player-score").textContent = player.total2;
                split1 = false;
                split2 = true;
                document.querySelector(".btn-surrender").style.display = "block";
                document.querySelector(".btn-double").style.display = "block";
                
            } else if(player.total1<22) {
                drawOut();
                compareSplit(player.total1, 1, bet*2);
                playing = false;
            }
        }
    } else if(split2) {
        if(player.bankroll<bet*3) {
            alert("You don't have enough to double your bet. You have $" + player.bankroll + " and your bets were $" + bet + " each.");
        } else {
            takeCard();
            if(player.total2>21) {
                document.querySelector("#player-hand2").style.backgroundColor = "#FF9999";
                player.bankroll -= bet;
                ////not 2x because takeCard() already subtracts 1x for a bust
                document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            } 
            if((player.total1<22 && !blackjack1 && !surrendered1) || player.total2<22) {
                drawOut();
            }
            
            if(player.total1<22 && !blackjack1 && !surrendered1) {
                if(!doubled1) {
                    compareSplit(player.total1, 1, bet);
                } else {
                    compareSplit(player.total1, 1, bet*2);
                }
            }
            
            if(player.total2<22) {
                compareSplit(player.total2, 2, bet*2);
            }
        }
    }
});

document.querySelector(".btn-surrender").addEventListener("click", function() {
    if(!split1 && !split2) {
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
        document.querySelector("#bet-size").style.display = "block";
        document.querySelector(".btn-deal").style.display = "block";
        playing = false;
    } else if(split1) {
        player.bankroll -= (.5*bet);
        document.querySelector("#player-hand1").style.backgroundColor = "#FF9999";
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        surrendered1 = true;
        if(!blackjack2) {
            document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
            document.querySelector("#player-score").textContent = player.total2;
            split1 = false;
            split2 = true;
            document.querySelector(".btn-surrender").style.display = "block";
            document.querySelector(".btn-double").style.display = "block";
        } else {
            dealerReveal();
            playing = false;
            hideButtons();
            document.querySelector("#bet-size").style.display = "block";
            document.querySelector(".btn-deal").style.display = "block";
            document.querySelector(".btn-clear").style.display = "block";

        }
    } else if(split2) {
        player.bankroll -= (.5*bet);
        document.querySelector("#player-hand2").style.backgroundColor = "#FF9999";
        document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
        if(player.total1<22 && !blackjack1 && !surrendered1) {
            drawOut();
            if(!doubled1) {
                compareSplit(player.total1, 1, bet);
            } else {
                compareSplit(player.total1, 1, bet*2);
            }
        } else {
            dealerReveal();
        }
        playing = false;
        hideButtons();
        document.querySelector("#bet-size").style.display = "block";
        document.querySelector(".btn-deal").style.display = "block";
        document.querySelector(".btn-clear").style.display = "block";

    }
    
    
    
    
});


document.querySelector(".btn-split").addEventListener("click", function() {
    if(player.bankroll<(bet*2)) {
        alert("You don't have enough to split your hand. You have $" + player.bankroll + " and you need $" + bet*2 + ".");
    } else {    
        player.hand1.push(player.hand.shift());
        player.hand2.push(player.hand.shift());
        player.drawCard1(dealCard());
        player.drawCard2(dealCard());
        document.querySelector("#player-hand").innerHTML = "";
        player.total1 = 0;
        player.total2 = 0;
        for(var i=0; i<2; i++) {
            document.querySelector("#player-hand1").innerHTML += "<img src=./Cards/" + player.hand1[i].rank + "_of_" + player.hand1[i].suit + ".png " + "height='90' width='60'</img>";
            document.querySelector("#player-hand2").innerHTML += "<img src=./Cards/" + player.hand2[i].rank + "_of_" + player.hand2[i].suit + ".png " + "height='90' width='60'</img>";
            player.total1 += player.hand1[i].value;
            player.total2 += player.hand2[i].value;
        }
        
        if(player.total1===22) {
            player.total1-=10;
        }
        ////these are needed to check for Ace-Ace
        if(player.total2===22) {
            player.total2-=10;
        }
        
        split1 = true;
        document.querySelector("#player-score").textContent = player.total1;
        document.querySelector("#player-hand1").style.backgroundColor = "#FFFF80";
    
        
        if(player.total1===21) {
            blackjack1 = true;
            player.bankroll += 1.5*bet;
            document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            document.querySelector("#player-hand1").style.backgroundColor = "#84E184";
            document.querySelector("#player-hand2").style.backgroundColor = "#FFFF80";
            split1 = false;
            split2 = true;
            document.querySelector("#player-score").textContent = player.total2;
        }
        
        if(player.total2===21) {
            blackjack2 = true;
            player.bankroll += 1.5*bet;
            document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            document.querySelector("#player-hand2").style.backgroundColor = "#84E184";
            split2 = false;
        }
        
        if(player.total1===21 && player.total2===21) {
            hideButtons();
            document.querySelector("#dealer-hand").innerHTML = "";
            for(var j=0; j<dealer.hand.length; j++) {
                document.querySelector("#dealer-hand").innerHTML += "<img src=./Cards/" + dealer.hand[j].rank + "_of_" + dealer.hand[j].suit + ".png " + "height='90' width='60'</img>";
            }
            document.querySelector("#dealer-score").textContent = dealer.total;
            document.querySelector("#bankroll").textContent = "BANKROLL: $" + player.bankroll;
            document.querySelector("#bet-size").style.display = "block";
            document.querySelector(".btn-deal").style.display = "block";
            playing = false;        
        }
        
        document.querySelector(".btn-split").style.display = "none";
    }
});







document.querySelector(".btn-clear").addEventListener("click", function() {
    chipBet = 0;
    document.querySelector("#bet-size").textContent = "Place bet: $" + chipBet;
    document.querySelector(".btn-clear").style.display = "none";
});

document.querySelector("#ten").addEventListener("click", function() {
    if(playing===false) {
        chipBet += 10;
        document.querySelector("#bet-size").textContent = "Place bet: $" + chipBet;
        document.querySelector(".btn-clear").style.display = "block";
    }
});

document.querySelector("#fifty").addEventListener("click", function() {
    if(playing===false) {
        chipBet += 50;
        document.querySelector("#bet-size").textContent = "Place bet: $" + chipBet;
        document.querySelector(".btn-clear").style.display = "block";
    }    
});

document.querySelector("#hundred").addEventListener("click", function() {
    if(playing===false) {
        chipBet += 100;
        document.querySelector("#bet-size").textContent = "Place bet: $" + chipBet;
        document.querySelector(".btn-clear").style.display = "block";
    }
});

document.querySelector(".help").addEventListener("click", function() {
    document.querySelector(".help-popup").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".help-popup").style.display = "none";
});

window.onclick = function(event) {
    if(event.target === document.querySelector(".help-popup")) {
        document.querySelector(".help-popup").style.display = "none";
    }
};



