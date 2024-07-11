export function createCommentsContent() {
    const commentsContainer = document.createElement("div");
    commentsContainer.style.width = "100%";
    commentsContainer.style.display = "flex";
    commentsContainer.style.flexDirection = "column";
    commentsContainer.style.alignItems = "center";

    const inputContainer = createCommentEntryElements();
    const displayContainer = createCommentsDisplay();

    commentsContainer.appendChild(inputContainer);
    commentsContainer.appendChild(displayContainer);

    const contentContainer = document.querySelector(".container");
    contentContainer.appendChild(commentsContainer);
}

function createCommentEntryElements() {
    const inputContainer = document.createElement("div");

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "comment-input");
    inputLabel.innerText = "Comment:";

    const input = document.createElement("input");
    input.id = "comment-input";
    input.type = "text";
    input.name = "comment-input";
    input.placeholder = "Add a comment...";
    input.style.margin = "0 .7rem 0 .2rem";

    const btnSubmit = document.createElement("button");
    btnSubmit.id = "btn-submit";
    btnSubmit.type = "submit";
    btnSubmit.innerText = "Submit";

    btnSubmit.addEventListener("click", submitComment);

    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(input);
    inputContainer.appendChild(btnSubmit);
    return inputContainer;
}

function createCommentsDisplay() {
    const commentsContainer = document.createElement("div");
    commentsContainer.id = "comment-display";
    commentsContainer.style.margin = "1rem 3rem";
    commentsContainer.style.border = "2px solid darkgray";
    commentsContainer.style.width = "800px";
    commentsContainer.style.height = "300px";
    commentsContainer.style.overflow = "auto";

    return commentsContainer;
}

function submitComment() {
    const commentsContainer = document.getElementById("comment-display");
    const input = document.getElementById("comment-input");

    const newComment = document.createElement("div");
    newComment.style.margin = ".5rem 1rem";
    newComment.innerText = input.value;

    commentsContainer.appendChild(newComment);
    input.value = "";
}
