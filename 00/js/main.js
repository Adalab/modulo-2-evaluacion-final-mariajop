'use strict';

//Qué necesito?
//1 array vacío para los resultados
//1 array vacío para favoritos
// const cards (items) traídas del API
const results = [];
const favorites = [];

//-----------------------

// Pintar los li en el DOM (llamar a la UL con una constante, meter li con una

// INNERHTML
const list = document.querySelector('.js-results-list');
list.innerHTML = '<p>blabla</p>';
//for (see below)

// DOM AVANZADO?
const list = document.querySelector('.js-results-list');
// constante listItem = document.createElement('li')
// list.appendchild(crea el li dentro de la UL)
// ELEMENTO.classList.add("clase")

// for (const film of films) {
// const listItem = document.createElement('li');
//  liElement.id = show.id?
// }

//-----------------------

// 1. Event listener que me pinta info del api cuando hago clic en buscar
