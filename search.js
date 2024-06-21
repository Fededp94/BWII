document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container input");
  const searchContainer = document.querySelector(".search-container");

  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container";
  searchContainer.appendChild(resultContainer);

  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        fetchArtist(query);
      }
    }
  });

  const fetchArtist = async (query) => {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8069aeef3cmshb149ad9eb9fd6dfp16871cjsneeeaf74616ad",
        "X-RapidAPI-Host": "songstats.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error("Fetch error:", error);
      resultContainer.innerHTML = `<p class="text-danger">Errore nella fetch: ${error.message}</p>`;
    }
  };

  const displayResults = (data) => {
    resultContainer.innerHTML = "";
    if (data && data.data && data.data.length > 0) {
      data.data.forEach((track) => {
        const trackCard = document.createElement("div");
        trackCard.className = "card mb-3";
        trackCard.innerHTML = `
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${track.artist.picture_medium}" class="card-img" alt="${track.artist.name}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${track.artist.name}</h5>
                <p class="card-text">Album: ${track.album.title}</p>
                <p class="card-text"><small class="text-muted">Canzone: ${track.title}</small></p>
              </div>
            </div>
          </div>
        `;
        trackCard.addEventListener("click", () => playTrack(track.id));
        resultContainer.appendChild(trackCard);
      });
    } else {
      resultContainer.innerHTML = `<p class="text-warning">Nessun risultato trovato.</p>`;
    }
  };

  const playTrack = (trackId) => {
    console.log(`Playing track with ID: ${trackId}`);
  };
});
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
  // setVolume(volumeLevel);
});

// ciao
