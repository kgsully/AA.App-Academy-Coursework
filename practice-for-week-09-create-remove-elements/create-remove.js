/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await res.json();

        const url = data.message; // URL of new dog image

        /*--------------- Get breed (Hint: Parse from URL) ---------------- */
        // Your code here
        console.log(url);
        const breed = url.split('/')[4];
        console.log(breed);

        /*------------ Create new dog card with the url above ------------- */
        /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
        // Your code here
        const newDogCard = document.createElement("li");
        newDogCard.innerHTML = `
            <figure>
                <img src=${url}>
                <figcaption>${breed}</figcaption>
            <figure>`

        /* Add the new dog card as a child to the ul in the .gallery element */
        // Your code here
        let galleryElement = document.querySelector(".gallery ul");
        console.log(galleryElement);
        galleryElement.appendChild(newDogCard);

    } catch (e) {
        console.log("Couldn't fetch dog :(")
    }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
    /*-------------------- Select the first dog card --------------------- */
    // Your code here
    const firstDogCard = document.querySelector(".gallery ul li");
    console.log(firstDogCard);

    /*-------------------- Remove the first dog card --------------------- */
    // Your code here
    if (firstDogCard) {
        firstDogCard.remove();
    }
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
    /*-------------------- Select the last dog card ----------------------- */
    // Your code here
    const dogCards = document.querySelectorAll(".gallery ul li");
    const lastDogCard = dogCards[dogCards.length - 1];
    console.log(lastDogCard);

    /*-------------------- Remove the last dog card ----------------------- */
    // Your code here
    lastDogCard ? lastDogCard.remove() : '';

});
