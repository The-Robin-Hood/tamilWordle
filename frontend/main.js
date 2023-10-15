import { endOfDay, intervalToDuration } from "date-fns"
import Toastify from "toastify-js"

let tamilEntireWordList = []
let tamilMainWordList = []
let todaysWord
let keyList
let dayCount
const alphabets = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"y",
	"u",
	"i",
	"o",
	"p",
	"a",
	"s",
	"d",
	"f",
	"g",
	"h",
	"j",
	"k",
	"l",
	"z",
	"x",
	"c",
	"v",
	"b",
	"n",
	"m",
]
const keyboard = document.querySelector(".keyboard")
const gamegrid = document.querySelector(".gamegrid")

// ----------------- Basic Function  ----------------- //
async function fetchBasics() {
	// Fetches the entire word list and the main word list
	let data = await fetch("/words.json")
	let json = await data.json()
	return json
}

async function isItValidTamilWord(string) {
	// Checks if the word is a valid tamil word from the backend
	try {
		const data = await fetch("https://api.tamilwordle.in/valid?word=" + string)
		var json = await data.json()
		if (json.valid === true) {
			return true
		}
		return false
	} catch (e) {
		console.log("Error Fetching")
		return false
	}
}

function generateTodaysWord() {
	// Generates the word for the day
	const now = new Date()
	const start = new Date(now.getFullYear(), 0, 0)
	const diff = now - start
	const oneDay = 1000 * 60 * 60 * 24
	dayCount = Math.floor(diff / oneDay)
	return tamilMainWordList[dayCount]
}

// ----------------- Helper Functions  ----------------- //

const activeTiles = () => gamegrid.querySelectorAll('[data-state="active"]')
const zero = (x) => ("0" + x).slice(-2)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ----------------- Game Interaction  ----------------- //
function startGame() {
	const storage = JSON.parse(localStorage.getItem("tamilWordle"))
	if (storage && storage.status !== "Win" && storage.status !== "Lose") {
		document.addEventListener("click", mouseInteraction)
		document.addEventListener("keydown", keyboardInteraction)
	}
}

function stopGame() {
	document.removeEventListener("click", mouseInteraction)
	document.removeEventListener("keydown", keyboardInteraction)
}

function mouseInteraction(e) {
	if (e.target.matches("[data-key]")) {
		enterText(e.target.dataset.key)
		return
	}
	if (e.target.matches("[data-enter]")) {
		onAnswerSubmit()
		return
	}
	if (e.target.matches("[data-delete]")) {
		deleteText()
		return
	}
}

function keyboardInteraction(e) {
	if (e.key == "Backspace") {
		deleteText()
		return
	}
	if (e.key == "Enter") {
		onAnswerSubmit()
		return
	}

	if (e.key.match(/^[a-z]$/)) {
		enterText(keyList[alphabets.indexOf(e.key.toLowerCase())])
		return
	}
	return
}

function enterText(letter) {
	if (activeTiles().length > 3) return
	var state = JSON.parse(localStorage.getItem("timer"))
	if (!state) {
		localStorage.setItem("timer", JSON.stringify(new Date().getTime()))
	}
	const box = gamegrid.querySelector(":not([data-letter])")
	box.dataset.letter = letter
	box.textContent = letter
	box.dataset.state = "active"
}

function deleteText() {
	const lastText = activeTiles()[activeTiles().length - 1]
	if (lastText == null) return
	lastText.textContent = ""
	delete lastText.dataset.letter
	delete lastText.dataset.state
}

// ----------------- Game Setup & States ----------------- //

function setGameStats(stats = {}) {
	// Sets the game stats
	if (Object.keys(stats).length === 0) {
		if (!localStorage.getItem("tamilWordleStats")) {
			// If stats are not available, create a new one
			stats = {
				played: 0,
				wins: 0,
				streak: 0,
				lastWinTimeTaken: 0,
			}
		} else {
			stats = JSON.parse(localStorage.getItem("tamilWordleStats"))
		}
	}
	console.log(stats)
	localStorage.setItem("tamilWordleStats", JSON.stringify(stats))
	document.getElementById("played").innerHTML = stats.played
	document.getElementById("wins").innerHTML = stats.wins
	document.getElementById("streaks").innerHTML = stats.streak
	document.getElementById("timetaken").innerHTML = stats.lastWinTimeTaken
}

