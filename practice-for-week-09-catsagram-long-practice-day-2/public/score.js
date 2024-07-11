
export function createScoreContent() {
    // Create container for score elements:
    const container = document.createElement("div");

    const scoreDisplay = createScoreElements();
    const buttonDisplay = createButtonElements();

    container.appendChild(scoreDisplay);
    container.appendChild(buttonDisplay);

    const contentContainer = document.querySelector(".container");
    contentContainer.appendChild(scoreDisplay);
    contentContainer.appendChild(buttonDisplay);
}

function createScoreElements() {
    const scoreContainer = document.createElement("div");

    const scoreSpan = document.createElement("span");
    scoreSpan.innerText = "Popularity Score:";

    const scoreVal = document.createElement("span");
    scoreVal.id = "score";
    scoreVal.style.marginLeft = ".2rem";
    scoreVal.innerText = "0";

    scoreContainer.appendChild(scoreSpan);
    scoreContainer.appendChild(scoreVal);

    return scoreContainer;
}

function createButtonElements() {
    // Create container for button elements:
    const buttonContainer = document.createElement("div");
    buttonContainer.style.margin = "1rem 0";

    const btnUpvote = document.createElement("button");
    btnUpvote.id = "btn-upvote";
    btnUpvote.type = "button";
    btnUpvote.innerText = "Upvote";
    btnUpvote.style.marginRight = ".5rem";

    const btnDownvote = document.createElement("button");
    btnDownvote.id = "btn-downvote";
    btnDownvote.type = "button";
    btnDownvote.innerText = "Downvote";
    btnDownvote.style.marginLeft = ".5rem";

    buttonContainer.appendChild(btnUpvote);
    buttonContainer.appendChild(btnDownvote);

    btnUpvote.addEventListener("click", vote);
    btnDownvote.addEventListener("click", vote);

    return buttonContainer;
}

function vote(event) {
    const score = document.getElementById("score");
    let scoreVal = Number(score.innerText);

    if (event.target.id === "btn-upvote") {
        scoreVal += 1;
    } else if (event.target.id === "btn-downvote") {
        scoreVal -= 1;
    }

    score.innerText = scoreVal;
}
