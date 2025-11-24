// This file assumes Firebase is loaded via CDN in index.html
declare const firebase: any;

const firebaseConfig = {
    apiKey: "AIzaSyAf0CIHBZ-wEQJ8CCUUWo1Wl9P7typ_ZPI",
    authDomain: "gptcall-416910.firebaseapp.com",
    projectId: "gptcall-416910",
    storageBucket: "gptcall-416910.appspot.com",
    messagingSenderId: "99275526699",
    appId: "1:99275526699:web:3b623e1e2996108b52106e"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
// Fix: Export a GoogleAuthProvider instance to resolve an import error in an unused auth context file.
export const provider = new firebase.auth.GoogleAuthProvider();
