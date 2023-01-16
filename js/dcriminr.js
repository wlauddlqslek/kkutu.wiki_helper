window.onload = function () {

    function update(a, b) {
        let c = words.shift();
        a.push($s.wordnew.value || c);

        $s.wordsorigin.value = words.join('\n');
        $s[b].value = [...new Set(a)].join('\n');

        $s.wordorigin.value = words[0];
        $s.wordnew.value = '';
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
        if (words.length) update(wordsexist, 'wordsexist');
    };
    $s.btnoexist.onclick = function () {
        if (words.length) update(wordsnoexist, 'wordsnoexist');
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

    console.log(
`
`
    );

    const $MENU = {
        portal: document.getElementById("menubtportal"),
        mrkmaker: document.getElementById("menubtmrkmaker"),
        docmaker: document.getElementById("menubtdocmaker"),
        dcriminr:  document.getElementById("menubtdcriminr")
    }

    $MENU.portal.onclick = function () {
        location.replace('/kkutu.wiki_helper/portal')
    };
    $MENU.mrkmaker.onclick = function () {
        location.replace('/kkutu.wiki_helper/mrkmaker')
    };
    $MENU.docmaker.onclick = function () {
        location.replace('/kkutu.wiki_helper/docmaker')
    };
    $MENU.dcriminr.onclick = function () {
        location.replace('/kkutu.wiki_helper/dcriminr')
    };
}