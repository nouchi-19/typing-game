<template>
    <div>
        <span class="transparent">{{ clearAnswer }}</span>
        <span>{{ notAnswer }}</span>
    </div>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class TypingStrings extends Vue {
        // private clearAnswer: string = '';
        // private notAnswer: string = '';


        @Prop({default: ''})
        private answer!: string;


        @Prop({default: 0})
        private nowNumber!: number;

        get clearAnswer() {
            return this.answer.substr(0, this.nowNumber);
        }

        get notAnswer() {
            return this.answer.substr(this.nowNumber);
        }
    }
</script>

<style scoped>
    .transparent {
        opacity: 0.3;
    }
</style>