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
    });
};

searchButton.addEventListener('click', searchDatabase);

/// 2. PINTO EN EL DOM LOS RESULTADOS QUE ME PROPORCIONA EL API:

const showResults = () => {
  let insertHTML = '';
  for (const result of results) {
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

/// 3. CREO EL EVENT LISTENER QUE ME AYUDA A PINTAR EN FAVORITOS AQUELLOS ITEMS CLICADOS:

const listenSeries = () => {
  const favButtons = document.querySelectorAll('.list__item');
  for (const favButton of favButtons) {
    favButton.addEventListener('click', gatherClicks);
  }
};

/// 4. AÑADO ESOS ITEMS CLICADOS AL ARRAY DE FAVORITOS:

const gatherClicks = (event) => {
  debugger;
  const clickedId = parseInt(event.currentTarget.id);
  const favFilm = results.find((result) => result.id === clickedId);
  favorites.push(clickedId);

  addToFavorites();

  //NO TOMA ID, tengo que asociar otro item que no es result.id
};

/// 4. PINTO EL ARRAY EN LA SECCIÓN FAVORITOS:

const addToFavorites = () => {
  let insertHTML = '';
  for (const result of results) {
    insertHTML += `<li class="list__item" id="${result.show.id}">`;
    if (result.show.image === null) {
      insertHTML += `<img src="./images/img-not-available.jpg" class="item__img" alt="cover image not available"/>`;
    } else {
      insertHTML += `<img src="${result.show.image.medium}" class="item__img" alt="cover image"/>`;
    }
    insertHTML += `<img class="favs__button--delete" title="delete" src="./images/delete_icon.svg">`;
    insertHTML += `<h3 class="item__title">${result.show.name}</h3>`;
    insertHTML += `</li>`;
  }
  const favItem = document.querySelector('.js-favorites-list');
  favItem.innerHTML = insertHTML;

  removeFromFavorites();

  //DEFINIR FUNCIÓN QUE SE ACTIVA EN EL EVENT LISTENER DEL BOTÓN PARA ELIMINAR FAVORITOS. PLUS: BOTÓN QUE BORRA TODOS LOS FAVS.
};

//ALMACENAR FAVORITOS EN LOCAL STORAGE:
const updateLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('favorites'));
  if (favorites !== null) {
    favorites = data;
  }
};

// BOTÓN BORRAR TODOS

const btnDeleteAll = document.querySelector('POR CREAR');

const deleteAll = () => {
  cart = [];
  updateLocalStorage();
  showResults();
};

btnDeleteAll.addEventListener('click', resetCart);
