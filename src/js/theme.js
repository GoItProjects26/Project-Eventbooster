const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('click', () => {
  checkbox.checked?document.body.classList.add("light"):document.body.classList.remove("light");
  localStorage.setItem('lightModeStatus', checkbox.checked);
});

window.addEventListener('load', (event) => {
  if(localStorage.getItem('lightModeStatus')=="true"){
    document.body.classList.add("light"); 
    document.getElementById('checkbox').checked = true;
  }
});

// const toggleBtn = document.getElementById("checkbox");
// // const theme = document.getElementById("theme"); document.body
// let darkMode = localStorage.getItem("dark-mode");

// const enableDarkMode = () => {
//   document.body.classList.add("dark-mode-theme");
//   toggleBtn.classList.remove("dark-mode-toggle");
//   localStorage.setItem("dark-mode", "enabled");
// };

// const disableDarkMode = () => {
//   document.body.remove("dark-mode-theme");
//   toggleBtn.classList.add("dark-mode-toggle");
//   localStorage.setItem("dark-mode", "disabled");
// };

// if (darkMode === "enabled") {
//   enableDarkMode(); // set state of darkMode on page load
// }

// toggleBtn.addEventListener("click", (e) => {
//   darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
//   if (darkMode === "disabled") {
//     enableDarkMode();
//   } else {
//     disableDarkMode();
//   }
// });