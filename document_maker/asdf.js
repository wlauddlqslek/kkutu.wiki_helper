window.onload = function () {
    // 원본 업데이트
    function update() {
        copy.value =  title && summary
? `[[분류:]]${d.ctitlefirst}${d.ctitlelast}${d.cattackSH}${d.cattackKT}${d.cattackAP}${d.cattackGT}${d.cattackMT}${d.cdefenseSH}${d.cdefenseKT}${d.cdefenseAP}${d.cdefenseGT}${d.cdefenseMT}${d.chanbangSH}${d.chanbangKT}${d.chanbangAP}${d.chanbangGT}${d.chanbangMT}
${d.cdollim}${d.tota}${d.tsubstitlein}${d.tsubstitleout}
{{단어${d.wtitleorigin}${d.wtitleforeign}${d.wimage}${d.wimagedescript}
|주제=${d.wtitlelength}
|가미션=1
}}
{{목차}}
${d.summary}

{{특징${d.ftitle}${d.fhunmin}${d.fattack}${d.fdefense}${d.fhanbang}${d.fdollim}
}}
== 둘러보기 ==
{{}}${d.ref}`
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
    // 공격 단어
    function attack(code, name) {
        let c = eval(code);

        d['c' + code] = c ? `[[분류:공격 단어/한국어 ${name}]]` : '';

        if (attacks.includes(name)) {
            if (!c) attacks = attacks.filter(a => a !== name);
        } else {
            if (c) attacks.push(name);
        };

        if (attackSH || attackKT || attackAP || attackGT || attackMT) {
            attacks = attacks.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fattack = `\n|공격 단어=한국어 ${attacks.join('·')}`;
        } else {
            d.fattack = '';
        };
    }
    // 방어 단어
    function defense(code, name) {
        let c = eval(code);

        d['c' + code] = c ? `[[분류:방어 단어/한국어 ${name}]]` : '';

        if (defenses.includes(name)) {
            if (!c) defenses = defenses.filter(a => a !== name);
        } else {
            if (c) defenses.push(name);
        };

        if (defenseSH || defenseKT || defenseAP || defenseGT || defenseMT) {
            defenses = defenses.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fdefense = `\n|방어 단어=한국어 ${defenses.join('·')}`;
        } else {
            d.fdefense = '';
        };
    }
    // 한방 단어
    function hanbang(code, name) {
        let c = eval(code);
        
        d['c' + code] = c ? `[[분류:한방 단어/한국어 ${name}]]` : '';

        if (hanbangs.includes(name)) {
            if (!c) hanbangs = hanbangs.filter(a => a !== name);
        } else {
            if (c) hanbangs.push(name);
        };

        if (hanbangSH || hanbangKT || hanbangAP || hanbangGT || hanbangMT) {
            hanbangs = hanbangs.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fhanbang = `\n|한방 단어=한국어 ${hanbangs.join('·')}`;
        } else {
            d.fhanbang = '';
        };
    }
    

    const inputtitle = document.getElementById("title");
    const inputtitleorigin = document.getElementById("titleorigin");
    const inputtitleforeign = document.getElementById("titleforeign");
    const inputsubtitlein = document.getElementById("subtitlein");
    const inputsubtitleout = document.getElementById("subtitleout");
    const inputota = document.getElementById("ota");
    const inputcategory = document.getElementById("category");
    const inputtheme = document.getElementById("theme");
    const inputtemplate = document.getElementById("template");
    const inputimage = document.getElementById("image");
    const inputimagedescript = document.getElementById("imagedescript");
    const cbattackSH = document.getElementById("attackSH");
    const cbattackKT = document.getElementById("attackKT");
    const cbattackMT = document.getElementById("attackMT");
    const cbattackGT = document.getElementById("attackGT");
    const cbattackAP = document.getElementById("attackAP");
    const cbdefenseSH = document.getElementById("defenseSH");
    const cbdefenseKT = document.getElementById("defenseKT");
    const cbdefenseMT = document.getElementById("defenseMT");
    const cbdefenseGT = document.getElementById("defenseGT");
    const cbdefenseAP = document.getElementById("defenseAP");
    const cbhanbangSH = document.getElementById("hanbangSH");
    const cbhanbangKT = document.getElementById("hanbangKT");
    const cbhanbangMT = document.getElementById("hanbangMT");
    const cbhanbangGT = document.getElementById("hanbangGT");
    const cbhanbangAP = document.getElementById("hanbangAP");
    const selectdelete = document.getElementById("delete");
    const selectmodify = document.getElementById("modify");
    const inputsummary = document.getElementById("summary");
    const copy = document.getElementById("copy");

    let d = {
        ctitlefirst: '',
        ctitlelast: '',
        cattackSH: '',
        cattackKT: '',
        cattackMT: '',
        cattackGT: '',
        cattackAP: '',
        cdefenseSH: '',
        cdefenseKT: '',
        cdefenseMT: '',
        cdefenseGT: '',
        cdefenseAP: '',
        chanbangSH: '',
        chanbangKT: '',
        chanbangMT: '',
        chanbangGT: '',
        chanbangAP: '',
        cdollim: '',
        tota: '',
        tsubstitlein: '',
        tsubstitleout: '',
        wtitleorigin: '',
        wtitleforeign: '',
        wimage: '',
        wimagedescript: '',
        wtitlelength: '',
        summary: '',
        ftitle: '',
        fhunmin: '',
        fattack: '',
        fdefense: '',
        fhanbang: '',
        fdollim: '',
        ref: '',
    }
    let attacks = [];
    let defenses = [];
    let hanbangs = [];
    let modes = ['끝말잇기', '쿵쿵따', '앞말잇기', '가운뎃말잇기', '끄투']

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
    let attackSH = '';
    let attackKT = '';
    let attackAP = '';
    let attackGT = '';
    let attackMT = '';
    let defenseSH = '';
    let defenseKT = '';
    let defenseAP = '';
    let defenseGT = '';
    let defenseMT = '';
    let hanbangSH = '';
    let hanbangKT = '';
    let hanbangAP = '';
    let hanbangGT = '';
    let hanbangMT = '';
    let summary = '';

    inputtitle.onkeyup = function () {
        title = inputtitle.value;
        titlelength = title.length;
        titlefirst = title.charAt();
        titlelast = title.charAt(titlelength - 1);
        titlehunmin = hunmin();
        
        d.ctitlefirst = `[[분류:${ro(titlefirst)} 시작하는 단어]]`;
        d.ctitlelast = `[[분류:${ro(titlelast)} 끝나는 단어]]`;
        d.cdollim = titlefirst == titlelast ? '[[분류:돌림단어]]' : '';
        d.wtitlelength = `\n|길이=${titlelength}`;
        d.ftitle = `\n|시작=${titlefirst}|끝=${titlelast}|길이=${titlelength}`;
        d.fhunmin = titlehunmin && `\n|훈민정음=${titlehunmin}`;
        d.fdollim = titlefirst == titlelast ? '\n|돌림단어=O' : '';

        update();
    };
    inputtitleorigin.onkeyup = function () {
        titleorigin = inputtitleorigin.value;

        d.wtitleorigin = titleorigin && `\n|제목=${titleorigin}`;

        update();
    };
    inputtitleforeign.onkeyup = function () {
        titleforeign = inputtitleforeign.value;

        d.wtitleforeign = titleforeign && `\n|원제=${titleforeign}`;

        update();
    };
    inputsubtitlein.onkeyup = function () {
        subtitlein = inputsubtitlein.value;

        d.subtitlein = subtitlein && `\n{{다른 뜻|설명=부제가 포함된 단어|문서=${subtitlein}}}`;

        update();
    };
    inputsubtitleout.onkeyup = function () {
        subtitleout = inputsubtitleout.value;
        
        d.substitleout = subtitleout && `\n{{다른 뜻|설명=부제가 빠진 단어|문서=${subtitleout}}}`;

        update();
    };
    inputota.onkeyup = function () {
        ota = inputota.value;

        d.tota = ota && `\n{{다른 뜻|설명=정확한 표기|문서=${ota}}}`;

        update();
    };
    inputimage.onkeyup = function () {
        image = inputimage.value;

        d.wimage = image && `\n|이미지=${image}`;

        update();
    };
    inputimagedescript.onkeyup = function () {
        imagedescript = inputimagedescript.value;

        d.wimagedescript = imagedescript && `\n|이미지 설명=${imagedescript}`;

        update();
    };
    cbattackSH.onclick = function () {
        attackSH = cbattackSH.checked;

        attack('attackSH', '끝말잇기');

        update();
    };
    cbattackKT.onclick = function () {
        attackKT = cbattackKT.checked;

        attack('attackKT', '쿵쿵따');

        update();
    };
    cbattackAP.onclick = function () {
        attackAP = cbattackAP.checked;

        attack('attackAP', '앞말잇기');

        update();
    };
    cbattackGT.onclick = function () {
        attackGT = cbattackGT.checked;

        attack('attackGT', '가운뎃말잇기');

        update();
    };
    cbattackMT.onclick = function () {
        attackMT = cbattackMT.checked;

        attack('attackMT', '끄투');

        update();
    };
    cbdefenseSH.onclick = function () {
        defenseSH = cbdefenseSH.checked;
        
        defense('defenseSH', '끝말잇기');
        
        update();
    };
    cbdefenseKT.onclick = function () {
        defenseKT = cbdefenseKT.checked;
        
        defense('defenseKT', '쿵쿵따');
        
        update();
    };
    cbdefenseAP.onclick = function () {
        defenseAP = cbdefenseAP.checked;
        
        defense('defenseAP', '앞말잇기');
        
        update();
    };
    cbdefenseGT.onclick = function () {
        defenseGT = cbdefenseGT.checked;
        
        defense('defenseGT', '가운뎃말잇기');
        
        update();
    };
    cbdefenseMT.onclick = function () {
        defenseMT = cbdefenseMT.checked;
        
        defense('defenseMT', '끄투');
        
        update();
    };
    cbhanbangSH.onclick = function () {
        hanbangSH = cbhanbangSH.checked;
        
        hanbang('hanbangSH', '끝말잇기');
        
        update();
    };
    cbhanbangKT.onclick = function () {
        hanbangKT = cbhanbangKT.checked;
        
        hanbang('hanbangKT', '쿵쿵따');
        
        update();
    };
    cbhanbangAP.onclick = function () {
        hanbangAP = cbhanbangAP.checked;
        
        hanbang('hanbangAP', '앞말잇기');
        
        update();
    };
    cbhanbangGT.onclick = function () {
        hanbangGT = cbhanbangGT.checked;
        
        hanbang('hanbangGT', '가운뎃말잇기');
        
        update();
    };
    cbhanbangMT.onclick = function () {
        hanbangMT = cbhanbangMT.checked;
        
        hanbang('hanbangMT', '끄투');
        
        update();
    };
        
        
    inputsummary.onkeyup = function () {
        summary = inputsummary.value;

        d.summary = summary;
        d.ref = summary.includes('</ref>') ? '\n{{각주}}' : '';

        update();
    };

    console.log(
`
`
    );
}