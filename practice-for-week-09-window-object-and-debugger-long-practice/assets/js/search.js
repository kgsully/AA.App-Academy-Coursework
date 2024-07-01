export function findElementById(id) {
    // Return the element in the DOM with corresponding `id`

    // Your code here
    return htmlBreadthFirstSearch(id, 'id');

}

export function findFirstElementOfTag(tag) {
    // Return the first occurence of an element of tag name `tag`

    // Your code here
    return htmlBreadthFirstSearch(tag, 'tag');
}

export function findFirstElementOfClass(cls) {
    // Return the first occurence of an element of class `cls`

    // Your code here
    return htmlBreadthFirstSearch(cls, 'cls');
}

export function findElementsOfTag(tag) {
    // Return an array of elements that have a tag name of `tag`

    // Your code here
    return htmlBreadthFirstSearch(tag, 'tag', 'all');
}

export function findElementsOfClass(cls) {
    // Return an array of elements that have are of class `cls`

    // Your code here
    return htmlBreadthFirstSearch(cls, 'cls', 'all');
}

function htmlBreadthFirstSearch(value, type, searchType = 'first') {
    // type parameter can take 'id', 'tag', or 'cls' as it's values

    const root = document.children[0];

    const queue = [root];
    let result = [];

    while (queue.length > 0) {
        let node = queue.shift();

        switch (type) {
            case 'id':
                if (node.id === value) {
                    if (searchType === 'first') {
                        return node;
                    }
                    result.push(node);
                }
                break;
            case 'tag':
                if (node.tagName === value) {
                    if (searchType === 'first') {
                        return node;
                    }
                    result.push(node);
                }
                break;
            case 'cls':
                for (let htmlClass of node.classList) {
                    if (htmlClass === value) {
                            if (searchType === 'first') {
                                return node;
                            }
                            result.push(node);
                        }
                }
                break;
            default:
                console.log("Incorrect type argument in function call");
        }

        for (let child of node.children) {
            if (child) {
                queue.push(child);
            }
        }
    }

    return result;
}
