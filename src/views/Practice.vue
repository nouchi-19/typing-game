<template>
    <v-container fluid>
        <single-play-base :dataURL="dataURL">
            <template #header="slotProps">
                <v-container fluid>
                    <v-row justify="center">
                        練習モード
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
                                経過時間
                            </v-card-title>
                            <v-card-text class="text-center display-2 text--primary">
                                {{ slotProps.seconds }}
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
                        <v-col md="4" class="text-center">ミスタイプ数:{{ slotProps.missTypeCount }}</v-col>
                        <v-col md="4" class="text-center">秒間正解数:{{ slotProps.parSeconds }}</v-col>
                        <v-col md="4" class="text-center">経過秒数: {{ slotProps.seconds }}</v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn class="ma-2" rounded outlined color="teal" @click="transition('/')">Homeに戻る</v-btn>
                        <!--<router-link to="/" tag="button">Homeに戻る</router-link>-->
                    </v-row>
                </v-container>
                <!--<v-cont-->

            </template>
        </single-play-base>
    </v-container>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SinglePlayBase from '@/views/SinglePlayBase.vue';

    @Component({
        components: {
            SinglePlayBase,
        },
    })
    export default class Practice extends Vue {
        @Prop({default: '/mock/mock1.json'})
        private dataURL!: string;

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