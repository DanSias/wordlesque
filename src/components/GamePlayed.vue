<script setup>
import { computed, onMounted, watch } from "vue"
import { useStore } from "vuex"
import { ArrowCircleRightIcon } from "@heroicons/vue/outline"
const store = useStore()

const darkMode = computed(() => store.state.darkMode)
const playedCurrentWord = computed(() => store.getters.playedCurrentWord)
const priorGameBoard = computed(() => store.getters.priorGameBoard)
const stringDate = computed(() => store.getters.stringDate)
const showPriorGame = () => store.dispatch("showPriorGame")
const nextGame = () => store.dispatch("nextGame")

onMounted(() => {
  if (playedCurrentWord.value) {
    showPriorGame()
  }
})
watch(playedCurrentWord, () => {
  if (playedCurrentWord.value) {
    showPriorGame()
  }
})
</script>

<template>
  <div
    v-if="playedCurrentWord"
    :class="darkMode ? 'text-white' : 'text-slate-800'"
    class="mt-6"
  >
    <p class="text-lg font-bold">You've Already Played This Word!</p>
    <p>
      Outcome: {{ priorGameBoard.outcome.toUpperCase() }} -
      <span v-if="priorGameBoard.outcome == 'defeat'"
        >The Word was {{ priorGameBoard.wordObject.word }}</span
      >
    </p>
    <div>
      <!-- <button class="mr-4">Random Word</button> -->
      <button @click="nextGame()" class="bg-indigo-700 hover:bg-indigo-600 px-3 py-1 mt-4 rounded">Next Game</button>
    </div>
  </div>
</template>
