window.onload = function () {
    // 원본 업데이트
    function update() {
        let theme = p.theme;
        let category = p.category;

        if (!p.title || arrmt(theme) || !p.summary) {
            $s.copy.value = '';
            console.log('단어와 주제와 내용은 필수입니다.');
            return;
        };
        if (!arrmt(category) && (category.length < theme.length)) {
            $s.copy.value = '';
            console.log('분류는 주제의 개수 이상이어야 합니다. 분류가 주제라면 분류에 주제를 쓰십시오.');
            return;
        };

        $s.copy.value =
`${Object.values(d.c).join('')}${Object.values(d.t).join('')}
{{단어${Object.values(d.w).join('')}
|가미션=1
}}
{{목차}}
${d.summary}

{{특징${Object.values(d.f).join('')}
}}${d.template}${d.ref}`
    }
    // 배열 값이 비었는지 확인
    function arrmt(a) {
        let len = a.length;

        return !len || (len == 1 && a[0] == '')
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
        let title = p.title
        let len = title.length;
        if (len != 2) return '';
        const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        const CHONO = ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"]
        let result = "";

        for(let i = 0; i < len; i++) {
            let code = title.charCodeAt(i) - 44032;
            let cho = CHO[Math.floor(code / 588)];
            if (CHONO.includes(cho)) return '';
            if (code > -1 && code < 11172) result += cho;
            else return '';
        }

        return result;
    }
    // 분류 업데이트
    function updatecategory() {
        let theme = p.theme;
        let category = p.category;

        d.c.category = arrmt(category)
        ? theme.map(a => `[[분류:${a}]]`).join('')
        : category.map(a => `[[분류:${a}]]`).join('');
    }
    // 공격 단어
    function updateattack(code, name) {
        const pcode = p[code];
        const MO = MODES;
        let attack = p.attack;

        d.c[code] = pcode ? `[[분류:공격 단어/한국어 ${name}]]` : '';

        if (attack.includes(name)) {
            if (!pcode) attack = attack.filter(a => a !== name);
        } else {
            if (pcode) attack.push(name);
        };

        if (p.attackSH || p.attackKT || p.attackAP || p.attackGT || p.attackMT) {
            attack = attack.sort((a, b) => MO.indexOf(a) - MO.indexOf(b));
            d.f.attack = `\n|공격 단어=한국어 ${attack.join('·')}`;
        } else {
            d.f.attack = '';
        };

        p.attack = attack;
    }
    // 방어 단어
    function updatedefense(code, name) {
        const pcode = p[code];
        const MO = MODES;
        let defense = p.defense;

        d.c[code] = pcode ? `[[분류:방어 단어/한국어 ${name}]]` : '';

        if (defense.includes(name)) {
            if (!pcode) defense = defense.filter(a => a !== name);
        } else {
            if (pcode) defense.push(name);
        };

        if (p.defenseSH || p.defenseKT || p.defenseAP || p.defenseGT || p.defenseMT) {
            defense = defense.sort((a, b) => MO.indexOf(a) - MO.indexOf(b));
            d.f.defense = `\n|방어 단어=한국어 ${defense.join('·')}`;
        } else {
            d.f.defense = '';
        };

        p.defense = defense;
    }
    // 한방 단어
    function updatehanbang(code, name) {
        const pcode = p[code];
        const MO = MODES;
        let hanbang = p.hanbang;

        d.c[code] = pcode ? `[[분류:한방 단어/한국어 ${name}]]` : '';

        if (hanbang.includes(name)) {
            if (!pcode) hanbang = hanbang.filter(a => a !== name);
        } else {
            if (pcode) hanbang.push(name);
        };

        if (p.hanbangSH || p.hanbangKT || p.hanbangAP || p.hanbangGT || p.hanbangMT) {
            hanbang = hanbang.sort((a, b) => MO.indexOf(a) - MO.indexOf(b));
            d.f.hanbang = `\n|한방 단어=한국어 ${hanbang.join('·')}`;
        } else {
            d.f.hanbang = '';
        };

        p.hanbang = hanbang;
    }
    // 끝말잇기 최장문 업데이트
    function updatelongestSH() {
        if (p.longestSH) {
            let first = p.titlefirst;
    
            d.c.longestSH = `[[분류:최장문/한국어 끝말잇기]]`;
            d.t.longestSH = `\n{{최장문|첫 글자=${first}}}`;
            d.f.longestSH = `\n|첫 글자=${first}`;
        } else {
            d.c.longestSH = '';
            d.t.longestSH = '';
            d.f.longestSH = '';
        };
    }
    // 앞말잇기 최장문 업데이트
    function updatelongestAP() {
        if (p.longestAP) {
            let last = p.titlelast;
    
            d.c.longestAP = `[[분류:최장문/한국어 앞말잇기]]`;
            d.t.longestAP = `\n{{최장문|끝 글자=${last}}}`;
            d.f.longestAP = `\n|끝 글자=${last}`;
        } else {
            d.c.longestAP = '';
            d.t.longestAP = '';
            d.f.longestAP = '';
        };
    }
    // 주제 최장문 업데이트
    function updatelongestTM() {
        let theme = p.longestTM;

        if (!arrmt(theme)) {
            d.c.longestTM = `[[분류:주제 최장문]]`;
            d.t.longestTM = theme.map(a => `\n{{주제 최장문|문서=${a}}}`).join('');
            d.f.longestTM = `\n|주제문서=${theme[0]}` // `\n|주제문서=${p.longestTM.map(a => `${a}`).join(']], [[')}`;
        } else { 
            d.c.longestTM = '';
            d.t.longestTM = '';
            d.f.longestTM = ''; // 그런 경우는 없겠지만 틀:특징에 주제 최장문 2개 다는 법을 모색
        }
    }
    // 끝말잇기 유일한 단어 업데이트
    function updateonlySH() {
        if (p.onlySH) {
            let first = p.titlefirst;
    
            d.c.onlySH = `[[분류:유일한 단어/한국어 끝말잇기]]`;
            d.t.onlySH = `\n{{유일한 단어|첫 글자=${first}}}`;
            d.f.onlySH = `\n|유일첫 글자=${first}`;
        } else {
            d.c.onlySH = '';
            d.t.onlySH = '';
            d.f.onlySH = '';
        };
    }
    // 앞말잇기 유일한 단어 업데이트
    function updateonlyAP() {
        if (p.onlyAP) {
            let last = p.titlelast;
    
            d.c.onlyAP = `[[분류:유일한 단어/한국어 앞말잇기]]`;
            d.t.onlyAP = `\n{{유일한 단어|끝 글자=${last}}}`;
            d.f.onlyAP = `\n|유일끝 글자=${last}`;
        } else {
            d.c.onlyAP = '';
            d.t.onlyAP = '';
            d.f.onlyAP = '';
        };
    }

    const $s = {
        inputtitle: document.getElementById("title"),
        inputtitleorigin: document.getElementById("titleorigin"),
        inputtitleforeign: document.getElementById("titleforeign"),
        inputsubtitlein: document.getElementById("subtitlein"),
        inputsubtitleout: document.getElementById("subtitleout"),
        inputota: document.getElementById("ota"),
        inputcategory: document.getElementById("category"),
        inputtheme: document.getElementById("theme"),
        inputtemplate: document.getElementById("template"),
        inputimage: document.getElementById("image"),
        inputimagedescript: document.getElementById("imagedescript"),
        cbjunche: document.getElementById("junche"),
        cbattackSH: document.getElementById("attackSH"),
        cbattackKT: document.getElementById("attackKT"),
        cbattackMT: document.getElementById("attackMT"),
        cbattackGT: document.getElementById("attackGT"),
        cbattackAP: document.getElementById("attackAP"),
        cbdefenseSH: document.getElementById("defenseSH"),
        cbdefenseKT: document.getElementById("defenseKT"),
        cbdefenseMT: document.getElementById("defenseMT"),
        cbdefenseGT: document.getElementById("defenseGT"),
        cbdefenseAP: document.getElementById("defenseAP"),
        cbhanbangSH: document.getElementById("hanbangSH"),
        cbhanbangKT: document.getElementById("hanbangKT"),
        cbhanbangMT: document.getElementById("hanbangMT"),
        cbhanbangGT: document.getElementById("hanbangGT"),
        cbhanbangAP: document.getElementById("hanbangAP"),
        cblongestSH: document.getElementById('longestSH'),
        cblongestAP: document.getElementById('longestAP'),
        inputlongestTM: document.getElementById('longestTM'),
        cbonlySH: document.getElementById('onlySH'),
        cbonlyAP: document.getElementById('onlyAP'),
        selectdelete: document.getElementById("delete"),
        selectmodify: document.getElementById("modify"),
        inputsummary: document.getElementById("summary"),
        copy: document.getElementById("copy"),
    }
    const MODES = [
        '끝말잇기',
        '쿵쿵따',
        '앞말잇기',
        '가운뎃말잇기',
        '끄투'
    ];
    let d = {
        c: {
            category: '',
            titlefirst: '',
            titlelast: '',
            attackSH: '',
            attackKT: '',
            attackAP: '',
            attackGT: '',
            attackMT: '',
            defenseSH: '',
            defenseKT: '',
            defenseAP: '',
            defenseGT: '',
            defenseMT: '',
            hanbangSH: '',
            hanbangKT: '',
            hanbangAP: '',
            hanbangGT: '',
            hanbangMT: '',
            longestSH: '',
            longestAP: '',
            longestTM: '',
            onlySH: '',
            onlyAP: '',
            dollim: '',
            junche: '',
        },
        t: {
        ota: '',
        subtitlein: '',
        subtitleout: '',
        longestTM: '',
        longestSH: '',
        longestAP: '',
        onlySH: '',
        onlyAP: '',
        junche: '',
        },
        w: {
            titleorigin: '',
            titleforeign: '',
            image: '',
            imagedescript: '',
            theme: '',
            titlelength: '',
        },
        summary: '== 개요 ==',
        f: {
            title: '',
            hunmin: '',
            attack: '',
            defense: '',
            hanbang: '',
            longestTM: '',
            longestSH: '',
            longestAP: '',
            onlySH: '',
            onlyAP: '',
            dollim: '',
            junche: '',
        },
        template: '',
        ref: '',
    };
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
        category: [],
        theme: [],
        template: '',
        image: '',
        imagedescript: '',
        junche: false,
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
        longestTM: [],
        onlySH: false,
        onlyAP: false,
        summary: '== 개요 ==',
    };

    $s.inputtitle.onkeyup = function () {
        p.title = $s.inputtitle.value;
        p.titlelength = p.title.length;
        p.titlefirst = p.title.charAt();
        p.titlelast = p.title.charAt(p.titlelength - 1);
        p.titlehunmin = hunmin();
        
        d.c.titlefirst = `[[분류:${ro(p.titlefirst)} 시작하는 단어]]`;
        d.c.titlelast = `[[분류:${ro(p.titlelast)} 끝나는 단어]]`;
        d.c.dollim = p.titlelength >= 2 && p.titlefirst == p.titlelast ? '[[분류:돌림단어]]' : '';
        d.w.titlelength = `\n|길이=${p.titlelength}`;
        d.f.title = `\n|시작=${p.titlefirst}|끝=${p.titlelast}|길이=${p.titlelength}`;
        d.f.hunmin = p.titlehunmin && `\n|훈민정음=${p.titlehunmin}`;
        d.f.dollim = p.titlefirst == p.titlelast ? '\n|돌림단어=O' : '';
        updatelongestSH();
        updatelongestAP();
        updateonlySH();
        updateonlyAP();

        update();
    };
    $s.inputtitleorigin.onkeyup = function () {
        p.titleorigin = $s.inputtitleorigin.value;

        d.w.titleorigin = p.titleorigin && `\n|제목=${p.titleorigin}`;

        update();
    };
    $s.inputtitleforeign.onkeyup = function () {
        p.titleforeign = $s.inputtitleforeign.value;

        d.w.titleforeign = p.titleforeign && `\n|원제=${p.titleforeign}`;

        update();
    };
    $s.inputsubtitlein.onkeyup = function () {
        p.subtitlein = $s.inputsubtitlein.value;

        d.t.subtitlein = p.subtitlein && `\n{{다른 뜻|설명=부제가 포함된 단어|문서=${p.subtitlein}}}`;

        update();
    };
    $s.inputsubtitleout.onkeyup = function () {
        p.subtitleout = $s.inputsubtitleout.value;
        
        d.t.subtitleout = p.subtitleout && `\n{{다른 뜻|설명=부제가 빠진 단어|문서=${p.subtitleout}}}`;

        update();
    };
    $s.inputota.onkeyup = function () {
        p.ota = $s.inputota.value;

        d.t.ota = p.ota && `\n{{다른 뜻|설명=정확한 표기|문서=${p.ota}}}`;

        update();
    };
    $s.inputcategory.onkeyup = function () {
        p.category = [...new Set($s.inputcategory.value.split(', '))];

        updatecategory();
        
        update();
    };
    $s.inputtheme.onkeyup = function () {
        p.theme = [...new Set($s.inputtheme.value.split(', '))];

        updatecategory();
        d.w.theme = p.theme.map(a => {
            let b = p.theme.indexOf(a)
            return `\n|주제${ b ? b + 1 : ''}=${a}`
        }).join('');

        update();
    };
    $s.inputtemplate.onkeyup = function () {
        p.template = [...new Set($s.inputtemplate.value.split(', '))];

        d.template = !arrmt(p.template)
        ? '\n== 둘러보기 ==' + p.template.map(a => `\n{{${a}}}`).join('')
        : '';

        update();
    }
    $s.inputimage.onkeyup = function () {
        p.image = $s.inputimage.value;

        d.w.image = p.image && `\n|이미지=${p.image}`;

        update();
    };
    $s.inputimagedescript.onkeyup = function () {
        p.imagedescript = $s.inputimagedescript.value;

        d.w.imagedescript = p.imagedescript && `\n|이미지 설명=${p.imagedescript}`;

        update();
    };
    $s.cbjunche.onclick = function () {
        p.junche = $s.cbjunche.checked;

        if (p.junche) {
            d.c.junche = '[[분류:전체에서만 쓸 수 있는 단어]]'
            d.t.junche = '\n{{전체에서만 쓸 수 있는 단어}}'
            d.f.junche = '\n|전체=O'
        } else {
            d.c.junche = '';
            d.t.junche = '';
            d.f.junche = '';
        }

        update();
    };
    $s.cbattackSH.onclick = function () {
        p.attackSH = $s.cbattackSH.checked;

        updateattack('attackSH', '끝말잇기');

        update();
    };
    $s.cbattackKT.onclick = function () {
        p.attackKT = $s.cbattackKT.checked;

        updateattack('attackKT', '쿵쿵따');

        update();
    };
    $s.cbattackAP.onclick = function () {
        p.attackAP = $s.cbattackAP.checked;

        updateattack('attackAP', '앞말잇기');

        update();
    };
    $s.cbattackGT.onclick = function () {
        p.attackGT = $s.cbattackGT.checked;

        updateattack('attackGT', '가운뎃말잇기');

        update();
    };
    $s.cbattackMT.onclick = function () {
        p.attackMT = $s.cbattackMT.checked;

        updateattack('attackMT', '끄투');

        update();
    };
    $s.cbdefenseSH.onclick = function () {
        p.defenseSH = $s.cbdefenseSH.checked;
        
        updatedefense('defenseSH', '끝말잇기');
        
        update();
    };
    $s.cbdefenseKT.onclick = function () {
        p.defenseKT = $s.cbdefenseKT.checked;
        
        updatedefense('defenseKT', '쿵쿵따');
        
        update();
    };
    $s.cbdefenseAP.onclick = function () {
        p.defenseAP = $s.cbdefenseAP.checked;
        
        updatedefense('defenseAP', '앞말잇기');
        
        update();
    };
    $s.cbdefenseGT.onclick = function () {
        p.defenseGT = $s.cbdefenseGT.checked;
        
        updatedefense('defenseGT', '가운뎃말잇기');
        
        update();
    };
    $s.cbdefenseMT.onclick = function () {
        p.defenseMT = $s.cbdefenseMT.checked;
        
        updatedefense('defenseMT', '끄투');
        
        update();
    };
    $s.cbhanbangSH.onclick = function () {
        p.hanbangSH = $s.cbhanbangSH.checked;
        
        updatehanbang('hanbangSH', '끝말잇기');
        
        update();
    };
    $s.cbhanbangKT.onclick = function () {
        p.hanbangKT = $s.cbhanbangKT.checked;
        
        updatehanbang('hanbangKT', '쿵쿵따');
        
        update();
    };
    $s.cbhanbangAP.onclick = function () {
        p.hanbangAP = $s.cbhanbangAP.checked;
        
        updatehanbang('hanbangAP', '앞말잇기');
        
        update();
    };
    $s.cbhanbangGT.onclick = function () {
        p.hanbangGT = $s.cbhanbangGT.checked;
        
        updatehanbang('hanbangGT', '가운뎃말잇기');
        
        update();
    };
    $s.cbhanbangMT.onclick = function () {
        p.hanbangMT = $s.cbhanbangMT.checked;
        
        updatehanbang('hanbangMT', '끄투');
        
        update();
    };
    $s.cblongestSH.onclick = function () {
        p.longestSH = $s.cblongestSH.checked;
        
        updatelongestSH();
        
        update();
    }
    $s.cblongestAP.onclick = function () {
        p.longestAP = $s.cblongestAP.checked;
        
        updatelongestAP();
        
        update();
    }
    $s.inputlongestTM.onkeyup = function () {
        p.longestTM = [...new Set($s.inputlongestTM.value.split(', '))];
        
        updatelongestTM();
        
        update();
    }
    $s.cbonlySH.onclick = function () {
        p.onlySH = $s.cbonlySH.checked;
        
        updateonlySH();
        
        update();
    }
    $s.cbonlyAP.onclick = function () {
        p.onlyAP = $s.cbonlyAP.checked;
        
        updateonlyAP();
        
        update();
    }
    $s.inputsummary.onkeyup = function () {
        p.summary = $s.inputsummary.value;

        d.summary = p.summary;
        d.ref = p.summary.includes('</ref>') ? '\n{{각주}}' : '';

        update();
    };

    console.log(
`
`
    );
}