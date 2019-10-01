

// webからのコピーなので書き換えような

// todo
const isAlphabet = char => char !== '' && 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789- ,:(){}.・!&%'.includes(char);

// romanTableには通常の規則性で対応できない文字のみを入れている。
const romanTable = {
    'を': ['wo'],
    'うぁ': ['uxa','wha'],'うぃ': ['wi','uxi','whi'],'うぇ': ['we','uxe','whe'],'うぉ': ['uxo','who'],
    'ゔぁ': ['va','vuxa'],'ゔぃ': ['vi','vuxi'],'ゔ': ['vu'],'ゔぇ': ['ve','vuxe'],'ゔぉ': ['vo','vuxo'],
    'くぁ': ['kwa','kuxa'], 'くぃ': ['kwi','kuxi'], 'くぅ': ['kwu','kuxu'], 'くぇ': ['kwe','kuxe'], 'くぉ': ['kwo','kuxo'],
    'ぐぁ': ['gwa','guxa'],'ぐぃ': ['gwi','guxi'],'ぐぅ': ['gwu','guxu'],'ぐぇ': ['gwe','guxe'],'ぐぉ': ['gwo','guxo'],
    'しゃ': ['sya','sha','sixya','shixya'],'しぃ': ['syi', 'sixi', 'shixi'],'しゅ': ['syu','shu','sixyu','shixyu'],'しぇ': ['sye','she','sixe','shixe'],'しょ': ['syo','sho','sixyo','shixyo'],
    'じゃ': ['ja','jya','zya','jixya','zixya'],'じゅ': ['ju','jyu','zyu','jixyu','zixyu'],'じぇ': ['je','jye','zye','jixe','zixe'],'じょ': ['jo','jyo','zyo','jixyo','zixyo'],
    'ちゃ': ['tya','cha','tixya','chixya'],'ちぃ': ['tyi','tixi','chixi'],'ちゅ': ['tyu','chu','tixyu','chixyu'],'ちぇ': ['tye','che','tixe','chixe'],'ちょ': ['tyo','cho','tixyo','chixyo'],
    'つぁ': ['tsa','tuxa','tsuxa'],'つぃ': ['tsi','tuxi','tsuxi'],'つぇ': ['tse','tuxe','tsuxe'],'つぉ': ['tso','tuxo','tsuxo'],
    'でぃ': ['dhi','dexi'],'でゅ': ['dhu','dexyu'],'どぅ': ['dwu','doxu'],
    'てぃ': ['thi','texi'],'てぇ': ['the','texe'],
    'とぁ': ['twa','toxa'],'とぃ': ['twi','toxi'],'とぅ': ['twu','toxu'],'とぇ': ['twe','toxe'],'とぉ': ['two','toxo'],
    'ふぁ': ['fa','fuxa','huxa'],'ふぃ': ['fi','fuxi','huxi'],'ふぇ': ['fe','fuxe','huxe'],'ふぉ': ['fo','fuxo','huxo'],
    'ゐ': ['wyi'],'ゑ': ['wye'],'ー': ['-'],'。': ['.']
};

romanTable['ヴぁ'] = romanTable['ゔぁ']; romanTable['ヴぃ'] = romanTable['ゔぃ'];
romanTable['ヴ'] = romanTable['ゔ']; romanTable['ヴぇ'] = romanTable['ゔぇ'];
romanTable['ヴぉ'] = romanTable['ゔぉ'];

const consonant = { 'し': 's,sh', 'ち': 't,ch', 'つ': 't,ts', 'ふ': 'h,f', 'じ': 'z,j', };

// 基本的なローマ字表を構築する
for (const [hiraganas, cons] of [
    ['あいうえお', ''], ['かきくけこ', 'k'],
    ['さしすせそ', 's'], ['たちつてと', 't'],
    ['なにぬねの', 'n'], ['はひふへほ', 'h'],
    ['まみむめも', 'm'], ['やゆよ', 'y'],
    ['らりるれろ', 'r'], ['わ', 'w'],
    ['がぎぐげご', 'g'], ['ざじずぜぞ', 'z'],
    ['だぢづでど', 'd'], ['ばびぶべぼ', 'b'],
    ['ぱぴぷぺぽ', 'p']]) {
    for (let i = 0, _i = hiraganas.length; i < _i; i++) {
        if (!consonant[hiraganas[i]])
            consonant[hiraganas[i]] = cons;
        romanTable[hiraganas[i]] = consonant[hiraganas[i]].split(',').map(cons => cons + 'aiueo'[i]);
    }
}
romanTable['ゆ'] = ['yu']; romanTable['よ'] = ['yo'];

