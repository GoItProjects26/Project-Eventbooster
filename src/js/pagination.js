const ref = {
  paginatedList: document.querySelector('.paginated__list'),
  paginatedItem: [],
};
import { EventApi } from './api';
import { renderMarckup } from './renderHtml';
import { renderMarckupFromLocalStorage } from './renderHtml';

export function pag1() {
  const serverResponce = JSON.parse(localStorage.getItem('event'));
  console.log();
  let total;
  if (serverResponce.page.totalPages > 1000 / serverResponce.page.size) {
    total = Math.floor(1000 / serverResponce.page.size);
  } else {
    total = serverResponce.page.totalPages;
  }
  // console.log(serverResponce.page);
  // console.log(total);

  // console.log('current page', EventApi.config.params.page);
  let current = +EventApi.config.params.page + 1; // номер текущей страницы, нужно получать
  let arr = [];
  let after;
  let before;
  if (total - current > 3) {
    // console.log('total', total - current, 'current', current);
    before = current + 2;
  }
  if (current > 4) {
    after = current - 2;
  }
  if (after && before) {
    // console.log('after', after, 'before', before);
    arr.push(`<li class="paginated__item" data-page="0">1</li>`);
    arr.push(
      `<li class="paginated__item  forward__item" data-page="${
        after - 2
      }">...</li>`
    );
    for (let i = after + 1; i < before; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
    arr.push(
      `<li class="paginated__item back__item" data-page="${before}">...</li>`
    );
    arr.push(
      `<li class="paginated__item" data-page="${total - 1}">${total}</li>`
    );
  } else if (after && !before) {
    console.log('after', after, 'before', before);
    arr.push(`<li class="paginated__item" data-page="0">1</li>`);
    arr.push(
      `<li class="paginated__item forward__item" data-page="${after}">...</li>`
    );
    for (let i = after; i <= total; i++) {
      // console.log(i);
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
  } else if (!after && before) {
    console.log('after', after, 'before', before, 'current', current);
    for (let i = 1; i <= before; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
    arr.push(
      `<li class="paginated__item back__item" data-page="${before}">...</li>`
    );
    arr.push(
      `<li class="paginated__item" data-page="${total - 1}">${total}</li>`
    );
  }
  let string = arr.join('');
  // console.log(string);
  // return string;
  ref.paginatedList.innerHTML = string;
  ref.paginatedItem = document.querySelectorAll('.paginated__item');
  // console.log(ref.paginatedItem[current - 1]);
  // console.log(current);
  ref.paginatedItem.forEach(elem => {
    if (elem.textContent == current) elem.classList.add('item-active');
  });
  ref.paginatedList.addEventListener('click', onPageClick);
  // ref.paginatedItem[current - 1].classList.add('item-active');
  // document.querySelector
}
// результат в консоли
// все, что нужно - пуши в массив цифр заменить разметкой
pag1();
function onPageClick(event) {
  if (event.target.nodeName === 'LI') {
    // console.log(event.target.dataset.page);
    EventApi.setPage(+event.target.dataset.page);
    EventApi.setKeyword('NBA');
    // renderMarckupFromLocalStorage();
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 1000);
    renderMarckup();
    pag1();
  }
}
