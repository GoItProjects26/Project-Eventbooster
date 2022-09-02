// import { EventApi } from "../api";
// import { renderMarckup } from '../renderHtml';

// export const ref = {
//     eventList: document.querySelector('.event_list '),
//     paginatedList: document.querySelector(".paginated__list"),
//     paginationOrder: document.querySelector(".pagination__order"),
//     forwardDots: document.querySelector(".js-forward-dots"),
//     backDots: document.querySelector(".js-back-dots"),
//     firstPage: document.querySelector(".js-1st-page"),
//     lastPage: document.querySelector('.js-last-page'),
// }

// const serverResponce = JSON.parse(localStorage.getItem('event'));
// const totalPagesFromServer = serverResponce ? serverResponce.page.totalPages : 7;
// const totalPagesOnSite = totalPagesFromServer - 1 > 62 ? 62 : totalPagesFromServer - 1;

// // window.addEventListener("load", createPaginationOnLoad(totalPagesFromServer, totalPagesOnSite));

// ref.paginatedList.addEventListener('click', loadNewSet);
// ref.paginatedList.children[3]?.addEventListener('click', onClickFwd);
// ref.paginatedList.children[1]?.addEventListener('click', onClicBack);

// function loadNewSet(event) {
//     if (event.target.nodeName !== "LI") {
//         return
//     }
//     if (event.target.textContent === '....') {
//         return
//     }
//     if (event.target.textContent === '...') {
//         return
//     }

//     if (+event.target.textContent === 1) {
//         ref.backDots.classList.add('js-hidden');
//         ref.forwardDots.classList.remove('js-hidden');
//         ref.paginationOrder.innerHTML = ` <li class="paginated__item">2</li>
//                                            <li class="paginated__item">3</li>
//                                             <li class="paginated__item">4</li>
//                                              <li class="paginated__item">5</li>`
//     }
//     if (event.target === ref.paginatedList.lastElementChild) {
//         const lastPage = ref.paginatedList.lastElementChild.textContent
//         ref.backDots.classList.remove('js-hidden');
//         ref.forwardDots.classList.add('js-hidden');
//         ref.paginationOrder.innerHTML = ` <li class="paginated__item">${lastPage - 4}</li>
//                                            <li class="paginated__item">${lastPage - 3}</li>
//                                             <li class="paginated__item">${lastPage - 2}</li>
//                                              <li class="paginated__item">${lastPage - 1}</li>`
//     }
//     [...ref.paginatedList.children].forEach(el => el.classList.remove('item-active'));
//     [...ref.paginationOrder.children].forEach(el => el.classList.remove('item-active'));
//     event.target.classList.add('item-active')
//     EventApi.setPage(+event.target.textContent - 1);
//     renderMarckup();
// }

// function onClickFwd() {
//     const pageB4Dots = Number(ref.paginationOrder.lastElementChild.textContent);
//     const diff = totalPagesOnSite - pageB4Dots;
//     ref.backDots.classList.remove('js-hidden');
//     ref.firstPage.classList.remove('item-active');
//     EventApi.setPage((+ref.paginationOrder.lastElementChild.textContent) + '');
//     renderMarckup();
//     if (diff <= 4) {
//         ref.forwardDots.classList.add('js-hidden');
//         [...ref.paginatedList.children].forEach(el => el.classList.remove('item-active'));
//         [...ref.paginationOrder.children].forEach(el => el.classList.remove('item-active'));
//         let template = '';
//         for (let i = pageB4Dots - 1; i <= pageB4Dots; i++) {
//             template += `<li class="paginated__item">${i}</li>`
//         }
//         template += `<li class="paginated__item item-active">${pageB4Dots + 1}</li> `;
//         for (let i = pageB4Dots + 2; i < totalPagesOnSite; i++) {
//             if (i === totalPagesOnSite) {
//                 break
//             }
//             template += `<li class="paginated__item">${i}</li>`
//         }

//         ref.paginationOrder.innerHTML = template;
//         return
//     }

//     createOnFwd(pageB4Dots)
// }

// function onClicBack(params) {
//     const pageAferDots = Number(ref.paginationOrder.children[0].textContent);
//     ref.forwardDots.classList.remove('js-hidden');
//     ref.paginatedList.children[4].classList.remove('js-hidden')
//     EventApi.setPage((+ref.paginationOrder.firstElementChild.textContent) + '');
//     renderMarckup();
//     if (pageAferDots === 4) {
//         ref.forwardDots.classList.remove('js-hidden')
//         ref.backDots.classList.add('js-hidden');
//         ref.firstPage.classList.add('item-active');
//         ref.paginationOrder.innerHTML = ` <li class="paginated__item">2</li>
//                                            <li class="paginated__item">3</li>
//                                             <li class="paginated__item">4</li>
//                                              <li class="paginated__item">5</li>`
//         return
//     }
//     createOnBack(pageAferDots);

// }

// export function createPaginationOnLoad(totalPagesFromServer, totalPagesOnSite) {
//     ref.paginatedList.classList.remove('js-hidden')
//     const isPage7 = totalPagesOnSite <= 7;
//     if (totalPagesFromServer === 0) {
//         ref.paginatedList.classList.add('js-hidden')
//         return
//     }
//     isPage7 ? pagesOnSite7(totalPagesOnSite) : createLastPage(totalPagesOnSite);
// }

// export function createLastPage(totalPagesOnSite) {
//     if (totalPagesOnSite >= 62) {
//         ref.lastPage.textContent = 62;
//         return;
//     }
//     ref.lastPage.textContent = totalPagesOnSite;
// }

// function pagesOnSite7(totalPagesOnSite) {
//     // console.log('108pag', totalPagesOnSite);
//     ref.lastPage.classList.add('js-hidden');
//     // let template = `<li class="paginated__item item-active">1</li> `;
//     let template = '';
//     for (let i = 1; i <= totalPagesOnSite; i++) {
//         console.log('114');
//         template += `<li class="paginated__item">${i + 1}</li>`
//     }
//     ref.forwardDots.classList.add('js-hidden')
//     totalPagesOnSite <= 1 ? ref.paginationOrder.innerHTML = '' : ref.paginationOrder.innerHTML = template;
// }

// function createOnFwd(pageB4Dots) {
//     let template = ``;
//     for (let i = pageB4Dots - 1; i <= pageB4Dots; i++) {
//         template += `<li class="paginated__item">${i}</li>`
//     }
//     template += `<li class="paginated__item item-active">${pageB4Dots + 1}</li> `;

//     for (let i = pageB4Dots + 2; i <= pageB4Dots + 3; i++) {
//         template += `<li class="paginated__item">${i}</li>`
//     }
//     ref.paginationOrder.innerHTML = template;
// }

// function createOnBack(pageAferDots) {
//     let template = ``;
//     for (let i = pageAferDots - 3; i <= pageAferDots - 2; i++) {
//         template += `<li class="paginated__item">${i}</li>`
//     }
//     template += `<li class="paginated__item item-active">${pageAferDots - 1}</li> `;

//     for (let i = pageAferDots; i <= pageAferDots + 1; i++) {
//         template += `<li class="paginated__item">${i}</li>`
//     }
//     ref.paginationOrder.innerHTML = template;
// }
