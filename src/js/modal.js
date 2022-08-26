let modalTest = document.querySelector('.modal__open');
let backdrop = document.querySelector('.backdrop');
let modalCloseBtn = document.querySelector('.modal__close-btn');
console.log(modalTest);
modalTest.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
function openModal() {
  backdrop.classList.remove('is-hidden');
}
function closeModal() {
  backdrop.classList.add('is-hidden');
}
