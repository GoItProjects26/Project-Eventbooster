import { refs } from './refs';
import { onLoadMoreClick } from './getbyid';

export function openModal() {
  refs.modalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  refs.modalCloseBtn.addEventListener('click', closeModal);
  refs.modalBackdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeydown);
  refs.modalMoreBtn.addEventListener('click', onLoadMoreClick);
}

export function closeModal() {
  refs.modalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
    removeListenersModal();
  }
}

function onEscKeydown(event) {
  if (event.code === 'Escape') {
    closeModal();
    removeListenersModal();
  }
}
function removeListenersModal() {
  window.removeEventListener('keydown', onEscKeydown);
  refs.modalBackdrop.removeEventListener('click', onBackdropClick);
  refs.modalCloseBtn.removeEventListener('click', closeModal);
}
