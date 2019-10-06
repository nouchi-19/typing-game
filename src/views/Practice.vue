<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <single-play-base :dataURL="dataURL">
            <template v-slot:header>練習モード</template>
            <template v-slot:footer="slotProps">
                <!--{{ slotProps.allTypingCount }}-->
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