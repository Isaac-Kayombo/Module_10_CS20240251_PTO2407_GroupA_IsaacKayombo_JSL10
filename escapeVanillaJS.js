document.addEventListener("DOMContentLoaded", () => {
    // DISPLAYING MOST RECENT BOOK TO DOM.
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    // DISPLAYING COMMON CONCONCEPTS TO DOM. 
    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // ASYNCHRONOUS FUNCTION 
    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                    .then(message => {
                        document.getElementById("room3Result").innerHTML = message;
                    });
            });
    });
});

// LOGIC FOR CHECKING  MOST RECENT BOOK. 
function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

// LOOPING THROUGH BOTH SETS TO CHECK FOR COMMON ITEM.
function findIntersection(setA, setB) {
    const intersection = new Set();
    for (let item of setA) {
        if (setB.has(item)) {
            intersection.add(item);
        }
    }
    return intersection;
}

// ASYNC/AWAIT FUNCTION TO RUN WITH A 1 SECOND DELAY
async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