function setCurrentGameState(gameState, data_states) {
	// Sets the current game state
	gameState.forEach(async (word, wordIndex) => {
		if (word !== "") {
			word.forEach(async (tile, index) => {
				const box = gamegrid.querySelector(":not([data-letter])")
				box.dataset.letter = tile
				await sleep(100 * (index + 1))
				box.classList.add("reveal")
				await sleep(200 * (index + 1))
				box.dataset.state = data_states[wordIndex][index]
				box.innerHTML = tile
				box.classList.remove("reveal")
			})
		}
	})
}

function freshDay() {
	// Removes all the previous data and starts a new game
	localStorage.removeItem("tamilWordle")
	localStorage.removeItem("keyboard")
	localStorage.removeItem("timer")
	const storage = {
		gameState: ["", "", "", "", ""],
		data_states: [null, null, null, null, null],
		status: "Initiated",
		answer: todaysWord,
		expires: String(new Date()).slice(0, 15),
	}
	localStorage.setItem("tamilWordle", JSON.stringify(storage))
	setGameStats()
}

function setGuessedWord(userguess) {
	let storage = JSON.parse(localStorage.getItem("tamilWordle"))
	let index = storage.gameState.indexOf("")
	storage.gameState[index] = userguess
	var datasets = []
	userguess.forEach((e, i) => {
		if (todaysWord[i] === e) {
			datasets.push("correct")
		} else if (todaysWord.includes(e)) {
			datasets.push("incorrect-location")
		} else {
			datasets.push("incorrect")
		}
	})
	storage["data_states"][index] = datasets
	storage.status = "Progress"
	localStorage.setItem("tamilWordle", JSON.stringify(storage))
}

function gameCompletedSetCurrentStats(condition) {
	let stats = JSON.parse(localStorage.getItem("tamilWordleStats"))
	stats.played++
	if (condition === "win") {
		stats.wins++
		stats.streak++
	} else {
		stats.streak = 0
	}
	let intervalDur = intervalToDuration({
		start: JSON.parse(localStorage.getItem("timer")),
		end: new Date().getTime(),
	})
	if (intervalDur.hours > 0) {
		stats.lastWinTimeTaken =
			zero(intervalDur.hours) + ":" + zero(intervalDur.minutes) + ":" + zero(intervalDur.seconds)
	} else {
		stats.lastWinTimeTaken = zero(intervalDur.minutes) + ":" + zero(intervalDur.seconds)
	}
	setGameStats(stats)
	localStorage.removeItem("timer")
}

// ----------------- Game Logic ----------------- //

function createKeys() {
	// Creates tamil key for the keyboard and stores it in local storage
	let totalkeys = []

	if (JSON.parse(localStorage.getItem("keyboard"))) {
		totalkeys = JSON.parse(localStorage.getItem("keyboard")).letters
		return totalkeys
	}
	// Adds the letters of the word of the day to the keyboard
	todaysWord.forEach((e) => {
		if (!totalkeys.includes(e)) {
			totalkeys.push(e)
		}
	})

	while (totalkeys.length < 26) {
		// Selects a random word from the word list and checks if it has any letters in common with the word of the day
		let word = tamilMainWordList[Math.floor(Math.random() * tamilMainWordList.length)]
		let difference = word.filter((x) => todaysWord.includes(x))
		if (difference.length == 0) {
			continue
		}

		// Adds the remaining letters to the keyboard which are not already present and stops when the keyboard is full
		for (let i in word) {
			if (!totalkeys.includes(word[i])) {
				if (totalkeys.length < 26) {
					totalkeys.push(word[i])
				} else {
					break
				}
			}
		}
	}

	// Shuffles the keyboard
	let shuffled = totalkeys
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
	let emptyStateKey = []
	for (let i = 0; i < 26; i++) {
		emptyStateKey.push(null)
	}
	localStorage.setItem("keyboard", JSON.stringify({ letters: shuffled, state: emptyStateKey }))

	return shuffled
}

function createKeyboard(keyList) {
	// Dynamically creates the keyboard
	var keys = `<div class='overlayloader'><div class='spinner'></div></div>`
	var keyState = JSON.parse(localStorage.getItem("keyboard")).state
	for (let i in keyList) {
		keys += `<button class="${
			keyState[i] != null ? keyState[i] + " key" : "key"
		}" data-key="${decodeURIComponent(keyList[i])}">${decodeURIComponent(keyList[i])}</button>`
		if (i == 9 || i == 18) {
			keys += "<div class='space'></div>"
		}
		if (i == 18) {
			keys += '<button data-enter class="key special">Enter</button>'
		}
	}
	keys += `<button data-delete aria-label='Delete Key' class="key special">
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>
  </button>`
	return keys
}

