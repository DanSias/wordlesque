<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()

const props = defineProps({
  row: Number,
})

const darkMode = computed(() => store.state.darkMode)
const attempt = computed(() => store.state.attempt)
const wordLength = computed(() => store.state.wordLength)
const wordArray = computed(() => store.getters.wordArray)

const rowWord = computed(() => store.getters.rowWord(props.row))

const rowType = computed(() => {
  if (attempt.value == props.row) {
    return "tbd"
  } else if (attempt.value > props.row) {
    return "guess"
  }
  return "empty"
})
const letter = (col) => {
  let index = col - 1
  return rowWord.value ? rowWord.value[index] : ""
}

const emptyTileClass = computed(() => {
  return darkMode.value
    ? "bg-slate-600 border-slate-500"
    : "bg-slate-50 border-slate-300"
})
// Tiles filled with current guess
const filledGuessClass = computed(() => {
  return darkMode.value
    ? "bg-slate-600 border-slate-200 text-slate-100"
    : "bg-slate-50 border-slate-600 text-slate-700"
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
    ? "bg-slate-700 border-slate-900 text-slate-100"
    : "bg-slate-500 text-white"
})

const letterClass = (col) => {
  let index = col - 1
  if (rowType.value == "empty") {
    return emptyTileClass.value
  } else if (rowType.value == "tbd") {
    if (index < rowWord.value.length) {
      return filledGuessClass.value
    }
    return emptyTileClass.value
  }
  if (rowWord.value[index] == wordArray.value[index]) {
    return correctLetterClass.value
  } else if (wordArray.value.includes(rowWord.value[index])) {
    return presentLetterClass.value
  } else {
    return absentLetterClass.value
  }
  return ""
}
</script>

<template>
  <div class="flex">
    <div
      v-for="col in wordLength"
      :key="col"
      :class="letterClass(col)"
      class="text-2xl font-black uppercase w-12 h-12 md:w-16 md:h-16 md:pt-4 pt-2 mx-0.5 my-0.5 border border-2 align-middle"
    >
      <span class="uppercase">
        {{ letter(col) }}
      </span>
    </div>
  </div>
</template>