romanTable['ぁ'] = ['xa']; romanTable['ぃ'] = ['xi'];
romanTable['ぅ'] = ['xu']; romanTable['ぇ'] = ['xe'];
romanTable['ぉ'] = ['xo'];
romanTable['ゃ'] = ['xya']; romanTable['ゅ'] = ['xyu']; romanTable['ょ'] = ['xyo'];
romanTable['ヵ'] = romanTable['ゕ'] = ['xka'];
romanTable['ヶ'] = romanTable['ゖ'] = ['xke'];
romanTable['ゎ'] = romanTable['ヮ'] = ['xwa'];

const xaToLa = romanArr => romanArr.filter(item => /x(?:[aiueo]|y[auo]|k[ae]|wa)/.test(item))
    .map(roman => roman.replace(/x([aiueo]|y[auo]|k[ae]|wa)/g, 'l$1'));

const hiraganaToRoman = (() => {
    const baseRomanTable = romanTable;
    return hiragana => {
        // hiraganaToRoman('しゃ') == [['sya', 'sha', 'sixya', 'shixya'], 2]
        // hiraganaToRoman('っぷ') == [['ppu', 'xtupu', 'xtsupu'], 2]

        if (hiragana === '') return [[''], 0];

        const first = [...hiragana][0] || '',
            second =  [...hiragana][1] || '';

        if (second !== '' && 'ぁぃぅぇぉゃゅょ'.includes(second)) {
            if (romanTable[first+second])
                return [romanTable[first+second].concat(), 2];
            // キャッシュがない場合の処理

            const romanOfSmallChar = {
                'ぁ': ['ya', 'ixa'],
                'ぅ': ['yu', 'ixu'],
                'ぉ': ['yo', 'ixo'],

                'ぃ': ['yi', 'ixi'],
                'ぇ': ['ye', 'ixe'],
                'ゃ': ['ya', 'ixya'],
                'ゅ': ['yu', 'ixyu'],
                'ょ': ['yo', 'ixyo']
            }[second];

            const romans = [];
            for (const cons of consonant[first].split(','))
                romans.push(...romanOfSmallChar.map(roman => `${cons}${roman}`));
            romanTable[first+second] = romans.concat(); // キャッシュする
            return [romans, 2];
        }
        if (first !== '' && 'ぁぃぅぇぉゃゅょ'.includes(first))
            return [romanTable[first].concat(), 1];
        if (first === 'ん') {
            // 今の文字が「ん」の場合
            // 最低限入力しなければならない文字数のみ返す
            // 余分なもの("あんこ"に対するan'n'ko)は後ろの文字にくっつける(nkoと解釈する)

            if (isAlphabet(second)) return [['n'], 1];
            if (second === '') return [['nn'], 1];
            if ('ny'.includes(consonant[second])) // consonant[second] === ''も含む
                return [['nn'], 1]; // 「んな」「んや」「んあ」のとき
            return [['n'], 1];
        }
        if (first === 'っ') {
            // 「女神さまっ」や「女神さまっ2」のように、後ろが存在しないか記号のケース
            if (second === '' || isAlphabet(second))
                return [['xtu', 'xtsu'], 1];
            const [nextCharRoman, count] = hiraganaToRoman(hiragana.slice(1));
            return [
                [ ...nextCharRoman.map(item => `${item.charAt(0)}${item}`), // 「マップ」の'ppu'に相当
                    ...nextCharRoman.map(roman => `xtu${roman}`),
                    ...nextCharRoman.map(roman => `xtsu${roman}`) ],
                count + 1];
        }

        if (romanTable[first] == null) throw new Error('unknown character was given');
        return [romanTable[first].concat(), 1]; // 普通のとき
    };
})();
const getRoman = (furigana, targetPos) => {
    // ローマ字の取得
    // furiganaのtargetPosの位置を取得
    // 結果は配列の形式で返す
    // [[ローマ字], 変換対象となる文字数]
    const nowChar = furigana.charAt(targetPos);

    if (furigana === '') return [[''], 0];
    if (isAlphabet(nowChar)) return [[nowChar], 1];
    if (targetPos < 0 || targetPos >= furigana.length)
        throw new Error('range out of the string selected')

    const [roman, targetHiraganaLength] = hiraganaToRoman(furigana.slice(targetPos));

    // 「あんこ」をankoでもannkoでも打てるようにする処理
    // 「こが'ko'でも'nko'でも良い」と解釈している
    if (furigana.charAt(targetPos - 1) === 'ん' && !'ny'.includes(consonant[nowChar]))
        return [roman.concat(roman.map(roman => `n${roman}`)), targetHiraganaLength];

    return [roman, targetHiraganaLength];
};
const toRoman = (furigana) => {
    let index = 0;
    const romans = [];
    while (furigana.length > index) {
        const [roman, targetHiraganaLength] = getRoman(furigana, index);
        index += targetHiraganaLength;
        romans.push(roman);
    }
    return romans;
};

export default { getRoman }