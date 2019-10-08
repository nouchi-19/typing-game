<template>
    <div>
        <div>{{result}}</div>
        <router-link to="/" tag="button">Homeに戻る</router-link>
    </div>
</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import {Result} from '../components/Result';

    @Component
    export default class TimeAttackRanking extends Vue {

        private result: Result = {
            allTypingCount: 0,
            clearTypingCount: 0,
            continuousTypingCount: 0,
            missTypeCount: 0,
            parSeconds: 0,
        };
    }
</script>

<style scoped>

</style>