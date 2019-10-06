import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SinglePlayBase from './views/SinglePlayBase.vue';
import Practice from './views/Practice.vue';
import Test from './views/Test.vue';

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
            component: Practice,
        },
        {
            path: '/practice2',
            name: 'practice2',
            props: {dataURL: '/mock/mock2.json'},
            component: Practice,
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        // },
        // {
        //     path: '/game',
        //     name: 'game',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/SinglePlayBase.vue'),
        // },
    ],
});
