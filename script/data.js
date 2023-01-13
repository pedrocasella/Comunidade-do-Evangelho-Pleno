
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

  //get data

  const dbRef = ref(getDatabase());
  get(child(dbRef, "user/")).then((snapshot) => {
      if (snapshot.exists()) {
          snapshot.forEach((childSnapchot)=>{
            const data = childSnapchot.val()
            console.log(data)
            const member_area = document.getElementById('geral-list')

            member_area.innerHTML += '<li class="member-column"><ul class="member-ul"><li class="picture-li"><div class="user-picture" style="background-image: url(' + data.foto + ')"></div></li><hr><li class="name-li">' + data.nome + '</li><hr><li class="cargo-li">' + data.cargo + '</li><hr><li class="cargo-adm-li">' + data.cargo_adm + '</li><hr><li class="nascimento-li">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="batismo-li">' + data.batismo.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="contato-li">' + data.contato + '</li></ul></li>'
          })
      } else {
          
      }
      }).catch((error) => {
      console.error(error);
      });
    

  //save data user
  
  function saveData(){
    const db = getDatabase();
    const setRef = ref(db, 'user/')
    const pushSet = push(setRef)
    const foto = document.getElementById('label-picture').style.backgroundImage.replace('url(', '').replace(')', '').replaceAll('"', '')
    const nome = document.getElementById('nome-input').value
    const prefName = document.getElementById('prefName-input').value
    const status = document.getElementById('estadoCivil-input').value
    const rg = document.getElementById('identidade-input').value
    const cpf = document.getElementById('cpf-input').value
    const cargo = document.getElementById('cargo-input').value
    const cargoAdm = document.getElementById('adm-input').value
    const ministerio = document.getElementById('ministerio-input').value
    const func_ministerial = document.getElementById('funcMinisterial-input').value
    const nascimento = document.getElementById('nascimento-input').value
    const batismo = document.getElementById('batismo-input').value
    const endereco = document.getElementById('endereco-input').value
    const contato = document.getElementById('telefone-input').value

    set(pushSet, {
        foto: foto,
        nome: nome,
        pref_nome: prefName,
        status: status,
        rg: rg,
        cpf: cpf,
        cargo: cargo,
        cargo_adm: cargoAdm,
        ministerio: ministerio,
        func_misterial: func_ministerial,
        nascimento: nascimento,
        batismo: batismo,
        endereco: endereco,
        contato: contato,
    })

    const birthdayRef = ref(db, 'birthday/')
    const pushBirthday = push(birthdayRef)
    set(pushBirthday, {
        foto: foto,
        nome: prefName,
        nascimento: nascimento,
    })
  }

  document.getElementById('save-btn').addEventListener('click', ()=>{
    saveData()
    setTimeout(()=>{window.location.reload()}, 1000*2)
  })


//open modal
document.getElementById('add-member').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'block'
})

//close modal add

document.getElementById('close-btn').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'none'
})