import { createMainContent, enableEventListeners } from './main.js';
import { createScoreContent } from './score.js';
import { createCommentsContent } from './comments.js'

const initializePage = () => {
    // Create container
    const container = document.createElement("section");
    container.className = "container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.marginTop = "20px";
    document.body.appendChild(container);
};

window.onload = () => {
    initializePage();
    createMainContent();
    enableEventListeners();
    createScoreContent();
    createCommentsContent();
};
