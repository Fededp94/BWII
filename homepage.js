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

        /* CREA CARD ARTIST */

        const cardCol = document.createElement("div");

        const card = document.createElement("div");
        card.className = "card border-0 p-2 bg_two";
        card.setAttribute("role", "button");

        const imgArt = document.createElement("img");
        imgArt.className = "card-img-top rounded-circle";
        imgArt.style.maxHeight = "150px";
        imgArt.src = resp.data[1].artist.picture_medium;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body px-0 py-2";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title fs-6";
        cardTitle.innerText = resp.data[1].artist.name;

        const cardP = document.createElement("p");
        cardP.className = "card-text xsmall_txt text-muted";
        cardP.innerText = "Artista";

        /* APPEND */
        showArt.appendChild(cardCol);
        cardCol.appendChild(card);
        card.appendChild(imgArt);
        card.appendChild(cardBody);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardP);
      })
      .catch((err) => console.log(err));
  });
});

/* fetch(urlArt + randomArt, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore fetch");
      }
    })
    .then((resp_art) => {
      console.log(resp_art);
    })
    .catch((err) => console.log(err)); */
