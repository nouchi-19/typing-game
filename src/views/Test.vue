<template>
    <!--上層は問題のデータとタイピング文字と解答の精査、表層のdisplayの構築をする-->
    <!--下層には元のデータ文字と解答文字数を送る-->
    <!--タイピングの仕方次第で-->
    <div>
        <!--{{ name }}-->
        <!--{{count}}-->
        <typing-strings :answer="answer" :nowNumber="nowNumber"></typing-strings>
        <button @click="nowNumber++">button</button>
    </div>

</template>

<script lang='ts'>
    import {Component, Vue} from 'vue-property-decorator';
    import TypingStrings from '@/components/TypingStrings.vue';

    @Component({
        components: {
            TypingStrings,
        },
    })
    export default class Test extends Vue {

        // 渡す文字はcomputedで下の答えた文字と未回答リストで生成するからいらない
        private answer: string = 'hello';

        // これじゃなく答えた文字保存,渡すときにlengs
        private nowNumber: number = 0;

        private noAnswerList: string[] = ['sushi', 'susi'];

        //    answerが０なら別処理。入ってる前提
        //    リスト用意
        //    for
        //      一致していれば文字を作ったリストに入れる
        //    作ったリストの長さが0なら正答なし
        //    逆に0でないなら



    }
</script>

<style scoped>
</style>