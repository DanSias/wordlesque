import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

const HelloWorld = import('../components/HelloWorld.vue')

const history = createWebHistory()
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            component: Home
        },{
            path: '/hello',
            component: HelloWorld
        },
        {
            path: '/about',
            component: About
        }
    ]
})

export default router