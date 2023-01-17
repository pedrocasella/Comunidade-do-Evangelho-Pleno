
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getDatabase, set, push, ref, get, child, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
            const key = childSnapchot.key
            const member_area = document.getElementById('geral-list')

            member_area.innerHTML += '<li class="member-column"><ul class="member-ul"><li class="picture-li"><div class="user-picture" style="background-image: url(' + data.foto + ')"></div></li><hr><li class="name-li" id="' + key + '" onclick="openId()">' + data.nome + '</li><hr><li class="cargo-li">' + data.cargo + '</li><hr><li class="cargo-adm-li">' + data.cargo_adm + '</li><hr><li class="nascimento-li">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="batismo-li">' + data.batismo.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="contato-li">' + data.contato + '</li><hr><li class="excluir-li" id="' + key  + '" onclick="deleteWindow()"></li></ul></li>'
          })
      } else {
          
      }
      }).catch((error) => {
      console.error(error);
  });

  //get remove-list
  get(child(dbRef, "users_off/")).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((childSnapchot)=>{
          const data = childSnapchot.val()
          const key = childSnapchot.key
          const member_area = document.getElementById('removed-list')

          member_area.innerHTML += '<li class="member-column"><ul class="member-ul"><li class="picture-li"><div class="user-picture" style="background-image: url(' + data.foto + ')"></div></li><hr><li class="name-li" id="' + key + '">' + data.nome + '</li><hr><li class="cargo-li">' + data.cargo + '</li><hr><li class="cargo-adm-li">' + data.cargo_adm + '</li><hr><li class="nascimento-li">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="batismo-li">' + data.batismo.replaceAll('-','/').split('/').reverse().join('/') + '</li><hr><li class="contato-li">' + data.contato + '</li><hr><li class="excluir-li" id="' + key  + '""></li></ul></li>'
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
    const profissao = document.getElementById('profissao-input').value
    const nascimento = document.getElementById('nascimento-input').value
    const batismo = document.getElementById('batismo-input').value
    const endereco = document.getElementById('endereco-input').value
    const contato = document.getElementById('telefone-input').value
    const email = document.getElementById('email-input').value

    set(pushSet, {
        foto: foto,
        nome: nome,
        pref_nome: prefName,
        status: status,
        rg: rg,
        cpf: cpf,
        cargo: cargo,
        cargo_adm: cargoAdm,
        profissao: profissao,
        nascimento: nascimento,
        batismo: batismo,
        endereco: endereco,
        contato: contato,
        email: email,
        insert_date: new Date() + '',
    })

    const birthdayRef = ref(db, 'birthday/')
    const pushBirthday = push(birthdayRef)
    set(pushBirthday, {
        foto: foto,
        nome: prefName,
        nascimento: nascimento,
    }).then(()=>{
      setTimeout(()=>{window.location.reload()}, 1000*2)
    })
  }

  document.getElementById('save-btn').addEventListener('click', ()=>{
    saveData()

  })


//open modal
document.getElementById('add-member').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'block'
    document.getElementById('background-black').style.display = 'block'
    document.getElementById('close').style.display = 'none'
})

//close modal add

document.getElementById('close-btn').addEventListener('click', ()=>{
    document.getElementById('modal-add').style.display = 'none'
    document.getElementById('background-black').style.display = 'none'
})

//get id user

document.getElementById('geral-list').addEventListener('click', (e)=>{
  
  var userId = e.target.id
  get(child(dbRef, "user/" + userId)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const card = document.getElementById('id-card')
      card.innerHTML = '<div class="front-data"><h2 class="title">Identificação Ministerial<hr></h2><ul class="name-ul"><li class="title-name">Nome:</li><li class="name">' + data.nome + '</li></ul><ul class="cargo-ul"><li class="cargo-title">Cargo:</li><li class="cargo">' + data.cargo + ' / ' + data.cargo_adm + '</li></ul><ul class="rg-ul"><li class="rg-title">Registro Geral:</li><li class="rg">' + data.rg + '</li></ul><ul class="cpf-ul"><li class="cpf-title">CPF:</li><li class="cpf">' + data.cpf + '</li></ul><ul class="nascimento-ul"><li class="nascimento-title">Data de Nascimento:</li><li class="nascimento">' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li></ul></div><div class="picture-area"><div class="barcode"></div><div class="cep-logo"></div><div class="picture-user" style="background-image: url(' + data.foto + ')"></div></div><div class="black-bar"></div>'


    } else {
        
    }
    }).catch((error) => {
    console.error(error);
    });
  
    document.getElementById('confirm-delete').innerHTML = '<div class="true" id="' + userId + '">Sim</div>'

      //Confirm Delete
  
      document.querySelector('.true').addEventListener('click', ()=>{
        
        const idRemove = document.querySelector('.true').id
        //capture data and move to trash
        get(child(dbRef, "user/" + idRemove )).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const db = getDatabase();
            const setRef = ref(db, 'users_off/')
            const pushSet = push(setRef)
            set(pushSet, {
              foto: data.foto,
              nome: data.nome,
              pref_nome: data.pref_nome,
              status: data.status,
              rg: data.rg,
              cpf: data.cpf,
              cargo: data.cargo,
              cargo_adm: data.cargo_adm,
              profissao: data.profissao,
              nascimento: data.nascimento,
              batismo: data.batismo,
              endereco: data.endereco,
              contato: data.contato,
              email: data.email,
              insert_date: data.insert_date,
              remove_date: new Date() + '',
            }).then(()=>{
              remove(child(dbRef, "user/" + idRemove )).then((snapshot) => {
                if (snapshot.exists()) {
                  const data = snapshot.val()
                } else {
                    
                }
                }).catch((error) => {
                console.error(error);
                });
      
                setTimeout(()=>{window.location.reload()}, 1000*2)
            })
          } else {
              
          }
          }).catch((error) => {
          console.error(error);
          });


      })


      //console.clear()
})

//Close ID Card

document.getElementById('close').addEventListener('click', ()=>{
  document.getElementById('id-card').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//Close delete area

document.getElementById('false').addEventListener('click', ()=>{
  document.getElementById('delete-modal').style.display = 'none'
  document.getElementById('background-black').style.display = 'none' 
})

//get birthdays

get(child(dbRef, "birthday/")).then((snapshot) => {
  if (snapshot.exists()) {
      snapshot.forEach((childSnapchot)=>{
        const data = childSnapchot.val()
        const key = childSnapchot.key
        const birthday_area = document.getElementById('birthdays-list')

        birthday_area.innerHTML += '<li class="people-content"><ul><li><div class="picture" style="background-image: url(' + data.foto + ')"></div></li><li class="name"><span>' + data.nome + '</span><br> ' + data.nascimento.replaceAll('-','/').split('/').reverse().join('/') + '</li><li class="trash"><div class="trash-btn" id="' + key + '"></div></li></ul></li>'
      })
  } else {
      
  }
  }).catch((error) => {
  console.error(error);
});