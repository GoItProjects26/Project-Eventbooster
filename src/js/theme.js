const checkbox = document.getElementById('checkbox');
const checkBallIqon = document.querySelector('.ball');

checkbox.addEventListener('click', () => {
  checkbox.checked
    ? document.body.classList.add('light')
    : document.body.classList.remove('light');
  localStorage.setItem('lightModeStatus', checkbox.checked);

  // checkBallIqon.iconTheme ?
  document
    .querySelector('.theme__iqon-sun')
    .classList.toggle('theme-iqon-hidden');
  document
    .querySelector('.theme__iqon-moon')
    .classList.toggle('theme-iqon-hidden');
  // localStorage.setItem('lightModeIqonStatus', checkBallIqon.iconTheme);
});

window.addEventListener('load', event => {
  if (localStorage.getItem('lightModeStatus') == 'true') {
    document.body.classList.add('light');
    document.getElementById('checkbox').checked = true;
  }
  // if (localStorage.getItem('lightModeIqonStatus') === 'true') {
  //   document
  //     .querySelector('.theme__iqon-sun')
  //     .classList.toggle('theme-iqon-hidden');
  //   document.querySelector('.ball').checkBallIqon = true;
  // }
});
