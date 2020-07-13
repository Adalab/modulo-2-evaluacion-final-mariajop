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
    let favClass = '';
    const isFav = favorites.find((favorite) => favorite.show.id === result.show.id);

    if (isFav !== undefined) {
      favClass = 'is-favorite';
    }

    insertHTML += `<li class="list__item ${favClass} " id="${result.show.id}">`;
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
    favButton.addEventListener('click', handleClicks);
  }
};

/// 4. AÑADO LOS ITEMS CLICADOS AL ARRAY DE FAVORITOS:

const handleClicks = (event) => {
  const clickedId = parseInt(event.currentTarget.id);
  const favFilm = results.find((result) => result.show.id === clickedId);
  const savedFilm = favorites.findIndex((favorite) => favorite.show.id === clickedId);

  //Indicando la condición que evita que se añada por duplicado un item que ya está en favoritos + aquella que lo elimina de favoritos si volvemos a clicar en el item:

  if (savedFilm === -1) {
    favorites.push(favFilm);
  } else {
    favorites.splice(savedFilm, 1);
  }
  showFavorites();
  updateLocalStorage();
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
    insertHTML += `<input type="image" class="js-delete-fav-button" src="./images/delete_icon.svg" id="${favorite.show.id}"/>`;
    insertHTML += `<h3 class="item__title">${favorite.show.name}</h3>`;
    insertHTML += `</li>`;
  }
  insertHTML += `<button class="js-empty-favs-button">Delete all favorites</button>`;

  const favItem = document.querySelector('.js-favorites-list');
  favItem.innerHTML = insertHTML;

  const btnResetFavs = document.querySelector('.js-empty-favs-button');
  btnResetFavs.addEventListener('click', removeAllFavs);

  listenDeleteButtons();
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

/// 7. BOTÓN QUE ELIMINA 1 FAVORITO:

const listenDeleteButtons = () => {
  const deleteBtns = document.querySelectorAll('.js-delete-fav-button');
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', handleDelete);
  }
};

///no funciona aún :(
const handleDelete = (event) => {
  console.log(event);
  const clickedId = parseInt(event.currentTarget.id);
  const favFilm = results.find((result) => result.show.id === clickedId);
  const savedFilm = favorites.findIndex((favorite) => favorite.show.id === clickedId);

  if (savedFilm !== -1) {
    favorites.splice(savedFilm, 1);
  }
  showFavorites();
  updateLocalStorage();
};

// 8. FUNCIÓN QUE BORRA TODOS LOS FAVORITOS:

const removeAllFavs = () => {
  favorites = [];
  updateLocalStorage();
  showFavorites();
};

// START APP
getFromLocalStorage();
showResults();
showFavorites();
