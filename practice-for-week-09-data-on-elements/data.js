// Your code here

window.addEventListener("DOMContentLoaded", event => {
    console.log("DOM Loaded");
    const listUl = document.getElementById("shopping-list");
    const btnAdd = document.getElementById("add");
    const itemName = document.getElementById("name");
    const selectType = document.getElementById("type");

    btnAdd.addEventListener("click", event => {
        event.preventDefault();

        const newItem = document.createElement("li");
        newItem.innerText = itemName.value;
        newItem.setAttribute("data-type", selectType.value);
        console.log(newItem.dataset);
        listUl.appendChild(newItem);

    });

});
