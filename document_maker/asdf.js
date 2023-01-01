window.onload = function () {
    // 원본 업데이트
    function update() {
        let c = d.ctitlefirst + d.ctitlelast +
        d.cattackSH + d.cattackKT + d.cattackAP + d.cattackGT + d.cattackMT +
        d.cdefenseSH + d.cdefenseKT + d.cdefenseAP + d.cdefenseGT + d.cdefenseMT +
        d.chanbangSH + d.chanbangKT + d.chanbangAP + d.chanbangGT + d.chanbangMT +
        d.clongestSH + d.clongestAP + d.clongestTM
        d.cdollim
        let t = d.tota + d.tsubtitlein + d.tsubtitleout +
        d.tlongestTM + d.tlongestSH + d.tlongestAP
        let w = d.wtitleorigin + d.wtitleforeign + d.wimage + d.wimagedescript + d.wtheme + d.wtitlelength
        let f = d.ftitle +
        d.fhunmin +
        d.fattack + d.fdefense + d.fhanbang+ 
        d.flongestTM + d.fprelongestTM +
        d.flongestSH + d.flongestAP +
        d.fprelongestSH + d.fprelongestAP +
        d.fdollim

        copy.value =  p.title && p.summary
? `[[분류:]]${c}${t}
{{단어${w}
|가미션=1
}}
{{목차}}
${d.summary}

{{특징${f}
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
        if (p.titlelength != 2) return '';

        let cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        let chono = ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]
        let result = "";

        for(let i = 0; i < p.titlelength; i++) {
            let code = p.title.charCodeAt(i) - 44032;
            let acho = cho[Math.floor(code / 588)];
            if (chono.includes(acho)) return '';
            if (code > -1 && code < 11172) result += acho;
            else return '';
        }

        return result;
    }
    // 공격 단어
    function attack(code, name) {
        let c = eval('p.' + code);

        d['c' + code] = c ? `[[분류:공격 단어/한국어 ${name}]]` : '';

        if (p.attack.includes(name)) {
            if (!c) p.attack = p.attack.filter(a => a !== name);
        } else {
            if (c) p.attack.push(name);
        };

        if (p.attackSH || p.attackKT || p.attackAP || p.attackGT || p.attackMT) {
            p.attack = p.attack.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fattack = `\n|공격 단어=한국어 ${p.attack.join('·')}`;
        } else {
            d.fattack = '';
        };
    }
    // 방어 단어
    function defense(code, name) {
        let c = eval('p.' + code);

        d['c' + code] = c ? `[[분류:방어 단어/한국어 ${name}]]` : '';

        if (p.defense.includes(name)) {
            if (!c) p.defense = p.defense.filter(a => a !== name);
        } else {
            if (c) p.defense.push(name);
        };

        if (p.defenseSH || p.defenseKT || p.defenseAP || p.defenseGT || p.defenseMT) {
            p.defense = p.defense.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fdefense = `\n|방어 단어=한국어 ${p.defense.join('·')}`;
        } else {
            d.fdefense = '';
        };
    }
    // 한방 단어
    function hanbang(code, name) {
        let c = eval('p.' + code);
        
        d['c' + code] = c ? `[[분류:한방 단어/한국어 ${name}]]` : '';

        if (p.hanbang.includes(name)) {
            if (!c) p.hanbang = p.hanbang.filter(a => a !== name);
        } else {
            if (c) p.hanbang.push(name);
        };

        if (p.hanbangSH || p.hanbangKT || p.hanbangAP || p.hanbangGT || p.hanbangMT) {
            p.hanbang = p.hanbang.sort((a, b) => modes.indexOf(a) - modes.indexOf(b));
            d.fhanbang = `\n|한방 단어=한국어 ${p.hanbang.join('·')}`;
        } else {
            d.fhanbang = '';
        };
    }
    // 끝말잇기 최장문 업데이트
    function updatelongestSH() {
        if (p.longestSH) {
            d.clongestSH = `[[분류:최장문/한국어 끝말잇기]]`;
            d.tlongestSH = `\n{{최장문|첫 글자=${p.titlefirst}}}`;
            d.flongestSH = `\n|첫 글자=${p.titlefirst}`;
        } else {
            d.clongestSH = '';
            d.tlongestSH = '';
            d.flongestSH = '';
        };
    }
    // 앞말잇기 최장문 업데이트
    function updatelongestAP() {
        if (p.longestAP) {
            d.clongestAP = `[[분류:최장문/한국어 앞말잇기]]`;
            d.tlongestAP = `\n{{최장문|끝 글자=${p.titlelast}}}`;
            d.flongestAP = `\n|끝 글자=${p.titlelast}`;
        } else {
            d.clongestAP = '';
            d.tlongestAP = '';
            d.flongestAP = '';
        };
    }
    // 주제 최장문 업데이트
    function updatelongestTM() {
        if (p.longestTM) {
            d.clongestTM = `[[분류:주제 최장문]]`;
            d.tlongestTM = `\n{{주제 최장문|문서=${p.theme}}}`;
            d.flongestTM = `\n|주제문서=${p.theme}`;
        } else { 
            d.clongestTM = '';
            d.tlongestTM = '';
            d.flongestTM = '';
        }
    }
    // 과거 끝말잇기 최장문 업데이트
    function updateprelongestSH() {
            d.fprelongestSH = p.prelongestSH ? `\n|과거첫 글자=${p.titlefirst}` : '';
    }
    // 과거 앞말잇기 최장문 업데이트
    function updateprelongestAP() {
            d.fprelongestAP = p.prelongestAP ? `\n|과거끝 글자=${p.titlelast}` : '';
    }
    // 과거 주제 최장문 업데이트
    function updateprelongestTM() {
            d.fprelongestTM = p.prelongestTM ? `\n|과거주제문서=${p.theme}` : '';
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
    const cblongestSH = document.getElementById('longestSH');
    const cblongestAP = document.getElementById('longestAP');
    const cblongestTM = document.getElementById('longestTM');
    const cbprelongestSH = document.getElementById('prelongestSH');
    const cbprelongestAP = document.getElementById('prelongestAP');
    const cbprelongestTM = document.getElementById('prelongestTM');
    const selectdelete = document.getElementById("delete");
    const selectmodify = document.getElementById("modify");
    const inputsummary = document.getElementById("summary");
    const copy = document.getElementById("copy");

    let modes = ['끝말잇기', '쿵쿵따', '앞말잇기', '가운뎃말잇기', '끄투'];
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
        clongestSH: '',
        clongestAP: '',
        clongestTM: '',
        cdollim: '',
        tota: '',
        tsubtitlein: '',
        tsubtitleout: '',
        tlongestSH: '',
        tlongestAP: '',
        tlongestTM: '',
        wtitleorigin: '',
        wtitleforeign: '',
        wimage: '',
        wimagedescript: '',
        wtheme: '',
        wtitlelength: '',
        summary: '',
        ftitle: '',
        fhunmin: '',
        fattack: '',
        fdefense: '',
        fhanbang: '',
        flongestSH: '',
        flongestAP: '',
        flongestTM: '',
        fprelongestSH: '',
        fprelongestAP: '',
        fprelongestTM: '',
        fdollim: '',
        ref: '',
    }
    let p = {
        title: '',
        titlefirst: '',
        titlelast: '',
        titlehunmin: '',
        titleorigin: '',
        titleforeign: '',
        subtitlein: '',
        subtitleout: '',
        ota: '',
        category: '',
        theme: '',
        template: '',
        image: '',
        imagedescript: '',
        attack: [],
        attackSH: false,
        attackKT: false,
        attackAP: false,
        attackGT: false,
        attackMT: false,
        defense: [],
        defenseSH: false,
        defenseKT: false,
        defenseAP: false,
        defenseGT: false,
        defenseMT: false,
        hanbang: [],
        hanbangSH: false,
        hanbangKT: false,
        hanbangAP: false,
        hanbangGT: false,
        hanbangMT: false,
        longestSH: false,
        longestAP: false,
        longestTM: false,
        prelongestSH: false,
        prelongestAP: false,
        prelongestTM: false,
        summary: '',
    };

    inputtitle.onkeyup = function () {
        p.title = inputtitle.value;
        p.titlelength = p.title.length;
        p.titlefirst = p.title.charAt();
        p.titlelast = p.title.charAt(p.titlelength - 1);
        p.titlehunmin = hunmin();
        
        d.ctitlefirst = `[[분류:${ro(p.titlefirst)} 시작하는 단어]]`;
        d.ctitlelast = `[[분류:${ro(p.titlelast)} 끝나는 단어]]`;
        d.cdollim = p.titlelength >= 2 && p.titlefirst == p.titlelast ? '[[분류:돌림단어]]' : '';
        d.wtitlelength = `\n|길이=${p.titlelength}`;
        d.ftitle = `\n|시작=${p.titlefirst}|끝=${p.titlelast}|길이=${p.titlelength}`;
        d.fhunmin = p.titlehunmin && `\n|훈민정음=${p.titlehunmin}`;
        d.fdollim = p.titlefirst == p.titlelast ? '\n|돌림단어=O' : '';
        updatelongestSH();
        updatelongestAP();
        updatelongestTM();

        update();
    };
    inputtitleorigin.onkeyup = function () {
        p.titleorigin = inputtitleorigin.value;

        d.wtitleorigin = p.titleorigin && `\n|제목=${p.titleorigin}`;

        update();
    };
    inputtitleforeign.onkeyup = function () {
        p.titleforeign = inputtitleforeign.value;

        d.wtitleforeign = p.titleforeign && `\n|원제=${p.titleforeign}`;

        update();
    };
    inputsubtitlein.onkeyup = function () {
        p.subtitlein = inputsubtitlein.value;

        d.tsubtitlein = p.subtitlein && `\n{{다른 뜻|설명=부제가 포함된 단어|문서=${p.subtitlein}}}`;

        update();
    };
    inputsubtitleout.onkeyup = function () {
        p.subtitleout = inputsubtitleout.value;
        
        d.tsubtitleout = p.subtitleout && `\n{{다른 뜻|설명=부제가 빠진 단어|문서=${p.subtitleout}}}`;

        update();
    };
    inputota.onkeyup = function () {
        p.ota = inputota.value;

        d.tota = p.ota && `\n{{다른 뜻|설명=정확한 표기|문서=${p.ota}}}`;

        update();
    };
    inputimage.onkeyup = function () {
        p.image = inputimage.value;

        d.wimage = p.image && `\n|이미지=${p.image}`;

        update();
    };
    inputimagedescript.onkeyup = function () {
        p.imagedescript = inputimagedescript.value;

        d.wimagedescript = p.imagedescript && `\n|이미지 설명=${p.imagedescript}`;

        update();
    };
    cbattackSH.onclick = function () {
        p.attackSH = cbattackSH.checked;

        attack('attackSH', '끝말잇기');

        update();
    };
    cbattackKT.onclick = function () {
        p.attackKT = cbattackKT.checked;

        attack('attackKT', '쿵쿵따');

        update();
    };
    cbattackAP.onclick = function () {
        p.attackAP = cbattackAP.checked;

        attack('attackAP', '앞말잇기');

        update();
    };
    cbattackGT.onclick = function () {
        p.attackGT = cbattackGT.checked;

        attack('attackGT', '가운뎃말잇기');

        update();
    };
    cbattackMT.onclick = function () {
        p.attackMT = cbattackMT.checked;

        attack('attackMT', '끄투');

        update();
    };
    cbdefenseSH.onclick = function () {
        p.defenseSH = cbdefenseSH.checked;
        
        defense('defenseSH', '끝말잇기');
        
        update();
    };
    cbdefenseKT.onclick = function () {
        p.defenseKT = cbdefenseKT.checked;
        
        defense('defenseKT', '쿵쿵따');
        
        update();
    };
    cbdefenseAP.onclick = function () {
        p.defenseAP = cbdefenseAP.checked;
        
        defense('defenseAP', '앞말잇기');
        
        update();
    };
    cbdefenseGT.onclick = function () {
        p.defenseGT = cbdefenseGT.checked;
        
        defense('defenseGT', '가운뎃말잇기');
        
        update();
    };
    cbdefenseMT.onclick = function () {
        p.defenseMT = cbdefenseMT.checked;
        
        defense('defenseMT', '끄투');
        
        update();
    };
    cbhanbangSH.onclick = function () {
        p.hanbangSH = cbhanbangSH.checked;
        
        hanbang('hanbangSH', '끝말잇기');
        
        update();
    };
    cbhanbangKT.onclick = function () {
        p.hanbangKT = cbhanbangKT.checked;
        
        hanbang('hanbangKT', '쿵쿵따');
        
        update();
    };
    cbhanbangAP.onclick = function () {
        p.hanbangAP = cbhanbangAP.checked;
        
        hanbang('hanbangAP', '앞말잇기');
        
        update();
    };
    cbhanbangGT.onclick = function () {
        p.hanbangGT = cbhanbangGT.checked;
        
        hanbang('hanbangGT', '가운뎃말잇기');
        
        update();
    };
    cbhanbangMT.onclick = function () {
        p.hanbangMT = cbhanbangMT.checked;
        
        hanbang('hanbangMT', '끄투');
        
        update();
    };
    cblongestSH.onclick = function () {
        p.longestSH = cblongestSH.checked;
        
        updatelongestSH();
        
        update();
    }
    cblongestAP.onclick = function () {
        p.longestAP = cblongestAP.checked;
        
        updatelongestAP();
        
        update();
    }
    cblongestTM.onclick = function () {
        p.longestTM = cblongestTM.checked;
        
        updatelongestTM();
        
        update();
    }
    cbprelongestSH.onclick = function () {
        p.prelongestSH = cbprelongestSH.checked;
        
        updateprelongestSH();
        
        update();
    }
    cbprelongestAP.onclick = function () {
        p.prelongestAP = cbprelongestAP.checked;
        
        updateprelongestAP();
        
        update();
    }
    cbprelongestTM.onclick = function () {
        p.prelongestTM = cbprelongestTM.checked;
        
        updateprelongestTM();
        
        update();
    }
    inputsummary.onkeyup = function () {
        p.summary = inputsummary.value;

        d.summary = p.summary;
        d.ref = p.summary.includes('</ref>') ? '\n{{각주}}' : '';

        update();
    };

    console.log(
`
`
    );
}