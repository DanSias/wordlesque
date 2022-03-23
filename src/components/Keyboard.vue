<script setup>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"
const store = useStore()

const darkMode = computed(() => store.state.darkMode)
const letterStatus = computed(() => store.getters.letterStatus)

const addLetter = (letter) => store.commit("addLetter", letter)
const removeLetter = () => store.commit("removeLetter")
const checkGuess = () => store.dispatch("checkGuess")

const rows = {
  top: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  middle: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  bottom: ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
}
const greenLetters = computed(() => {
  return [...new Set(letterStatus.value.correct)]
})
const yellowLetters = computed(() => {
  return [...new Set(letterStatus.value.present)]
})
const grayLetters = computed(() => {
  return [...new Set(letterStatus.value.absent)]
})

const letterClass = (letter) => {
  letter = letter.toUpperCase()
  if (greenLetters.value.includes(letter)) {
    return correctLetterClass.value
  } else if (yellowLetters.value.includes(letter)) {
    return presentLetterClass.value
  } else if (grayLetters.value.includes(letter)) {
    return absentLetterClass.value
  } else {
    return unguessedLetterClass.value
  }
}

const unguessedLetterClass = computed(() => {
  return darkMode.value
    ? "bg-slate-600 border-slate-500 text-slate-50"
    : "bg-slate-50 border-slate-300"
})
// Letters in correct position
const correctLetterClass = computed(() => {
  return darkMode.value
    ? "bg-green-600 border-green-900 text-white"
    : "bg-green-500 text-white"
})
// Letters in word, wrong position
const presentLetterClass = computed(() => {
  return darkMode.value
    ? "bg-yellow-600 border-yellow-900 text-white"
    : "bg-yellow-500 text-white"
})
// Incorrect Letters (not in word)
const absentLetterClass = computed(() => {
  return darkMode.value
    ? "bg-slate-700 border-slate-900 text-slate-600"
    : "bg-slate-500 text-white"
})

const checkLetter = (letter) => {
  if (letter == "back") {
    removeLetter()
  } else if (letter == "enter") {
    checkGuess()
  } else {
    addLetter(letter)
  }
}

// Listen for keystrokes
onMounted(() => {
  window.addEventListener("keyup", function (event) {
    if (/^[A-z]$/.test(event.key)) {
      addLetter(event.key)
    } else if (event.key == "Backspace") {
      removeLetter()
    } else if (event.key == "Enter") {
      checkGuess()
    }
  })
})
</script>

<template>
  <div>
    <div v-for="(row, i) in rows" :key="i" class="mb-6">
      <span
        v-for="letter in row"
        :key="letter"
        class="uppercase font-bold px-4 py-2 md:mx-1 mx-0.5 border-solid border-rounded border rounded cursor-pointer"
        :class="letterClass(letter)"
        @click="checkLetter(letter)"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>
