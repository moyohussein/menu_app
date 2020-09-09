
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
    const article = create('article');
    article.classList.add(menuItem['category']);
    const header = create('header');
    const h2 = create('h2');
    h2.textContent = `${menuItem['title']}`;
    const h3 = create('h3');
    h3.textContent = `$ ${menuItem['price']}`;
    const myFig = create('figure');
    myFig.classList.add('fig');
    const image = create('img');
    image.src = `${menuItem['img']}`
    const para = create('p');
    para.textContent = `${menuItem['desc']}`;
    article.appendChild(header);
    header.appendChild(h2);
    myFig.appendChild(h3);    
    article.appendChild(para);
    myFig.appendChild(image);
    article.appendChild(myFig);
    section.appendChild(article);
};

//creates and returns a button element
function createButton(item) {
    const buttonElem = document.createElement('input');
    buttonElem.type = 'button';
    buttonElem.value = `${item}`;
    return buttonElem;
}

function createArticleBtns (elem) {
  const menuButtons = ["all", ...new Set(elem.map(item => item['category']))];
  
  menuButtons.forEach(item => {
    const button = createButton(item);
    button.value === 'all' ? button.classList.add('active') : '';
    menu.appendChild(button);

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