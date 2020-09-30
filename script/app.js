
const markup = `<header class= 'heading'>
                    <h1>our menu</h1>
                </header>
                <div class="menu"></div>
                <section></section>`;

document.body.innerHTML = markup;
const menu = document.querySelector('.menu');
const section = document.querySelector('section');
const myarticles = document.querySelectorAll('article');
const articleElem = section.children;

//Functions should start with a verb or something to DO

//Fetch the menu immediately using IIFE
(function fetchMenu() {
    fetch('menu.json')
    .then(response => response.json())
    .then(data => {
    createArticleBtns(data);
    data.forEach(createArticle);
}).catch(err => {
    console.log(`There was this error: ${err}`);
});
})();

//Create each article

function create(element) {
    return document.createElement(element);
};
function createArticle (menuItem) {
    section.innerHTML += 
    `<article class=${menuItem['category']}>
    <header>
    <h2>${menuItem['title']}</h2>
    </header>
    <p>${menuItem['desc']}</p>
    <figure class='fig'>
    <h3>${menuItem['price']}</h3>
    <img src='${menuItem['img']}'>
    </figure>
    </article>`
};

//creates and returns a button element
function createButton(item) {
    return `<input type='button' value=${item}>`;
}

function createArticleBtns (elem) {
  const menuButtons = ["all", ...new Set(elem.map(item => item['category']))];
  
  menuButtons.forEach((item, i) => {
    const button = createButton(item);
    menu.innerHTML += button;
    menu.children[i].value === 'all' ? menu.children[i].classList.add('active') : '';

    //add an event listener to the button container 
    menu.addEventListener('click', (e) => {
        const clickedBtn = e.target;
        //when any btn  is clicked, the clicked item bubbles up to the container so e.target is what was clicked
        filterMenu(clickedBtn);
    });

  })
};

function filterMenu(clickedBtn) {
    toggleClass(clickedBtn);
    //spread the content of articleELem to make it an array
    [...articleElem].forEach((el, i) => {
        switch (clickedBtn.value) {
            case el.className:
            case "all":
                articleElem[i].style.display = '';
                break;
            default:
                articleElem[i].style.display = 'none';
        }
    })
};

function toggleClass (clickedBtn) {
    const activeClass = document.getElementsByClassName('active');
    activeClass[0].classList.remove('active');
    clickedBtn.classList.add('active');
}