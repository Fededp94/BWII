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

/* CREAZIONE DINAMICA CARDS */

window.addEventListener("DOMContentLoaded", function () {
  /* CREA FUNZIONE BOTTONI PLAYIT */

  /* seleziono bottoni playIt */
  /*  const playBtn = document.querySelectorAll(".playIt");

  playBtn.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      alert("PLAY IT!");
    });
  }); */

  /* FETCH CREAZIONE E DINAMICA CARDS */
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
        /* card.setAttribute("role", "button"); */

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
        /* card_a.setAttribute("role", "button"); */

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

// codice per il playbar dinamico (play, next e previous btn)
// aggiornato: messo anche progress bar relativo alla durata della canzone
document.addEventListener("DOMContentLoaded", () => {
  const songItems = document.querySelectorAll(".song-item");
  const titleSong = document.querySelector(".title-song");
  const artistSong = document.querySelector(".artist-song");
  const durationSong = document.querySelector(".duration-song");
  const currentDuration = document.querySelector(".current-duration");
  const playBtn = document.querySelector(".play-btn");
  const nextBtn = document.querySelector(".next-btn");
  const previousBtn = document.querySelector(".previous-btn");
  const progressBar = document.querySelector(".progress-bar");
  // const volumeBar = document.querySelector(".volume-bar");
  // const volumeContainer = document.querySelector(".progress.mx-2");

  let currentSongIndex = 0;
  let intervalId;
  let isPlaying = false;
  // let volumeLevel = 0.3;

  function updatePlayerBar(index) {
    const songItem = songItems[index];
    const songTitle = songItem
      .querySelector(".titolo-canzone")
      .childNodes[0].nodeValue.trim();
    const songArtist = songItem
      .querySelector(".artista-canzone")
      .innerText.trim();
    const songDuration = songItem
      .querySelector(".durata-canzone")
      .innerText.trim();

    titleSong.textContent = songTitle;
    artistSong.textContent = songArtist;
    durationSong.textContent = songDuration;
    currentDuration.textContent = "0:00";
    progressBar.style.width = "0%";
    clearInterval(intervalId);
    isPlaying = false;
    updatePlayButton();
  }

  function startPlayback() {
    clearInterval(intervalId);
    let [minutes, seconds] = currentDuration.textContent.split(":").map(Number);
    let currentSeconds = minutes * 60 + seconds;
    let [totalMinutes, totalSeconds] = durationSong.textContent
      .split(":")
      .map(Number);
    const totalDurationSeconds = totalMinutes * 60 + totalSeconds;

    intervalId = setInterval(() => {
      if (currentSeconds >= totalDurationSeconds) {
        clearInterval(intervalId);
      } else {
        currentSeconds++;
        const curMinutes = Math.floor(currentSeconds / 60);
        const curSeconds = currentSeconds % 60;
        currentDuration.textContent = `${curMinutes}:${
          curSeconds < 10 ? "0" : ""
        }${curSeconds}`;

        const progressPercentage =
          (currentSeconds / totalDurationSeconds) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      }
    }, 1000);
  }

  function pausePlayback() {
    clearInterval(intervalId);
  }

  function updatePlayButton() {
    if (isPlaying) {
      playBtn.classList.remove("bi-play-circle-fill");
      playBtn.classList.add("bi-pause-circle-fill");
    } else {
      playBtn.classList.remove("bi-pause-circle-fill");
      playBtn.classList.add("bi-play-circle-fill");
    }
  }

  // function setVolume(level) {
  //   volumeLevel = level;
  //   volumeBar.style.width = `${volumeLevel * 100}%`;
  // }

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
  });

  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songItems.length;
    updatePlayerBar(currentSongIndex);
    if (isPlaying) startPlayback();
  });

  previousBtn.addEventListener("click", () => {
    currentSongIndex =
      (currentSongIndex - 1 + songItems.length) % songItems.length;
    updatePlayerBar(currentSongIndex);
    if (isPlaying) startPlayback();
  });

  songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentSongIndex = index;
      updatePlayerBar(currentSongIndex);
      if (isPlaying) startPlayback();
    });
  });

  // volumeContainer.addEventListener("click", (e) => {
  //   const rect = volumeContainer.getBoundingClientRect();
  //   const offsetX = e.clientX - rect.left;
  //   const volumePercentage = offsetX / rect.width;
  //   setVolume(volumePercentage);
  // });

  updatePlayerBar(currentSongIndex);
  setVolume(volumeLevel);
});
