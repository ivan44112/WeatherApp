import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/Login.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FavoriteCity from '../components/FavoriteCity'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Weather from '../components/Weather'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        children: [{path: 'weather', component: Weather},
                   {path: 'favorite-city', component: FavoriteCity}],
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router
