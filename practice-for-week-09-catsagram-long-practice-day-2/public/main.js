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

    // Create div for user interactive items (score, upvote/downvote/comment etc.)
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `
                        <p>Popularity Score:
                            <span id="score">X</span>
                        </p>
                        <button id="upvote" type="button" style="margin-right: 0.5rem";>Upvote</button>
                        <button id="downvote" type="button" style="margin-left: 0.5rem";>Downvote</button>
                        <div style="margin: 1rem 0;>
                            <label for="comment">Comment:</label>
                            <input type="text" id="comment-field" name="comment" placeholder="Add a comment...">
                            <button id="submit" type="button" style="margin: 0 1rem;">Submit</button>
                        </div>
                        `;
    userDiv.style.margin = "0";
    userDiv.style.textAlign = "center";

    // create text area
    const comments = document.createElement("textarea");
    comments.id = "comments";

    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(btnNewCat);
    container.appendChild(img);
    container.appendChild(userDiv);
    container.appendChild(comments);

    fetchImage();
};

export const enableEventListeners = () => {
    // Create event listener for new cat button
    const newCat = document.getElementById("btn-new-cat");
    newCat.addEventListener("click", fetchImage);
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
