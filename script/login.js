import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, push, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlo3_M6Ko34ZCjI-PPk17wcOZxrUA33Pc",
  authDomain: "cepriopequenoteste.firebaseapp.com",
  databaseURL: "https://cepriopequenoteste-default-rtdb.firebaseio.com",
  projectId: "cepriopequenoteste",
  storageBucket: "cepriopequenoteste.appspot.com",
  databaseURL: "https://cepriopequenoteste-default-rtdb.firebaseio.com/",
  messagingSenderId: "313859029675",
  appId: "1:313859029675:web:a434b298a9ca09772c95ee"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//get acess
const dbRef = ref(getDatabase());

//acess
document.getElementById('login-btn').addEventListener('click', ()=>{
    if(document.getElementById('email').value == '' || document.getElementById('password').value == ''){
        alert('Verifique os campos e tente novamente!')
    }else{
        get(child(dbRef, "acess/")).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapchot)=>{
                    const data = childSnapchot.val()
                    if(document.getElementById('email').value == data.email && document.getElementById('password').value == data.senha){
                        window.location.replace('admin.html')
                    }else{

                    }
                })
            } else {
                
            }
            }).catch((error) => {
            console.error(error);
        });
    }
})