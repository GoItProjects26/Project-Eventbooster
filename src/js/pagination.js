// const paginationNumbers = document.getElementById("pagination-numbers");
// const paginatedList = document.getElementById("paginated-list");
// const listItems = paginatedList.querySelectorAll("li");
// const nextButton = document.getElementById("next-button");
// const prevButton = document.getElementById("prev-button");

// const paginationLimit = 16;
// const pageCount = Math.ceil(listItems.length / paginationLimit);
// let currentPage = 1;

// const disableButton = (button) => {
//   button.classList.add("disabled");
//   button.setAttribute("disabled", true);
// };

// const enableButton = (button) => {
//   button.classList.remove("disabled");
//   button.removeAttribute("disabled");
// };

// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };

// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);

//   paginationNumbers.appendChild(pageNumber);
// };

// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

//   handleActivePageNumber();
//   handlePageButtonsStatus();
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });











// const piganationList = document.querySelector('.js-pagination');

// piganationList.addEventListener('click', selectPage);

// function selectPage(event) {
//     if (event.target.nodeName !== 'UL') {
//         let numberPage = event.target.textContent

//         piganationList.querySelector('.active').clasList.remove('.active');

//         //вызов метода класса для изменения страницы
//         filmApi.selectPage(numberPage);
//         filmApi.getTopRated().then((value) => {
//             renderMarkup(value.result);
//         })



//         let liObj = event.target;
//         if (liObj.nodeName !== 'LI') liObj = event.target.perentNode.perentNode;
//         liObj.classList.add("active");
//     }
// }

// async function main() {
//     //отсюда беруться данные, там массив с объектами
//     const postData = await getData();
//     let currentPage = 1;
//     let rows = 10;

//     //отрисовывает нужные данные
// // arrData - массив с данными
// // rowPerPage- сколько овывести данных на странице)
//     function displayList(arrData, rowPerPage, page) {
//         const postsEl = document.querySelector('.js-pagination')

//         const start = rowPerPage * page;
//         const end = start + rowPerPage;
//         const paginatedData = arrData.slice(start, end);

//         paginatedData.forEach((el) => {
//             const postEl = document.createElement("div")
//             postEl.classList.add("post")
//         })

//     }
//     //отрисовываает кнопки в зависимости от количества
//     function displayPagination() { };
//     //отрисовывает кнопки внутри цикла displayPagination чтобы отрисоввывать кнопки
//     function displayPagination() { };
//     }