<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <!--<v-container fluid>-->
        <!--<single-play-base :dataURL="dataURL">-->
            <!--<template #header>-->
                <!--<v-container fluid>-->
                    <!--<v-row justify="center">-->
                        <!--練習モード-->
                    <!--</v-row>-->
                <!--</v-container>-->
            <!--</template>-->
            <!--<template #footer="slotProps">-->
                <!--<v-vontainer fluiy>-->
                    <!--<v-row justify="center">-->
                        <!--<v-col md="4" class="text-center">総タイピング数:{{ slotProps.allTypingCount }}</v-col>-->
                        <!--<v-col md="4" class="text-center">総正解タイピング数: {{ slotProps.clearTypingCount }}</v-col>-->
                        <!--<v-col md="4" class="text-center">連続正解タイピング数:{{ slotProps.continuousTypingCount }}</v-col>-->
                        <!--<v-col md="4" class="text-center">ミスタイプ数:{{ slotProps.missTypeCount }}</v-col>-->
                        <!--<v-col md="4" class="text-center">秒間正解数:{{ slotProps.parSeconds }}</v-col>-->
                        <!--<v-col md="4" class="text-center">経過秒数: {{ slotProps.seconds }}</v-col>-->
                    <!--</v-row>-->
                    <!--<v-row justify="center">-->
                        <!--<v-btn class="ma-2" outlined color="teal" @click="transition('/')">Homeに戻る</v-btn>-->
                        <!--&lt;!&ndash;<router-link to="/" tag="button">Homeに戻る</router-link>&ndash;&gt;-->
                    <!--</v-row>-->
                <!--</v-vontainer>-->
                <!--&lt;!&ndash;<v-cont&ndash;&gt;-->

            <!--</template>-->
        <!--</single-play-base>-->
    <!--</v-container>-->
    <v-container fluid>
        <single-play-base v-if="!showModal" :dataURL="dataURL" :limit="limit" @result="resultPage">
            <template #header="slotProps">
                <v-container fluid>
                    <v-row justify="center">
                        タイムアタック
                    </v-row>
                </v-container>
                <v-container fluid>
                    <v-row justify="center">
                        <v-card
                                class="mx-auto"
                                max-width="500"
                                elevation=0
                                outlined
                        >
                            <v-card-title class="justify-center">
                                残り時間
                            </v-card-title>
                            <v-card-text class="text-center display-2 text--primary">
                                {{ slotProps.remainingTime }}
                            </v-card-text>
                        </v-card>
                    </v-row>
                </v-container>
            </template>
            <template #footer="slotProps">
                <v-container fluiy>
                    <v-row justify="center">
                        <v-col md="4" class="text-center">総タイピング数:{{ slotProps.allTypingCount }}</v-col>
                        <v-col md="4" class="text-center">総正解タイピング数: {{ slotProps.clearTypingCount }}</v-col>
                        <v-col md="4" class="text-center">連続正解タイピング数:{{ slotProps.continuousTypingCount }}</v-col>
                        <v-col md="4" class="text-center">最長正解タイピング数:{{ slotProps.maxContinuousTypingCount }}</v-col>
                        <v-col md="4" class="text-center">ミスタイプ数:{{ slotProps.missTypeCount }}</v-col>
                        <v-col md="4" class="text-center">秒間正解数:{{ slotProps.parSeconds }}</v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn rounded class="ma-2" outlined color="teal" @click="transition('/')">Homeに戻る</v-btn>
                    </v-row>
                </v-container>
            </template>
        </single-play-base>

        <!--<v-dialog v-if="showModal" persistent max-width="290">-->
            <!--<v-card>-->
                <!--<v-card-title class="headline">Use Google's location service?</v-card-title>-->
                <!--<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>-->
                <!--<v-card-actions>-->
                    <!--<div class="flex-grow-1"></div>-->
                <!--</v-card-actions>-->
            <!--</v-card>-->
        <!--</v-dialog>-->


        <!--sweetalart2実装した場合削除-->
        <v-dialog v-model="showModal" persistent max-width="500">
            <v-card>
                <v-card-title class="headline">結果</v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-row>総タイピング数:{{ result.allTypingCount }}</v-row>
                        <v-row>総正解タイピング数: {{result.clearTypingCount}}</v-row>
                        <v-row>最長正解タイピング数:{{result.maxContinuousTypingCount}}</v-row>
                        <v-row>ミスタイプ数:{{result.missTypeCount}}</v-row>
                        <v-row>秒間正解数:{{result.parSeconds}}</v-row>
                        <v-row>
                            <v-text-field
                                    label="ユーザ名"
                                    required
                                    outlined
                                    clearable
                                    counter
                                    maxlength="25"
                                    v-model="userName"
                                    hint="ランキングに登録する場合はユーザ名を必ず入力してください"
                                    persistent-hint
                            ></v-text-field>
                        </v-row>
                        <!--実装後変更-->
                        <v-row justify="center">
                            <v-btn :disabled="!canPost" class="ma-2" outlined color="teal" @click="sendRanking">ランキングに登録する</v-btn>
                        </v-row>
                        <!--ここまで-->
                        <!--下記実装後削除-->
                        <!--<v-row justify="center">-->
                            <!--<v-btn disabled=false class="ma-2" outlined color="teal" @click="sendRanking">ランキングに登録する</v-btn>-->
                        <!--</v-row>-->
                        <!--ここまで-->
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="center">
                        <!--<v-btn class="ma-2" outlined color="teal" @click="transition('/time-attack-ranking')">ランキングを見る</v-btn>-->
                        <v-btn
                                rounded
                                class="ma-2"
                                outlined color="teal"
                                @click="transition('/time-attack-ranking')"
                        >
                            ランキングを見る
                        </v-btn>
                        <v-btn
                                class="ma-2"
                                rounded
                                outlined
                                color="teal"
                                @click="transition('/')"
                        >
                            Homeに戻る
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" persistent max-width="500">
            <v-card>
                <v-card-title class="headline text-center">{{this.userName}}さんの記録を登録しました</v-card-title>
                <v-card-actions>
                    <v-row justify="center">
                        <v-btn class="ma-2" outlined color="teal" @click="transition('/time-attack-ranking')">ランキングを見る</v-btn>
                        <v-btn class="ma-2" outlined color="teal" @click="transition('/')">Homeに戻る</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>





        <!--<modal v-if="showModal" @close="showModal = false">-->
            <!--<template #header>-->
                <!--<h3>RESULT</h3>-->
            <!--</template>-->
            <!--<template #body>-->

                <!--<div>総タイピング数:{{ result.allTypingCount }}</div>-->
                <!--<div>総正解タイピング数: {{result.clearTypingCount}}</div>-->
                <!--<div>連続正解タイピング数:{{result.continuousTypingCount}}</div>-->
                <!--<div>ミスタイプ数:{{result.missTypeCount}}</div>-->
                <!--<div>秒間正解数:{{result.parSeconds}}</div>-->
            <!--</template>-->
            <!--<template #footer>-->
                <!--<router-link to="/time-attack-ranking" tag="button">ランキングを見る</router-link>-->
                <!--<router-link to="/" tag="button">Homeに戻る</router-link>-->
            <!--</template>-->
        <!--</modal>-->
    </v-container>
