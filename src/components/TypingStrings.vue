<template>
    <v-container fluid>
        <v-divider></v-divider>
        <v-row justify="center">
            <span
                    class="text-center display-3 ma-2"
            >
                {{kanji}}
            </span>
        </v-row>
        <v-row justify="center">
            <div class="ma-2">
                <span class="transparent text-center display-2">{{ clearAnswer }}</span>
                <span class="text-center display-2">{{ notAnswer }}</span>
            </div>
        </v-row>
        <v-divider></v-divider>
    </v-container>

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