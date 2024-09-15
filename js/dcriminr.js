window.onload = function () {
    function update(a, b) {
        let c = words.shift();
        a.push($s.wordnew.value || c);

        $s.wordsorigin.value = words.join('\n');
        $s[b].value = [...new Set(a)].join('\n');

        $s.wordorigin.value = words[0];
        $s.wordnew.value = '';
    }
    function copy() {
        $s.wordorigin.select();
        document.execCommand('copy');
    }

    const $s = {
        wordorigin: document.getElementById("wordorigin"),
        wordnew: document.getElementById("wordnew"),
        inputwords: document.getElementById("inputwords"),
        btexist: document.getElementById("btexist"),
        btnoexist: document.getElementById("btnoexist"),
        btupdate: document.getElementById("btupdate"),
        wordsorigin: document.getElementById("wordsorigin"),
        wordsexist: document.getElementById("wordsexist"),
        wordsnoexist: document.getElementById("wordsnoexist"),
        copyorigin: document.getElementById("copyorigin"),
        copyexist: document.getElementById("copyexist"),
        copynoexist: document.getElementById("copynoexist"),
    }
    let words = [];
    let wordsexist = [];
    let wordsnoexist = [];

    $s.btexist.onclick = function () {
        if (words.length) {
            update(wordsexist, 'wordsexist');
            copy();
        }
    };
    $s.btnoexist.onclick = function () {
        if (words.length) {
            update(wordsnoexist, 'wordsnoexist');
            copy();
        }
    };
    $s.btupdate.onclick = function () {
        words = [...new Set($s.inputwords.value.split('\n'))];
        wordsexist = [];
        wordsnoexist = [];

        $s.wordsorigin.value = words.join('\n');
        $s.wordsexist.value = '';
        $s.wordsnoexist.value = '';

        $s.wordorigin.value = words[0];
        $s.wordnew.value = '';

        copy();
    };
    $s.copyorigin.onclick = function () {
        $s.wordsorigin.select();
        document.execCommand('copy');
    };
    $s.copyexist.onclick = function () {
        $s.wordsexist.select();
        document.execCommand('copy');
    };
    $s.copynoexist.onclick = function () {
        $s.wordsnoexist.select();
        document.execCommand('copy');
    };
}

// 수정 예정