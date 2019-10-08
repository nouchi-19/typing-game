<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <single-play-base v-if="!showModal" :dataURL="dataURL" :limit="limit" @result="resultPage">
            <template #header="slotProps">
                <div>
                    タイムアタック
                </div>
                <div>
                    <h2>
                        残り時間:{{ slotProps.remainingTime }}
                    </h2>
                </div>
            </template>
            <template #footer="slotProps">
                <div>総タイピング数:{{ slotProps.allTypingCount }}</div>
                <div>総正解タイピング数: {{ slotProps.clearTypingCount }}</div>
                <div>連続正解タイピング数:{{ slotProps.continuousTypingCount }}</div>
                <div>ミスタイプ数:{{ slotProps.missTypeCount }}</div>
                <div>秒間正解数:{{ slotProps.parSeconds }}</div>
            </template>
        </single-play-base>

        <modal v-if="showModal" @close="showModal = false">
            <template #header>
                <h3>RESULT</h3>
            </template>
            <template #body>
                <div>総タイピング数:{{ result.allTypingCount }}</div>
                <div>総正解タイピング数: {{result.clearTypingCount}}</div>
                <div>連続正解タイピング数:{{result.continuousTypingCount}}</div>
                <div>ミスタイプ数:{{result.missTypeCount}}</div>
                <div>秒間正解数:{{result.parSeconds}}</div>
            </template>
            <template #footer>
                <router-link to="/time-attack-ranking" tag="button">ランキングを見る</router-link>
                <router-link to="/" tag="button">Homeに戻る</router-link>
            </template>
        </modal>
    </div>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SinglePlayBase from '@/views/SinglePlayBase.vue';
    import {Result} from '../components/Result';
    import TimeAttackRanking from '@/views/TimeAttackRanking.vue';
    import Modal from '@/components/Modal.vue';

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

        private showModal: boolean = false;

        private result: Result = {
            allTypingCount: 0,
            clearTypingCount: 0,
            continuousTypingCount: 0,
            missTypeCount: 0,
            parSeconds: 0,
        };

        private resultPage(result: Result) {
            this.result = result;
            this.showModal = true;
        }
    }
</script>

<style scoped>

</style>