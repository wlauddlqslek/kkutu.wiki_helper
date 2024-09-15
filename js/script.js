window.addEventListener('load', () => {

    const $MENU = {
        portal: document.getElementById("menu-portal"),
        mrkmaker: document.getElementById("menu-mrkmaker"),
        docmaker: document.getElementById("menu-docmaker"),
        dcriminr:  document.getElementById("menu-dcriminr")
    }

    $MENU.portal.onclick = () => {
        location.href = '/kkutu.wiki_helper/portal.html';
    }
    $MENU.mrkmaker.onclick = () => {
        location.href = '/kkutu.wiki_helper/mrkmaker.html';
    }
    // $MENU.docmaker.onclick = () => {
    //     location.href = '/kkutu.wiki_helper/docmaker.html';
    // }
    $MENU.dcriminr.onclick = () => {
        location.href = '/kkutu.wiki_helper/dcriminr.html';
    }
})