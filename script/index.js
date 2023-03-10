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

//get birthday data
const dbRef = ref(getDatabase());
get(child(dbRef, "birthday/")).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapchot)=>{
          const data = childSnapchot.val()
          const birthday = document.getElementById('birthday-person')

          birthday.innerHTML += '<li><ul class="info-ul"><li><div class="circle" style="background-image: url(' + data.foto + ')"></div></li><li class="info-person"><ul class="ul-info-person"><li class="name" id="name">' + data.nome + '</li><li class="data" id="data">Aniversário: ' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li></ul></li></ul></li>'
        })
    } else {
        
    }
    }).catch((error) => {
    console.error(error);
});

setInterval(()=>{
  var date = new Date().getMonth() + 1
  if(date < 10){
    var month = '0' + date
  }else{
    var month = date + ''
  }
  document.querySelectorAll('.info-ul').forEach((snapshot)=>{
    if(snapshot.innerHTML.indexOf('/' + month + '/') != -1){
      snapshot.style.display = 'none'
    }
  })
  
  /*if(document.getElementById('birthday-person').innerHTML == ''){
      document.getElementById('aviso').style.display = 'none'
  }else{
      document.getElementById('aviso').style.display = 'block'
  }*/

}, 1000*1)

//copy location
document.getElementById('title_copy').addEventListener('click', ()=>{
  navigator.clipboard.writeText(document.getElementById('location_div').innerText)
  //confirmation animation
  document.getElementById('title_copy').innerHTML = '<code>&#10003;</code>'
  setTimeout(()=>{
    document.getElementById('title_copy').innerHTML = 'Copiar'
  },1000*1)
})

//open DA

document.getElementById('da').addEventListener('click', ()=>{
  window.open('login.html')
})



