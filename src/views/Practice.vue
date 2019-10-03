<template>
    <div>
        <typing-game-core
                :kanji="getKanji"
                :hiragana="getHiragana"
                @finish-typing="setNextQuestion"
                @counter="counter"
        >
        </typing-game-core>
        <div>総タイピング数:{{allTypingCount }}</div>
        <div>総正解タイピング数: {{clearTypingCount}}</div>
        <div>連続正解タイピング数:{{continuousTypingCount}}</div>
        <div>ミスタイプ数:{{missTypeCount}}</div>
        <div>秒間正解数:{{parSeconds}}</div>
        <div>経過秒数: {{seconds}}</div>
        <div>問題番号: {{nowNumber}}</div>
        <div><button @click="countReset">reset</button></div>

        <router-link to="/" tag="button">戻る</router-link>
    </div>
</template>

<script lang='ts'>

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TypingGameCore from '@/components/TypingGameCore.vue';
    import axios from 'axios';
    import {Counter} from '@/components/Counter';

    @Component({
        components: {
            TypingGameCore,
        },
    })
    export default class Practice extends Vue {
        private nowNumber: number = 0;
        private questions: Question[] = [{kanji: '', hiragana: ''}];

        private allTypingCount: number = 0;
        private continuousTypingCount: number = 0;
        private missTypeCount: number = 0;
        private seconds: number = 0;

        private intervalId: any;

        private async created() {
            await axios.get('/mock/mock2.json')
                .then(
                    (response) => {
                        this.questions = response.data.questions;
                    },
                ).catch();
            this.nowNumber = Math.floor( Math.random() * this.questions.length);
        }

        private mounted() {
            this.intervalId = setInterval(() => {
                this.seconds++;
            }, 1000);
        }

        private beforeDestroy() {
            clearInterval(this.intervalId);
        }

        private timeReset() {
            this.seconds = 0;
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                this.seconds++;
            }, 1000);
        }

        private countReset() {
            this.timeReset();
            this.allTypingCount = 0;
            this.continuousTypingCount = 0;
            this.missTypeCount = 0;
            this.setNextQuestion();
        }

        private counter(result: Counter) {
            this.allTypingCount = result.allTypingCount;
            this.continuousTypingCount = result.continuousTypingCount;
            this. missTypeCount = result.missTypeCount;
        }

        private setNextQuestion() {
            let randomNumber = Math.floor( Math.random() * this.questions.length);

            while (randomNumber === this.nowNumber) {
                randomNumber = Math.floor( Math.random() * this.questions.length);
            }
            this.nowNumber = randomNumber;
        }

        private get getKanji() {
            return this.questions[this.nowNumber].kanji;
        }

        private get getHiragana() {
            return this.questions[this.nowNumber].hiragana;
        }

        private get clearTypingCount() {
            return this.allTypingCount - this.missTypeCount;
        }

        private get parSeconds() {
            if (this.seconds === 0) {
                return 0;
            }
            return Math.floor(this.clearTypingCount / this.seconds * 100 ) / 100;
        }
    }
    interface Question {
        kanji: string;
        hiragana: string;
    }
</script>

<style scoped>

</style>