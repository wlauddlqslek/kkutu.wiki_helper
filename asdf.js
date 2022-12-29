window.onload = function () {

    const inputdocument = document.getElementById("inputdocument"); // 문서 원본 입력
    const inputwords = document.getElementById("inputwords"); // 단어 입력
    const inputjuje = document.getElementById("inputjuje"); // 주제 입력
    const showjujejunche = document.getElementById("showjujejunche"); // 주제 전체 단어 목록 보여주기
    const showjujegim = document.getElementById("showjujegim"); // 주제 긴 단어 목록 보여주기
    const copyjujejunche = document.getElementById("copyjujejunche"); // 주제 전체 단어 목록 복사 버튼
    const copyjujegim = document.getElementById("copyjujegim"); // 주제 긴 단어 목록 복사 버튼

    // words 중복 제거 & 가나다순 정렬
    function updatewords() {
        words = [...new Set([...wordsorigin, ...wordsnew])] // 중복 제거
        .filter(a => a !== '') // 비었을 시 거르기
        .sort(); // 가나다순 정렬
    }
    // juje 가져오기
    function updatejuje() {
        var a = inputdocument.value.match(/(?<=:).+(?=\]\]\[)/);
        var b = inputjuje.value;

        juje = !a ? b : b ? b : a;
    }
    // 목록 업데이트
    function updatemokrok() {
        if (words.length) {
            showjujejunche.value = jujejunche();
            showjujegim.value = jujegim();
        } else {
            showjujejunche.value = ""
            showjujegim.value = ""
        }
    }
    // 주제 전체 단어 목록 만들기
    function jujejunche() {
        var b = {}; // 셀 안에 든 단어 형태
        var e = []; // 앞 글자

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

        var f = e
        .map(a => `=== ${a} ===\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${b[a].join("\n")}\n|}`) // 앞 글자로 문단 만들기
        .join("\n\n"); // 문자열로 변환

        return `[[분류:${juje}]][[분류:전체 단어 목록]]\n{{상위 문서|${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}}}\n== 개요 ==\n[[${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}]] 주제의 전체 단어 목록이다.\n\n== 목록 ==\n\n${f}`; // 문서 형태로 만들기
    }
    // 주제 긴 단어 목록 만들기
    function jujegim() {
        var a = words
        .filter(a => a.length >= 9) // 9글자 이상 단어 가져오기
        .sort((a, b) => b.length - a.length) // 긴 순 정렬
        .map(a => `|-\n| ${a.length} || [[${a}]]`) // 셀 안에 든 단어 형태로 만들기
        .join("\n"); // 문자열로 변환

        return `[[분류:${juje}]][[분류:긴 단어 목록]]\n{{상위 문서|${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}}}\n== 개요 ==\n[[${juje == '분홍꽃' ? '분홍꽃(주제)|분홍꽃' : juje}]] 주제의 긴 단어 목록이다.\n\n== 목록 ==\n{| class="wikitable sortable" style="text-align: center;"\n! width="50" | 길이 !! 단어\n${a}\n|}` // 문서 형태로 만들기
    }

    words = [];
    wordsdocument = [];
    wordsorigin = [];
    wordsnew = [];
    juje = '';

    inputdocument.onkeyup = function () {
        var a = inputdocument.value.match(/(?<=\| \[\[).+(?=\]\])/g);

        wordsdocument = a ? a : []; // 대괄호 안 문자열이 있을 시 대괄호 안 문자열을 배열로 만들기
        wordsorigin = wordsdocument;

        updatewords();
        updatejuje();
        updatemokrok();
    };
    inputwords.onkeyup = function () {
        wordsnew = inputwords.value.split("\n") // 문자열을 배열로 만들기

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