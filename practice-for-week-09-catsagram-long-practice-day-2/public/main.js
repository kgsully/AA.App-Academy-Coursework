export const createMainContent = () => {
    // Create h1
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create New Cat button
    const btnNewCat = document.createElement("button");
    btnNewCat.id = "btn-new-cat";
    btnNewCat.type = "button";
    btnNewCat.innerText = "Get New Cat";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";

    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(btnNewCat);
    container.appendChild(img);

    fetchImage();
};

export const enableEventListeners = () => {
    // Create event listener for new cat button
    const btnNewCat = document.getElementById("btn-new-cat");
    btnNewCat.addEventListener("click", newCat);
};

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};

const newCat = () => {
    // Reset score when a new cat is fetched
    const score = document.getElementById("score");
    score.innerText = "0";

    const comments = document.getElementById("comment-display");
    comments.innerHTML = "";

    fetchImage();
}
