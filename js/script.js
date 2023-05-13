window.addEventListener('load', () => {

    const $MENU = {
        portal: document.getElementById("menu-portal"),
        mrkmaker: document.getElementById("menu-mrkmaker"),
        docmaker: document.getElementById("menu-docmaker"),
        dcriminr:  document.getElementById("menu-dcriminr")
    }

    $MENU.portal.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/portal.html';
    }
    $MENU.mrkmaker.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/mrkmaker.html';
    }
    $MENU.docmaker.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/docmaker.html';
    }
    $MENU.dcriminr.onclick = () => {
        location.href = '/kkutu.wiki_helper/new/dcriminr.html';
    }
})