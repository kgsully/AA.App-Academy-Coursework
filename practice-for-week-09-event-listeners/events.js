// Your code here



// DOMContentLoaded event listener
window.addEventListener("DOMContentLoaded", event => {

// Bonus 2 - add section containing a div and a hover event that adds text to the div indicating that it is being hovered over
    const newSection = document.createElement('section');
    newSection.id = "section-5";
    newSection.innerHTML = "<div>Hover over me!</div>";
    document.body.appendChild(newSection);

// Bonus 1 - add button to HTML to allow the user to re-enable event listeners
    const addListeners = document.createElement("button");
    addListeners.id = "add-listeners";
    addListeners.setAttribute("type", "submit");
    addListeners.innerText = "Add Listeners"

    const sectionFour = document.getElementById("section-4");
    sectionFour.style.flexDirection = "row";
    sectionFour.style.justifyContent = "space-around";
    sectionFour.appendChild(addListeners);

// 1. When the DOM is loaded, alert the user that the DOM has loaded.

    // add a modal dialog into the body of the HTML document
    const htmlBody = document.querySelector("body");
    const modalDialog = document.createElement("dialog");
    modalDialog.id = "dom-dialog";
    modalDialog.innerHTML = `
                            <p>The DOM Content has been loaded</p>
                            <button autofocus>Close</button>
                            `;
    htmlBody.appendChild(modalDialog);

    // show modal dialog upon DOMContentLoaded firing
    const dialog = document.querySelector("#dom-dialog");
    dialog.showModal();

    // event handler for close button to clear the dialog and backdrop
    const btnDialogClose = document.querySelector("dialog button");
    btnDialogClose.addEventListener("click", event => {
        dialog.close();
    });

    // ----- definitions for items used in multiple scopes: -----
    const redInput = document.getElementById("red-input");
    const btnAddItem = document.getElementById("add-item");
    const colorSelector = document.getElementById("color-select");
    const colorSelSection = document.getElementById("section-3");
    const hoverDiv = document.querySelector("#section-5 > div");

    // Callback for item 2 - change input background to red
    function changeBackgroundRed(event) {
        if (event.target.value.toLowerCase() === "red") {
            redInput.style.backgroundColor = "red";
        } else {
            redInput.style.backgroundColor = "transparent";
        }
    }

    // Callback for item 3 - list addition
    function listAdd() {
        const listUl = document.querySelector("#section-2 > ul");
        const listInput = document.getElementById("list-add");

        const newListItem = document.createElement("li");
        newListItem.innerText = listInput.value;
        listUl.appendChild(newListItem);
        listInput.value = "";
    }

    // callback for item 4 - color selection
    function changeSectionBgColor(event) {

        colorSelSection.style.backgroundColor = event.target.value;
    }

    // Callback for bonus 2 - change div text
    function hoverDivText(event) {
        event.target.innerText = "Thanks for hovering!";
    }

    // Callback for bonus 2 - change div text
    function notHoverDivText(event) {
        event.target.innerText = "Hover over me!";
    }

    function addEventListeners() {
        console.log("Adding Event Listeners...");

        // 2. When the #red-input input contains the word "red", change the background color of the input to red. Otherwise, remain transparent.
            redInput.addEventListener("input", changeBackgroundRed);

        // 3. When #add-item is pressed, a new <li> element with the value from #list-add is created and appended to the <ul>
            btnAddItem.addEventListener("click", listAdd);

        // 4. When a new color is selected in #color-select, change the background color of the <section> it belongs to.
            colorSelector.addEventListener("change", changeSectionBgColor);

        // BONUS 2 - when hovered over, add text to the DIV to indicate as such
            hoverDiv.addEventListener("mouseover", hoverDivText);
            hoverDiv.addEventListener("mouseout", notHoverDivText);

        // BONUS 3 - global event listener for space bar keypress
        window.addEventListener("keypress", event => {
            if (event.key === " ") {
                alert("You pressed the spacebar!");
            }
        });
    }

    function removeEventListeners() {
        // remove event listeners
        redInput.removeEventListener("input", changeBackgroundRed);
        btnAddItem.removeEventListener("click", listAdd);
        colorSelector.removeEventListener("change", changeSectionBgColor);
        hoverDiv.removeEventListener("mouseover", hoverDivText);
        hoverDiv.addEventListener("mouseout", notHoverDivText);
    }



// 5. When #remove-listeners is clicked, all event listeners from the previous three sections should be removed.
    const btnRemoveListeners = document.getElementById("remove-listeners");
    btnRemoveListeners.addEventListener("click", event => {
        console.log("Removing Event Listeners...");

        // remove colors that were changed due to event listeners
        redInput.value = "";
        redInput.style.backgroundColor = "transparent";
        colorSelSection.style.backgroundColor = "transparent";
        removeEventListeners();
    });


// BONUS 1 - add event listener for add listeners button click
    const btnAddListeners = document.getElementById("add-listeners");
    btnAddListeners.addEventListener("click", addEventListeners);

// Initial call to add event listeners on dom content load
    addEventListeners();

});
