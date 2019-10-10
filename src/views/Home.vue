<template>
    <v-container fluid>
        <v-row
                justify="center"
        >
            <span class="display-2 ma-12">
                タイピングゲーム
            </span>
        </v-row>


        <v-row
                justify="center"
                v-for="link of links"
        >
            <v-col
            >
                <v-card
                        class="mx-auto"
                        max-width="500"
                        elevation=0
                        outlined
                        @click="transition(link.path)"
                >
                    <v-card-title class="justify-center">
                        {{ link.name }}
                    </v-card-title>
                    <v-card-text class="text-center">
                        {{ link.exp }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!--別配置案-->
        <!--<v-row-->
                <!--justify="center"-->
                <!--v-for="content of contents"-->
        <!--&gt;-->
            <!--<v-col-->
            <!--&gt;-->
                <!--<v-row-->
                        <!--justify="center"-->
                <!--&gt;-->
                    <!--{{content.name}}-->
                <!--</v-row>-->
                <!--<v-row-->
                        <!--justify="center"-->
                <!--&gt;-->
                    <!--<v-col-->
                            <!--md="4"-->
                            <!--v-for="c of content.level"-->
                    <!--&gt;-->
                        <!--<v-card-->
                                <!--max-width="500"-->
                                <!--elevation=0-->
                                <!--outlined-->
                                <!--@click="transition(c.path)"-->
                        <!--&gt;-->
                            <!--<v-card-title class="justify-center">-->
                                <!--{{ c.exp }}-->
                            <!--</v-card-title>-->
                            <!--&lt;!&ndash;<v-card-text class="text-center">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{ link.exp }}&ndash;&gt;-->
                            <!--&lt;!&ndash;</v-card-text>&ndash;&gt;-->
                        <!--</v-card>-->
                    <!--</v-col>-->
                <!--</v-row>-->
            <!--</v-col>-->
        <!--</v-row>-->
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
        },
    })
    export default class Practice extends Vue {
        private links = [
            {
                name: '練習1',
                path: '/practice1',
                exp: '初級の練習問題です',
            },
            {
                name: '練習2',
                path: '/practice2',
                exp: '上級の練習問題です',
            },
            {
                name: 'タイムアタック(60秒)',
                path: '/time-attack60',
                exp: '60秒のタイムアタックです',
            },
            {
                name: 'タイムアタック(120秒)',
                path: '/time-attack120',
                exp: '120秒のタイムアタックです',
            },
            {
                name: '対戦',
                path: '',
                exp: '実装終わってません',
            },

        ];
        private contents = [
            {
                name: '練習',
                level: [
                    {
                        path: '/practice1',
                        exp: '初級',
                    },
                    {
                        path: '/practice2',
                        exp: '中級',
                    }
                ]
            }
        ];

        private transition(path: string) {
            if (path === '') {
                return;
            }
            this.$router.push(path);
        }
    }
</script>
