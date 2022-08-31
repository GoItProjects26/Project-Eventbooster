import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, child, get, update, push } from "firebase/database";
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
const auth = getAuth(app);
//створння сутності для доступ до БД
const database = getDatabase(app);
//шлях до БД
const dbRef = ref(database);



const logBtn = document.querySelector('.login-btn');
const header = document.querySelector('header');

logBtn.addEventListener('click', createForm)


function createForm() {
    event.preventDefault();
    let tmp = getAuthForm();
    header.insertAdjacentHTML("beforeend", tmp);

    const signUp = document.querySelector('.btn-sign-up');
    const signIn = document.querySelector('.btn-sign-in');

    signUp.addEventListener("click", signUpUser);
    signIn.addEventListener("click", logInUser);
}
let uid = null;
//створення розмітки форми по натиску 
export function getAuthForm() {
    return `
    <form class="mui-form" id="log-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" id="email" name ="email" required>
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password" name ="password" required>
        <label for="password">Пароль</label>
      </div>
      <button
        type="submit"
        class="btn-sign-in"
      >
        Войти
      </button>

        <button
        type="submit"
        class="btn-sign-up"
      >
        Зарегестрироваться
      </button>
    </form>
  `
}
//вход юзера
function logInUser() {
    event.preventDefault();
    const logForm = document.querySelector('#log-form');
    const password = logForm.password.value;
    const email = logForm.email.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            uid = user.uid;
            // ...
            // writeUserData(userId = 0, user)
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    console.log('signIn')
}

//вихід юзера з аккаунту
const signOutBtn = document.querySelector('#signOut');
signOutBtn.addEventListener('click', userAway)
function userAway(params) {
    signOut(auth).then(() => {
        console.log('you out of your accaunt');
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
//создание юзра
function signUpUser() {
    event.preventDefault();
    const logForm = document.querySelector('#log-form');
    const password = logForm.password.value;
    const email = logForm.email.value;
    createUserWithEmailAndPassword(auth, email, password);
    console.log(' signUp');
}

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

const userId = "N0LAFP2hX9gmY6fH9ih67NCP1nI3";

const gtDataBtn = document.querySelector('.get-btn');

gtDataBtn.addEventListener('click', () => {
    try {
        if (!auth.currentUser) {
            return console.log('зайдіть в аккаунт');
        }
        const path = auth.currentUser?.uid;
        get(child(dbRef, `users/${path}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })
    } catch (error) {
        console.log(error);
    }

})

//Доповнення інформації без витирання внесеної інформації
const writeNew = document.querySelector('#writeNewPost');
writeNew.addEventListener('click', () => writeNewPost());




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
