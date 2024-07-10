// Your code here

function initPage() {
    const pageBody = document.querySelector("body");

    // create h1 header
    const mainHeader = document.createElement("h1");
    mainHeader.id = "page-header";
    mainHeader.innerText = "Catsagram";

    pageBody.appendChild(mainHeader);

    fetchNewCat();
}

function fetchNewCat() {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then (data => {
            console.log(data);
            console.log(data[0].url);
            if(data[0].url) {
                createCatCard(data[0].url);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function createCatCard(url) {
    const catCardDiv = document.createElement('div');
    catCardDiv.classList.add("cat-card-container");

    const catCardHeader = document.createElement('h2');
    catCardHeader.classList.add("cat-card-header");
    catCardHeader.innerText = "Cat Picture";

    const catCardImg = document.createElement("img");
    catCardImg.classList.add("cat-card-img");
    catCardImg.src = url;
    catCardImg.alt = "cat picture";

    catCardDiv.appendChild(catCardHeader);
    catCardDiv.appendChild(catCardImg);

    const pageBody = document.querySelector("body");
    pageBody.appendChild(catCardDiv);
}

// create cat card function could also be expressed in the following way using async / await:
// const fetchImage = async () => {
//     // Fetch image from API and set img url
//     try {
//         const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
//         // Converts to JSON
//         const kittenData = await kittenResponse.json();
//         // console.log(kittenData);
//         const kittenImg = document.querySelector("img");
//         kittenImg.src = kittenData[0].url;
//     } catch (e) {
//         console.log("Failed to fetch image", e);
//     }
// };
window.onload = initPage;
