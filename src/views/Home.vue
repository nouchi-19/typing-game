<template>
    <div>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
        <h1>
            <router-link to="/practice1" >practice1</router-link>
        </h1>

        <h1>
            <router-link to="/practice2" >practice2</router-link>
        </h1>
        <h1>
            タイムアタック
        </h1>
        <h1>
            対戦
        </h1>

        <h1>
            <router-link to="/test" >test</router-link>
        </h1>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    // import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

    @Component({
        components: {
        },
    })export default class Home extends Vue {
    }

</script>
