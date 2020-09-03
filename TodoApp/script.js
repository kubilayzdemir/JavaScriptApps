const form = document.querySelector('form');
const input = document.querySelector("#txtTaskName");
const btn = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector('#task-list');
let items ;


loaditems();
eventListeners(); 

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem)
    btn.addEventListener('click', deleteAll)
}

function loaditems(){

    items = getitemsfromls();
    items.forEach(function(item){
        createitem(item);
    });
}

function getitemsfromls() {  // get items from local storage
    if (localStorage.getItem('items') === null) {
        items = [];   
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setitemtols(text){  // set item to Local Storage
    items = getitemsfromls();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemfromLS(text){ // delete item from ls
    items = getitemsfromls();
    items.forEach(function(item,index){
        if (item === text) {
            items.splice(index,1);
        } 
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createitem(text){
        // create li
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(text))
    
        // create a
        const a = document.createElement('a');
        a.classList = 'delete-item float-right';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fas fa-times"></i>'
    
        // add a to li
        li.appendChild(a)

        // add li to ul
        taskList.appendChild(li);
}

function addNewItem(e) {  // add new item

    if (input.value === '') {
        alert('Write something please.')
    }

    //create item
    createitem(input.value)

    // save to LS
    setitemtols(input.value);

    input.value = '' // delete text which in the input
    e.preventDefault();

}

function deleteItem(e) { // delete item

    
    if (e.target.className == 'fas fa-times') {
        if (confirm('Are you sure?')) 
        e.target.parentElement.parentElement.remove();
    }

    // delete from ls
    deleteItemfromLS(e.target.parentElement.parentElement.textContent);

    e.preventDefault();
}

function deleteAll(e) { // delete all

    if (confirm('Are you sure delete all?')) {
        taskList.innerHTML = '';
    }

    localStorage.clear();
    e.preventDefault();
}