// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut , deleteUser as deleteAuthUser } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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
const firestore = getFirestore(app);

const loader = document.getElementById("loader")



auth.onAuthStateChanged((user) => {
  if (user) {
    const userEmail = user.email;

    if (userEmail === "techinnov@admin.com") {
      console.log("Authentication successful for techinnov@admin.com");
      const resultData = document.getElementById("resultData");
      resultData.style.display="block";

      const home_user_login_filed = document.getElementById("home_user_login_filed");
      home_user_login_filed.style.display="none";

      // Call the function to display user information
          displayUserInformation();
      // Allow access or perform additional actions
    } else {
      
         console.log("Authentication failed for this user");
         const resultData = document.getElementById("resultData");
         resultData.style.display="none";

         const home_user_login_filed = document.getElementById("home_user_login_filed");
         home_user_login_filed.style.display="block";
          // Sign out the user or take appropriate actions
          auth.signOut();
           window.location.replace("Admin_login.html");

    }
  } else {
   console.log("User not logged in");
   const resultData = document.getElementById("resultData");
   resultData.style.display="none";

   const home_user_login_filed = document.getElementById("home_user_login_filed");
   home_user_login_filed.style.display="block";
   }
});

// Function to fetch and display user information in a table
async function displayUserInformation() {
  const usersCollection = collection(firestore, "users");
  const querySnapshot = await getDocs(usersCollection);

  const userTableBody = document.querySelector("#userTable tbody");
  let a = 1;

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    const row = document.createElement("tr");
    // Display user information in table rows
    row.innerHTML = `
      <td>${a++}</td>
      <td>${userData.name}</td>
      <td>${userData.last_name}</td>
      <td>${userData.matricule}</td>
      <td>${userData.birth_day}</td>
      <td>${userData.wilaya}</td>
      <td>${userData.phone_number}</td>
      <td>${userData.email}</td>
      <td>${userData.lavel}</td>
      <td>${userData.faculte}</td>
      <td><button class="btn delete deleteButton">Delete</button></td>
      `;

    userTableBody.appendChild(row);
    loader.style.display ="none";



    const nbprt = document.getElementById("nbprt");
    nbprt.innerHTML="N° : "+(a-1);

        // Attach event listener for each button inside the loop
        const deleteButton = row.querySelector('.deleteButton');
        const userId = doc.id; // Assuming the user ID is available in your Firestore document
        deleteButton.addEventListener("click", () => {
          deleteUser(userId);
        });

        
        
  });

  const downloadButton = document.querySelector("#downloadButton");
  downloadButton.addEventListener("click", () => {
    downloadExcel(querySnapshot);
  });
}



function downloadExcel(querySnapshot) {
    const data = [];
  
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const row = [
        userData.name,
        userData.last_name,
        userData.matricule,
        userData.birth_day,
        userData.wilaya,
        userData.phone_number,
        userData.email,
        userData.lavel,
        userData.faculte,
      ];
  
      data.push(row);
    });
  
    const ws = XLSX.utils.aoa_to_sheet([["Name", "Last Name", "Matricule", "Birth Day", "Wilaya", "Phone Number", "Email", "Lavel", "Faculte"], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    const today = new Date();
    const fileName = `TECHINNOV_membres_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.xlsx`;
  
    XLSX.writeFile(wb, fileName);
  }





const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  // Sign out the user
  signOut(auth).then(() => {
    window.location.replace("Admin_login.html");

    // Redirect or perform other actions after logout
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});




// Function to search users based on the input
function searchUsers() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#userTable tbody tr");

  rows.forEach((row) => {
    const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const matricule = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
    const email = row.querySelector("td:nth-child(7)").textContent.toLowerCase();

    // Hide or show rows based on the search input
    if (name.includes(searchInput) || email.includes(searchInput) || matricule.includes(searchInput)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Attach the searchUsers function to the window object
window.searchUsers = searchUsers;




// Your deleteUser function
async function deleteUser(userId) {


    const usersCollection = collection(firestore, 'users');
  
    // Delete user from Firestore
    await deleteDoc(doc(usersCollection, userId));
  
    // Delete user from Authentication
    deleteUserauth(userId);
  
    // Refresh the table or perform any other necessary actions
    refreshTable();

}

// Your deleteUser function
async function deleteUserauth(userId) {
    const user = auth.currentUser;
  
    if (user) {
      try {
        await user.delete();
        console.log('User deleted from Authentication');
      } catch (error) {
        console.error('Error deleting user from Authentication:', error.message);
      }
    }
  
    // Delete user from Firestore and refresh table as needed
    // ...
  }
function refreshTable() {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = "";
  displayUserInformation(); 
}

// Call the function to display user information
