<script setup>
import { computed, watch } from "vue"
import { useStore } from "vuex"
const store = useStore()
const message = computed(() => store.state.message)
const darkMode = computed(() => store.state.darkMode)
const addMessage = (msg) => store.commit("addMessage", msg)

// Hide message after 1.5 seconds
watch(message, (newMessage) => {
  if (newMessage != "") {
    setTimeout(() => {
      addMessage("")
    }, 1500)
  }
})
</script>

<template>
  <div
    v-if="message != ''"
    class="fixed top-10 left-[50%] -translate-x-[50%] mx-auto"
  >
    <div
      class="shadow-lg w-64 h-12 max-w-full rounded-lg"
      :class="darkMode ? 'bg-slate-600 text-white' : 'bg-white text-slate-600'"
    >
      <p class="font-bold text-center align-middle pt-3">{{ message }}</p>
    </div>
  </div>
</template>