</template>

<script lang='ts'>
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import SinglePlayBase from '@/views/SinglePlayBase.vue';
    import {Result} from '../entities/Result';
    import TimeAttackRanking from '@/views/TimeAttackRanking.vue';
    import Modal from '@/components/Modal.vue';
    import {TimeAttackLimit} from '../entities/TimeAttackLimit';
    import axios from 'axios';
    import {TimeAttackResultReq} from '../entities/TimeAttackResultReq';

    @Component({
        components: {
            SinglePlayBase,
            TimeAttackRanking,
            Modal,
        },
    })
    export default class TimeAttack extends Vue {
        @Prop({default: '/mock/mock1.json'})
        private dataURL!: string;

        @Prop({default: 0})
        private limit!: number;

        private userName: string = '';

        private showModal: boolean = false;

        private canPost: boolean = false;

        private dialog2: boolean = false;

        private result: Result = {
            allTypingCount: 0,
            clearTypingCount: 0,
            continuousTypingCount: 0,
            maxContinuousTypingCount: 0,
            missTypeCount: 0,
            parSeconds: 0,
        };

        private resultPage(result: Result) {
            this.result = result;
            this.showModal = true;
        }

        private transition(path: string) {
            if (path === '') {
                return;
            }
            this.$router.push(path);
        }

        @Watch ('userName')
        private canPostWatcher() {
            if (this.userName !==  '') {
                this.canPost = true;
            } else {
                this.canPost = false;
            }
        }

        private async sendRanking() {
            const send: TimeAttackResultReq = {
                mode: TimeAttackLimit[this.limit],
                userName: this.userName,
                allTyping: this.result.allTypingCount,
                clearTyping: this.result.clearTypingCount,
                maxContinuousTyping: this.result.maxContinuousTypingCount,
                perSecond: this.result.parSeconds,
                missType: this.result.missTypeCount,
            };
            this.canPost = false;
            await axios.post('https://typing-game-ranking.now.sh/api/v1/results', send)
                .then(
                    (response) => {
                        this.dialog2 = true;
                    },
                ).catch(
                    // () => {
                    //     Vue.swal({
                    //         type: 'error',
                    //         title: 'エラー',
                    //         text: '問題データを読み込めませんでした',
                    //         allowOutsideClick:false,
                    //         confirmButtonText:'ホームに戻る',
                    //     }).then(() => {
                    //         this.$router.push('/');
                    //     });
                    // },
                );

            // console.log(this.userName);
            // this.dialog2 = true;
            // ランキング送信後下のURLにリンク
            // this.$router.push('/time-attack-ranking');

        }
    }
</script>

<style scoped>

</style>