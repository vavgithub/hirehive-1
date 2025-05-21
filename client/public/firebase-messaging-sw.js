importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCvyzvERT6eH7zE6Eg-6NXtVCfiVg0fecY",
  authDomain: "noti-hhv.firebaseapp.com",
  projectId: "noti-hhv",
  storageBucket: "noti-hhv.firebasestorage.app",
  messagingSenderId: "1063155777725",
  appId: "1:1063155777725:web:ac87d28fcecdbeb3e5f7d4",
  measurementId: "G-B23LJ4MHHN"
};

const app = firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
});