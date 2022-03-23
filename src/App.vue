<script setup>
import { computed, onMounted } from "vue"
import Navbar from "./components/Navbar.vue"
import WordSelect from "./components/WordSelect.vue"
import Message from "./components/Message.vue"
import GameBoard from "./components/GameBoard.vue"
import StatsModal from "./components/StatsModal.vue"
import GamePlayed from "./components/GamePlayed.vue"
import Keyboard from "./components/Keyboard.vue"

import { useStore } from "vuex"
const store = useStore()
const darkMode = computed(() => store.state.darkMode)
const bodyClass = computed(() => {
  return darkMode.value ? "bg-slate-800" : "bg-slate-100"
})
const getHistory = () => store.dispatch("getHistory")
const toggleDarkMode = () => store.commit("toggleDarkMode")
onMounted(() => {
  getHistory()
  let mode = localStorage.getItem("mode")
  if (mode == "dark" && !darkMode.value) {
    toggleDarkMode()
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen" :class="bodyClass">
    <header>
      <Navbar />
      <WordSelect />
      <Message />
    </header>
    <main class="flex-grow">
      <GameBoard />
      <StatsModal />
      <GamePlayed />
    </main>
    <footer>
      <Keyboard />
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
