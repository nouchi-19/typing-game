<template>
    <div>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
        <h1>
            ホーム
        </h1>
        <h2>
            <router-link to="/practice1" >練習1</router-link>
        </h2>

        <h2>
            <router-link to="/practice2" >練習2</router-link>
        </h2>
        <h2>
            <router-link to="/time-attack60">タイムアタック(60秒)</router-link>
        </h2>
        <h2>
            <router-link to="/time-attack120">タイムアタック(120秒)</router-link>
        </h2>
        <h2>
            対戦
        </h2>

        <h1>
            <router-link to="/test" >test</router-link>
        </h1>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        },
    })export default class Home extends Vue {
    }

</script>
