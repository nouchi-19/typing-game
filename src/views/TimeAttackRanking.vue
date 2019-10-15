import {TimeAttackLimit} from "../entities/TimeAttackLimit";
<template>
    <v-container fluid>

        <v-row
                justify="center"
        >
            <span class="display-2 ma-12">
                タイムアタックランキング
            </span>
        </v-row>
        <!--todo-->
        <!--以下とりあえずの実装。多数のモードに対応させること-->
        <v-tabs
                v-model="tabs"
                grow
        >
            <v-tab @click="onChenge(60)">60秒タイムアタック</v-tab>
            <v-tab @click="onChenge(120)">120秒タイムアタック</v-tab>
        </v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tabs-items v-model="tabs">
            <v-tab-item>
                <v-card
                        flat
                        tile
                >
                    <v-card-text>
                        <v-simple-table fixed-header>
                            <template>
                                <thead>
                                <tr>
                                    <th class="text-left">順位</th>
                                    <th class="text-left">名前</th>
                                    <th class="text-left">秒間タイピング数</th>
                                    <th class="text-left">正答タイプ数</th>
                                    <th class="text-left">連続最高正答タイプ数</th>
                                    <th class="text-left">ミスタイプ数</th>
                                    <th class="text-left">日付</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(result, i) of showResult">
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ result.userName }}</td>
                                    <td>{{ result.perSecond }}</td>
                                    <td>{{ result.clearTyping }}</td>
                                    <td>{{ result.maxContinuousTyping }}</td>
                                    <td>{{ result.missType }}</td>
                                    <td>{{ result.date }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card
                        flat
                        tile
                >
                    <v-card-text>
                        <v-simple-table fixed-header>
                            <template>
                                <thead>
                                <tr>
                                    <th class="text-left">順位</th>
                                    <th class="text-left">名前</th>
                                    <th class="text-left">秒間タイピング数</th>
                                    <th class="text-left">正答タイプ数</th>
                                    <th class="text-left">連続最高正答タイプ数</th>
                                    <th class="text-left">ミスタイプ数</th>
                                    <th class="text-left">日付</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(result, i) of showResult">
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ result.userName }}</td>
                                    <td>{{ result.perSecond }}</td>
                                    <td>{{ result.clearTyping }}</td>
                                    <td>{{ result.maxContinuousTyping }}</td>
                                    <td>{{ result.missType }}</td>
                                    <td>{{ result.date }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

        <!--<v-row justify="center">-->
            <!--{{results}}-->
        <!--</v-row>-->
        <!--<v-row justify="center">-->
            <!--<v-col>-->
                <!--<v-simple-table fixed-header>-->
                    <!--<template>-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<th class="text-left">順位</th>-->
                            <!--<th class="text-left">名前</th>-->
                            <!--<th class="text-left">秒間タイピング数</th>-->
                            <!--<th class="text-left">正答タイプ数</th>-->
                            <!--<th class="text-left">連続最高正答タイプ数</th>-->
                            <!--<th class="text-left">ミスタイプ数</th>-->
                            <!--<th class="text-left">日付</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr v-for="(result, i) of orderResult">-->
                            <!--<td>{{ i + 1 }}</td>-->
                            <!--<td>{{ result.userName }}</td>-->
                            <!--<td>{{ result.perSecond }}</td>-->
                            <!--<td>{{ result.clearTyping }}</td>-->
                            <!--<td>{{ result.maxContinuousTyping }}</td>-->
                            <!--<td>{{ result.missType }}</td>-->
                            <!--<td>{{ result.date }}</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</template>-->
                <!--</v-simple-table>-->
            <!--</v-col>-->

        <!--</v-row>-->

        <!--<div>-->
            <!--<div>{{results}}</div>-->
            <!--<router-link to="/" tag="button">Homeに戻る</router-link>-->

        <!--</div>-->
        <!--<v-simple-table fixed-header>-->
            <!--<template>-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th class="text-left">順位</th>-->
                    <!--<th class="text-left">名前</th>-->
                    <!--<th class="text-left">秒間タイピング数</th>-->
                    <!--<th class="text-left">正答タイプ数</th>-->
                    <!--<th class="text-left">連続最高正答タイプ数</th>-->
                    <!--<th class="text-left">ミスタイプ数</th>-->
                    <!--<th class="text-left">日付</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for="(result, i) of orderResult">-->
                    <!--<td>{{ i + 1 }}</td>-->
                    <!--<td>{{ result.userName }}</td>-->
                    <!--<td>{{ result.perSecond }}</td>-->
                    <!--<td>{{ result.clearTyping }}</td>-->
                    <!--<td>{{ result.maxContinuousTyping }}</td>-->
                    <!--<td>{{ result.missType }}</td>-->
                    <!--<td>{{ result.date }}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</template>-->
        <!--</v-simple-table>-->
        <v-row justify="center">
            <v-btn class="ma-2" outlined color="teal" @click="transition('/')">Homeに戻る</v-btn>
        </v-row>
    </v-container>

</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import axios from 'axios';
    import {TimeAttackResultRes} from '../entities/TimeAttackResultRes';
    import {TimeAttackLimit} from '../entities/TimeAttackLimit';

    @Component
    export default class TimeAttackRanking extends Vue {

        // private result: Result = {
        //     allTypingCount: 0,
        //     clearTypingCount: 0,
        //     continuousTypingCount: 0,
        //     missTypeCount: 0,
        //     parSeconds: 0,
        // };
        private results: TimeAttackResultRes[] = [];

        private mode: TimeAttackLimit = TimeAttackLimit.Limit_60;

        private tabs: any = null;

        private async created() {
            await axios.get('https://typing-game-ranking.now.sh/api/v1/results')
                .then(
                    (response) => {
                        for (const res of response.data) {
                            this.results.push(this.fromJson(res));
                        }
                    },
                ).catch(
                    () => {
                        return;
                    },
                );
        }

        private get showResult() {
            return this.results
                .filter ((e: TimeAttackResultRes) => (TimeAttackLimit[e.mode] === this.mode))
                .sort ((a: TimeAttackResultRes, b: TimeAttackResultRes) => {
                    return (b.perSecond - a.perSecond);
                });
        }

        // 本来TimeAttackResultResの実装クラスにあるべきメソッド
        private fromJson(result: any): TimeAttackResultRes {
            return {
                resultId: result.resultId,
                userName: result.userName,
                mode: result.mode,
                allTyping: result.allTyping,
                clearTyping: result.clearTyping,
                maxContinuousTyping: result.maxContinuousTyping,
                perSecond: result.perSecond,
                missType: result.missType,
                date: result.date,
            };
        }

        private onChenge(mode: TimeAttackLimit) {
            this.mode = mode;
        }

        private transition(path: string) {
            if (path === '') {
                return;
            }
            this.$router.push(path);
        }

    }
</script>

<style scoped>

</style>