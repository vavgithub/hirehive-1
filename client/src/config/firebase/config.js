import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCvyzvERT6eH7zE6Eg-6NXtVCfiVg0fecY",
  authDomain: "noti-hhv.firebaseapp.com",
  projectId: "noti-hhv",
  storageBucket: "noti-hhv.firebasestorage.app",
  messagingSenderId: "1063155777725",
  appId: "1:1063155777725:web:ac87d28fcecdbeb3e5f7d4",
  measurementId: "G-B23LJ4MHHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);