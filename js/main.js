'use strict';

//Qué necesito?
//1 array vacío para los resultados
//1 array vacío para favoritos
// const cards (items) traídas del API

let results = [];
let favorites = [];
// let item = {
//   name:
//   image:
//   id:
// };

/// 1. EVENT LISTENER QUE RECOGE LA INFO DEL API CUANDO EL USUARIO ENVÍA UNA BÚSQUEDA

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

/// 2. PINTO EN DOM LOS RESULTADOS QUE ME PROPORCIONA EL API

const showResults = () => {
  console.log(results);
  let insertHTML = '';
  for (const result of results) {
    console.log(result.show.image);
    insertHTML += `<li class="list__item" id="${result.show.id}">`;
    if (result.show.image === null) {
      insertHTML += `<img src="otra cosa" class="item__img" alt="cover image"/>`;
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

const listenSeries = () => {
  ///3. CREO EL EVENT LISTENER QUE ME AYUDA A PINTAR EN FAVORITOS AQUELLOS ITEMS CLICADOS
  const favButton = document.querySelector('.list__item');
  favButton.addEventListener('click', addToFavorites);
};

const addToFavorites = function (event) {
  console.log('Me han clicado');
  //para favorites.push (RESULT CON EL ID ya que me sirve el mismo fetch?)
};
