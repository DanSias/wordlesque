<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
import {
  MoonIcon,
  SunIcon,
  CalendarIcon,
  RefreshIcon,
  MenuIcon,
  AnnotationIcon,
  XIcon,
} from "@heroicons/vue/outline"
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()

const darkMode = computed(() => store.state.darkMode)
const wordObject = computed(() => store.getters.wordObject)
const toggleDarkMode = () => store.commit("toggleDarkMode")
const toggleCalendar = () => store.commit("toggleCalendar")
const randomize = () => store.dispatch("randomize")
</script>

<template>
  <Disclosure as="nav" :class="(darkMode) ? 'bg-slate-900' : 'bg-indigo-700'" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex items-center justify-between sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <AnnotationIcon
              class="h-6 w-6 ml-2 text-white"
              aria-hidden="true"
            />
            <h2 class="text-xl text-white font-black ml-4 hidden md:block">
              Wordlesque
            </h2>
          </div>
        </div>
        <div>
          <h2
            :class="darkMode ? 'text-gray-400' : 'text-gray-200'"
            class="text-lg text-center"
            :data-tooltip="wordObject.date_text"
            data-tooltip-location="bottom"
          >
            #{{ wordObject.day_number }}
          </h2>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            :class="darkMode ? 'text-gray-400' : 'text-gray-200'"
            class=" p-1 mr-2 rounded-full hover:text-white focus:outline-none"
            :data-tooltip="darkMode ? 'Light Mode' : 'Dark Mode'"
            data-tooltip-location="bottom"
            @click="toggleDarkMode()"
          >
            <SunIcon v-if="darkMode" class="h-6 w-6" aria-hidden="true" />
            <MoonIcon v-else class="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            :class="darkMode ? 'text-gray-400' : 'text-gray-200'"
            class="p-1 mr-2 rounded-full hover:text-white focus:outline-none"
            data-tooltip="Random Game"
            data-tooltip-location="bottom"
            @click="randomize()"
          >
            <RefreshIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            :class="darkMode ? 'text-gray-400' : 'text-gray-200'"
            class="p-1 mr-2 rounded-full hover:text-white focus:outline-none"
            data-tooltip="Select Date"
            data-tooltip-location="bottom"
            @click="toggleCalendar()"
          >
            <CalendarIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
/* 
  Tooltip Styles
*/
[data-tooltip] {
  position: relative;
  z-index: 10;
}

/* Positioning and visibility settings of the tooltip */
[data-tooltip]:before,
[data-tooltip]:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  bottom: calc(100% + 5px); /* 5px is the size of the arrow */
  pointer-events: none;
  transition: 0.2s;
  will-change: transform;
}

/* The actual tooltip with a dynamic width */
[data-tooltip]:before {
  content: attr(data-tooltip);
  padding: 10px 18px;
  min-width: 50px;
  max-width: 300px;
  width: max-content;
  width: -moz-max-content;
  border-radius: 6px;
  font-size: 14px;
  background-color: rgba(59, 72, 80, 0.9);
  background-image: linear-gradient(
    30deg,
    rgba(59, 72, 80, 0.44),
    rgba(59, 68, 75, 0.44),
    rgba(60, 82, 88, 0.44)
  );
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
  white-space: pre-wrap;
  transform: translate(-50%, -5px) scale(0.5);
}

/* Tooltip arrow */
[data-tooltip]:after {
  content: "";
  border-style: solid;
  border-width: 5px 5px 0px 5px; /* CSS triangle */
  border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
  transition-duration: 0s; /* If the mouse leaves the element, 
                                the transition effects for the 
                                tooltip arrow are "turned off" */
  transform-origin: top; /* Orientation setting for the
                                slide-down effect */
  transform: translateX(-50%) scaleY(0);
}

/* Tooltip becomes visible at hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}
/* Scales from 0.5 to 1 -> grow effect */
[data-tooltip]:hover:before {
  transition-delay: 0.3s;
  transform: translate(-50%, -5px) scale(1);
}
/* 
  Arrow slide down effect only on mouseenter (NOT on mouseleave)
*/
[data-tooltip]:hover:after {
  transition-delay: 0.5s; /* Starting after the grow effect */
  transition-duration: 0.2s;
  transform: translateX(-50%) scaleY(1);
}

/* Arrow */

/* BOTTOM */
[data-tooltip-location="bottom"]:before,
[data-tooltip-location="bottom"]:after {
  top: calc(100% + 5px);
  bottom: auto;
}

[data-tooltip-location="bottom"]:before {
  transform: translate(-50%, 5px) scale(0.5);
}
[data-tooltip-location="bottom"]:hover:before {
  transform: translate(-50%, 5px) scale(1);
}

[data-tooltip-location="bottom"]:after {
  border-width: 0px 5px 5px 5px;
  border-color: transparent transparent rgba(55, 64, 70, 0.9) transparent;
  transform-origin: bottom;
}
</style>
