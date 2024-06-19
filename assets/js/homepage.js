/* url query */
const qUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

/* Crea Array artisti */
const artList = ["beatles", "eric+clapton", "beach+boys", "jefferson+airplane"];
/* console.log(randomArt); */

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "cef3f58c49msh181a9824e42605ap189767jsn142e8f479832",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.addEventListener("DOMContentLoaded", function () {
  const showArt = document.getElementById("show_art");
  const showAlbum = document.getElementById("show_album");
  const randomNumb = Math.floor(Math.random() * 11);

  artList.forEach((current) => {
    fetch(qUrl + current, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((resp) => {
        console.log(resp);

        /*/// CREA CARD ARTIST/// */

        const artId = resp.data[1].artist.id;
        console.log("id artista", artId);

        const cardCol = document.createElement("div");
        cardCol.className = "col";

        showArt.appendChild(cardCol);

        /*  */

        const a_art = document.createElement("a");
        a_art.href = `./artist.html/${resp.data[1].artist.id}`;
        cardCol.appendChild(a_art);

        /*  */

        const card = document.createElement("div");
        card.className = "card_wrap border-0 p-2";
        card.setAttribute("role", "button");

        a_art.appendChild(card);

        /* IMGWRAP + PLAYIT */

        const imgWrap = document.createElement("div");
        imgWrap.className = "image_wrap position-relative";

        card.appendChild(imgWrap);

        const imgArt = document.createElement("img");
        imgArt.className = "card-img-top rounded-circle";
        /* imgArt.style.maxHeight = "150px"; */
        imgArt.src = resp.data[1].artist.picture_medium;

        imgWrap.appendChild(imgArt);

        const playIt = document.createElement("div");
        playIt.className = "playIt position-absolute";
        playIt.setAttribute("role", "button");

        imgWrap.appendChild(playIt);

        const icPlay = document.createElement("i");
        icPlay.className = "bi bi-play-circle-fill shadow play_color fs-1";

        playIt.appendChild(icPlay);

        /*  */

        const cardBody = document.createElement("div");
        cardBody.className = "card-body px-0 py-2";

        card.appendChild(cardBody);

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title fs-6";
        cardTitle.innerText = resp.data[1].artist.name;

        cardBody.appendChild(cardTitle);

        const cardP = document.createElement("p");
        cardP.className = "card-text small_txt text-muted";
        cardP.innerText = "Artista";

        cardBody.appendChild(cardP);

        /*/// CREA ALBUM/// */

        const albId = resp.data[randomNumb].album.id;
        console.log("id album", albId);
        localStorage.setItem("albid", artId);

        const albCol = document.createElement("div");
        albCol.className = "col";

        showAlbum.appendChild(albCol);

        /*  */

        const a_album = document.createElement("a");
        a_album.href = `./album.html/${resp.data[randomNumb].album.id}`;
        albCol.appendChild(a_album);

        /*  */

        const card_a = document.createElement("div");
        card_a.className = "card_wrap";
        card_a.setAttribute("role", "button");

        a_album.appendChild(card_a);

        /* IMGWRAP + PLAYIT */

        const imgWrapAlb = document.createElement("div");
        imgWrapAlb.className = "image_wrap position-relative";

        card_a.appendChild(imgWrapAlb);

        const imgArtAlb = document.createElement("img");
        imgArtAlb.className = "card-img-top";
        /* imgArtAlb.style.maxHeight = "150px"; */
        imgArtAlb.src = resp.data[randomNumb].album.cover_medium;

        imgWrapAlb.appendChild(imgArtAlb);

        const playItAlb = document.createElement("div");
        playItAlb.className = "playIt position-absolute";
        playItAlb.setAttribute("role", "button");

        imgWrapAlb.appendChild(playItAlb);

        const icPlayAlb = document.createElement("i");
        icPlayAlb.className = "bi bi-play-circle-fill shadow play_color fs-1";

        playItAlb.appendChild(icPlayAlb);

        /*  */

        const cardTitleAlb = document.createElement("h5");
        cardTitleAlb.className = "card-title mt-2 fs-6 text-truncate";
        cardTitleAlb.innerText = resp.data[randomNumb].album.title;

        card_a.appendChild(cardTitleAlb);

        const cardPalb = document.createElement("p");
        cardPalb.className = "card-text small_txt text-muted";
        cardPalb.innerText = resp.data[randomNumb].artist.name;

        card_a.appendChild(cardPalb);
      })
      .catch((err) => console.log(err));
  });
});
