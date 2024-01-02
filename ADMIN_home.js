// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut , deleteUser as deleteAuthUser } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAYg-YrUR7wyGJwOkbJQw8112CdYNkq0oU",
  authDomain: "ssp-website-586d2.firebaseapp.com",
  projectId: "ssp-website-586d2",
  storageBucket: "ssp-website-586d2.appspot.com",
  messagingSenderId: "374411443744",
  appId: "1:374411443744:web:c9685e3085e6377903c645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);


auth.onAuthStateChanged((user) => {
  if (user) {
    const userEmail = user.email;

    if (userEmail === "techinnov@admin.com") {
      console.log("Authentication successful for techinnov@admin.com");
      const contentAdmin = document.getElementById("contentAdmin");
      contentAdmin.style.display="flex";

      const home_user_login_filed = document.getElementById("home_user_login_filed");
      home_user_login_filed.style.display="none";

    } else {
      
         console.log("Authentication failed for this user");
         const contentAdmin = document.getElementById("contentAdmin");
         contentAdmin.style.display="none";

         const home_user_login_filed = document.getElementById("home_user_login_filed");
         home_user_login_filed.style.display="block";
          // Sign out the user or take appropriate actions
          auth.signOut();
           window.location.replace("index.html");

    }
  } else {
   console.log("User not logged in");
   const contentAdmin = document.getElementById("contentAdmin");
   contentAdmin.style.display="none";

   const home_user_login_filed = document.getElementById("home_user_login_filed");
   home_user_login_filed.style.display="block";
   }
});
