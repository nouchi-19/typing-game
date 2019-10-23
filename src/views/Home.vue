<template>
    <v-container fluid>
        <v-row
                justify="center"
        >
            <span class="display-2 ma-12">
                タイピングゲーム
            </span>
        </v-row>


        <!--<v-row-->
                <!--justify="center"-->
                <!--v-for="link of links"-->
        <!--&gt;-->
            <!--<v-col-->
            <!--&gt;-->
                <!--<v-card-->
                        <!--class="mx-auto"-->
                        <!--max-width="500"-->
                        <!--elevation=0-->
                        <!--outlined-->
                        <!--@click="transition(link.path)"-->
                <!--&gt;-->
                    <!--<v-card-title class="justify-center">-->
                        <!--{{ link.name }}-->
                    <!--</v-card-title>-->
                    <!--<v-card-text class="text-center">-->
                        <!--{{ link.exp }}-->
                    <!--</v-card-text>-->
                <!--</v-card>-->
            <!--</v-col>-->
        <!--</v-row>-->

        <!--別配置案-->
        <v-row
                justify="center"
                v-for="content of contents"
                class="mx-12"
        >
            <v-col
            >
                <v-row
                        justify="center"
                        class="display-1"
                >
                    <!--<span class="display-5 ma-12">-->
                        {{content.name}}
                    <!--</span>-->
                </v-row>
                <v-row justify="center" v-if="content.type === 'time-attack'">
                    <v-btn class="ma-2" outlined color="teal" @click="transition('/time-attack-ranking')">タイムアタックのランキングを見る</v-btn>
                </v-row>
                <v-row
                        justify="center"
                >
                    <v-col
                            md="4"
                            v-for="c of content.level"
                    >
                        <v-card
                                max-width="500"
                                elevation=0
                                outlined
                                @click="transition(c.path)"
                        >
                            <v-card-title class="justify-center">
                                {{ c.name }}
                            </v-card-title>
                            <v-card-text class="text-center">
                                {{ c.comment }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        },
    })
    export default class Practice extends Vue {
        // private links = [
        //     {
        //         name: '練習1',
        //         path: '/practice1',
        //         exp: '初級の練習問題です',
        //     },
        //     {
        //         name: '練習2',
        //         path: '/practice2',
        //         exp: '上級の練習問題です',
        //     },
        //     {
        //         name: 'タイムアタック(60秒)',
        //         path: '/time-attack_60',
        //         exp: '60秒のタイムアタックです',
        //     },
        //     {
        //         name: 'タイムアタック(120秒)',
        //         path: '/time-attack_120',
        //         exp: '120秒のタイムアタックです',
        //     },
        //     {
        //         name: '対戦',
        //         path: '',
        //         exp: '実装終わってません',
        //     },
        //
        // ];
        private contents = [
            {
                type: 'practice',
                name: '練習',
                level: [
                    {
                        path: '/practice_word2-6',
                        name: '初級',
                        comment: '2〜6文字の単語が出ます。',
                    },
                    {
                        path: '/practice_word7-9',
                        name: '中級',
                        comment: '7〜9文字の単語が出ます。',
                    },
                    {
                        path: '/practice_word10-14over',
                        name: '上級',
                        comment: '10〜14文字以上の単語が出ます。',
                    },
                ],
            },
            {
                type: 'time-attack',
                name: 'タイムアタック',
                level: [
                    {
                        path: '/time-attack_60',
                        name: '初級',
                        comment: '60秒のタイムアタックです。比較的短い単語が出ます。',
                    },
                    {
                        path: '/time-attack_90',
                        name: '中級',
                        comment: '90秒のタイムアタックです。中程度の長さの単語が出ます。',
                    },
                    {
                        path: '/time-attack_120',
                        name: '上級',
                        comment: '120秒のタイムアタックです。長い単語が出ます。',
                    },
                    {
                        path: '/time-attack_150',
                        name: '超級',
                        comment: '150秒のタイムアタックです。様々な長さの単語が出題されます。',
                    },
                ],
            },
            {
                type: 'battle',
                name: '対戦',
                level: [
                    {
                        path: '',
                        name: '1on1',
                        comment: '近日実装予定',
                    },
                ],
            },
        ];

        private transition(path: string) {
            if (path === '') {
                return;
            }
            this.$router.push(path);
        }
    }
</script>
