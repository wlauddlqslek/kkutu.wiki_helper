window.onload = function () {

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