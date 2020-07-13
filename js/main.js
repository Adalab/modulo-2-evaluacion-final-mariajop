'use strict';

//¿QUÉ NECESITO DE PARTIDA?
//1 array vacío para los resultados
//1 array vacío para favoritos

let results = [];
let favorites = [];

/// 1. EVENT LISTENER QUE RECOGE LA INFO DEL API CUANDO EL USUARIO ENVÍA UNA BÚSQUEDA:

const searchButton = document.querySelector('.js-search-button');

const searchDatabase = function (event) {
  event.preventDefault();
  let searchInput = document.querySelector('.js-search-input').value;

  fetch('http://api.tvmaze.com/search/shows?q=' + searchInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      results = data;
      showResults();
      showFavorites();
    });
};

searchButton.addEventListener('click', searchDatabase);

/// 2. PINTO EN EL DOM LOS RESULTADOS QUE ME PROPORCIONA EL API:

const showResults = () => {
  let insertHTML = '';
  for (let result of results) {
    insertHTML += `<li class="list__item" id="${result.show.id}">`;
    if (result.show.image === null) {
      insertHTML += `<img src="./images/img-not-available.jpg" class="item__img" alt="cover image not available"/>`;
    } else {
      insertHTML += `<img src="${result.show.image.medium}" class="item__img" alt="cover image"/>`;
    }
    insertHTML += `<h3 class="item__title">${result.show.name}</h3>`;
    insertHTML += `</li>`;
  }
  const resultItem = document.querySelector('.js-results-list');
  resultItem.innerHTML = insertHTML;

  listenSeries();
};

/// 3. CREO EL EVENT LISTENER EN AQUELLOS ITEMS CLICADOS COMO FAVORITOS:

const listenSeries = () => {
  const favButtons = document.querySelectorAll('.list__item');
  for (const favButton of favButtons) {
    favButton.addEventListener('click', listenClicks);
  }
};

/// 4. AÑADO LOS ITEMS CLICADOS AL ARRAY DE FAVORITOS:

const markFavorite = (showId) => {
  const listItem = document.getElementById(showId);
  listItem.classList.add('is-favorite');
};

const listenClicks = (event) => {
  const clickedId = parseInt(event.currentTarget.id);
  const favFilm = results.find((result) => result.show.id === clickedId);
  const savedFilm = favorites.find((favorite) => favorite.show.id === clickedId);

  //Añadiendo la condición que evita que se añada por duplicado un item que ya tenemos en el array de favoritos:

  if (savedFilm === undefined) {
    favorites.push(favFilm);
    markFavorite(clickedId);
    showFavorites();
    updateLocalStorage();
  }
};

/// 5. PINTO EL ARRAY DE FAVORITOS EN SU SECCIÓN DEL DOM:

const showFavorites = () => {
  let insertHTML = '';
  for (let favorite of favorites) {
    insertHTML += `<li class="list__item" id="${favorite.show.id}">`;
    if (favorite.show.image === null) {
      insertHTML += `<img src="./images/img-not-available.jpg" class="item__img" alt="cover image not available"/>`;
    } else {
      insertHTML += `<img src="${favorite.show.image.medium}" class="item__img" alt="cover image"/>`;
    }
    insertHTML += `<img class="js-delete-favs-button" title="delete" src="./images/delete_icon.svg">`;
    insertHTML += `<h3 class="item__title">${favorite.show.name}</h3>`;
    insertHTML += `</li>`;
  }
  insertHTML += `<button class="js-empty-favs-button">Delete all favorites</button>`;

  const favItem = document.querySelector('.js-favorites-list');
  favItem.innerHTML = insertHTML;

  // const btnResetFavs = document.querySelector('.js-empty-favs-button');
  // btnResetFavs.addEventListener('click', removeAllFavs);
};

/// 6. LOCAL STORAGE:

const updateLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const getFromLocalStorage = () => {
  const dataFromStorage = JSON.parse(localStorage.getItem('favorites'));
  if (favorites !== null) {
    favorites = dataFromStorage;
  }
};

/// 7. FUNCIÓN QUE ELIMINA 1 FAVORITO:
const btnDeleteFav = document.querySelectorAll('.js-delete-favs-button');
btnDeleteFav.addEventListener('click', removeFav);

const removeFav = () => {
  console.log('me han clicado');
};

// 8. BOTÓN QUE BORRA TODOS LOS FAVORITOS:

const removeAllFavs = () => {
  favorites = [];
  updateLocalStorage();
  showFavorites();
};

// START APP
getFromLocalStorage();
showResults();
showFavorites();
