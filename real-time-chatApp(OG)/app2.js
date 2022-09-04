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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        window.location = 'index.html'
        // ...
    } else {
        console.log("user not logged")
        // User is signed out
        // ...
    }
});

var loginbtn = document.querySelector("#login")
var provider = new firebase.auth.GoogleAuthProvider();

loginbtn.addEventListener('click', function (e) {
    firebase.auth().signInWithPopup(provider).then(function (e) {
        window.location = 'index.html'
    })
        .catch(function (e) {
            console.log('error')
        })
})