<template>
    <div>
        <single-play-base :dataURL="dataURL">
            <template #header>練習モード</template>
            <template #footer="slotProps">
                <div>総タイピング数:{{ slotProps.allTypingCount }}</div>
                <div>総正解タイピング数: {{ slotProps.clearTypingCount }}</div>
                <div>連続正解タイピング数:{{ slotProps.continuousTypingCount }}</div>
                <div>ミスタイプ数:{{ slotProps.missTypeCount }}</div>
                <div>秒間正解数:{{ slotProps.parSeconds }}</div>
                <div>経過秒数: {{ slotProps.seconds }}</div>
                <router-link to="/" tag="button">Homeに戻る</router-link>
            </template>
        </single-play-base>
    </div>
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
    }
</script>

<style scoped>

</style>