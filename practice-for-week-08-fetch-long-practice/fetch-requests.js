/*
Make fetch requests in the browser for each of the following phases.
Paste your code for fetch requests here once you finish each phase.
*/

/* ============================== Phase 1 ============================== */

// Your code here
fetch("/products", {
    method: "POST",
    body: "name=Caribbean+Delight+Coffee&description=Made+by+Manatee+Coffee&price=11%2E99&categories=grocery",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});


/* ============================== Phase 2 ============================== */

// Your code here
fetch("/products", {
    method: "POST",
    body: "name=Caribbean+Delight+Coffee&description=Made+by+Manatee+Coffee&price=11%2E99&categories=grocery",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
    .then((response) => {
        console.log("Status Code:", response.status);
        console.log("Content-Type:", response.headers.get("Content-Type"));
        console.log("Re-directed:", response.redirected);
        console.log("Redirect URL:", response.url);
    })
    .catch((err) => {
        console.log(err);
    });


/* ============================== Phase 3 ============================== */

// Your code here
fetch("products", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
     name: "Caribbean Delight Coffee",
     description: "Made by Manatee Coffee",
     price: 11.99,
     categories: "grocery"
    })
})
    .then((res) => {
        console.log("Status Code:", res.status);
        console.log("Content-Type:", res.headers.get("Content-Type"));
        console.log("Re-directed:", res.redirected);
        console.log("Redirect URL:", res.url);
    })
    .catch((err) => {
        console.log(err);
    })
