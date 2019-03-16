var wins = 0;
var losses = 0;
var maxErrors = 9;
var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
var emptyAlert = [];
var correctSound = document.getElementById("correct");
var errorSound = document.getElementById("error");

var game = new Whosthat();
document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Whosthat();
		game.updatePageData();
	}
}

function Whosthat() {
	wordList = ["pikachu", "eevee", "alakazam", "entei", "mewtwo", "celebi", "lugia", "gengar"]

	word = wordList[Math.floor(Math.random() * wordList.length)];
	this.guessedLetters = [];
	errors = 0;
	visibleLetters = [];
	this.gameOver = false;
	alertLines = emptyAlert;
	for (var i = 0; i < word.length; i++) {
		visibleLetters[i] = (false);
	}
}

Whosthat.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var soundCorrect = true;
	var soundError = true;
	var isInWord = false;
	for (var i = 0; i < word.length; i++) {
		if (word.charAt(i) === char) {
			isInWord = true;
			visibleLetters[i] = true;
			if (soundCorrect) {
				correctSound.pause();
				correctSound.currentTime = 0;
				correctSound.play();
				soundCorrect = false;
			}
		}
	}
	if (!isInWord) {
		errors++;
		if (soundError) {
			errorSound.pause();
			errorSound.currentTime = 0;
			errorSound.play();
			soundError = false;
		}
	}

	if (errors >= maxErrors) {
		losses++;
		this.gameOver = true;
	}

	if (!visibleLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	//	Attr.value = "../images"
		//picture.setAttributeNode(att)
		//images.appendChild(picture)
		//"Div".play
		//setTimeout...


	}
	game.updatePageData();
};

Whosthat.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < visibleLetters.length; i++) {
		tempString += ((visibleLetters[i] || this.gameOver) ? word.charAt(i).toUpperCase() : "_");
		if (i < (visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
		
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (alertLines[i]);
	}
}

game.updatePageData();
