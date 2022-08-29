const ref = {
  paginatedList: document.querySelector('.paginated__list'),
  paginatedItem: [],
};

export function pag1() {
  const serverResponce = JSON.parse(localStorage.getItem('event'));
  const total = serverResponce.page.totalPages;

  let current = 500; // номер текущей страницы, нужно получать
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
    console.log('after', after, 'before', before);
    arr.push(`<li class="paginated__item" data-page="0">1</li>`);
    arr.push(`<li class="paginated__item" data-page="${after - 1}">...</li>`);
    for (let i = after + 1; i < before; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
    arr.push(`<li class="paginated__item" data-page="${before - 1}">...</li>`);
    arr.push(
      `<li class="paginated__item" data-page="${total - 1}">${total}</li>`
    );
  } else if (after && !before) {
    console.log('after', after, 'before', before);
    arr.push(`<li class="paginated__item" data-page="0">1</li>`);
    arr.push(`<li class="paginated__item" data-page="${after - 1}">...</li>`);
    for (let i = after; i <= total; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
  } else if (!after && before) {
    console.log('after', after, 'before', before);
    for (let i = 1; i <= before; i++) {
      arr.push(`<li class="paginated__item" data-page="${i - 1}">${i}</li>`);
    }
    arr.push(`<li class="paginated__item" data-page="${before - 1}">...</li>`);
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
  console.log(current);
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
    console.log(event.target.dataset.page);
  }
}

// function pagination(c, m) {
//   var current = c,
//     last = m,
//     delta = 2,
//     left = current - delta,
//     right = current + delta + 1,
//     range = [],
//     rangeWithDots = [],
//     l;

//   for (let i = 1; i <= last; i++) {
//     if (i == 1 || i == last || (i >= left && i < right)) {
//       range.push(i);
//     }
//   }

//   for (let i of range) {
//     if (l) {
//       if (i - l === 2) {
//         rangeWithDots.push(l + 1);
//       } else if (i - l !== 1) {
//         rangeWithDots.push('...');
//       }
//     }
//     rangeWithDots.push(i);
//     l = i;
//   }

//   return rangeWithDots;
// }

// for (let i = 1, l = 20; i <= l; i++)
//   console.log(`Selected page ${i}:`, pagination(i, l));
