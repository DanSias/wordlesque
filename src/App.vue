<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const tacos = computed(() => store.state.tacos);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1 class="text-4xl font-black bg-slate-200 py-4">
    Hello world, it's tailwind.css!
  </h1>
  <h2>Ready for tacos? {{ tacos }}</h2>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
