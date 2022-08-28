
const scrollBtn = document.querySelector('.sticky');
 window.onscroll = () => {
 if (window.scrollY > 500){
     scrollBtn.classList.remove('is-hide'); 
 } else if (window.scrollY < 500) {
     scrollBtn.classList.add('is-hide');
 }
}