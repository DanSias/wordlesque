import { createStore, createLogger } from "vuex"
import words from "../assets/words.json"
import dictionary from "../assets/dictionary"

const state = {
  date: new Date(),
  playable: true,
  words,
  dictionary,
  guess: [],
  attempt: 1,
  tries: [],
  history: [],
  message: "",
  darkMode: false,
  showCalendar: false,
  // Game Parameters
  wordLength: 5,
  guesses: 6,
}

const getters = {
  outcome(state, getters) {
    if (getters.victory) {
      return "victory"
    } else if (getters.defeat) {
      return "defeat"
    } else {
      return "tbd"
    }
  },
  victory(state, getters) {
    let found = false
    state.tries.forEach((element) => {
      if (
        JSON.stringify(element) == JSON.stringify(getters.wordArray) &&
        state.playable
      ) {
        found = true
      }
    })
    return found
  },
  defeat(state, getters) {
    if (getters.victory == false && state.attempt > 6 && state.playable) {
      return true
    }
    return false
  },
  stringDate(state) {
    return state.date.toString().substring(4,15)
  },
  wordObject(state, getters) {
    let obj = state.words.filter((word) => word.date_text == getters.stringDate)[0]
    return obj
  },
  word(state, getters) {
    return getters.wordObject.word
  },
  wordArray(state, getters) {
    return getters.word.split("")
  },
  rowWord: (state) => (row) => {
    if (row == state.attempt) {
      return state.guess
    }
    let index = row - 1
    return state.tries[index]
  },
  letterStatus(state, getters) {
    let obj = {
      correct: [],
      present: [],
      absent: [],
    }
    state.tries.forEach((guess) => {
      guess.forEach((letter, i) => {
        if (getters.wordArray[i] == letter) {
          obj.correct.push(letter)
        } else if (
          getters.wordArray.includes(letter) &&
          !obj.correct.includes(letter)
        ) {
          obj.present.push(letter)
        } else {
          obj.absent.push(letter)
        }
      })
    })
    return obj
  },
  gameObject(state, getters) {
    let obj = {
      outcome: getters.outcome,
      attempts: state.tries.length,
      word: getters.wordArray,
      tries: state.tries,
      wordObject: getters.wordObject,
    }
    return obj
  },
  gameHistory(state, getters) {
    let gameObject = {
      played: 0,
      wins: 0,
      maxStreak: 0,
      currentStreak: 0,
      outcomes: [],
      guess: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    }
    let streak = 0
    let recentStreak = true
    state.history.reverse().forEach((game) => {
      gameObject.played++
      if (game.outcome == "victory") {
        gameObject.wins++
        gameObject.outcomes.push("w")
        // Number of guesses of each win
        let guessCount = game.tries.length
        gameObject.guess[guessCount]++
        // Max Win Streak
        streak++
        if (streak > gameObject.maxStreak) {
          gameObject.maxStreak = streak
        }
        if (recentStreak) {
          gameObject.currentStreak++
        }
      } else if (game.outcome == "defeat") {
        gameObject.outcomes.push("l")
        recentStreak = false
        streak = 0
      }
    })

    gameObject.winRate =
      gameObject.played > 0 ? gameObject.wins / gameObject.played : 0

    return gameObject
  },
  wordsPlayed(state, getters) {
    let gameNumbers = []
    state.history.forEach((game) => {
      let number = parseInt(game.wordObject.day_number)
      if (!gameNumbers.includes(number)) {
        gameNumbers.push(number)
      }
    })
    return gameNumbers.sort(function (a, b) {
      return a - b
    })
  },
  playedCurrentWord(state, getters) {
    let dayNumber = (getters.wordObject && getters.wordObject.day_number) ? parseInt(getters.wordObject.day_number) : 0
    if (getters.wordsPlayed.includes(dayNumber)) {
      return true
    } else {
      return false
    }
  },
  priorGameBoard(state, getters) {
    if (getters.playedCurrentWord) {
      let priorGame = state.history.filter((game) => {
        return game.wordObject.day_number == getters.wordObject.day_number
      })
      return priorGame[0]
    }
    return null
  },
}

const actions = {
  randomize(context) {
    let maxGame = 2314
    let random = parseInt(Math.random() * maxGame)
    let game = context.state.words.filter(
      (word) => word.day_number == random
    )[0]
    context.commit("setDate", new Date(game.date_iso))
    context.commit("resetBoard")
  },
  checkGuess(context) {
    // Guess is not long enough
    if (context.state.guess.length < 5) {
      context.commit("addMessage", "Not Enough Letters")
    } else {
      // Look for word in dictionary: submit or add message
      let checkWord = context.state.guess.join("").toLowerCase()
      if (context.state.dictionary.includes(checkWord)) {
        context.commit("submitGuess")
      } else {
        context.commit("addMessage", "Not in word list: " + checkWord)
      }
    }
  },
  getHistory(context) {
    let history = []
    let historyString = localStorage.getItem("gameHistory")
    if (historyString != "") {
      history = JSON.parse(historyString)
      context.commit("setHistory", history)
    }
  },
  logGame(context) {
    let history = [...context.state.history]
    history.push(context.getters.gameObject)
    let historyString = JSON.stringify(history)
    localStorage.setItem("gameHistory", historyString)
    context.dispatch("getHistory")
  },
  nextGame(context) {
    let gameDate = new Date(context.state.date)
    let tomorrow = gameDate.setDate(gameDate.getDate() + 1)
    context.commit("setDate", tomorrow)
    context.commit("resetBoard")
  },
  showPriorGame(context) {
    context.state.playable = false
    let game = context.getters.priorGameBoard
    context.state.tries = game.tries
    context.state.attempt = game.tries.length + 1
  },
}

const mutations = {
  setDate(state, newDate) {
    state.date = newDate
    state.tries = []
    state.guess = []
    state.attempt = 1
  },
  addLetter(state, letter) {
    if (state.guess.length < 5) {
      state.guess.push(letter.toUpperCase())
    }
  },
  removeLetter(state) {
    state.guess.pop()
  },
  submitGuess(state) {
    state.tries.push(state.guess)
    state.attempt++
    state.guess = []
  },
  resetBoard(state) {
    state.attempt = 1
    state.guess = []
    state.tries = []
    state.playable = true
  },
  addMessage(state, m) {
    state.message = m
  },
  setHistory(state, hist) {
    state.history = hist
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode
    if (state.darkMode) {
      localStorage.setItem("mode", "dark")
    } else {
      localStorage.setItem("mode", "light")
    }
  },
  toggleCalendar(state) {
    state.showCalendar = !state.showCalendar
  },
  hideCalendar(state) {
    state.showCalendar = false
  },
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
})
