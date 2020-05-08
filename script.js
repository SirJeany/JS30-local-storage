'use strict';

const addItems = document.querySelector('.add-items');
const deselectItems = document.querySelector('.deselect-items');
const deleteAllItems = document.querySelector('.delete-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    let text = this.querySelector('[name="item"]').value; // get the value of the food item

    let item = {
        text, // same as saying 'text: text' (new es6 format)
        done: false // for the checklist
    }
    console.log(item);

    items.push(item);

    populateList(items, itemsList); // use this function to update html

    // Handle local storage:
    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); // Clear input
    this.querySelector('[name="item"]').focus(); //get focus on input after submitting
}

// Populate list for adding to the html:
// Note: we are going to pass in the parameters of what is already outside (items and itemsList).
//      this makes our function way more versitile -> We now pass in the html document where the list 
//      should be displayed (so we can diplay in multiple places), as well as the array of plate items.
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done? "checked":''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');


    // This was problematic since we dont want to send in a single added item, but rather the whole list.
    // Meaning at the beginning this wont handle populating the existing list of items.
    // let newItem = document.createElement('li');
    // newItem.innerHTML = `<label>${plates.text}</label>`;
    // platesList.appendChild(newItem);
}

addItems.addEventListener('submit', addItem);

// To handle the checking of items.
// Simply adding an event listener to all list items -> checkboxes being selected is not going to work...
// The list items are not fully there yet when we would try and do that...
// Instead we tell the parent of the list (ul) to add the appropriate event listener to each of its children (as they are being created).
function toggleDone(e) {
    // console.log(e.target) // So we look at the target that is being pressed within the parent
    console.log('hello')
    const target = e.target;
    if(!target.matches('input')) return; // Skip if an input was not selected

    const index = target.dataset.index
    // console.log(index)

    items[index].done = !items[index].done;

    // update local storage
    localStorage.setItem('items', JSON.stringify(items));
    // populate the list again:
    populateList(items, itemsList);
}
// Dont select all inputs of itemslist...
itemsList.addEventListener('click', toggleDone);

// ToDO:
// Add: Uncheck all, Check all, Delete?

// Uncheck all:
function deselectAll(plates = [], platesList) {
    // return console.log('Hello')
    plates.forEach(plate => {
        plate.done = false;
    });

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items,itemsList);
}
// https://stackoverflow.com/questions/16310423/addeventlistener-calls-the-function-without-me-even-asking-it-to
deselectItems.addEventListener('click', function() { deselectAll(items, itemsList) });

// Delete all items from list:
function deleteAll(plates = [], platesList) {
    while(plates.length > 0) {
        plates.pop();
    }

    localStorage.setItem('items', JSON.stringify(items));
    populateList(items,itemsList);
}

deleteAllItems.addEventListener('click', function() { deleteAll(items, itemsList) });

// To populate the list on page-load:
populateList(items, itemsList);