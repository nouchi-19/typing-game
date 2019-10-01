<template>
    <h1>
        <span class="transparent">{{ clearAnswer }}</span>
        <span>{{ notAnswer }}</span>
    </h1>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TypingStrings extends Vue {

        @Prop({default: ''})
        private clearAnswer!: string;

        @Prop({default: ''})
        private notAnswer!: string;
    }
</script>

<style scoped>
    .transparent {
        opacity: 0.3;
    }
</style>