/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============== 1. Print the status code of the response =============== */

// Your code here

fetch("/products")
    .then((res) => {
        console.log("Status Code:", res.status);
    })
    .catch((err) => {
        console.log(err);
    });


/* ====== 2. Print true if the status of the response was successful ====== */

// Your code here
fetch("/products")
    .then((res) => {
        console.log("Status Code:", res.status);
        console.log("Status OK:", res.ok);
        return res.text();
    })
    .catch((err) => {
        console.log(err);
    });



/* =================== 3. Print the Content-Type Header =================== */

// Your code here
fetch("/products")
    .then((res) => {
        console.log("Status Code:", res.status);
        console.log("Status OK:", res.ok);
        console.log("Content-Type:", res.headers.get("Content-Type"));
    })
    .catch((err) => {
        console.log(err);
    });



/* ============== 4. Print the body of the response as text =============== */

// Your code here
fetch("/products")
    .then((res) => {
        console.log("Status Code:", res.status);
        console.log("Status OK:", res.ok);
        console.log("Content-Type:", res.headers.get("Content-Type"));
        return res.text();
    })
    .then((text) => {
        console.log("Body:\n", text);
    })
    .catch((err) => {
        console.log(err);
    });
