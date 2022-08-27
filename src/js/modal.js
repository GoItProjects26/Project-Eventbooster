let modalTest = document.querySelector('.modal__open');
let backdrop = document.querySelector('.backdrop');
let modalCloseBtn = document.querySelector('.modal__close-btn');

modalTest.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);

export function openModal() {
  backdrop.classList.remove('is-hidden');
}

function closeModal() {
  backdrop.classList.add('is-hidden');
}
