document.addEventListener("DOMContentLoaded", function () {
  const albumLinks = document.querySelectorAll(".album-link");

  albumLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const albumId = this.dataset.albumId;
      console.log(`${albumId}`);

      fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("errore nel response");
          }
          return response.json();
        })
        .then((album) => {
          console.log("album recuperato:", album);
          updateAlbumDetails(album);
        })
        .catch((error) => console.error(error));
    });
  });
});

function updateAlbumDetails(album) {
  const mainContent = document.getElementById("MainContentAlbum");
  mainContent.textContent = ""; //pulisce il contenuto

  //immagine dell'album
  const imgDiv = document.createElement("div");
  const albumImage = document.createElement("img");
  albumImage.src = album.cover;
  albumImage.style.maxHeight = "170px";
  imgDiv.appendChild(albumImage);

  //tutti i dettagli dell'album
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "ps-3 pt-4";
  detailsDiv.innerHTML = `
      <small>ALBUM</small><br>
      <strong class="fs-1 fw-bold">${album.title}</strong><br>
    `;

  //dettagli per l'artista dell'album
  const artistDiv = document.createElement("div");
  artistDiv.className = "d-flex align-items-center pt-4";
  const artistImage = document.createElement("img");
  artistImage.src = album.artist.picture;
  artistImage.width = 25;
  artistImage.className = "rounded-circle shadow";
  const artistInfo = document.createElement("small");
  artistInfo.innerHTML = `${album.artist.name} • ${album.release_date} • ${album.tracks.data.length} brani,<span class="opacity-50"> ${album.duration} min</span>`;

  artistDiv.appendChild(artistImage);
  artistDiv.appendChild(artistInfo);

  detailsDiv.appendChild(artistDiv);

  mainContent.appendChild(imgDiv);
  mainContent.appendChild(detailsDiv);

  console.log("l'album è stato agiornato");
}

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
