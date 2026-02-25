window.addEventListener('load', () => {
  const $STAGE = {
    inputDoc: document.getElementById("input-doc"),
    inputAdd: document.getElementById("input-add"),
    inputDel: document.getElementById("input-del"),
    inputTheme: document.getElementById("input-theme"),
    showOrigin: document.getElementById("show-origin"),
    showAll: document.getElementById("show-all"),
    showLong: document.getElementById("show-long"),
    showMission: document.getElementById("show-mission"),
    copyOrigin: document.getElementById("copy-origin"),
    copyAll: document.getElementById("copy-all"),
    copyLong: document.getElementById("copy-long"),
    copyMission: document.getElementById("copy-mission")
  }

  let theme = '';
  let themeDoc = '';
  let themeNew = '';
  let wordsDoc = [];
  let wordsAdd = [];
  let wordsDel = [];
  let wordsOrigin = [];
  let wordsAll = [];
  let wordsLong = [];
  let wordsMission = [];

  function updateTheme() {
    theme = themeNew || themeDoc;
  }

  function updateWords() {
    // 원본 단어 목록 및 긴 순 정렬
    wordsOrigin = [...new Set([...wordsDoc, ...wordsAdd])]
      .filter(word => !wordsDel.includes(word))
      .filter(word => word !== '')
      .sort()
      .sort((a, b) => b.length - a.length);
    const wordsLen = wordsOrigin.length;



    // 긴 단어 목록
    wordsLong = [
      `{| class="wikitable sortable" style="text-align: center;"`,
      `! width="50" | 길이 !! 단어`
    ];
    for (const word of wordsOrigin) {
      if (word.length < 9) break;
      wordsLong.push('|-');
      wordsLong.push(`| ${word.length} || [[${word}]]`);
    }
    wordsLong.push(`|}`);



    // 미션 단어 목록
    // GPT 딸깍으로 GPT가 없던 시절의 코드를 수정해보자.
    let missions = Array.from({ length: 14 }, () => []);
    let missionMax = new Array(14).fill(0);
    
    // 1차: 각 글자별 최대 등장 횟수 계산
    for (const word of wordsOrigin) {
      const wordLen = word.length;
      const wordMissions = new Array(14).fill(0);
    
      for (let i = 0; i < wordLen; i++) {
        const charIndex = '가나다라마바사아자차카타파하'.indexOf(word[i]);
        if (charIndex !== -1) wordMissions[charIndex]++;
      }
    
      for (let i = 0; i < 14; i++) {
        if (wordMissions[i] > missionMax[i]) {
          missionMax[i] = wordMissions[i];
        }
      }
    }
    
    // 2차: 조건에 맞는 단어 추가
    for (const word of wordsOrigin) {
      const wordLen = word.length;
      const wordMissions = new Array(14).fill(0);
    
      for (let i = 0; i < wordLen; i++) {
        const charIndex = '가나다라마바사아자차카타파하'.indexOf(word[i]);
        if (charIndex !== -1) wordMissions[charIndex]++;
      }
    
      for (let i = 0; i < 14; i++) {
        const threshold = missionMax[i] >= 2 ? 2 : 1;
        if (wordMissions[i] >= threshold) {
          missions[i].push([word.length, word, wordMissions[i]]);
        }
      }
    }

    wordsMission = [];
    for (let i = 0; i < 14; i++) {
      const words = missions[i];
      const mission = '가나다라마바사아자차카타파하'[i];

      if (words.length > 0) {
        words.sort((a, b) => b[2] - a[2]);
        wordsMission.push(`== ${mission} ==`);
        wordsMission.push(`{| class="wikitable sortable" style="text-align:center;"`);
        wordsMission.push(`! width="50" | 길이 !! 단어 !! width="50" | 미션`);
        for (const [wordLen, word, missionLen] of words) {
          wordsMission.push('|-');
          wordsMission.push(`| ${wordLen} || [[${word}]] || ${missionLen}`);
        }
        wordsMission.push(`|}`);
        wordsMission.push(``);
      }
    }



    // 가나다순 정렬
    wordsOrigin.sort();



    // 전체 단어 목록
    const chars = new Map();
    let prevChar = '';
    for (let i = 0; i < wordsLen; i++) {
      const word = wordsOrigin[i];
      const wordChar = word[0];
      if (prevChar !== wordChar) {
        chars.set(wordChar, [word]);
        prevChar = wordChar;
      } else {
        chars.get(wordChar).push(word);
      }
    }

    wordsAll = [];
    for (const [char, words] of chars) {
      wordsAll.push(`== ${char} ==`);
      wordsAll.push(`{| class="wikitable sortable" style="text-align: center;"`);
      wordsAll.push(`! width="50" | 길이 !! 단어`);
      for (const word of words) wordsAll.push(`|-\n| ${word.length} || [[${word}]]`);
      wordsAll.push(`|}`);
      wordsAll.push(``);
    }
  }

  function getThemeDoc() {
    if (/^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/.test(theme)) {
      return `${theme}(주제)`;
    } else {
      return theme;
    }
  }

  function update() {
    $STAGE.showOrigin.value = wordsOrigin.join('\n');
    
    if (theme === '') {
      $STAGE.showAll.value = '';
      $STAGE.showLong.value = '';
      $STAGE.showMission.value = '';
    } else {
      if (wordsAll.length === 0) {
        $STAGE.showAll.value = '';
      } else {
        $STAGE.showAll.value = `[[분류:${theme}]][[분류:전체 단어 목록]]\n`
                             + `{{상위 문서|${getThemeDoc(theme)}}}\n`
                             + `{{목차}}\n`
                             + wordsAll.join('\n');
      }

      if (wordsLong.length <= 3) {
        $STAGE.showLong.value = '';
      } else {
        $STAGE.showLong.value = `[[분류:${theme}]][[분류:긴 단어 목록]]\n`
                              + `{{상위 문서|${getThemeDoc(theme)}}}\n`
                              + wordsLong.join('\n');
      }

      if (wordsMission.length === 0) {
        $STAGE.showMission.value = '';
      } else {
        $STAGE.showMission.value = `[[분류:${theme}]][[분류:미션 단어 목록]]\n`
                                 + `{{상위 문서|${getThemeDoc(theme)}}}\n`
                                 + `{{목차}}\n`
                                 + wordsMission.join('\n');
      }
    }
  }



  $STAGE.inputDoc.onkeyup = () => {
    const doc = $STAGE.inputDoc.value

    themeDoc = doc.match(/(?<=:).+(?=\]\]\[)/)?.[0] ?? '';
    updateTheme();

    wordsDoc = doc.match(/(?<=\| \[\[).+(?=\]\])/g) || [];
    updateWords();

    update();
  };

  $STAGE.inputAdd.onkeyup = () => {
    wordsAdd = $STAGE.inputAdd.value.split("\n");
    updateWords();

    update();
  };

  $STAGE.inputDel.onkeyup = () => {
    wordsDel = $STAGE.inputDel.value.split("\n");
    updateWords();

    update();
  };

  $STAGE.inputTheme.onkeyup = () => {
    themeNew = $STAGE.inputTheme.value;
    updateTheme();

    update();
  };

  $STAGE.copyOrigin.onclick = () => {
    $STAGE.showOrigin.select();
    document.execCommand('copy');
  };

  $STAGE.copyAll.onclick = () => {
    $STAGE.showAll.select();
    document.execCommand('copy');
  };

  $STAGE.copyLong.onclick = () => {
    $STAGE.showLong.select();
    document.execCommand('copy');
  };

  $STAGE.copyMission.onclick = () => {
    $STAGE.showMission.select();
    document.execCommand('copy');
  };
});
