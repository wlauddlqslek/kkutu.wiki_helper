window.addEventListener('load', () => {

    console.log(
    `
    `
    );

    const $STAGE = {
        mrkmaker: document.getElementById("go-mrkmaker"),
        docmaker: document.getElementById("go-docmaker"),
        dcriminr:  document.getElementById("go-dcriminr")
    }

    $STAGE.mrkmaker.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/mrkmaker.html';
    }
    $STAGE.docmaker.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/docmaker.html';
    }
    $STAGE.dcriminr.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/dcriminr.html';
    }
}) 