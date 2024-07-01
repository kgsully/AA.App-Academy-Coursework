export function changeTitle() {
    // Change the title of the page to "(Your name)'s Portfolio"

    // Your code here
    document.title = "Ken Sully's Portfolio";
}

export function changeHeader() {
    // Change the name in the h1 of the page to your name

    // Your code here
    let headerDiv = document.body.children[0];
    let h1 = headerDiv.children[0];
    h1.innerText = "I am Ken Sully"

}

export function changeAboutMe() {
    /* Update the first paragraph in the About Me section with a small
     passage about yourself */

    // Your code here
    let aboutDiv = document.body.children[1];
    let aboutPara1 = aboutDiv.children[1];
    let aboutPara2 = aboutDiv.children[2];

    aboutPara1.innerText = "I am an aspiring software engineer / developer who is currently enrolled in the App Academy open course";
    aboutPara2.innerText = "I started my career as a mechanical engineer, but transitioned to industrial control systems / automation.";
}
