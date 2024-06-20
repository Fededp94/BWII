document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-container input");
  const searchContainer = document.querySelector(".search-container");
  const resultContainer = document.createElement("div");
  resultContainer.className = "result-container mt-3";
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
      data.data.forEach((artist) => {
        const artistCard = document.createElement("div");
        artistCard.className = "card mb-3";
        artistCard.innerHTML = `
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${artist.artist.picture_medium}" class="card-img" alt="${artist.artist.name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${artist.artist.name}</h5>
                  <p class="card-text">Album: ${artist.album.title}</p>
                  <p class="card-text"><small class="text-muted">Canzone: ${artist.title}</small></p>
                </div>
              </div>
            </div>
          `;
        resultContainer.appendChild(artistCard);
      });
    } else {
      resultContainer.innerHTML = `<p class="text-warning">Nessun risultato trovato.</p>`;
    }
  };
});

const playTrack = (trackId) => {
  DZ.init({
    appId: "",
    channelUrl: "",
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
