document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container input");
  const searchContainer = document.querySelector(".search-container");
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
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
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
    DZ.init({
      appId: "YOUR_DEEZER_APP_ID",
      channelUrl: "YOUR_CHANNEL_URL",
      player: {
        container: "player",
        playlist: true,
        width: 300,
        height: 300,
        format: "square",
        onload: function () {
          DZ.player.playTracks([trackId]);
        },
      },
    });
  };
});

// playbar

let playing = false;
let currentTime = 0;
let duration = 180;
let progressInterval;

const playButton = document.querySelector(".play-btn");
const progressBar = document.querySelector(".progress-bar");

playButton.addEventListener("click", () => {
  playing = !playing;

  if (playing) {
    playButton.classList.remove("bi-play-circle-fill");
    playButton.classList.add("bi-pause-circle-fill");
    startProgress();
  } else {
    playButton.classList.remove("bi-pause-circle-fill");
    playButton.classList.add("bi-play-circle-fill");
    clearInterval(progressInterval);
  }
});

function startProgress() {
  progressInterval = setInterval(() => {
    if (currentTime < duration) {
      currentTime++;
      updateProgressBar();
    } else {
      clearInterval(progressInterval);
      playing = false;
      playButton.classList.remove("bi-pause-circle-fill");
      playButton.classList.add("bi-play-circle-fill");
    }
  }, 1000);
}

function updateProgressBar() {
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = progressPercent + "%";
}

// Pulsante skip avanti
document.querySelector(".next-btn").addEventListener("click", () => {
  currentTime = Math.min(currentTime + 30, duration);
  updateProgressBar();
});

// Pulsante skip indietro
document.querySelector(".previous-btn").addEventListener("click", () => {
  currentTime = Math.max(currentTime - 30, 0);
  updateProgressBar();
});
