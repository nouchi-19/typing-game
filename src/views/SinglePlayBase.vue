<template>
    <div>
        <slot
                name="header"
                :allTypingCount="allTypingCount"
                :clearTypingCount="clearTypingCount"
                :continuousTypingCount="continuousTypingCount"
                :missTypeCount="missTypeCount"
                :parSeconds="parSeconds"
                :seconds="seconds"
                :remainingTime="remainingTime"
        ></slot>
        <start-message v-if="!gameRanning"></start-message>
        <typing-game-core
                v-else
                :kanji="getKanji"
                :hiragana="getHiragana"
                @finish-typing="setNextQuestion"
                @restart-typing="restart"
                @counter="counter"
        >
        </typing-game-core>
        <!--<div>問題番号: {{nowNumber}}</div>-->

        <div>
            <slot
                    name="footer"
                    :allTypingCount="allTypingCount"
                    :clearTypingCount="clearTypingCount"
                    :continuousTypingCount="continuousTypingCount"
                    :missTypeCount="missTypeCount"
                    :parSeconds="parSeconds"
                    :seconds="seconds"
                    :remainingTime="remainingTime"
            >
                <div>総タイピング数:{{ allTypingCount }}</div>
                <div>総正解タイピング数: {{ clearTypingCount }}</div>
                <div>連続正解タイピング数:{{ continuousTypingCount }}</div>
                <div>ミスタイプ数:{{ missTypeCount }}</div>
                <div>秒間正解数:{{ parSeconds }}</div>
                <div>経過秒数: {{ seconds }}</div>
                <div>残り時間:{{ remainingTime }}</div>
                <router-link to="/" tag="button">Homeに戻る</router-link>
            </slot>
        </div>

    </div>
</template>

<script lang='ts'>

    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import TypingGameCore from '../components/TypingGameCore.vue';
    import axios from 'axios';
    import {Counter} from '@/components/Counter.ts';
    import StartMessage from '@/components/StartMessage.vue';
    import {Result} from '@/components/Result';

    @Component({
        components: {
            TypingGameCore,
            StartMessage,
        },
    })
    export default class SinglePlayBase extends Vue {
        @Prop({default: '/mock/mock1.json'})
        private dataURL!: string;

        @Prop({default: -1})
        private limit!: number;

        private nowNumber: number = 0;
        private questions: Question[] = [{id: 0, kanji: '', hiragana: ''}];

        private allTypingCount: number = 0;
        private continuousTypingCount: number = 0;
        private missTypeCount: number = 0;
        private seconds: number = 0;

        private intervalId: any;

        private gameRanning: boolean = false;

        private async created() {
            await axios.get(this.dataURL)
                .then(
                    (response) => {
                        this.questions = response.data.questions;
                    },
                ).catch();
            this.nowNumber = Math.floor( Math.random() * this.questions.length);
        }

        private mounted() {
            window.addEventListener('keydown', this.keyDown);
        }

        // 複数展開どうなんのこれ
        private destroyed() {
            window.removeEventListener('keydown', this.keyDown);
        }

        private keyDown(e: any) {
            if (!this.gameRanning && e.code === 'Space')  {
                this.countReset();
                this.gameRanning = true;
                this.intervalId = setInterval(() => {
                    this.seconds++;
                }, 1000);
                window.removeEventListener('keydown', this.keyDown);
            } else {
                return;
            }
        }


        private beforeDestroy() {
            clearInterval(this.intervalId);
        }

        private timeReset() {
            this.seconds = 0;
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        }

        // todo
        // リセットが多すぎる
        private countReset() {
            this.timeReset();
            this.allTypingCount = 0;
            this.continuousTypingCount = 0;
            this.missTypeCount = 0;
            this.setNextQuestion();
        }

        // todo
        // 無駄な処理がある
        private restart() {
            this.gameRanning = false;
            this.countReset();
            clearInterval(this.intervalId);
            window.addEventListener('keydown', this.keyDown);
        }

        private counter(result: Counter) {
            this.allTypingCount = result.allTypingCount;
            this.continuousTypingCount = result.continuousTypingCount;
            this.missTypeCount = result.missTypeCount;
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



        private get remainingTime() {
            // 時間制限の終了時に発火するイベント
            const rem = this.limit - this.seconds;
            if (rem === 0) {
                clearInterval(this.intervalId);
                this.result();
            }
            return rem;

        }

        @Emit()
        private result(): Result {
            return {
                allTypingCount: this.allTypingCount,
                clearTypingCount: this.clearTypingCount,
                continuousTypingCount: this.continuousTypingCount,
                missTypeCount: this.missTypeCount,
                parSeconds: this.parSeconds,
            };
        }
    }
    interface Question {
        id: number;
        kanji: string;
        hiragana: string;
    }
</script>

<style scoped>

</style>