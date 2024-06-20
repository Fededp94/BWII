const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/480";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "ea9e98756dmsh526fc553a6310ebp1c8000jsn3b4be7f50491",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const mainContent = document.querySelector(".MainContent");
const MainContentArtist = document.getElementById("MainContentArtist");
const image = document.getElementById("immagineCanvas");
const trackDiv = document.getElementById("tracksX5");

window.onload = () => {
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })

    .then((data) => {
      console.log(data);

      image.src = data.picture;

      // Funzione per creare e aggiungere contenuti relativi all'artista

      const contenuti = () => {
        const mainScrollDiv = document.createElement("div");
        mainScrollDiv.id = "main-scroll";

        // Creazione e aggiunta di elementi per l'immagine di sfondo e informazioni dell'artista
        // (nome dell'artista, numero di ascoltatori mensili)

        const backgroundRelativeDiv = document.createElement("div");
        backgroundRelativeDiv.id = "backgroundRelative";

        const backgroundImageDiv = document.createElement("div");
        backgroundImageDiv.id = "backgroundImage";

        const backgroundImage2Div = document.createElement("div");
        backgroundImage2Div.id = "backgroundImage2";

        const artistaVerificatoP = document.createElement("p");
        artistaVerificatoP.className = "artistaVerificato d-none d-md-block";
        artistaVerificatoP.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-primary bi bi-patch-check-fill mb-1" viewBox="0 0 16 16">
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
          </svg>&nbsp;Artista verificato`;

        const h1 = document.createElement("h1");
        h1.textContent = data.name;

        const ascoltiMensiliP = document.createElement("p");
        ascoltiMensiliP.className = "ascoltiMensili";
        ascoltiMensiliP.textContent = `${data.nb_fan} ascoltatori mensili`;

        backgroundImage2Div.appendChild(artistaVerificatoP);
        backgroundImage2Div.appendChild(h1);
        backgroundImage2Div.appendChild(ascoltiMensiliP);
        backgroundRelativeDiv.appendChild(backgroundImageDiv);
        backgroundRelativeDiv.appendChild(backgroundImage2Div);

        mainScrollDiv.appendChild(backgroundRelativeDiv);

        const playFollowMobileDiv1 = document.createElement("div");
        playFollowMobileDiv1.className = "playFollowMobile text-secondary p-3";
        playFollowMobileDiv1.textContent = `${data.nb_fan} ascoltatori mensili`;

        const playFollowMobileDiv2 = document.createElement("div");
        playFollowMobileDiv2.className = "playFollowMobile";

        const innerDiv1 = document.createElement("div");
        innerDiv1.className =
          "d-flex justify-content-between align-items-center p-3 pb-0";

        const innerDiv2 = document.createElement("div");
        innerDiv2.className = "d-flex align-items-center";

        const followP1 = document.createElement("p");
        followP1.className = "m-0 px-3 py-1 border rounded-1 me-4 follow";
        followP1.textContent = "FOLLOW";
        followP1.setAttribute("onclick", "toggleFollow()");

        const dropdownDiv1 = document.createElement("div");
        dropdownDiv1.className = "dropdown pb-3";
        dropdownDiv1.setAttribute("onclick", "toggleGreen(this)");
        dropdownDiv1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg><ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>`;

        innerDiv2.appendChild(followP1);
        innerDiv2.appendChild(dropdownDiv1);

        const innerDiv3 = document.createElement("div");
        innerDiv3.className =
          "d-flex justify-content-center align-items-center me-2";
        innerDiv3.innerHTML = `<svg  onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-shuffle me-3" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
          </svg>`;

        const playButtonDiv1 = document.createElement("div");
        playButtonDiv1.className =
          "d-flex justify-content-center align-items-center p-2 rounded-circle playButtonHover";

        playButtonDiv1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>`;

        innerDiv3.appendChild(playButtonDiv1);
        innerDiv1.appendChild(innerDiv2);
        innerDiv1.appendChild(innerDiv3);
        playFollowMobileDiv2.appendChild(innerDiv1);

        const playFollowDiv = document.createElement("div");
        playFollowDiv.className =
          "playFollow d-flex align-items-center p-5 pb-0";

        const playButtonDiv2 = document.createElement("div");
        playButtonDiv2.className =
          "me-3 d-flex justify-content-center align-items-center p-2 rounded-circle playButtonHover";

        playButtonDiv2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill text-black" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>`;

        const followP2 = document.createElement("p");
        followP2.className = "m-0 px-3 py-1 border rounded-1 me-4 follow";
        followP2.textContent = "FOLLOW";
        followP2.setAttribute("onclick", "toggleFollow()");

        const dropdownDiv2 = document.createElement("div");
        dropdownDiv2.className = "dropdown pb-3";
        dropdownDiv2.innerHTML = `<svg href="#" onclick='toggleGreen(this)' role="button" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" fill="currentColor" class="bi bi-three-dots text-white" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg><ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>`;

        playFollowDiv.appendChild(playButtonDiv2);
        playFollowDiv.appendChild(followP2);
        playFollowDiv.appendChild(dropdownDiv2);

        const rowDiv = document.createElement("div");
        rowDiv.className = "row p-5";

        const popolariDiv = document.createElement("div");
        popolariDiv.className = "popolari col-12 col-md-8";

        const popolariH3 = document.createElement("h3");
        popolariH3.className = "mb-4";
        popolariH3.textContent = "Popolari";

        const tracksX5Div = document.createElement("div");
        tracksX5Div.id = "tracksX5";

        popolariDiv.appendChild(popolariH3);
        popolariDiv.appendChild(tracksX5Div);

        const braniDiv = document.createElement("div");
        braniDiv.className = "col-12 col-md-4 pb-3";

        const braniH3 = document.createElement("h3");
        braniH3.className = "mb-4";
        braniH3.textContent = "Brani che ti piacciono";

        const braniInnerDiv = document.createElement("div");
        braniInnerDiv.className = "row";

        const cuoreDiv = document.createElement("div");
        cuoreDiv.className =
          "col-3 p-0 d-flex justify-content-center cuoreRelative";

        const immagineCanvasImg = document.createElement("img");
        immagineCanvasImg.id = "immagineCanvas";
        immagineCanvasImg.src = data.picture;
        immagineCanvasImg.width = 70;
        immagineCanvasImg.height = 70;
        immagineCanvasImg.className = "rounded-circle";

        const cuoreAbsoluteDiv = document.createElement("div");
        cuoreAbsoluteDiv.className = "cuoreAbsolute rounded-circle border";
        cuoreAbsoluteDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" fill="currentColor" class="bi bi-heart-fill text-white" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>`;

        cuoreDiv.appendChild(immagineCanvasImg);
        cuoreDiv.appendChild(cuoreAbsoluteDiv);

        const braniInnerDiv2 = document.createElement("div");
        braniInnerDiv2.className =
          "col-9 d-flex flex-column justify-content-center ps-3";

        const braniP1 = document.createElement("p");
        braniP1.className = "mb-1";
        braniP1.textContent = "Hai messo Mi piace a 11 brani";

        const braniP2 = document.createElement("p");
        braniP2.className = "m-0 text-secondary";
        braniP2.textContent = `Di ${data.name}`;

        braniInnerDiv2.appendChild(braniP1);
        braniInnerDiv2.appendChild(braniP2);

        braniInnerDiv.appendChild(cuoreDiv);
        braniInnerDiv.appendChild(braniInnerDiv2);

        braniDiv.appendChild(braniH3);
        braniDiv.appendChild(braniInnerDiv);

        rowDiv.appendChild(popolariDiv);
        rowDiv.appendChild(braniDiv);

        mainScrollDiv.appendChild(playFollowMobileDiv1);
        mainScrollDiv.appendChild(playFollowMobileDiv2);
        mainScrollDiv.appendChild(playFollowDiv);
        mainScrollDiv.appendChild(rowDiv);

        mainContent.appendChild(mainScrollDiv);
      };

      contenuti();

      const trackDiv = document.getElementById("tracksX5");
      const artistDiv = document.getElementById("backgroundImage");
      artistDiv.style.backgroundImage = `url(${data.picture_xl})`;

      // Variabili per gestire l'indice di partenza e il limite di tracce da mostrare

      let startIndex = 0;
      const limit = 5;
      let isShowingMore = false;

      // Funzione per creare un elemento HTML per una traccia

      const createTrackElement = (track, index) => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row d-flex TrackHover pt-3";
        rowDiv.id = `track-${index}`;

        //Creazione e aggiunta dell'elemento per l'indice della traccia

        const indiceTracksP = document.createElement("p");
        indiceTracksP.className =
          "col-1 d-flex justify-content-center align-items-center text-secondary indiceTracks";
        indiceTracksP.textContent = index + 1;

        const playHoverTrackP = document.createElement("p");
        playHoverTrackP.className =
          "col-1 d-none justify-content-center align-items-center text-secondary playHoverTrack";
        playHoverTrackP.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>`;
        // Creazione e aggiunta ldel'elemento per l'immagine di copertina dell'album

        const coverImgP = document.createElement("p");
        coverImgP.className =
          "col-1 d-flex justify-content-center align-items-center";
        coverImgP.innerHTML = `<img src='${track.album.cover}' width='40' height='40'>`;
        // Creazione e aggiunta dell'elemento per i dettagli della traccia

        const trackDetailsDiv = document.createElement("div");
        trackDetailsDiv.className =
          "col-8 d-md-flex justify-content-between align-items-center";
        trackDetailsDiv.innerHTML = `<p class='m-0 mb-md-3'>${track.title}</p><p class='text-secondary'>${track.rank}</p>`;
        // Creazione e aggiunta dell'elemento per la durata della traccia

        const trackDurationP = document.createElement("p");
        trackDurationP.className =
          "col-2 d-none d-md-flex justify-content-center align-items-center text-secondary";
        trackDurationP.innerHTML = `${convertiDurata(
          track.duration
        )} <span class='cuoreHover ms-2 text-white d-none'><svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg></span>`;

        // Creazione e aggiunta dell'elemento per il menu a discesa della traccia

        const dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown col-2 playFollowMobile mt-1";
        dropdownDiv.innerHTML = `<span class='cuoreHover me-2 text-white d-none'><svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg></span>
          <svg onclick='toggleGreen(this)' xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical text-secondary" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>`;

        rowDiv.appendChild(indiceTracksP);
        rowDiv.appendChild(playHoverTrackP);
        rowDiv.appendChild(coverImgP);
        rowDiv.appendChild(trackDetailsDiv);
        rowDiv.appendChild(trackDurationP);
        rowDiv.appendChild(dropdownDiv);

        return rowDiv;
      };

      // Funzione asincrona per ottenere le tracce e aggiungerle al DOM

      async function fetchTracks(url, startIndex, limit) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("errore");
          const data = await res.json();

          // Determina l'indice di fine delle tracce da mostrare

          const endIndex = Math.min(startIndex + limit, data.data.length);

          // Iterazione sulle tracce e creazione degli elementi HTML per ciascuna traccia

          for (let i = startIndex; i < endIndex; i++) {
            const trackElement = createTrackElement(data.data[i], i);
            trackDiv.appendChild(trackElement);
          }

          // Rimuovere il link "Visualizza altro/meno"

          const existingViewMoreLink = document.getElementById("viewMoreLink");
          if (existingViewMoreLink) {
            existingViewMoreLink.remove();
          }

          if (endIndex < data.data.length || isShowingMore) {
            const viewMoreDiv = document.createElement("div");
            viewMoreDiv.innerHTML = `<a href="#" id="viewMoreLink">${
              isShowingMore ? "Visualizza meno" : "Visualizza altro"
            }</a>`;
            viewMoreDiv.addEventListener("click", (event) => {
              event.preventDefault();
              if (isShowingMore) {
                for (let i = endIndex - 1; i >= endIndex - limit; i--) {
                  const trackElement = document.getElementById(`track-${i}`);
                  if (trackElement) {
                    trackElement.remove();
                  }
                }
                isShowingMore = false;
                viewMoreDiv.innerHTML =
                  '<a href="#" id="viewMoreLink">Visualizza altro</a>';
              } else {
                fetchTracks(url, endIndex, limit);
                isShowingMore = true;
                viewMoreDiv.innerHTML =
                  '<a href="#" id="viewMoreLink">Visualizza meno</a>';
              }
            });
            trackDiv.appendChild(viewMoreDiv);
          }
        } catch (err) {
          console.log(err);
        }
      }

      fetchTracks(data.tracklist, startIndex, limit);
    })

    .catch((err) => {
      console.log(err);
    });
};
//Funzione per convertire la durata dei brani
function convertiDurata(secondi) {
  const minuti = Math.floor(secondi / 60);
  const restantiSecondi = secondi % 60;

  const durataFormattata = `${minuti}:${
    restantiSecondi < 10 ? "0" : ""
  }${restantiSecondi}`;
  return durataFormattata;
}

let isFollowing = false;

function toggleFollow() {
  let followElements = document.getElementsByClassName("follow");
  for (let i = 0; i < followElements.length; i++) {
    let follow = followElements[i];
    if (isFollowing) {
      follow.innerHTML = "FOLLOW";
    } else {
      follow.innerHTML = "FOLLOWING";
    }
  }
  isFollowing = !isFollowing;
}

function toggleGreen(ok) {
  if (ok.classList.contains("green")) {
    ok.classList.remove("green");
  } else {
    ok.classList.add("green");
  }
}

//Gestione della playerbar
