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
    const projectsCollection = collection(firestore, "projects");
    const querySnapshot = await getDocs(projectsCollection);
    
    const projectsTableBody = document.querySelector("#userTable tbody");
    let a = 1;
    
    querySnapshot.forEach((doc) => {
      const projectsData = doc.data();
      const row = document.createElement("tr");
    
      // Display projects information in table rows
      const situationPrj = projectsData.situation_project;
    
      if (situationPrj === "ok") {
        const NBmembre = projectsData.numberofmembers;
    
        const nameMembers = [];
        const lastNMMembers = [];
        const matricule_memberMMembers = [];
        const role_member_MMembers = [];
        const phone_number_memberMMembers = [];
        const email_memberMMembers = [];
        const faculte_memberMMembers = [];
    
        for (let i = 1; i <= NBmembre; i++) {
          const nameM = projectsData["name_member" + i] + " <br><br>";
          const lastNM = projectsData["last_name_member" + i] + " <br><br>";
          const role_member_M = projectsData["role_member_" + i] + " <br><br>";
          const matricule_memberM = projectsData["matricule_member" + i] + " <br><br>";
          const email_memberM = projectsData["email_member" + i] + " <br><br>";
          const phone_number_memberM =projectsData["phone_number_member" + i] + " <br><br>";
          const faculte_memberM = projectsData["faculte_member" + i] + " <br><br>";
    
          nameMembers.push(nameM);
          lastNMMembers.push(lastNM);
          role_member_MMembers.push(role_member_M);
          matricule_memberMMembers.push(matricule_memberM);
          phone_number_memberMMembers.push(phone_number_memberM);
          email_memberMMembers.push(email_memberM);
          faculte_memberMMembers.push(faculte_memberM);
        }


        row.innerHTML = `
          <td>${a++}</td>
          <td>${projectsData.name_project}</td>
          <td>${projectsData.discreption_project}</td>
          <td>${nameMembers}</td>
          <td>${lastNMMembers}</td>
          <td>${role_member_MMembers}</td>
          <td>${matricule_memberMMembers}</td>
          <td>${phone_number_memberMMembers}</td>
          <td>${email_memberMMembers}</td>
          <td>${faculte_memberMMembers}</td>
          <td>${projectsData.prototype}</td>
          <td>${projectsData.label}</td>
          <td><button class="btn delete deleteButton">Delete</button></td>
        `;
    
        // Attach event listener for each button inside the loop
        const deleteButton = row.querySelector('.deleteButton');
        const ProjectId = doc.id; // Assuming the project ID is available in your Firestore document
        deleteButton.addEventListener("click", () => {
          deleteUser(ProjectId);
        });
    
        projectsTableBody.appendChild(row);
      }
    });
    
    loader.style.display = "none";
    
  const downloadButton = document.querySelector("#downloadButton");
  downloadButton.addEventListener("click", () => {
    downloadExcel(querySnapshot);

  });

  const nbprt = document.getElementById("nbprt");
  nbprt.innerHTML="N° : "+(a-1);
}




function  downloadExcel(querySnapshot){
    const data = [];
    let a=1;

    querySnapshot.forEach((doc) => {

        
      const projectsEXELdata = doc.data();

      const situationPrj = projectsEXELdata.situation_project;
      if (situationPrj === "ok") {
        const NBmembre = projectsEXELdata.numberofmembers;
    
        const nameMembers = [];
        const lastNMMembers = [];
        const matricule_memberMMembers = [];
        const role_member_MMembers = [];
        const phone_number_memberMMembers = [];
        const email_memberMMembers = [];
        const faculte_memberMMembers = [];
    
        for (let i = 1; i <= NBmembre; i++) {
          const nameM = projectsEXELdata["name_member" + i];
          const lastNM = projectsEXELdata["last_name_member" + i];
          const role_member_M = projectsEXELdata["role_member_" + i];
          const matricule_memberM = projectsEXELdata["matricule_member" + i];
          const email_memberM = projectsEXELdata["email_member" + i];
          const phone_number_memberM =projectsEXELdata["phone_number_member" + i];
          const faculte_memberM = projectsEXELdata["faculte_member" + i];
    
          nameMembers.push(nameM);
          lastNMMembers.push(lastNM);
          role_member_MMembers.push(role_member_M);
          matricule_memberMMembers.push(matricule_memberM);
          phone_number_memberMMembers.push(phone_number_memberM);
          email_memberMMembers.push(email_memberM);
          faculte_memberMMembers.push(faculte_memberM);
        }
       
      const row = [
        a++,
        projectsEXELdata.name_project,
        projectsEXELdata.discreption_project,
        nameMembers,
        lastNMMembers,
        role_member_MMembers,
        matricule_memberMMembers,
        phone_number_memberMMembers,
        email_memberMMembers,
        faculte_memberMMembers,
        projectsEXELdata.prototype,
        projectsEXELdata.label,
      ];
  
      data.push(row);
    }
    });


    const ws = XLSX.utils.aoa_to_sheet([["N","Project Title","Project Description","Member Name", "Member Last Name", "Member Role", "Member ID", "Phone Number", "Email", "Faculty", "Prototype", "Label"], ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TECHINNOV_Projects");
  
    const today = new Date();
    const fileName = `TECHINNOV_Projects_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.xlsx`;
  
    XLSX.writeFile(wb, fileName);
    
  }





const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  // Sign out the user
  signOut(auth).then(() => {
    window.location.replace("index.html");

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
    const situProj = row.querySelector("td:nth-child(11)").textContent.toLowerCase();

    const nameProj = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const name = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
    const LastName = row.querySelector("td:nth-child(5)").textContent.toLowerCase();
    const matricule = row.querySelector("td:nth-child(7)").textContent.toLowerCase();

    // Hide or show rows based on the search input
    if ( nameProj.includes(searchInput) ||LastName.includes(searchInput) || name.includes(searchInput) || matricule.includes(searchInput)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Attach the searchUsers function to the window object
window.searchUsers = searchUsers;




// Your deleteUser function
async function deleteUser(userData) {

    
    const usersCollection = collection(firestore, 'projects');
  
    // Delete user from Firestore
    await deleteDoc(doc(usersCollection, userData));
  
    // Delete user from Authentication
    deleteUserauth(userData);
  
    // Refresh the table or perform any other necessary actions
    refreshTable();

}

// Your deleteUser function
async function deleteUserauth(userData) {
    await userData.delete();

  }
function refreshTable() {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = "";
  displayUserInformation(); 
}


