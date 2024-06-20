/* url query */
const qUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

/* Crea Array artisti */
const artList = [
  "beatles",
  "eric+clapton",
  "beach+boys",
  "jefferson airplane",
  "pink floyd",
];

/* Salva favArt in local storage */

localStorage.setItem("favoriteArtists", JSON.stringify(artList));
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

  /* Carica local Storage */
  const favArtString = localStorage.getItem("favoriteArtists");
  const favArtList = JSON.parse(favArtString);
  console.log(favArtList);

  favArtList.forEach((current) => {
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
        a_art.href = `./artist.html?artistId=${resp.data[1].artist.id}`;
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

        const playIt = document.createElement("span");
        playIt.className = "playIt";
        playIt.setAttribute("role", "button");

        imgWrap.appendChild(playIt);

        playIt.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-play-fill text-black shadow-lg" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>`;

        /*  */

        const cardBody = document.createElement("div");
        cardBody.className = "card-body px-0 py-2";

        card.appendChild(cardBody);

        const cardTitle = document.createElement("h5");
        cardTitle.className =
          "card-title d-flex justify-content-center d-lg-block fs-5 mt-1";
        cardTitle.innerText = resp.data[1].artist.name;

        cardBody.appendChild(cardTitle);

        const cardP = document.createElement("p");
        cardP.className = "d-none d-lg-block card-text small_txt text-muted";
        cardP.innerText = "Artista";

        cardBody.appendChild(cardP);

        /*/// CREA ALBUM/// */

        const albCol = document.createElement("div");
        albCol.className = "col";

        showAlbum.appendChild(albCol);

        /*  */

        const a_album = document.createElement("a");
        a_album.href = `./album.html?albumId=${resp.data[randomNumb].album.id}`;
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

        const playItAlb = document.createElement("span");
        playItAlb.className = "playIt";
        playItAlb.setAttribute("role", "button");

        imgWrapAlb.appendChild(playItAlb);

        playItAlb.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-play-fill text-black shadow-lg" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>`;

        /*  */

        const cardTitleAlb = document.createElement("h5");
        cardTitleAlb.className = "card-title mt-2 fs-6 text-truncate";
        cardTitleAlb.innerText = resp.data[randomNumb].album.title;

        card_a.appendChild(cardTitleAlb);

        const cardPalb = document.createElement("p");
        cardPalb.className = "card-text small_txt text-muted text-truncate";
        cardPalb.innerText = resp.data[randomNumb].artist.name;

        card_a.appendChild(cardPalb);
      })
      .catch((err) => console.log(err));
  });
});
