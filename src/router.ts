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
            path: '/practice_all',
            name: 'practice_all',
            props: {dataURL: '/mock/all.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/practice_word2-6',
            name: 'practice_word2-6',
            props: {dataURL: '/mock/word2-6.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/practice_word7-9',
            name: 'practice_word7-9',
            props: {dataURL: '/mock/word7-9.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/practice_word10-14over',
            name: 'practice_word10-14over',
            props: {dataURL: '/mock/word10-14over.json'},
            component: () => import('./views/Practice.vue'),
        },
        {
            path: '/time-attack_60',
            name: 'time-attack_60',
            props: {
                dataURL: '/mock/word2-6.json',
                limit: 60,
            },
            component: () => import('./views/TimeAttack.vue'),
        },
        {
            path: '/time-attack_90',
            name: 'time-attack_90',
            props: {
                dataURL: '/mock/word7-9.json',
                limit: 90,
            },
            component: () => import('./views/TimeAttack.vue'),
        },
        {
            path: '/time-attack_120',
            name: 'time-attack_120',
            props: {
                dataURL: '/mock/word10-14over.json',
                limit: 120,
            },
            component: () => import('./views/TimeAttack.vue'),
        },
        {
            path: '/time-attack_150',
            name: 'time-attack_150',
            props: {
                dataURL: '/mock/all.json',
                limit: 150,
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



