const select = () => {
    /* Write queries for each of the following */

    /* Section 1 */
    // 1. Get all seeded fruit elements
    // Your code here
    console.log("--------------------------------\nGet ALL SEEDED fruit elements\n--------------------------------");

    let seededFruitsArr = [];
    let seededFruits = document.querySelectorAll(".seed"); // Value returned from query selector all is a node list

    // print nodelist format
    console.log(seededFruits);

    seededFruits.forEach(fruit => {
        console.log(fruit);                 // print individual element
        seededFruitsArr.push(fruit);        // push to an array
    });

    // print array format
    console.log(seededFruitsArr);


    // 2. Get all seedless fruit elements
    // Your code here
    console.log("--------------------------------\nGet ALL SEEDED fruit elements\n--------------------------------");
    let seedlessFruitsArr = [];
    let seedlessFruits = document.querySelectorAll(".seedless"); // Value returned from query selector all is a node list

    // print nodelist format
    console.log(seedlessFruits);

    seedlessFruits.forEach(fruit => {
        console.log(fruit);               // print individual element
        seedlessFruitsArr.push(fruit);    // push to an array
    });

    // print array format
    console.log(seedlessFruitsArr);

    // 3. Get first seedless fruit element
    // Your code here
    console.log("--------------------------------\nGet FIRST SEEDED fruit element\n--------------------------------");

    let firstSeededFruit = document.querySelector(".seed");
    console.log(firstSeededFruit);

    /* Section 2 */
    // 4. Get inner span with text "you"
    // Your code here
    console.log("--------------------------------\nGet inner span with text 'you'\n--------------------------------");

    let youSpan = document.querySelector("span");
    console.log("Span Element:", youSpan);
    console.log("Inner Span Text:", youSpan.innerText);

    // 5. Get all children of element "wrapper"
    // Your code here

    console.log("--------------------------------\nGet all children of element 'wrapper'\n--------------------------------");

    let divWrapperChildren = document.getElementById("wrapper").children;

    // print HTML Collection format
    console.log(divWrapperChildren);

    let childrenArr = [];
    for (let child of divWrapperChildren) {
        console.log(child);
        childrenArr.push(child);
    }

    console.log(childrenArr);


    // 6. Get all odd number list items in the list
    // Your code here
    console.log("--------------------------------\nGet all odd number list items in the list\n--------------------------------");

    const oddItems = document.querySelectorAll(".odd");

    // Print NodeList format:
    console.log(oddItems);

    const oddItemsArr = [];
    oddItems.forEach(item => {
        console.log(item);
        oddItemsArr.push(item);
    });

    console.log(oddItemsArr);


    // 7. Get all even number list items in the list
    // Your code here
    console.log("--------------------------------\nGet all even number list items in the list\n--------------------------------");

    const evenItems = document.querySelectorAll("ol li:not(.odd)");

    // Print NodeList format
    console.log(evenItems);

    const evenItemsArr = [];
    evenItems.forEach(item => {
        console.log(item);
        evenItemsArr.push(item);
    });

    console.log(evenItemsArr);


    /* Section 3 */
    // 8. Get all tech companies without a class name
    // Your code here
    console.log("--------------------------------\nGet all tech companies without a class name\n--------------------------------");

    const anchors = document.querySelectorAll("a");

    let anchorsArr = [];
    anchors.forEach(anchor => {
        if (!anchor.className) {
             console.log(anchor);
             anchorsArr.push(anchor);
        }
    });

    console.log(anchorsArr);

    // 9. Get "Amazon" list element
    // Your code here
    console.log("--------------------------------\nGet 'Amazon' anchor element\n--------------------------------");

    const anchorsAmazon = document.querySelectorAll("a");

    anchorsAmazon.forEach(anchor => {
        if (anchor.innerText === 'Amazon') console.log(anchor);
    });

    // 10. Get all unicorn list elements (not the image element)
    // Your code here

    console.log("--------------------------------\nGet all unicorn list elements (not the image element)\n--------------------------------");


    const liSelect = document.querySelectorAll("li");

    const unicornArr = [];

    liSelect.forEach(item => {
        if (item.querySelector("img.unicorn")) {
            console.log(item);
            unicornArr.push(item);
        }
    });

    console.log(unicornArr);

}

window.onload = select;
