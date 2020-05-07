'use strict';

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
    e.preventDefault();
    let item = addItems.querySelector('[name="item"]').value; // get the value of the food item
    console.log(item);

    items.push(item);

    let newItem = document.createElement('li');
    newItem.innerText = item;
    itemsList.appendChild(newItem);
}

addItems.addEventListener('submit', addItem);