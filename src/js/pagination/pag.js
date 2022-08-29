window.addEventListener("load", createPaginationOnLoad);
const ref = {
    paginatedList: document.querySelector(".paginated__list"),
    paginationOrder: document.querySelector(".pagination__order"),
    forwardDots: document.querySelector(".js-forward-dots"),
    backDots: document.querySelector(".js-back-dots"),
    firstPage: document.querySelector(".js-1st-page"),
}



// console.log(ref.paginatedList.children[2]);

ref.paginatedList.children[3]?.addEventListener('click', onClickFwd);
ref.paginatedList.children[1]?.addEventListener('click', onClicBack);

function onClickFwd() {
    ref.backDots.classList.remove('js-hidden');
    ref.firstPage.classList.remove('item-active');
    const pageB4Dots = Number(ref.paginationOrder.children[3].textContent);
    createOnFwd(pageB4Dots)
}

function onClicBack(params) {
    const pageAferDots = Number(ref.paginationOrder.children[0].textContent);
    createOnBack(pageAferDots)

}



function createPaginationOnLoad(params) {
    const serverResponce = JSON.parse(localStorage.getItem('event'));
    const totalPagesFromServer = 9;
    const totalPagesOnSite = totalPagesFromServer - 1;
    const isPage7 = totalPagesOnSite <= 7;
    if (totalPagesFromServer === 0) {
        ref.paginatedList.innerHTML = '<li class="paginated__item item-active">No results</li>'
        return
    }
    isPage7 ? pagesOnSite7(totalPagesOnSite) : createLastPage(totalPagesOnSite);
}
function createLastPage(totalPagesOnSite) {
    const lastPage = document.createElement('li');
    lastPage.textContent = `${totalPagesOnSite}`;
    lastPage.classList.add('paginated__item');
    ref.paginatedList.append(lastPage);
    // return console.log('function createLastPage');
}

function pagesOnSite7(totalPagesOnSite) {
    let template = `<li class="paginated__item item-active">1</li> `;

    for (let i = 1; i < totalPagesOnSite; i++) {
        template += `<li class="paginated__item">${i + 1}</li>`
    }
    ref.forwardDots.classList.add('js-hidden')
    ref.paginationOrder.innerHTML = template;
}

function createOnFwd(pageB4Dots) {
    let template = ``;
    for (let i = pageB4Dots; i <= pageB4Dots + 1; i++) {
        template += `<li class="paginated__item">${i}</li>`
    }
    template += `<li class="paginated__item item-active">${pageB4Dots + 2}</li> `;

    for (let i = pageB4Dots + 3; i <= pageB4Dots + 4; i++) {
        template += `<li class="paginated__item">${i}</li>`
    }
    ref.paginationOrder.innerHTML = template;
}

function createOnBack(pageAferDots) {
    let template = ``;
    for (let i = pageAferDots - 3; i <= pageAferDots - 2; i++) {
        template += `<li class="paginated__item">${i}</li>`
    }
    template += `<li class="paginated__item item-active">${pageAferDots - 1}</li> `;

    for (let i = pageAferDots; i <= pageAferDots + 1; i++) {
        template += `<li class="paginated__item">${i}</li>`
    }
    ref.paginationOrder.innerHTML = template;
}