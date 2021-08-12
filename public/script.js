const url = 'https://jsonplaceholder.typicode.com/posts';
let responseData = null;
let isAsc = true;
const uniqueUserIds = [];

function displayGrid(data) {
    const grid = document.getElementById('grid');
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
    data.forEach(element => {
        const div = document.createElement('div');
        const userId = document.createElement('div'); 
        const title = document.createElement('h3');
        const p = document.createElement('p'); 

        userId.innerHTML = '🧑🏻‍💻 '.concat(element.userId); 
        title.innerHTML = element.title;
        p.innerHTML = 'Description: '.concat(element.body); 

        div.appendChild(userId);
        div.appendChild(title);
        div.appendChild(p);
        grid.appendChild(div);
    });
};

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        const groupBy = document.getElementById('groupBy');
        data.forEach((post) => { 
            if(!uniqueUserIds.includes(post.userId)) {
                uniqueUserIds.push(post.userId)
                let selectUserId = document.createElement('option');
                selectUserId.innerHTML = post.userId;
                selectUserId.value = post.userId;
                groupBy.append(selectUserId);
            }
        });
        responseData = data;
        displayGrid(responseData);
    });

function asc(a, b) {
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
}

function desc(a, b) {
    if(a.title < b.title) { return 1; }
    if(a.title > b.title) { return -1; }
    return 0;
}

const sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', function() {
    sortBtn.innerHTML = `Sort Title ${isAsc ? '▲' : '▼'}`;
    displayGrid(responseData.sort(isAsc ? asc : desc));
    isAsc = !isAsc;
}, false);

const groupBy = document.getElementById('groupBy');
groupBy.addEventListener('change', function(event) {
    const userId = event.target.value;
    displayGrid(responseData.filter(function(post) {
        if (userId === '') {
            return true;
        }
        return post.userId == userId;
    }));
}, false);