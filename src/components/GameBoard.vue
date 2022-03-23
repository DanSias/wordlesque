<script setup>
import GameRow from "./GameRow.vue"
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const guesses = computed(() => store.state.guesses)
</script>

<template>
  <div class="mt-8 mx-auto">
    <div class="flex flex-col justify-center items-center">
      <div v-for="row in guesses" :key="row">
        <GameRow :row="row" />
      </div>
    </div>
  </div>
</template>
