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
    if (scrollTarget.scrollTop > 180) {
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
      const songTitle = item.querySelector(".titolo-canzone").childNodes[0].nodeValue.trim();
      const songArtist = item.querySelector(".artista-canzone").innerText.trim();
      const songDuration = item.querySelector(".durata-canzone").innerText.trim();

      // aggiorrna il contenuto dell'elemento corrispondente nella barra del player
      titleSong.textContent = songTitle;
      artistSong.textContent = songArtist;
      durationSong.textContent = songDuration;
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
    const songTitle = songItem.querySelector(".titolo-canzone").childNodes[0].nodeValue.trim();
    const songArtist = songItem.querySelector(".artista-canzone").innerText.trim();
    const songDuration = songItem.querySelector(".durata-canzone").innerText.trim();

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
    let [totalMinutes, totalSeconds] = durationSong.textContent.split(":").map(Number);
    const totalDurationSeconds = totalMinutes * 60 + totalSeconds;

    intervalId = setInterval(() => {
      if (currentSeconds >= totalDurationSeconds) {
        clearInterval(intervalId);
      } else {
        currentSeconds++;
        const curMinutes = Math.floor(currentSeconds / 60);
        const curSeconds = currentSeconds % 60;
        currentDuration.textContent = `${curMinutes}:${curSeconds < 10 ? "0" : ""}${curSeconds}`;

        const progressPercentage = (currentSeconds / totalDurationSeconds) * 100;
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
    currentSongIndex = (currentSongIndex - 1 + songItems.length) % songItems.length;
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