async function onAnswerSubmit() {
	let overloayloader = document.querySelector(".overlayloader")
	stopGame()
	const activeBox = [...activeTiles()]
	if (activeBox.length !== 4) {
		toast("Not enough letters")
		errorShake(activeBox)
		startGame()
		return
	} else {
		const userguess = activeBox.map((e) => e.dataset.letter)
		if (!tamilEntireWordList.includes(userguess.join(""))) {
			overloayloader.style.display = "flex"
			const checkInternet = await isItValidTamilWord(userguess.join(""))
			overloayloader.style.display = "none"
			if (!checkInternet) {
				toast("Not in word list")
				errorShake(activeBox)
				startGame()
				return
			}
		}
		setGuessedWord(userguess)
		activeTiles().forEach((...e) => {
			reveal(...e, userguess)
		})
	}
}

function checkAnswer(userguess, boxes) {
	let storage = JSON.parse(localStorage.getItem("tamilWordle"))
	if (userguess.join("") === todaysWord.join("")) {
		toast("You Win!")
		winAnimate(boxes)
		stopGame()
		storage.status = "Win"
		localStorage.setItem("tamilWordle", JSON.stringify(storage))
		gameCompletedSetCurrentStats("win")
		setTimeout(() => {
			statsAvailable(true)
			document.getElementById("statistics").click()
		}, 1500)
		return
	}
	if (gamegrid.querySelectorAll(":not([data-letter])").length == 0) {
		toast(todaysWord.join(""))
		storage.status = "Lose"
		stopGame()
		gameCompletedSetCurrentStats("lose")
		setTimeout(() => {
			statsAvailable(true)
			document.getElementById("statistics").click()
		}, 1500)
	}
	localStorage.setItem("tamilWordle", JSON.stringify(storage))
}

// ---------------- Game Animations ---------------- //

function errorShake(box) {
	box.forEach((element) => {
		element.classList.add("shake")
		element.addEventListener(
			"animationend",
			function () {
				element.classList.remove("shake")
			},
			{ once: true }
		)
	})
}

function reveal(box, index, array, userguess) {
	const letter = box.dataset.letter
	const key = keyboard.querySelector(`[data-key="${letter}"]`)
	setTimeout(() => {
		box.classList.add("reveal")
	}, (index * 500) / 2)

	box.addEventListener(
		"transitionend",
		() => {
			const Lkeyboard = JSON.parse(localStorage.getItem("keyboard"))
			box.classList.remove("reveal")
			if (todaysWord[index] === letter) {
				box.dataset.state = "correct"
				key.classList.add("correct")
				Lkeyboard.state[keyList.indexOf(letter)] = "correct"
			} else if (todaysWord.includes(letter)) {
				box.dataset.state = "incorrect-location"
				key.classList.add("incorrect-location")
				Lkeyboard.state[keyList.indexOf(letter)] = "incorrect-location"
			} else {
				box.dataset.state = "incorrect"
				key.classList.add("incorrect")
				Lkeyboard.state[keyList.indexOf(letter)] = "incorrect"
			}
			localStorage.setItem("keyboard", JSON.stringify(Lkeyboard))

			if (index === todaysWord.length - 1) {
				box.addEventListener(
					"transitionend",
					() => {
						startGame()
						checkAnswer(userguess, array)
					},
					{ once: true }
				)
			}
		},
		{ once: true }
	)
}

function winAnimate(box) {
	box.forEach((element, index) => {
		setTimeout(() => {
			element.classList.add("winAnimate")
			element.addEventListener(
				"animationend",
				function () {
					element.classList.remove("winAnimate")
				},
				{ once: true }
			)
		}, (index * 500) / 5)
	})
}

// ----------------- UI functions ----------------- //

function showHelper() {
	stopGame()
	setTimeout(() => {
		document.querySelector(".helper").style.opacity = 1
	}, 10)
	document.querySelector(".helper").style.display = "flex"
}

function hideHelper() {
	document.querySelector(".helper").style.opacity = 0
	setTimeout(() => {
		document.querySelector(".helper").style.display = "none"
	}, 500)
	startGame()
}

