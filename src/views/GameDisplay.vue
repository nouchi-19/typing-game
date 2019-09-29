<template>
    <div>
        <!--{{ name }}-->
        <!--{{count}}-->
        <typing-strings :answer="questionTypingString" :nowNumber="clearString.length"></typing-strings>
        <div>
            <div>
                <input v-model="allInputString"/>
            </div>

            <div>debag</div>
            <div>
                allInputString: {{ allInputString }}
            </div>
            <div>
                clearString: {{clearString}}
            </div>
            <div>
                questionTypingString: {{ questionTypingString }}
            </div>

            <div>
                judgment: {{judgment}}
            </div>
            <div>
                noAnswerList: {{noAnswerList}}
            </div>
            <div>
                {{}}
            </div>
        </div>
    </div>
</template>

<script lang='ts'>

    import {Component, Vue, Watch} from 'vue-property-decorator';
    import TypingStrings from '@/components/TypingStrings.vue';

    @Component({
        components: {
            TypingStrings,
        },
    })
    export default class GameDisplay extends Vue {

        // 未回答リスト
        private noAnswerList: string[] = ['sushi', 'susi'];

        // 打ち込んで合ってたキー
        private clearString: string = '';

        // 打ち込んだキーすべて
        private allInputString: string = '';

        // ミスタイプ数
        private missTypeCount: number = 0;

        private judgment: boolean = false;


        // 打ち込む参考のtyping文字列
        get questionTypingString(): string {
            return this.clearString + this.noAnswerList[0];
        }


        // 入力文字を検査
        @Watch('allInputString')
        private inputStringCheck() {
            // 引数を投げる文字にする
            this.judgment = this.judge(this.allInputString.substr(-1));
        }

        // 完全正解したらtrueそれ以外false
        private judge(input: string): boolean {
            // firstStringCheckとの粒度考えること
            //  allInputになにか入ってる前提じゃないとだめかも
            // その場合ガード節追加すること

            const rem: string[] = this.firstStringCheck(input, this.noAnswerList);

            // listが空なら一致条件なしで失敗（typingミス）
            if (rem.length === 0) {
                this.missTypeCount++;
                return false;
            }

            // クリア文字追加
            this.clearString = this.clearString.toString() + input;
            // 残り文字再登録
            this.noAnswerList = rem;

            // listに空の文字列があるなら完答があるのでtrue
            for (const s of rem) {
                if (s === '') {
                    return true;
                }
            }

            // それ以外のtypingは合っているがまだ問題残っているのでfalse
            return false;
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
            const remainingStrings: string[] = [];
            for (const s of noAnswerList) {
                if (input === s.substr(0, 1)) {
                    remainingStrings.push(s.substr(1));
                }
            }
            return remainingStrings;
        }


    }
</script>

<style scoped>

</style>