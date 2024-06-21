const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId");

// parte layout del titolo (rimane sopra anche se scrollassi giu)
document.addEventListener("DOMContentLoaded", function () {
  const scrollTarget = document.getElementById("MainContentAlbum");
  const albumTitle = document.querySelector(".title-album").innerHTML;
  const controlBar = document.querySelector(".barraUtente");

  const fixedTitle = document.createElement("div");
  fixedTitle.className = "title-album-fixed";
  fixedTitle.innerHTML = albumTitle;
  controlBar.appendChild(fixedTitle);

  scrollTarget.addEventListener("scroll", function () {
    if (scrollTarget.scrollTop > 270) {
      fixedTitle.classList.add("show");
    } else {
      fixedTitle.classList.remove("show");
    }
  });
});

// window.addEventListener("scroll", function () {
//   if (window.scrollY > document.getElementById("MainContentAlbum").offsetTop + 100) {
//     fixedTitle.classList.add("show");
//   } else {
//     fixedTitle.classList.remove("show");
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const songItems = document.querySelectorAll(".song-item");

  // selezioniamo gli elementi della playerbar, e che veranno aggiornati
  const titleSong = document.querySelector(".title-song");
  const artistSong = document.querySelector(".artist-song");
  const durationSong = document.querySelector(".duration-song");

  // aggiunge un event listener per ogni elemento nella lista delle canzoni
  songItems.forEach((item) => {
    item.addEventListener("click", () => {
      const songTitle = item
        .querySelector(".titolo-canzone")
        .childNodes[0].nodeValue.trim();
      const songArtist = item
        .querySelector(".artista-canzone")
        .innerText.trim();
      const songDuration = item
        .querySelector(".durata-canzone")
        .innerText.trim();

      // aggiorrna il contenuto dell'elemento corrispondente nella barra del player
      titleSong.innerText = songTitle;
      artistSong.innerText = songArtist;
      durationSong.innerText = songDuration;
    });
  });
});

//-----------------------------------------------

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

    titleSong.innerText = songTitle;
    artistSong.innerText = songArtist;
    durationSong.innerText = songDuration;
    currentDuration.innerText = "0:00";
    progressBar.style.width = "0%";
    clearInterval(intervalId);
    isPlaying = false;
    updatePlayButton();
  }

  function startPlayback() {
    clearInterval(intervalId);
    let [minutes, seconds] = currentDuration.innerText.split(":").map(Number);
    let currentSeconds = minutes * 60 + seconds;
    let [totalMinutes, totalSeconds] = durationSong.innerText
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
        currentDuration.innerText = `${curMinutes}:${
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

//-----------------------------------------------

// codice per rendere dinamico l'album

document.addEventListener("DOMContentLoaded", async () => {
  if (albumId) {
    try {
      //fa un fetch dell'album dall'api usando l'id
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/` + albumId
      );
      const albumData = await response.json();

      // aggiorna i dettagli dell'album
      const titleAlbum = document.querySelector(".title-album");
      titleAlbum.innerText = albumData.title;

      // aggiorna anche il titolo con sticky
      const albumTitleSticky = document.querySelector(".album-title-sticky");
      albumTitleSticky.innerText = albumData.title;

      // aggiorna l'immagine dell'album
      const albumImage = document.querySelector(".MainContent img");
      albumImage.src = albumData.cover;

      // aggiorna i dettagli nell'album
      const albumInfoContainer = document.querySelector(
        ".MainContent .d-flex.align-items-center.small"
      );
      albumInfoContainer.innerHTML = ""; // pulisce l'album esistente

      const artistImg = document.createElement("img");
      artistImg.src = albumData.artist.picture;
      artistImg.width = 25;
      artistImg.classList.add("rounded-circle", "shadow");

      const albumInfoText = document.createElement("small");
      albumInfoText.classList.add("px-2");
      albumInfoText.innerText = `${albumData.artist.name} • ${new Date(
        albumData.release_date
      ).getFullYear()} • ${albumData.nb_tracks} brani, ${Math.floor(
        albumData.duration / 60
      )} min ${albumData.duration % 60} sec.`;

      albumInfoContainer.appendChild(artistImg);
      albumInfoContainer.appendChild(albumInfoText);

      // aggiorna la lista delle canzoni
      const songListElement = document.querySelector(".song-list");
      songListElement.innerHTML = ""; // pulisce le canzoni esistenti

      albumData.tracks.data.forEach((track, index) => {
        const trackElement = document.createElement("div");
        trackElement.classList.add(
          "col-12",
          "song-item",
          "d-flex",
          "align-items-center",
          "mt-3"
        );

        const col1 = document.createElement("div");
        col1.classList.add("col-1");

        const col2 = document.createElement("div");
        col2.classList.add("col-1");
        col2.innerText = index + 1;

        const col3 = document.createElement("div");
        col3.classList.add("col-6", "titolo-canzone");

        const trackTitle = document.createElement("span");
        trackTitle.innerText = track.title;

        const trackArtist = document.createElement("small");
        trackArtist.classList.add("fw-light", "opacity-50", "artista-canzone");
        trackArtist.innerText = track.artist.name;

        col3.appendChild(trackTitle);
        col3.appendChild(document.createElement("br"));
        col3.appendChild(trackArtist);

        const col4 = document.createElement("div");
        col4.classList.add("col-3");
        col4.innerText = track.rank;

        const col5 = document.createElement("div");
        col5.classList.add("col-1", "durata-canzone");
        col5.innerText = `${Math.floor(track.duration / 60)}:${
          track.duration % 60 < 10 ? "0" : ""
        }${track.duration % 60}`;

        trackElement.appendChild(col1);
        trackElement.appendChild(col2);
        trackElement.appendChild(col3);
        trackElement.appendChild(col4);
        trackElement.appendChild(col5);

        // aggiunge un event listener per aggiornare la plyerbar
        trackElement.addEventListener("click", () => {
          document.querySelector(".title-song").innerText = track.title;
          document.querySelector(".artist-song").innerText = track.artist.name;
          document.querySelector(".duration-song").innerText = `${Math.floor(
            track.duration / 60
          )}:${track.duration % 60 < 10 ? "0" : ""}${track.duration % 60}`;
        });

        songListElement.appendChild(trackElement);
      });
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  }
});
