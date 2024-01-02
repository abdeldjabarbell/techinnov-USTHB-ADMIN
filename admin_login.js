  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
  import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

  // Your Firebase configuration
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
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const email_login = document.getElementById("email_login_admin");
  const password_login = document.getElementById("password_login_admin");
  const loginForm = document.getElementById("login-form");


 // ... (previous code)

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email_admin = email_login.value;
  const password_admin = password_login.value;

  try {
    // Get user data from Firestore
    const adminsRef = collection(firestore, 'Admins');
    const q = query(adminsRef, where('admin ID', '==', email_admin), where('Admin password', '==', password_admin));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      // Admin with matching credentials found

      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email_admin, password_admin);

      console.log('Admin is verified');
      window.location.href = 'ADMIN_home.html';
      // Redirect or update UI as needed
    } else {
      // No matching admin found
      console.log('Invalid credentials');
      // Display error message to the user
    }
  } catch (error) {
    console.error('Error verifying admin:', error);
    // Display error message to the user
  }
});

