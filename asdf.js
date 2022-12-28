function updatewords() {
    words = [...new Set([...wordsorigin, ...wordsnew])].sort();
}

function updatejuje() {
    var a = inputdocument.value.match(/(?<=:).+(?=\]\]\[)/)
    var b = inputjuje.value
    juje = !a ? b : b ? b : a;
}

function updatemokrok() {
    showjujejunche.value = jujejunche();
    showjujegim.value = jujegim();
}

function jujejunche() {
    var b = {}; // 셀 안에 든 단어 형태로 저장용
    var e = []; // 앞 글자 저장용
    for (let i = 0; i < words.length; i++) {
        var c = words[i]; // 단어
        var d = c.charAt(); // 앞 글자
        if (b[d]) {
            b[d].push(`|-\n| ${c.length} || [[${c}]]`); // 셀 안에 든 단어 형태로 넣기
        } else {
            b[d] = [`|-\n| ${c.length} || [[${c}]]`]; // 생성 & 셀 안에 든 단어 형태로 만들기
            e.push(d); // 앞 글자 저장
        };
    };
    var f = e.map(function (a) {
        return `=== ${a} ===\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${b[a].join("\n")}\n|}`
    }).join("\n\n"); // 셀 안에 든 단어 형태들을 문자열로 변환 후 앞 글자로 문단 만들고 합치기
    return `[[분류:${juje}]][[분류:전체 단어 목록]]\n{{상위 문서|${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}}}\n== 개요 ==\n[[${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}]] 주제의 전체 단어 목록이다.\n\n== 목록 ==\n\n${f}`; // 문서 형태로 만들기
}

function jujegim() {
    var b = words.filter(function (a) {
        return a.length >= 9
    }); // words 8글자 초과 단어들 가져오기
    var c = b.sort(function (a, b) {
        return b.length - a.length
    }); // 긴 순 정렬
    var d = c.map(function (a) {
        return `|-\n| ${a.length} || [[${a}]]`
    }).join("\n"); // 셀 안에 든 단어 형태로 만든 후 문자열로 변환
    return `[[분류:${juje}]][[분류:긴 단어 목록]]\n{{상위 문서|${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}}}\n== 개요 ==\n[[${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}]] 주제의 긴 단어 목록이다.\n\n== 목록 ==\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${d}\n|}` // 문서 형태로 만들기
}

window.onload = function () {
    inputdocument = document.getElementById("inputdocument"); // 문서 원본 입력
    inputwords = document.getElementById("inputwords"); // 단어 입력
    inputjuje = document.getElementById("inputjuje"); // 주제 입력
    showjujejunche = document.getElementById("showjujejunche"); // 주제 전체 단어 목록 보여주기
    showjujegim = document.getElementById("showjujegim"); // 주제 긴 단어 목록 보여주기
    copyjujejunche = document.getElementById("copyjujejunche"); // 주제 전체 단어 목록 복사 버튼
    copyjujegim = document.getElementById("copyjujegim"); // 주제 긴 단어 목록 복사 버튼

    words = [];
    wordsdocument = [];
    wordsorigin = [];
    wordsnew = [];
    juje = '';

    inputdocument.onkeyup = function () {
        if (inputdocument.value.match(/(?<=\| \[\[).+(?=\]\])/g)) {
            wordsdocument = inputdocument.value.match(/(?<=\|\s\[\[).+(?=\]\])/g).filter(function (a) {
                return a !== '';
            }); // 대괄호 안 문자열을 배열로 만들기
        } else {
            wordsdocument = [];
        }
        wordsorigin = wordsdocument;
        updatewords();
        updatejuje();
        updatemokrok();
    };
    inputwords.onkeyup = function () {
        wordsnew = inputwords.value.split("\n").filter(function (a) {
            return a !== '';
        }) // 문자열을 배열로 만들기
        updatewords();
        updatemokrok();
    };
    inputjuje.onkeyup = function () {
        updatejuje();
        updatemokrok();
    };
    copyjujejunche.onclick = function () {
        showjujejunche.select();
        document.execCommand('copy');
    };
    copyjujegim.onclick = function () {
        showjujegim.select();
        document.execCommand('copy');
    };
}

// 긴 단어 목록 9글자 이상만 가져오기, 중복 단어 거르기
