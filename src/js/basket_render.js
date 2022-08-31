import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    // const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';

  //   function countEventer (userBasket) {
  //     return userBasket.contentShoppingCart.forEach((item, index, array)=>{
  //         if (array.indexOf(item) === index) return item
  //         let countEvent = userBasket.contentShoppingCart.filter(({id}) => id === item)
  //         return countEvent;
  //     })
     
  // }
  // console.log(countEventer(userBasket))


    let uniqArrId = [...new Set(data.map((data) => data.id))] //уникальный массив ИД
    console.log(uniqArrId)
    let arrId = data.map(box => box.id) //просто массив ИД
    console.log(arrId)
    uniqArrId.forEach((item) => {
      let count = 0;
      let {name, images, _embedded: {venues}, id: eventId} = (data.find((hit) => hit.id = item))
      let {city: {name: nameCity}, country: {name: nameCountry}} = venues[0];
      
      
      data.forEach((value) => {
        if(value.id == item) return count +=1;
      }
      )
     

      markup += `<li class="event__item"><div class="event__container"><img src=${smallestPhoto(images)} class="event__img"><div><span>${count}</span></div><div class="event__thumb"><p class="event__text">${name}</p><div class="location__container">
      <svg class="location_icons" width="6" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.346 0 0 1.403 0 3.128 0 5.296 3.003 9 3.003 9S6 5.19 6 3.128C6 1.403 4.654 0 3 0Zm.905 4.044c-.25.26-.577.39-.905.39a1.25 1.25 0 0 1-.905-.39c-.5-.52-.5-1.367 0-1.887a1.246 1.246 0 0 1 1.81 0c.5.52.5 1.367 0 1.887Z"/></svg>
      <p class="location__text">${nameCity}, ${nameCountry}</p></div></div></li>`;

    })




    // data.forEach((item, index, array) => {
    //   let {name, images, _embedded: {venues}, id: eventId} = item;
    //   let {city: {name: nameCity}, country: {name: nameCountry}} = venues[0];
    //    markup += `<li class="event__item"><div class="event__container"><img src=${smallestPhoto(images)} class="event__img"><div><span></span></div><div class="event__thumb"><p class="event__text">${name}</p><div class="location__container">
    //    <svg class="location_icons" width="6" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.346 0 0 1.403 0 3.128 0 5.296 3.003 9 3.003 9S6 5.19 6 3.128C6 1.403 4.654 0 3 0Zm.905 4.044c-.25.26-.577.39-.905.39a1.25 1.25 0 0 1-.905-.39c-.5-.52-.5-1.367 0-1.887a1.246 1.246 0 0 1 1.81 0c.5.52.5 1.367 0 1.887Z"/></svg>
    //    <p class="location__text">${nameCity}, ${nameCountry}</p></div></div></li>`;
    
    //   });
    refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
  }

  function smallestPhoto(array) {
    let arr = array.filter((array) => {
      if (array.ratio === "3_2") return true; 
      return false
      }).sort((a, b) => {
        if (a.width > b.width) return 1;
        return -1
      })
      return arr[0].url
    }

// refs.svgIcon.setAttribute("href", "./images/icons.svg#icon-location");


