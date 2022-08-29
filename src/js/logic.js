function pag1() {
  const total = 31;
  let current = 15; // номер текущей страницы, нужно получать
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
    arr.push(1);
    arr.push('...');
    for (let i = after; i <= before; i++) {
      arr.push(i);
    }
    arr.push('...');
    arr.push(total);
  } else if (after && !before) {
    console.log('after', after, 'before', before);
    arr.push(1);
    arr.push('...');
    for (let i = after; i <= total; i++) {
      arr.push(i);
    }
  } else if (!after && before) {
    console.log('after', after, 'before', before);
    for (let i = 1; i <= before; i++) {
      arr.push(i);
    }
    arr.push('...');
    arr.push(total);
  }
  console.log(arr);
}
// результат в консоли
// все, что нужно - пуши в массив цифр заменить разметкой
// pag1();
