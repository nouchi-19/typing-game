<template>
    <typing-strings :kanji="setKanji" :clearAnswer="clearString" :notAnswer="notAnswerList[0]"></typing-strings>
    <!--<v-container fluid>-->

        <!--<h1>{{ setKanji }}</h1>-->
        <!--<h1>{{ kanji }}</h1>-->
        <!--<typing-strings :answer="questionTypingString" :nowNumber="clearString.length"></typing-strings>-->

        <!--<div>-->
            <!--<div>-->
                <!--<input v-model="allInputString"/>-->
            <!--</div>-->
            <!--<div>debag</div>-->
            <!--<div>-->
                <!--allInputString: {{ allInputString }}-->
            <!--</div>-->
            <!--<div>-->
                <!--misstype: {{ missTypeCount }}-->
            <!--</div>-->
            <!--<div>-->
                <!--allTypingCount: {{ allTypingCount }}-->
            <!--</div>-->
            <!--<div>-->
                <!--continuousTyping: {{ continuousTypingCount }}-->
            <!--</div>-->
            <!--<div>-->
                <!--clearString: {{clearString}}-->
            <!--</div>-->
            <!--<div>-->
                <!--questionTypingString: {{ questionTypingString }}-->
            <!--</div>-->

            <!--<div>-->
                <!--hiragana: {{hiragana}}-->
            <!--</div>-->
            <!--<div>-->
                <!--noAnswerList: {{notAnswerList}}-->
            <!--</div>-->
        <!--</div>-->
    <!--</v-container>-->
</template>

<script lang='ts'>

    import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
    import TypingStrings from '@/components/TypingStrings.vue';
    import axios from 'axios';


    // todo
    // jsfile読み込むため型定義がないため、エラー回避のために追加
    // tsに書き換え時に削除すること
    // @ts-ignore
    import Changer from './Changer.js';

    @Component({
        components: {
            TypingStrings,
        },
    })
    export default class TypingGameCore extends Vue {

        @Prop({default: ''})
        private kanji!: string;

        @Prop({default: ''})
        private hiragana!: string;

        // 受け入れ時のみリスナーを起動するようにしたい
        @Prop({default: true})
        private keyDownListener!: boolean;

        // @Prop({default: ''})
        // private typingKey!: string;

        // 未回答リスト
        private notAnswerList: string[] = [];

        // 打ち込んで合ってたキー
        private clearString: string = '';

        // 打ち込んだキーすべて
        // debag用?
        // private allInputString: string = '';

        // キータイプした数
        private allTypingCount: number = 0;

        // 連続ミスなしタイピング数
        private continuousTypingCount: number = 0;

        // ミスタイプ数
        private missTypeCount: number = 0;

        // ワードtyping成功判定
        // private judgment: boolean = false;

        // // スタート時に起動
        private mounted() {
            window.addEventListener('keydown', this.keyDown);
        }
        // // 複数展開どうなんのこれ
        private destroyed() {
            window.removeEventListener('keydown', this.keyDown);
        }

        @Watch ('keyDownListener')
        private keyDownEvent() {
            if (this.keyDownListener) {
                window.addEventListener('keydown', this.keyDown);
            } else {
                window.removeEventListener('keydown', this.keyDown);
            }
        }



        // 問題の初期化
        private setUp() {
            this.clearString = '';
            // this.allInputString = '';
            this.setTypingString(this.hiragana);
        }

        // キー投下時の処理
        private keyDown(e: any) {
            // this.allInputString = this.allInputString.toString() + e.key;
            if (e.code === 'Escape') {
                this.restartTyping();
            } else {
                this.allTypingCount++;
                this.judge(e.key);
            }
        }

        // ローマ字のリストを生成
        private setTypingString(hiragana: string) {
            const str: string = hiragana;
            let i: number = 0;
            let res: string[] = [''];
            while (i < str.length) {
                const [pattern, count] = new Changer({enableLKey: true}).getRoman(str, i);
                const temp = [];
                for (const p of  pattern) {
                    temp.push(...res.map((item) => item + p));
                }
                res = temp;
                i += count;
            }
            this.notAnswerList = res;
        }

        // 完全正解したらtrueそれ以外false
        private judge(input: string) {
            // firstStringCheckとの粒度考えること
            //  allInputになにか入ってる前提じゃないとだめかも
            // その場合ガード節追加すること

            // 大文字を許容
            const inputLow = input.toLowerCase();

            const rem: string[] = this.firstStringCheck(inputLow, this.notAnswerList);

            // listが空なら一致条件なしで失敗（typingミス）
            if (rem.length === 0) {
                this.missTypeCount++;
                this.continuousTypingCount = 0;
                // return false;
                return;
            }

            // クリア文字追加
            this.clearString = this.clearString.toString() + inputLow;
            // 残り文字再登録
            this.notAnswerList = rem;
            this.continuousTypingCount++;

            // listに空の文字列があるなら完答があるのでtrue
            for (const s of rem) {
                if (s === '') {
                    // return true;
                    // this.nextQuestion();
                    // 問題が終わったことを示す
                    this.finishTyping();
                    return;
                }
            }
            return;
            // それ以外のtypingは合っているがまだ問題残っているのでfalse
            // return false;
        }

        // input文字とリストの1文字目を比較してあってたらその文字除いた残りのリストを作ってくれるメソッド
        // 失敗なら何もない
        // 成功しても失敗で無いなら空文字列残る
        // なんか粒度違う…？
        // todo
        private firstStringCheck(input: string, noAnswerList: string[]): string[] {
            if (noAnswerList.length === 0) {
                return noAnswerList;
            }
            // const remainingString: string[] = [];
            // for (const s of noAnswerList) {
            //     if (input === s.substr(0, 1)) {
            //         remainingString.push(s.substr(1));
            //     }
            // }

            return noAnswerList
                .filter((word) => (word.substr(0, 1) === input))
                .map((word) => word.substr(1));
        }

        @Emit()
        private restartTyping() {
            return;
        }

        @Emit()
        private finishTyping() {
            return;
        }

        @Watch('allTypingCount')
        private send() {
            this.sendCounter();
        }

        @Emit('counter')
        private sendCounter() {
            return {
                allTypingCount: this.allTypingCount,
                continuousTypingCount: this.continuousTypingCount,
                missTypeCount: this.missTypeCount,
            };
        }

        // kanji更新時にセットアップを挟むことで更新時リセット
        // 更新がkanji依存なのが嫌だ
        get setKanji() {
            this.setUp();
            return this.kanji;
        }
    }
</script>

<style scoped>

</style>