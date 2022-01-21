import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/Login.vue'
import FavoriteCity from '@/components/FavoriteCity.vue'
import Weather from '@/components/Weather.vue'
import CityName from '@/components/CityName.vue'
import DayOfSelectedCity from '@/components/DayOfSelectedCity.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        children: [
            {path: 'weather', component: Weather},
            {path: 'favorite-city', component: FavoriteCity},
            {path: '/weather/:cityName', component: CityName},
            {path: '/weather/:cityName/:day', component: DayOfSelectedCity}
        ],
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
