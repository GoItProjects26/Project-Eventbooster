// import { EventApi } from '../api';

// const ref = {
//     paginatedList: document.querySelector(".paginated__list"),
//     paginatedItem: document.querySelector(".paginated__tem"),
//     listenDots: document.querySelector(".js-listen-dots"),
// }

// const eventt = new EventApi;

// // ref.listenDots.addEventListener('click', onClickChangeOrder)
// // ref.paginatedList.addEventListener('click', onClickChangeOrder)

// function fetchByPage(event) {
//     eventt.setPage(event.target.textContent);
//     console.log(ref.paginatedList.children[4].textContent);
//     console.log(event.target.textContent);
// }

// function renderPagination(params) {
//     const serverResponce = JSON.parse(localStorage.getItem('event'));
//     const lastPage = serverResponce.page.totalPages;
//     let template = '<li class="paginated__item js-firstPage">1</li>';
//     for (let i = 2; i <= 5; i += 1) {
//         template += `
//   <li class="paginated__item">${i}</li>
//     `
//     }
//     template += `<li class="paginated__item">...</li>
//   <li class="paginated__item">${lastPage - 1}</li>`;

//     ref.paginatedList.innerHTML = '';
// }

// function onClickChangeOrder(event) {
//     const serverResponce = JSON.parse(localStorage.getItem('event'));
//     const lastPage = serverResponce.page.totalPages - 1;
//     const pageBeforeDots = ref.paginatedList.children[4].textContent;
//     let template = '<li class="paginated__item js-firstPage">1</li>';

//     if (ref.paginatedList.children.length < 7) {
//         console.log('ret7');
//         return
//     }

//     if (+pageBeforeDots >= lastPage - 4) {
//         console.log('re4');
//         for (let i = +pageBeforeDots; i <= (lastPage - 1); i += 1) {
//             template += `
//                     <li class="paginated__item">${i + 1}</li>
//                     `}
//         template += `<li class="paginated__item js-dots">...</li>
//                     <li class="paginated__item js-lastPage">${lastPage}</li>`;
//         ref.paginatedList.innerHTML = template;
//         document.querySelector('.js-dots').remove();
//         document.querySelector('.js-lastPage').remove();
//         return
//     }

//     console.log(pageBeforeDots);

//     for (let i = +pageBeforeDots; i <= (+pageBeforeDots + 3); i += 1) {
//         console.log('cil');
//         template += `
// <li class="paginated__item">${i + 1}</li>
//     `}
//     template += `<li class="paginated__item js-dots js-listen-dots">...</li>
//      <li class="paginated__item js-lastPage">${lastPage}</li>`;
//     ref.paginatedList.innerHTML = template;
//     document.querySelector(".js-listen-dots").addEventListener('click', onClickChangeOrder)
// }

// /*
// <ul class="paginated__list">
// <li class="paginated__li">1</li>
// <li class="paginated__tem js-back-dots js-hidden">...</li>
// <ul>
// <li class="paginated__tem">25</li>
// <li class="paginated__tem">26</li>
// <li class="paginated__tem">27</li>
// <li class="paginated__tem">28</li>
// </ul>
// <li class="paginated__tem js-forward-dots js-visible">...</li>
// <li class="paginated__tem">29</li>
// </ul>
// */
