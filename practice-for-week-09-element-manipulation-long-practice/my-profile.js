// Encapsulating function to call all other functions to build the page
function buildPage() {
    addTitle();
    addHeader();
    addList();
    addContent();
}

// Array containing list details refactor:
const detailsArray = [
    "I am a licensed mechanical engineer",
    "Prior to learning to code, I was an industrial control systems / automation engineer",
    "I have backpacked around the world with my wife",
    "I enjoy rock climbing, photography, 3D printing, and custom PCB designs for personal microcontroller projects"
];

function addTitle() {
    const newTitle = document.createElement('title');
    newTitle.innerText = "Ken's Profile";
    document.head.appendChild(newTitle);
}

function addHeader() {

    const newHeaderContainer = document.createElement('div');
    newHeaderContainer.id = "header__container";

    const newH1 = document.createElement('h1');
    newH1.className = 'name';
    newH1.innerText = 'Ken Sully';

    newHeaderContainer.appendChild(newH1);
    document.body.appendChild(newHeaderContainer);
}

function addList() {

    // generate details list div container
    let newContainer = document.createElement('div');
    newContainer.className = 'details-container';

    // generate details list ul element and append to div container
    let newUl = document.createElement('ul');
    newUl.className = 'my-details';
    newUl.innerText = 'Details about me:'
    newContainer.appendChild(newUl);

    detailsArray.forEach(detail => {
        let newDetail = document.createElement('li');
        newDetail.className = "detail";
        newDetail.innerText = detail;
        newUl.appendChild(newDetail);
    });

    const detailDateTime = document.createElement('li');
    detailDateTime.className = 'date-time';
    newUl.appendChild(detailDateTime);

    const detailDaysUntilBirthday = document.createElement('li');
    detailDaysUntilBirthday.className = 'days-until-bday';
    newUl.appendChild(detailDaysUntilBirthday);

    document.body.appendChild(newContainer);
}

function addContent() {
    let newContentContainer = document.createElement('div');
    newContentContainer.className = "main__content";

    let newParagraph = document.createElement('p');
    newParagraph.className = "main__content__p"
    newParagraph.innerText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    newContentContainer.appendChild(newParagraph);
    document.body.appendChild(newContentContainer);
}

const dateTimeInterval = setInterval(updateDateTime, 1000);

function updateDateTime() {
    let dateTime = new Date();
    let date = dateTime.toDateString();
    let time = dateTime.toLocaleTimeString();
    let birthday = new Date(`${dateTime.getFullYear()}-08-01T06:00:00.000Z`);
    let daysUntilBirthday = Math.ceil((birthday - dateTime) / 1000 / 60 / 60 / 24);

    let dateTimeDetail = document.querySelector(".date-time");
    dateTimeDetail.innerText = `I am located in Denver, CO and the local date/time here is: ${date} ${time}`;

    let daysUntilBirthdayDetail = document.querySelector('.days-until-bday');
    daysUntilBirthdayDetail.innerText = `Days until my birthday: ${daysUntilBirthday}`;
}

window.onload = () => {
    // Verify successful js script linking
    console.log("JS script file linked successfully");

    // call buildPage to subsequently call all other code to generate the page content
    buildPage();
};
