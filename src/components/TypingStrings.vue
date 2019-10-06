<template>
    <div>
        <h1>
            {{kanji}}
        </h1>
        <h1>
            <span class="transparent">{{ clearAnswer }}</span>
            <span>{{ notAnswer }}</span>
        </h1>
    </div>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TypingStrings extends Vue {

        @Prop({default: ''})
        private clearAnswer!: string;

        @Prop({default: ''})
        private notAnswer!: string;

        @Prop({default: ''})
        private kanji!: string;
    }
</script>

<style scoped>
    .transparent {
        opacity: 0.3;
    }
</style>