function showStatistics() {
	stopGame()
	if (!localStorage.getItem("tamilWordleFeedback")) {
		localStorage.setItem("tamilWordleFeedback", false)
	}
	if (localStorage.getItem("tamilWordleFeedback") === "false") {
		showFeedback()
		return
	}
	setTimeout(() => {
		document.querySelector(".statistics").style.opacity = 1
	}, 10)
	document.querySelector(".statistics").style.display = "flex"
}

function hideStatistics() {
	document.querySelector(".statistics").style.opacity = 0
	setTimeout(() => {
		document.querySelector(".statistics").style.display = "none"
	}, 500)
	startGame()
}

function showSettings() {
	stopGame()
	setTimeout(() => {
		document.querySelector(".settings").style.opacity = 1
	}, 10)
	document.querySelector(".settings").style.display = "flex"
}

function hideSettings() {
	document.querySelector(".settings").style.opacity = 0
	setTimeout(() => {
		document.querySelector(".settings").style.display = "none"
	}, 500)
	startGame()
}

function showFeedback() {
	stopGame()
	setTimeout(() => {
		document.querySelector(".feedback").style.opacity = 1
	}, 10)
	document.querySelector(".feedback").style.display = "flex"
}

function hideFeedback() {
	document.querySelector(".feedback").style.opacity = 0
	setTimeout(() => {
		document.querySelector(".feedback").style.display = "none"
	}, 500)
	startGame()
}

function translateInstruction() {
	var switchBtn = document.getElementById("translateSwitch")
	let instructionsEng = document.getElementById("instructions-english")
	let instructionsTam = document.getElementById("instructions-tamil")
	var headingEng = document.getElementById("howtoplay-english")
	var headingTam = document.getElementById("howtoplay-tamil")
	if (switchBtn.checked) {
		instructionsTam.classList.remove("hidden")
		instructionsEng.classList.add("hidden")
		headingTam.classList.remove("hidden")
		headingEng.classList.add("hidden")
	} else {
		instructionsTam.classList.add("hidden")
		instructionsEng.classList.remove("hidden")
		headingTam.classList.add("hidden")
		headingEng.classList.remove("hidden")
	}
}

async function shareButton() {
	// shares the result of the game
	const tamilWordle = JSON.parse(localStorage.getItem("tamilWordle"))
	const data_states = tamilWordle["data_states"]
	const gameState = tamilWordle["gameState"]
	let attempts = "X"
	if (tamilWordle.status === "Win") {
		attempts = gameState.filter((x) => x !== "").length
	}
	let textShare = `தமிழ் Wordle \nDay-${dayCount} Attempt-${attempts}/5 \n\n`
	data_states.forEach((row) => {
		if (row != null) {
			row.forEach((ans) => {
				ans === "correct" && (textShare += "🟢")
				ans === "incorrect" && (textShare += "⚪")
				ans === "incorrect-location" && (textShare += "🟡")
			})
			textShare += "\n"
		}
	})
	textShare += "\nPlay now at https://tamilwordle.in"
	if (navigator.share && !/(win32|win64|windows|wince)/i.test(navigator.platform)) {
		try {
			await navigator.share({ text: textShare })
		} catch (err) {
			console.log(err)
		}
	} else {
		navigator.clipboard.writeText(textShare)
		toast("Copied to clipboard")
	}
}

function setMode(mode) {
	// set dark or light mode
	if (mode === "dark") {
		document.body.classList.add("darkmode")
		document.getElementById("themeSwitch").classList.remove("day")
		document.querySelector(".moon").classList.remove("sun")
		localStorage.setItem("mode", "dark")
	} else {
		document.getElementById("themeSwitch").classList.add("day")
		document.querySelector(".moon").classList.add("sun")
		document.body.classList.remove("darkmode")
		localStorage.setItem("mode", "light")
	}
}

function switchMode() {
	// switch between dark and light mode
	var mode = localStorage.getItem("mode")
	if (mode === "light") {
		setMode("dark")
	} else {
		setMode("light")
	}
}

function statsAvailable(available) {
	if (available) {
		document.querySelector(".statscontainer").style.display = "flex"
		document.querySelector(".statsbottombar").style.display = "flex"
		document.querySelector(".nostats").style.display = "none"
	} else {
		document.querySelector(".statscontainer").style.display = "none"
		document.querySelector(".statsbottombar").style.display = "none"
		document.querySelector(".nostats").style.display = "flex"
	}
}

