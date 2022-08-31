import notiflix from 'notiflix'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, child, get, update, push } from "firebase/database";
import {clearAfterSignOut} from "../basket" //clean basket
//Файл настройок для ФАЯБЕЙЗА з акаунту
const firebaseConfig = {
    apiKey: "AIzaSyA1qR_n73lnbDIB96TfK_yMCuERhUDCeuA",
    authDomain: "image-search-6ffc6.firebaseapp.com",
    databaseURL: "https://image-search-6ffc6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "image-search-6ffc6",
    storageBucket: "image-search-6ffc6.appspot.com",
    messagingSenderId: "994814055923",
    appId: "1:994814055923:web:2086f5ea88785c66926e86"
};
// Initialize Firebase в коді на сайті 
const app = initializeApp(firebaseConfig);
// створння сутності для реєстрації
export const auth = getAuth(app);
//створння сутності для доступ до БД
const database = getDatabase(app);
//шлях до БД
const dbRef = ref(database);
//==========================================================

//отримуємо доступ до кнопки входу в аккаунт і шапки сайту для створення дин. розмітки
const signOutBtn = document.querySelector('.js-sign-out');
const logBtn = document.querySelector('.js-sign');
const header = document.querySelector('header');
//слухаємо кнопку входу в аккаунт 
logBtn.addEventListener('click', createForm);

// Динамічно створбємо форму реєстрації
function createForm() {
    // створюємо темплейт розмітки
    let tmp = getAuthForm();
    //додаєм розмітку
    header.insertAdjacentHTML("beforeend", tmp);
    //оримуємо доступ до створених динамічно елементів
    const refAuth = {
        signUp: document.querySelector('.js-signup-btn'),
        signIn: document.querySelector('.js-signin-btn'),
        authCloseBtn: document.querySelector('.js-auth-close'),
        authBlock: document.querySelector('.js-auth-backdrop'),
    };
    //закриття модалки реєстрації по кліку на бекдроп, ескейп, кнопку-хрестик
    refAuth.authCloseBtn.addEventListener("click", () => refAuth.authBlock.remove());
    window.addEventListener('keydown', (e) => e.code === 'Escape' ? refAuth.authBlock.remove() : null);
    refAuth.authBlock.addEventListener("click", (e) => e.currentTarget === e.target ? refAuth.authBlock.remove() : null);
    //входим в аккаунт або рєструємся
    refAuth.signUp.addEventListener("click", signUpUser);
    refAuth.signIn.addEventListener("click", logInUser);
}

