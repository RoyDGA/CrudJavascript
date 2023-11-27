var listElementObjects = [];

let ul = document.createElement("ul");
document.body.appendChild(ul);  


function index() {
    capturarInput();
    imprimirLista();
}

window.onload = () =>{
    var storedList = JSON.parse(localStorage.getItem("listElementObjects"));
    if (storedList) {
        listElementObjects = storedList;
        imprimirLista();
    }
}

function capturarInput(){
    const inputText = document.querySelector('.inputText').value;
    listElementObjects.push({inputText});

    localStorage.setItem("listElementObjects", JSON.stringify(listElementObjects));
}

function imprimirLista(){
    // CLEAN LIST
    ul.textContent = '';

    // ITERATOR LIST
    listElementObjects.forEach((item, index) => {

        // CREATE BUTTON DELETE
        let buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("class", "Delete border-2 border-red-700");
        buttonDelete.textContent = 'Delete';

        // CREATE EVENT DELETE
        buttonDelete.addEventListener("click", function(){
            DeleteItem(index);
        });

        // CREATE BUTTON UPDATE
        let buttonUpdate = document.createElement('button');
        buttonUpdate.setAttribute('class','Update border-2 border-green-700');
        buttonUpdate.textContent = 'Update';

        // CREATE INPUT FOR UPDATE
        var updateInput = document.createElement('input');
        updateInput.type = 'text';
        updateInput.setAttribute("class","text-black updateInput border-2 border-green-700");

        // CREATE EVENT UPDATE
        buttonUpdate.addEventListener("click", () => {
            updateItem(index, updateInput);
        });

        // CREATE ELEMENT LI AND CHILDREN
        let p = document.createElement("p");

        let li = document.createElement("li");
        li.setAttribute("class","border-b-2 border-gray-500 my-2 p-4");
        let itemListObjects = document.createTextNode(`Elemento(${index + 1}): ${item.inputText}`);
        
        p.appendChild(itemListObjects);

        li.append(p, buttonDelete, updateInput, buttonUpdate);
        ul.appendChild(li);
    });
}


// FUNCTION DELETE ITEM
function DeleteItem(index) {
    listElementObjects.splice(index, 1);

    localStorage.setItem("listElementObjects", JSON.stringify(listElementObjects));
    imprimirLista();
}

// FUNCTION UPDATE ITEM
function updateItem(index, updateInput) {
    let newText = updateInput.value;

    let li = ul.children[index];
    let firstitem = li.querySelector('p');
    firstitem.textContent = `Elemento:(${index + 1}): ${newText}`;

    localStorage.setItem("listElementObjects", JSON.stringify(listElementObjects));
}
