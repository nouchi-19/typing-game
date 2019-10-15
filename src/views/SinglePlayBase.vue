<template>
    <v-container fluid>
        <v-row justify="center">
            <slot
                    name="header"
                    :allTypingCount="allTypingCount"
                    :clearTypingCount="clearTypingCount"
                    :continuousTypingCount="continuousTypingCount"
                    :maxContinuousTypingCount="maxContinuousTypingCount"
                    :missTypeCount="missTypeCount"
                    :parSeconds="parSeconds"
                    :seconds="seconds"
                    :remainingTime="remainingTime"
            ></slot>
        </v-row>

        <v-row justify="center">
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
        </v-row>
        <v-row justify="center">
            <slot
                    name="footer"
                    :allTypingCount="allTypingCount"
                    :clearTypingCount="clearTypingCount"
                    :continuousTypingCount="continuousTypingCount"
                    :maxContinuousTypingCount="maxContinuousTypingCount"
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
        </v-row>
    </v-container>
</template>

<script lang='ts'>

    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import TypingGameCore from '../components/TypingGameCore.vue';
    import axios from 'axios';
    import {Counter} from '@/entities/Counter.ts';
    import StartMessage from '@/components/StartMessage.vue';
    import {Result} from '@/entities/Result';
    import VueSweetalert2 from 'vue-sweetalert2';

    Vue.use(VueSweetalert2);

    @Component({
        components: {
            TypingGameCore,
            StartMessage,
        },
    })
    export default class SinglePlayBase extends Vue {
        // データのURL
        @Prop({default: '/mock/mock1.json'})
        private dataURL!: string;

        // 制限時間
        @Prop({default: -1})
        private limit!: number;

        // 問題番号
        private questionNumber: number = 0;

        // 問題のリスト
        private questions: Question[] = [{id: 0, kanji: '', hiragana: ''}];

        //
        private allTypingCount: number = 0;
        private continuousTypingCount: number = 0;
        private maxContinuousTypingCount: number = 0;
        private missTypeCount: number = 0;
        private seconds: number = 0;

        private intervalId: any;

        private gameRanning: boolean = false;

        private async created() {
            // await axios.get(this.dataURL)
            //     .then(
            //         (response) => {
            //             this.questions = response.data.questions;
            //             window.addEventListener('keydown', this.keyDown);
            //             this.questionNumber = Math.floor( Math.random() * this.questions.length);
            //         },
            //     ).catch(
            //         (e) => {
            //             Vue.swal({
            //                 type: 'error',
            //                 title: 'エラー',
            //                 text: '問題データを読み込めませんでした',
            //                 allowOutsideClick: false,
            //                 confirmButtonText: 'ホームに戻る',
            //             }).then(() => {
            //                 this.$router.push('/');
            //             });
            //         },
            //     );
            try {
                const res = await axios.get(this.dataURL);
                this.questions = res.data.questions;
                window.addEventListener('keydown', this.keyDown);
                this.questionNumber = Math.floor( Math.random() * this.questions.length);

            } catch {
                Vue.swal({
                    type: 'error',
                    title: 'エラー',
                    text: '問題データを読み込めませんでした',
                    allowOutsideClick: false,
                    confirmButtonText: 'ホームに戻る',
                }).then(() => {
                    this.$router.push('/');
                });
            }
        }


        // 複数展開どうなんのこれ
        private destroyed() {
            window.removeEventListener('keydown', this.keyDown);
        }

        private keyDown(e: any) {
            if (!this.gameRanning && e.code === 'Space')  {
                this.counterReset();
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
        private counterReset() {
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
            this.counterReset();
            clearInterval(this.intervalId);
            window.addEventListener('keydown', this.keyDown);
        }

        private counter(result: Counter) {
            this.allTypingCount = result.allTypingCount;
            this.continuousTypingCount = result.continuousTypingCount;
            this.missTypeCount = result.missTypeCount;
            if (this.maxContinuousTypingCount < result.continuousTypingCount) {
                this.maxContinuousTypingCount = result.continuousTypingCount;
            }
        }

        private setNextQuestion() {
            let randomNumber = Math.floor( Math.random() * this.questions.length);

            while (randomNumber === this.questionNumber) {
                randomNumber = Math.floor( Math.random() * this.questions.length);
            }
            this.questionNumber = randomNumber;
        }

        private get getKanji() {
            return this.questions[this.questionNumber].kanji;
        }

        private get getHiragana() {
            return this.questions[this.questionNumber].hiragana;
        }

        private get clearTypingCount() {
            return this.allTypingCount - this.missTypeCount;
        }

        private get parSeconds() {
            if (this.seconds === 0) {
                return 0;
            }
            const parsec = Math.floor(this.clearTypingCount / this.seconds * 100 ) / 100;
            if (parsec > 15) {
                Vue.swal({
                    type: 'error',
                    title: '自動タイピングを検知しました',
                    text: 'やり直してください',
                    allowOutsideClick: false,
                    confirmButtonText: 'ホームに戻る',
                    onOpen: () => {
                        clearInterval(this.intervalId);
                        return;
                    },
                }).then(() => {
                    // this.intervalId = setInterval(() => {
                    //     this.seconds++;
                    // }, 1000);
                    this.$router.push('/');
                });
            }

            return parsec;
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
                maxContinuousTypingCount: this.maxContinuousTypingCount,
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