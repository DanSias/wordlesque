import { createRouter, createWebHistory } from "vue-router"
import Home from "../components/Home.vue"

const About = () => import("../components/About.vue")

const history = createWebHistory()
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
})

export default router
