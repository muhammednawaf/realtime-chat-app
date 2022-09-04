const firebaseConfig = {
  apiKey: "AIzaSyAcErC4W-ci23qlmjC9q4Ht9zBrJV8dLtg",
  authDomain: "chat-app-54eb2.firebaseapp.com",
  projectId: "chat-app-54eb2",
  storageBucket: "chat-app-54eb2.appspot.com",
  messagingSenderId: "222369946424",
  appId: "1:222369946424:web:c3c10a9383e9280e1fbfcd",
  measurementId: "G-DDR4H8TJ9R"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var Sign_out = document.querySelector('.sign-out')
var header_image = document.querySelector('.header-image')
var header_name = document.querySelector('.header-name')
var user_details;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    user_details = user;
    header_image.src = user.photoURL;
    header_name.innerText = user.displayName;
    // ...
  } else {
    window.location = 'login.html'
    // User is signed out
    // ...
  }
});

Sign_out.addEventListener('click', function (e) {
  firebase.auth().signOut()

})

getMessages();


let date = new Date();
let date_value = date.getHours() + ':' + date.getMinutes() + "|" + date.getDate() + '-' + (date.getMonth() + 1) + "- " + date.getFullYear()
var userimage = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
var form = document.querySelector("#message")
var chat_section = document.querySelector('.chat-section')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  var message_value = form.message.value;
  db.collection("chats").add({
    message: message_value,
    user_name: user_details.displayName,
    user_image: user_details.photoURL,
    date: date_value,
    uid: user_details.uid
  })
    .then((docRef) => {
      let message_obj = {
        message: message_value,
        user_name: user_details.displayName,
        user_image: user_details.photoURL,
        date: date_value,
        uid: user_details.uid
      }
      addMessageChat(message_obj)
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

});

function getMessages() {
  db.collection("chats").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      addMessageChat(doc.data())
    });
  });

}





function addMessageChat(message) {

  let message_value = document.createElement('p')
  let user_image = document.createElement('img')
  let user_name = document.createElement('h5')
  let date = document.createElement('small')
  let chat_wrapper = document.createElement('div')
  let single_chat = document.createElement('div')

  message_value.innerText = message.message
  user_image.src = message.user_image
  user_name.innerText = message.user_name
  date.innerText = message.date



  single_chat.append(chat_wrapper)
  single_chat.append(user_image)
  chat_wrapper.append(message_value)

  chat_wrapper.append(user_name)
  chat_wrapper.append(date)


  single_chat.classList.add('single-chat')
  user_image.classList.add('avatar')
  chat_wrapper.classList.add('message-details')
  if (message.uid == user_details.uid) {
    single_chat.classList.add('my-chat')
  }
  chat_section.scrollTop = chat_section.scrollHeight;

  chat_section.append(single_chat)



}



