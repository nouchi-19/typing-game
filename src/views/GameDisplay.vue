<template>
    <div>
        <typing-game-core :kanji="getKanji" :hiragana="getHiragana" @finish-typing="setNextQuestion"></typing-game-core>
    </div>
</template>

<script lang='ts'>

    import {Component, Vue} from 'vue-property-decorator';
    import TypingGameCore from '@/components/TypingGameCore.vue';
    import axios from 'axios';

    @Component({
        components: {
            TypingGameCore,
        },
    })
    export default class GameDisplay extends Vue {
        private nowNumber: number = 0;

        private questions: Question[] = [{kanji:"",hiragana:""}];

        private setNextQuestion() {
            let randomNumber = Math.floor( Math.random() * this.questions.length);

            while (randomNumber === this.nowNumber) {
                randomNumber = Math.floor( Math.random() * this.questions.length);
            }
            this.nowNumber = randomNumber;

        }

        private async created() {
            await axios.get('/mock/mock.json')
                .then(
                    (response) => {
                        this.questions = response.data.questions;
                    }
                ).catch(e => console.log(e));
            this.nowNumber = Math.floor( Math.random() * this.questions.length);
        }

        private get getKanji() {
            return this.questions[this.nowNumber].kanji;
        }
        private get  getHiragana() {
            return this.questions[this.nowNumber].hiragana;
        }
    }
    interface Question {
        kanji: string;
        hiragana: string;
    }
</script>

<style scoped>

</style>