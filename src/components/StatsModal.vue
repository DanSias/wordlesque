<script setup>
import { ref, computed, watch } from "vue"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue"

import { useStore } from "vuex"
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
const outcome = computed(() => store.getters.outcome)
const gameHistory = computed(() => store.getters.gameHistory)
const nextGame = () => store.dispatch("nextGame")
const logGame = () => store.dispatch("logGame")

const modalHeadline = computed(() => {
  return (outcome.value == 'defeat') ? 'Better Luck Next Time' : 'Great Success!'
})
const mostGuesses = computed(() => {
  let arr = Object.values(gameHistory.value.guess)
  let max = Math.max(...arr)
  return max
})
const guessPercent = (guess) => {
  return Math.round((guess / mostGuesses.value) * 100)
}

const isOpen = ref(false)

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}
const nextWord = () => {
  closeModal()
  nextGame()
}
watch(outcome, (gameState) => {
  openModal()
  logGame()
})
</script>

<template>
  <!-- <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open dialog
    </button>
  </div> -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl"
              :class="
                darkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'
              "
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                {{ modalHeadline }}
              </DialogTitle>
              <div class="mt-2 text-center">
                <h2 class="uppercase">statistics</h2>
                <div class="flex mx-auto mt-2 w-full">
                  <div class="w-1/4">
                    <h3 class="text-3xl font-bold">
                      {{ gameHistory.played }}
                    </h3>
                    <span class="text-xs">Played</span>
                  </div>
                  <div class="w-1/4">
                    <h3 class="text-3xl font-bold">
                      {{ Math.round(gameHistory.winRate * 100) }}%
                    </h3>
                    <span class="text-xs">Win Rate</span>
                  </div>
                  <div class="w-1/4">
                    <h3 class="text-3xl font-bold">
                      {{ gameHistory.currentStreak }}
                    </h3>
                    <p class="text-xs">Current<br />Streak</p>
                  </div>
                  <div class="w-1/4">
                    <h3 class="text-3xl font-bold">
                      {{ gameHistory.maxStreak }}
                    </h3>
                    <p class="text-xs">Max<br />Streak</p>
                  </div>
                </div>
              </div>
              <h2 class="mt-4 text-center uppercase">guess distribution</h2>

              <div class="mt-4 mx-auto">
                <div v-for="(score, index) in gameHistory.guess" :key="index">
                  <div class="flex pb-2">
                    <div class="border-r pr-1 mr-2">{{ index }}</div>
                    <div
                      :class="darkMode ? 'bg-white' : 'bg-slate-500'"
                      :style="'width: ' + guessPercent(score) + '%;'"
                    ></div>
                    <div class="ml-2">
                      {{ score }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex">
                <div class="flex-grow"></div>
                <button
                  type="button"
                  :class="darkMode ? 'text-blue-100 bg-blue-800 hover:bg-blue-700 focus-visible:ring-blue-800' : 'text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500'"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium  border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="nextWord"
                >
                  Next Word!
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
