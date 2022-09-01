import { EventApi } from './api';
import { renderMarckup } from './renderHtml';
import { renderMarckupFromLocalStorage } from './renderHtml';

const ref = {
  paginatedList: document.querySelector('.paginated__list'),
};

export function pag1(totalPages) {
  let total;

  if (totalPages > 1000 / 16) {
    total = Math.floor(1000 / 16);
  } else {
    total = totalPages;
  }

  let current = +EventApi.config.params.page + 1;
  let arr = [];
  let after;
  let before;

  if (total - current > 3) {
    before = current + 2;
  }
  if (current > 4) {
    after = current - 2;
  }
  if (after && before) {
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
    arr.push(`<li class="paginated__item" data-page="0">1</li>`);
    arr.push(
      `<li class="paginated__item forward__item" data-page="${after}">...</li>`
    );
    for (let i = total - 4; i <= total; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
  } else if (!after && before) {
    for (let i = 1; i <= 5; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
    arr.push(
      `<li class="paginated__item back__item" data-page="${before}">...</li>`
    );
    arr.push(
      `<li class="paginated__item" data-page="${total - 1}">${total}</li>`
    );
  } else {
    for (let i = 1; i <= total; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
  }
  let string = arr.join('');

  ref.paginatedList.innerHTML = string;
  const paginatedItems = document.querySelectorAll('.paginated__item');

  paginatedItems.forEach(elem => {
    if (elem.textContent == current) elem.classList.add('item-active');
  });
  ref.paginatedList.addEventListener('click', onPageClick);
}

function onPageClick(event) {
  if (event.target.nodeName === 'LI') {
    EventApi.setPage(+event.target.dataset.page);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
    renderMarckup();
  }
}
