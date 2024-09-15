window.addEventListener('load', () => {
  const $STAGE = {
    mrkmaker: document.getElementById("go-mrkmaker"),
    docmaker: document.getElementById("go-docmaker"),
    dcriminr:  document.getElementById("go-dcriminr")
  }

  $STAGE.mrkmaker.onclick = () => {
    location.href = '/kkutu.wiki_helper/mrkmaker.html';
  }

  // $STAGE.docmaker.onclick = () => {
  //   location.href = '/kkutu.wiki_helper/docmaker.html';
  // }

  $STAGE.dcriminr.onclick = () => {
    location.href = '/kkutu.wiki_helper/dcriminr.html';
  }
}) 