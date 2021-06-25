import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home.vue";
import UserSettings from "@/components/UserSettings.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'User',
        component: UserSettings
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router