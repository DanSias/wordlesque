<script setup>
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
const store = useStore()

const localDate = ref(new Date())

const date = computed(() => store.state.date)
const darkMode = computed(() => store.state.darkMode)
const showCalendar = computed(() => store.state.showCalendar)
const setDate = () => store.commit("setDate", localDate.value)
const hideCalendar = () => store.commit("hideCalendar")

watch(localDate, () => {
  setDate()
  hideCalendar()
})
watch(date, (newDate) => {
  if (localDate.value != newDate) {
    localDate.value = new Date(newDate)
  }
})
</script>

<template>
  <div v-show="showCalendar" class="fixed right-4 top-20">
    <Datepicker
      v-model="localDate"
      inline
      :dark="darkMode"
      weekStart="0"
      :enableTimePicker="false"
      selectText="Get Word!"
      :minDate="new Date('2021-06-19')"
      :maxDate="new Date('2027-10-20')"
    />
  </div>
</template>
