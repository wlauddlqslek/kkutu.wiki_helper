window.onload = function () {
    function update() {
        copy.value =  title && summary
? `[[분류:]][[분류:${ro(titlefirst)} 시작하는 단어]][[분류:${ro(titlelast)} 끝나는 단어]]${ota && `
{{다른 뜻|설명=정확한 표기|문서=${ota}}}`}${subtitlein && `
{{다른 뜻|설명=부제가 포함된 단어|문서=${subtitlein}}}`}${subtitleout && `
{{다른 뜻|설명=부제가 빠진 단어|문서=${subtitleout}}}`}
{{단어${titleorigin && `
|제목=${titleorigin}`}${titleforeign && `
|원제=${titleforeign}`}${image && `
|이미지=${image}`}${imagedescript && `
|이미지 설명=${imagedescript}`}
|주제=
|길이=${titlelength}
|가미션=1
}}
{{목차}}
${summary}

{{특징
|시작=${titlefirst}|끝=${titlelast}|길이=${titlelength}${titlehunmin && `
|훈민정음=${titlehunmin}`}
}}
== 둘러보기 ==
{{}}`
: '';
    }

    // 로 / 으로
    function ro(a) {
        let b = a.charCodeAt(0) - 44032

        if (b % 28 && (b - 8) % 28) {
          return `${a}으로`;
        };

        return `${a}로`;
    }
    // 자음 변환
    function hunmin() {
        if (titlelength != 2) return '';

        let cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        let chono = ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]
        let result = "";

        for(let i = 0; i < titlelength; i++) {
            let code = title.charCodeAt(i) - 44032;
            let acho = cho[Math.floor(code / 588)];
            if (chono.includes(acho)) return '';
            if (code > -1 && code < 11172) result += acho;
            else return '';
        }

        return result;
    }

    const inputtitle = document.getElementById("title") ;
    const inputtitleorigin = document.getElementById("titleorigin") ;
    const inputtitleforeign = document.getElementById("titleforeign") ;
    const inputsubtitlein = document.getElementById("subtitlein") ;
    const inputsubtitleout = document.getElementById("subtitleout") ;
    const inputota = document.getElementById("ota") ;
    const inputcategory = document.getElementById("category") ;
    const inputtheme = document.getElementById("theme") ;
    const inputtemplate = document.getElementById("template") ;
    const inputimage = document.getElementById("image") ;
    const inputimagedescript = document.getElementById("imagedescript") ;
    const selectdelete = document.getElementById("delete") ;
    const selectmodify = document.getElementById("modify") ;
    const inputsummary = document.getElementById("summary") ;
    const copy = document.getElementById("copy");

    let title = '';
    let titlefirst = '';
    let titlelength = '';
    let titlehunmin = '';
    let titleorigin = '';
    let titleforeign = '';
    let subtitlein = '';
    let subtitleout = '';
    let ota = '';
    let image = '';
    let imagedescript = '';
    let summary = '';

    inputtitle.onkeyup = function () {
        title = inputtitle.value
        titlelength = title.length
        titlefirst = title.charAt()
        titlelast = title.charAt(titlelength - 1);
        titlehunmin = hunmin()

        update();
    };
    inputtitleorigin.onkeyup = function () {
        titleorigin = inputtitleorigin.value

        update();
    };
    inputtitleforeign.onkeyup = function () {
        titleforeign = inputtitleforeign.value

        update();
    };
    inputsubtitlein.onkeyup = function () {
        subtitlein = inputsubtitlein.value

        update();
    };
    inputsubtitleout.onkeyup = function () {
        subtitleout = inputsubtitleout.value

        update();
    };
    inputota.onkeyup = function () {
        ota = inputota.value

        update();
    };
    inputimage.onkeyup = function () {
        image = inputimage.value

        update();
    };
    inputimagedescript.onkeyup = function () {
        imagedescript = inputimagedescript.value

        update();
    };
    inputsummary.onkeyup = function () {
        summary = inputsummary.value

        update();
    };

    console.log(
`
`
    );
}