function onFeedbackSubmit(e) {
	e.preventDefault()
	let feedbackForm = document.getElementById("feedbackForm")
	let rating = feedbackForm.querySelector('input[name="rating"]:checked')
	let feedback = feedbackForm.querySelector('textarea[name="feedback"]').value
	console.log(rating, feedback)
	if (!rating) {
		toast("Please select a rating")
		return
	}
	rating = rating.value
	if (!feedback) {
		toast(
			"Stars given, words hidden ?👀\nDon't leave us starstruck🌠,\nWe're all ears for your feedback👂🏻"
		)
		return
	}
	if (feedback.length < 10) {
		toast(
			"Short and sweet, but we want the treat!\nA bit more text, pretty please?\nYour words make our day! 🍬💌"
		)
		return
	}
	let formdata = new FormData()
	formdata.append("entry.1755405700", rating)
	formdata.append("entry.553521465", feedback)
	fetch(
		"https://docs.google.com/forms/d/e/1FAIpQLSeRsae4AdgNirW15RPHBYgIG-7pNigCtpYgCfgVu2wnYqz-Iw/formResponse",
		{
			method: "POST",
			body: formdata,
			mode: "no-cors",
		}
	).then(() => {
		toast("Thank you for your feedback!")
		localStorage.setItem("tamilWordleFeedback", true)
		hideFeedback()
		showStatistics()
	})
}

function toast(msg) {
	Toastify({
		text: msg,
		duration: 3000,
		gravity: "top",
		position: "center",
		stopOnFocus: true,
		style: {
			background: "white",
			color: "black",
			fontWeight: "bold",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
		},
	}).showToast()
}

function nextNewWordTimer() {
	setInterval(() => {
		var END = endOfDay(new Date()).getTime()
		var now = new Date().getTime()
		var distance = END - now
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		var seconds = Math.floor((distance % (1000 * 60)) / 1000)
		document.querySelector(".clock").innerHTML =
			zero(hours) + ":" + zero(minutes) + ":" + zero(seconds)
	}, 1000)
}

// ------------------ MAIN ------------------

async function main() {
	const datas = await fetchBasics()
	tamilEntireWordList = datas.tamilEntireWordList
	tamilMainWordList = datas.tamilMainWordList
	todaysWord = generateTodaysWord()

	document.getElementById("helperButton").onclick = showHelper
	document.getElementById("hideHelper").onclick = hideHelper
	document.getElementById("statistics").onclick = showStatistics
	document.getElementById("hideStatistics").onclick = hideStatistics
	document.getElementById("hideFeedBack").onclick = hideFeedback
	document.getElementById("settingsButton").onclick = showSettings
	document.getElementById("hideSettings").onclick = hideSettings
	document.getElementById("translateSwitch").onclick = translateInstruction
	document.getElementById("shareBtn").onclick = shareButton
	document.getElementById("themeSwitch").onclick = switchMode
	document.getElementById("feedbackForm").onsubmit = onFeedbackSubmit

	// setting up the game
	if (!localStorage.getItem("mode")) {
		localStorage.setItem("mode", "dark")
	} else {
		setMode(localStorage.getItem("mode"))
	}

	// User Feedback Setup
	if (!localStorage.getItem("tamilWordleFeedback")) {
		localStorage.setItem("tamilWordleFeedback", false)
	}

	if (localStorage.getItem("tamilWordle")) {
		const storage = JSON.parse(localStorage.getItem("tamilWordle"))
		if (storage.expires !== String(new Date()).slice(0, 15)) {
			// If the game is expired, start a new game
			freshDay()
			startGame()
		} else {
			setGameStats()
			setCurrentGameState(storage.gameState, storage.data_states)

			if (storage.status === "Progress" || storage.status === "Initiated") {
				console.log("Game Initiated")
				startGame()
			}
			if (storage.status === "Win" || storage.status === "Lose") {
				setTimeout(() => {
					document.getElementById("statistics").click()
				}, 1500)
			}
		}
	} else {
		document.getElementById("helperButton").click()
		freshDay()
	}

	keyList = createKeys()
	keyboard.innerHTML = createKeyboard(keyList)
	nextNewWordTimer()
	if (JSON.parse(localStorage.getItem("tamilWordleStats")).played === 0) {
		statsAvailable(false)
	} else {
		statsAvailable(true)
	}
}

main()
