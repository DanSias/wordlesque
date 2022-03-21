import { createStore, createLogger } from "vuex"

const state = {
  tacos: "si, senor",
}

const getters = {}
const actions = {}
const mutations = {}

export default createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
})