//==================створюємо 
//вхід юзера
function logInUser() {
    // першкоджаєм оновлення сторінки на подію сабміт(====*)
    event.preventDefault();
    // отримуємо значення інпутів форми
    const logForm = document.querySelector('.js-registration-form');
    const password = logForm.password.value;
    const email = logForm.email.value;
    // формула фаєрбейс для реєстрації по email, password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            uid = user.uid;
            // ...
            notiflix.Notify.success(`User #${uid} logged`);
            //показуємо кнопку виходу і додаємо слухач
            signOutBtn.classList.remove('js-hidden');
            signOutBtn.addEventListener('click', userAway);
            //ховаємо кнопку входу і знімаємо слухач
            logBtn.removeEventListener('click', createForm);
            logBtn.classList.add('js-hidden');
            //закриваємо форму реєстрації
            document.querySelector('.js-auth-backdrop').remove();
            console.log(user);
        })
        .catch((error) => {
            notiflix.Notify.failure(`User not found`);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

//вихід юзера з аккаунту
function userAway(params) {
    signOut(auth).then(() => {
        notiflix.Notify.info("Sign-out successful");
        //ховаємо кнопку виходу і знімаємо слухач
        signOutBtn.classList.add('js-hidden');
        signOutBtn.removeEventListener('click', userAway);
        //показуємо кнопку входу і додаємо слухач
        logBtn.addEventListener('click', createForm);
        logBtn.classList.remove('js-hidden');
        // Sign-out successful.

        clearAfterSignOut()
    }).catch((error) => {
        notiflix.Notify.failure(`${error.message}`)
        // An error happened.
    });
}

//создание юзра
function signUpUser() {
    try {
        event.preventDefault();
        //отримання даних з форми
        const logForm = document.querySelector('.js-registration-form');
        const password = logForm.password.value;
        const email = logForm.email.value;
        //створення юзера за допомогою мила і паролю
        createUserWithEmailAndPassword(auth, email, password);
        notiflix.Notify.success(`New accaunt created. Sign in please!`)
    } catch (error) {
        console.log(error);
        notiflix.Notify.failure(`Some problem with regisration`)
    }
}

//===========================БД
// запис в базу даних повний перезапис всіх данних за значнням ключа
function writeUserData(userId = 0, user) {
    userId = user.uid;
    const db = getDatabase(app);
    set(ref(db, 'users/' + userId), {
        uid: user.uid,
        email: user.email,
        lastLogged: user.metadata.lastSignInTime,
    });
}
//читаєм базу данних - запрос на сервер

// const userId = "N0LAFP2hX9gmY6fH9ih67NCP1nI3";

// const gtDataBtn = document.querySelector('.get-btn');

// gtDataBtn.addEventListener('click', () => {
//     try {
//         if (!auth.currentUser) {
//             return console.log('зайдіть в аккаунт');
//         }
//         const path = auth.currentUser?.uid;
//         get(child(dbRef, `users/${path}`)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 console.log(snapshot.val());
//             } else {
//                 console.log("No data available");
//             }
//         }).catch((error) => {
//             console.error(error);
//         })
//     } catch (error) {
//         console.log(error);
//     }

// })

//Доповнення інформації без витирання внесеної інформації
// const writeNew = document.querySelector('#writeNewPost');
// writeNew.addEventListener('click', () => writeNewPost());




export function writeNewPost(postData = {}) {
    if (!auth) {
        return console.log('зайдіть в аккаунт 111');
    }
    try {
        // let postData = JSON.parse(localStorage.getItem('userBasket'));
        const userId = auth?.currentUser?.uid;
        const db = getDatabase(app);
        const mini = {
            id: postData.id,
            name: postData.name,
            images: postData.images,
            country: postData._embedded.venues[0].country.name,
            city: postData._embedded.venues[0].city.name,
            address: postData._embedded.venues[0].address.line1,
            concertHall: postData._embedded.venues[0].name,
        }

        console.log(mini);
        // A post entry.
        // const postData = {
        //     aaaauthor: 'username',
        //     body: 'body',
        //     title: 'title',
        //     starCount: 0,
        //     authorPic: 'picture'
        // };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), `users/`)).key;
        console.log(newPostKey);
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        // updates['/posts/' + newPostKey] = postData;
        updates['users/' + userId] = mini;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return update(ref(db), updates);
    } catch (error) {
        console.log(error);
    }

}


//створення розмітки форми по натиску 
export function getAuthForm() {
    return `<div class="backdrop js-auth-backdrop">
  <!-- is-hidden -->
  <div class="reg-modal ">
    <button type="button" class="modal__close-btn js-auth-close">
    x
    </button>
    <form class="registration__form js-registration-form" id="log-form">
      <div class="reg_textfield reg__float-label">
        <label class="registration__label" for="email">Email</label>
        <input
          type="email"
          class="registration__input"
          id="email"
          name="email"
          placeholder="Write your email"
          required
        />
      </div>
      <div class="reg_textfield reg__float-label">
        <label class="registration__label" for="password">Password</label>
        <input
          type="password"
          class="registration__input input__mar"
          id="password"
          name="password"
          placeholder="Write your password"
          required
        />
      </div>
      <button type="submit" class="modal__btn-sign-in js-signin-btn">
        <span class="signin__btn-text">Sign in</span>
      </button>
      <button type="submit" class="modal__btn-sign-up js-signup-btn">
        <span class="signup__btn-text">Registration</span>
      </button>
    </form>
  </div>
</div>`
}