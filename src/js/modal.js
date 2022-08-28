import { refs } from './refs';

let backdrop = document.querySelector('.backdrop');
let modalCloseBtn = document.querySelector('.modal__close-btn');
// let modalTest = document.querySelector('.modal__open');

// modalTest.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);

export function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

export function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}
