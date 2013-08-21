// JavaScript Document// Card Constructor

// Blackjack - Michael Whyte version

// Global Variables
var $handDealerOut = $('.hand_dealer');
var $handPlayerOut = $('.hand_player');
var $scoreDealerOut = $('.score_dealer');
var $scorePlayerOut = $('.score_player');
var $btnNewGame = $('.btn_new_game');
var $btnGetCard = $('.btn_get_card');
var $btnHold = $('.btn_hold');
var cards;
var deck;
var dealer;
var player;
var game = new Game();
var playerHold = false;
var playerPoints;
var dealerPoints;
var gameEnd = false;

// Event Listeners
$btnNewGame.click(function(){
	game.init();	
});

$btnGetCard.click(function(){
	if(!playerHold && !gameEnd){
		player.getCard();
		playerPoints = player.getPoints();
		if(playerPoints > 21){
			gameEnd = true;
			alert('You went over 21. Dealer wins');	
		};
	};
});

$btnHold.click(function(){
	if(!playerHold && !gameEnd){
		player.playerHold();
		dealer.playDealerRound();
		dealerPoints = dealer.getPoints();
		if(dealerPoints > 21){
			gameEnd = true;
			alert('Dealer went over 21. You win');	
		}else{
			gameEnd = true;
			var gameEndMessage = game.checkWin();
			alert(gameEndMessage);	
		}	
	}	
});

// Game Object
function Game(){
	var dealerScore = 0;
	var playerScore = 0;
	this.init = function(){
		$handDealerOut.html('&nbsp;');
		$handPlayerOut.html('&nbsp;');
		$scoreDealerOut.html('&nbsp;');
		$scorePlayerOut.html('&nbsp;');	
		cards = new Cards();
		deck = cards.createDeck();
		dealer = new Dealer();
		player = new Player();
		player.getHand();
		playerHold = false;
		gameEnd = false;
	}
	this.checkWin = function(){
		dealerScore = dealer.getPoints();
		playerScore = player.getPoints();
		if(dealerScore > playerScore){
			return 'Dealer wins';	
		}else if(dealerScore < playerScore){
			return 'Player wins';	
		}else{
			return 'Dealer and Player Tie';	
		}	
	}

} // End Game Object

// Cards Object
function Cards(){
	var theDeck = [];
	theDeck[0] = [null, null, null];
	this.createDeck = function(){
		for(i = 0; i < 53; i++){
			if(i > 0 && i < 14){
				createSuit(i, 'C');
			}else if(i > 13 && i < 27){
				adjustedI = i - 13;
				createSuit(adjustedI, 'D');
			}else if(i > 26 && i < 41){
				adjustedI = i - 26;
				createSuit(adjustedI, 'H');	
			}else if(i > 40 && i < 54){
				adjustedI = i - 39;
				createSuit(adjustedI, 'S');
			} 
		}
		return theDeck;	
	};
	
	this.getCard = function(deckArray){
		var cardNumber = Math.floor(Math.random() * 52) + 1;
		return deckArray[cardNumber];	
	};
	
	function createSuit(num, suit){
		if(num === 1){
			theDeck.push(['A', suit, 11]);
		}else if(num > 1 && num < 11){
			theDeck.push([num, suit, num]);
		}else if(num > 10){
			if(num === 11){
				theDeck.push(['J', suit, 10]);	
			}else if(num === 12){
				theDeck.push(['Q', suit, 10]);	
			}else{
				theDeck.push(['K', suit, 10]);	
			}	
		}	
	};

}; // End Card Object

// Dealer Object
function Dealer(){
	var card;
	var points = 0;
	var dealerHand = [];
	var playerHand = [];	
	this.dealCard = function(){
		card = cards.getCard(deck);
		return card;				
	}
	this.playDealerRound = function(){
		$handDealerOut.text(' ');
		var aces = 0;
		while(points < 17){
			var newCard = this.dealCard();
			if(newCard[0] === 'a'){
				aces++;
			}
			dealerHand.push(newCard);
			points = points + newCard[2];
			while(points > 21 && aces > 0){
				points = points - 10;
				aces--;	
			}
		};
		$handDealerOut.text(function(){
			return outputHand(dealerHand);
		});
		$scoreDealerOut.text('Dealer score = ' + points);
		return points;	
	}
	
	this.dealPlayerHand = function(){
		for(i = 1; i < 3; i++){
			var card = this.dealCard();
			playerHand.push(card);	
		}
		return playerHand;	
	}
	
	this.getPoints = function(){
		return points;	
	}
		
}; // End Dealer Object 

function Player(){
	var playerHand = [];
	var points = 0;	
	this.getHand = function(){
		playerHand = dealer.dealPlayerHand();
		$handPlayerOut.text(function(){
			return outputHand(playerHand);
		});
		points = calculatePoints(playerHand);
		$scorePlayerOut.text('Player score = ' + points);	
	}
	this.getCard = function(){
		var newCard = dealer.dealCard();
		playerHand.push(newCard);
		$handPlayerOut.text(function(){
			return outputHand(playerHand);
		});
		points = calculatePoints(playerHand);
		$scorePlayerOut.text('Player score = ' + points);	
	};		
	this.playerHold = function(){
		playerHold = true;	
	};
	this.getPoints = function(){
		return points;	
	}
	
} // End Player Object

// General Functions
function outputHand(hand){
	var str = '';
	for(i = 0; i < hand.length; i++){
		str += hand[i][0] + hand[i][1] + ' ';	
	}
	return str;		
} // End outputHand function

function calculatePoints(hand){
	var thePoints = 0;
	for(i = 0; i < hand.length; i++){
			thePoints = thePoints + hand[i][2];	
	}
	return thePoints;	
} // End calculatePoints function














