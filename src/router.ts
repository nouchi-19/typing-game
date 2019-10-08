import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SinglePlayBase from './views/SinglePlayBase.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Home,
        },
        {
            path: '/practice1',
            name: 'practice1',
            props: {dataURL: '/mock/mock1.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/practice2',
            name: 'practice2',
            props: {dataURL: '/mock/mock2.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/time-attack60',
            name: 'time-attack60',
            props: {
                dataURL: '/mock/mock2.json',
                limit: 60,
            },
            component: () => import('./views/TimeAttack.vue'),
        },
        {
            path: '/time-attack120',
            name: 'time-attack120',
            props: {
                dataURL: '/mock/mock2.json',
                limit: 120,
            },
            component: () => import('./views/TimeAttack.vue'),
        },
        {
            path: `/time-attack-ranking`,
            name: 'time-attack-ranking',
            component: () => import('./views/TimeAttackRanking.vue'),
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./views/Test.vue'),
        },
    ],
});



